
import { useState, useEffect, useCallback } from 'react';
import { DomainType } from '../contracts/entityMap';
import { calculateLevelFromXP } from '../engines/levelEngine';
import { ProgressionService, DomainProgression } from '../services/progressionService';
import { useStorageSync } from './useStorageSync';

export function useUserProgress(domain: DomainType) {
  const [data, setData] = useState<DomainProgression>(() => ProgressionService.getDomainData(domain));
  
  const refresh = useCallback(() => {
    setData(ProgressionService.getDomainData(domain));
  }, [domain]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Sycnronize progression across components and tabs
  useStorageSync(refresh);

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
