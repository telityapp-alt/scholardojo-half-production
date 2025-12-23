
import { DomainType, GenericProgram, GenericHost } from '../contracts/entityMap';
import { MOCK_PROGRAMS, MOCK_HOSTS } from './mockData';
import { ID_CONTENT } from '../contracts/dataLocalization';
import { ForgeService } from '../../features/forge/services/forgeService';

const getActiveRegion = () => localStorage.getItem('dojo_region') || 'global';

/**
 * Deep merge helper for localization
 */
const deepMerge = (base: any, override: any) => {
    if (!override) return base;
    const result = { ...base };
    for (const key in override) {
        if (override[key] instanceof Object && !Array.isArray(override[key]) && base[key]) {
            result[key] = deepMerge(base[key], override[key]);
        } else {
            result[key] = override[key];
        }
    }
    return result;
};

export const getProgramsByDomain = (domain: DomainType, lang: string = 'en'): GenericProgram[] => {
  const region = getActiveRegion();
  
  const base = JSON.parse(JSON.stringify(
      MOCK_PROGRAMS.filter(p => p.domain === domain && (p.region === region || p.region === 'global'))
  ));

  const forgeData = ForgeService.getFlattenedPrograms(domain);
  const combined = [...forgeData, ...base];
  
  if (lang === 'id') {
      return combined.map((p: any) => {
          const trans = ID_CONTENT.programs.find(t => t.id === p.id);
          if (!trans) return p;

          return { 
            ...p, 
            title: trans.title || p.title,
            description: trans.description || p.description, 
            hostName: trans.hostName || p.hostName,
            // Deep Merge for Nested Objects (Intel, ShadowProtocol)
            intel: trans.intel ? deepMerge(p.intel || {}, trans.intel) : p.intel,
            shadowProtocol: trans.shadowProtocol ? deepMerge(p.shadowProtocol || {}, trans.shadowProtocol) : p.shadowProtocol,
            requirements: trans.requirements || p.requirements,
            benefits: trans.benefits || p.benefits
          };
      });
  }
  return combined;
};

export const getProgramById = (id: string, domain: DomainType, lang: string = 'en'): any | null => {
  const region = getActiveRegion();
  
  // Check Forge first
  const fromForge = ForgeService.getById(id);
  let program: any = null;

  if (fromForge) {
      program = {
          id: fromForge.id,
          domain: fromForge.domain,
          hostId: fromForge.id,
          hostName: fromForge.organizer,
          title: fromForge.title,
          description: fromForge.intel.description,
          deadline: fromForge.deadline,
          status: 'open',
          tier: fromForge.tier,
          intel: fromForge.intel,
          shadowProtocol: fromForge.shadowProtocol,
          progress: 0,
          perks: fromForge.intel.highlights,
          tags: fromForge.intel.stats?.targetKeywords || [],
          requirements: fromForge.checklist,
          benefits: fromForge.intel.funding,
          category: fromForge.type,
          link: fromForge.applyUrl,
          curriculum: fromForge.curriculum,
          checklist: fromForge.checklist
      };
  } else {
      program = JSON.parse(JSON.stringify(MOCK_PROGRAMS.find(p => p.id === id) || null));
  }
  
  if (!program || program.domain !== domain) return null;
  
  if (lang === 'id') {
      const trans = ID_CONTENT.programs.find(t => t.id === id) || (ID_CONTENT as any).community?.find((t: any) => t.id === id);
      if (trans) {
          return { 
            ...program, 
            title: trans.title || program.title,
            description: trans.description || program.description, 
            hostName: trans.hostName || program.hostName,
            // Deep Merge for Detail Views
            intel: trans.intel ? deepMerge(program.intel || {}, trans.intel) : program.intel,
            shadowProtocol: trans.shadowProtocol ? deepMerge(program.shadowProtocol || {}, trans.shadowProtocol) : program.shadowProtocol,
            requirements: trans.requirements || program.requirements,
            benefits: trans.benefits || program.benefits
          };
      }
  }
  return program;
};

export const getProgramsByHostId = (hostId: string, domain: DomainType, lang: string = 'en'): GenericProgram[] => {
    return getProgramsByDomain(domain, lang).filter(p => p.hostId === hostId);
};

export const getHostById = (id: string, domain: DomainType, lang: string = 'en'): GenericHost | null => {
  const allForge = ForgeService.getAll();
  const forgeMaster = allForge.find(p => p.id === id);
  
  if (forgeMaster) {
      return {
          id: forgeMaster.id,
          domain: forgeMaster.domain,
          name: forgeMaster.organizer,
          logoUrl: forgeMaster.organizerLogo,
          overview: forgeMaster.intel.description,
          location: forgeMaster.country,
          tags: forgeMaster.intel.stats?.targetKeywords || []
      };
  }

  const host = JSON.parse(JSON.stringify(MOCK_HOSTS.find(h => h.id === id) || null));
  if (!host || host.domain !== domain) return null;

  if (lang === 'id') {
      const trans = ID_CONTENT.hosts.find(t => t.id === id);
      if (trans) return { 
        ...host, 
        name: trans.name, 
        location: trans.location, 
        overview: trans.overview 
      };
  }
  return host;
};
