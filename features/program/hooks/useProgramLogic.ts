
import { useState, useEffect } from 'react';
import { DomainType, GenericProgram, GenericHost, SuperTag } from '../../../core/contracts/entityMap';
import { DomainConfig } from '../../../core/contracts/domainConfig';
import { getProgramsByDomain, getProgramById, getHostById } from '../../../core/access/programAccess';
import { generateProgramTags } from '../../../core/engines/programTagEngine';
import { useLanguage } from '../../../core/hooks/useLanguage';

export function useProgramLogic(domainConfig: DomainConfig) {
  const { lang } = useLanguage();
  const [programs, setPrograms] = useState<(GenericProgram & { generatedTags: SuperTag[]; host?: GenericHost })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const rawPrograms = getProgramsByDomain(domainConfig.id, lang);
      
      const enriched = rawPrograms.map(p => {
        const host = getHostById(p.hostId, domainConfig.id, lang) || undefined;
        const tags = generateProgramTags(p, domainConfig);
        return { ...p, generatedTags: tags, host };
      });
      
      setPrograms(enriched);
      setLoading(false);
    }, 400);
  }, [domainConfig.id, lang]);

  return { programs, loading };
}

export function useProgramDetail(programId: string | undefined, domainConfig: DomainConfig) {
  const { lang } = useLanguage();
  const [program, setProgram] = useState<GenericProgram | null>(null);
  const [host, setHost] = useState<GenericHost | null>(null);
  const [tags, setTags] = useState<SuperTag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!programId) return;
    
    setLoading(true);
    setTimeout(() => {
        const p = getProgramById(programId, domainConfig.id, lang);
        if (p) {
            setProgram(p);
            setTags(generateProgramTags(p, domainConfig));
            const h = getHostById(p.hostId, domainConfig.id, lang);
            if (h) setHost(h);
        }
        setLoading(false);
    }, 400);
  }, [programId, domainConfig.id, lang]);

  return { program, host, tags, loading };
}
