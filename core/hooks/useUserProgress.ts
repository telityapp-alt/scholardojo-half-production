
import { useState, useEffect } from 'react';
import { DomainType } from '../contracts/entityMap';
import { calculateLevelFromXP, UserLevel } from '../engines/levelEngine';
import { ProgressionService, DomainProgression } from '../services/progressionService';

export function useUserProgress(domain: DomainType) {
  const [data, setData] = useState<DomainProgression>(() => ProgressionService.getDomainData(domain));
  
  const refresh = () => {
    setData(ProgressionService.getDomainData(domain));
  };

  useEffect(() => {
    refresh();
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, [domain]);

  const levelInfo = calculateLevelFromXP(data.xp);

  return {
    xp: data.xp,
    gems: data.gems,
    streak: data.streak,
    level: levelInfo.currentLevel,
    progressPercent: levelInfo.progressPercent,
    xpToNext: levelInfo.totalXPForNext - data.xp,
    addXP: (amt: number) => ProgressionService.addXP(domain, amt),
    addGems: (amt: number) => ProgressionService.addGems(domain, amt)
  };
}
