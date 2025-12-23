
import { DomainType, SuperTag, GenericProgram } from '../contracts/entityMap';

/**
 * processSmartTags
 * Universal engine that takes raw AI-extracted data and generates 
 * visual SuperTags appropriate for the specific Dojo ecosystem.
 */
export const processSmartTags = (domain: DomainType, rawData: any): SuperTag[] => {
  const tags: SuperTag[] = [];
  const text = (rawData.title + " " + rawData.description + " " + (rawData.fullDescription || "")).toLowerCase();

  // 1. MEGA URGENCY LOGIC
  if (rawData.date || rawData.deadline) {
    const targetDate = new Date(rawData.date || rawData.deadline).getTime();
    const days = Math.ceil((targetDate - Date.now()) / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      tags.push({
        id: 'ulti-today', label: 'CLOSING TODAY', variant: 'urgency',
        color: 'bg-red-500 text-white border-red-700 shadow-red-200 shadow-lg',
        iconName: 'flame', animated: true
      });
    } else if (days > 0 && days <= 3) {
      tags.push({
        id: 'ulti-urgent', label: `${days}D Left`, variant: 'urgency',
        color: 'bg-orange-100 text-orange-600 border-orange-200',
        iconName: 'clock'
      });
    } else if (days < 0) {
        tags.push({
            id: 'ulti-closed', label: 'Archived', variant: 'urgency',
            color: 'bg-slate-200 text-slate-400 border-slate-300',
            iconName: 'circle'
        });
    }
  }

  // 2. MEGA PRESTIGE & QUALITY LOGIC
  if (text.includes('google') || text.includes('microsoft') || text.includes('harvard') || text.includes('mit') || text.includes('fortune 500')) {
    tags.push({
        id: 'ulti-prestige', label: 'ELITE SCOUT', variant: 'PRESTIGE',
        color: 'bg-indigo-600 text-white border-indigo-800 shadow-indigo-200 shadow-lg',
        iconName: 'crown', animated: true
    });
  }

  // 3. ECOSYSTEM PERKS LOGIC
  if (text.includes('remote') || text.includes('virtual') || text.includes('online')) {
    tags.push({ id: 'ulti-remote', label: 'Global Access', variant: 'perk', color: 'bg-sky-100 text-sky-600 border-sky-200', iconName: 'wifi' });
  }
  
  if (text.includes('certificate') || text.includes('certified')) {
    tags.push({ id: 'ulti-cert', label: 'Official Cert', variant: 'perk', color: 'bg-purple-100 text-purple-600 border-purple-200', iconName: 'award' });
  }

  if (text.includes('unpaid') || text.includes('volunteer')) {
      tags.push({ id: 'ulti-xp', label: 'XP Focus', variant: 'type', color: 'bg-emerald-100 text-emerald-600 border-emerald-200', iconName: 'star' });
  }

  // 4. DOMAIN SPECIFIC "ULTI" REASONING
  switch(domain) {
    case DomainType.STUDENT:
      if (rawData.price === 0 || text.includes('free')) {
        tags.push({ id: 'st-scholar', label: 'No Entry Fee', variant: 'perk', color: 'bg-green-100 text-green-600 border-green-200', iconName: 'ticket' });
      }
      if (text.includes('hackathon') || text.includes('contest')) {
          tags.push({ id: 'st-arena', label: 'Arena Mode', variant: 'type', color: 'bg-red-100 text-red-500 border-red-200', iconName: 'flame' });
      }
      break;

    case DomainType.INTERN:
      if (rawData.price > 0 || text.includes('stipend') || text.includes('paid')) {
        tags.push({ id: 'in-paid', label: 'Paid Role', variant: 'perk', color: 'bg-blue-100 text-blue-600 border-blue-200', iconName: 'dollar' });
      }
      if (text.includes('hiring') || text.includes('job offer')) {
          tags.push({ id: 'in-career', label: 'Direct Pipeline', variant: 'PRESTIGE', color: 'bg-amber-100 text-amber-700 border-amber-300', iconName: 'crown' });
      }
      break;

    case DomainType.SCHOLAR:
      if (text.includes('fully funded') || text.includes('full ride')) {
          tags.push({ id: 'sc-full', label: 'Zero Cost', variant: 'PRESTIGE', color: 'bg-purple-600 text-white border-purple-800', iconName: 'crown', animated: true });
      }
      tags.push({ id: 'sc-research', label: 'Academic Asset', variant: 'type', color: 'bg-slate-100 text-slate-500 border-slate-200', iconName: 'award' });
      break;
  }

  // 5. AI SUGGESTED TAGS (CLEANUP)
  if (rawData.aiSuggestedTags && Array.isArray(rawData.aiSuggestedTags)) {
    rawData.aiSuggestedTags.slice(0, 2).forEach((t, i) => {
      if (tags.length < 5) { // Limit to avoid clutter
        tags.push({
            id: `ai-gen-${i}`, label: t, variant: 'type',
            color: 'bg-slate-100 text-slate-500 border-slate-200',
            iconName: 'circle'
        });
      }
    });
  }

  return tags;
};
