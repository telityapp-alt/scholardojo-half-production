import { DomainConfig } from '../contracts/domainConfig';
import { GenericProgram, SuperTag, ProgramTier } from '../contracts/entityMap';

// ---------------------------------------------------------------------------
// SUPER TAG ENGINE
// Generates tags based on config, not hardcoded domain logic.
// ---------------------------------------------------------------------------

export function generateProgramTags(
  program: GenericProgram,
  domainConfig: DomainConfig
): SuperTag[] {
  const tags: SuperTag[] = [];
  
  // 1. TIER TAG
  tags.push({
    id: 'tier',
    label: domainConfig.programConfig.tierLabels[program.tier],
    variant: 'tier',
    color: getTierColor(program.tier),
    iconName: getTierIconName(program.tier)
  });
  
  // 2. URGENCY TAG
  const daysLeft = getDaysUntilDeadline(program.deadline);
  if (program.status === 'open') {
      if (daysLeft <= 3) {
        tags.push({
          id: 'urgent',
          label: daysLeft === 0 ? 'Closing Today' : 'Closing Soon',
          variant: 'urgency',
          color: 'bg-red-100 text-red-600 border-red-200',
          iconName: 'flame',
          animated: true
        });
      } else if (daysLeft <= 7) {
         tags.push({
          id: 'urgent_mod',
          label: `${daysLeft} days left`,
          variant: 'urgency',
          color: 'bg-orange-100 text-orange-600 border-orange-200',
          iconName: 'clock'
        });
      }
  }

  // 3. HIGH VALUE / AMOUNT TAG
  if (program.amount && program.amount > 0) {
    // Logic for "High Value" could be more complex or config driven
    // Here we assume if it exists, it's worth showing
    tags.push({
        id: 'value',
        label: `${domainConfig.programConfig.benefitTerms.amount}: ${program.amount}`,
        variant: 'perk',
        color: 'bg-emerald-100 text-emerald-600 border-emerald-200',
        iconName: 'dollar'
    });
  }

  // 4. PERK TAGS
  // Mapping standard perk keys to visual tags
  program.perks.forEach(perk => {
      if (perk === 'remote') {
        tags.push({ id: 'remote', label: 'Remote', variant: 'perk', color: 'bg-sky-100 text-sky-600 border-sky-200', iconName: 'wifi' });
      }
      if (perk === 'visa') {
        tags.push({ id: 'visa', label: 'Visa Support', variant: 'perk', color: 'bg-indigo-100 text-indigo-600 border-indigo-200', iconName: 'globe' });
      }
      if (perk === 'return_offer') {
        tags.push({ id: 'return', label: 'Return Offer', variant: 'perk', color: 'bg-amber-100 text-amber-600 border-amber-200', iconName: 'ticket' });
      }
      if (perk === 'certificate') {
        tags.push({ id: 'cert', label: 'Certificate', variant: 'perk', color: 'bg-purple-100 text-purple-600 border-purple-200', iconName: 'award' });
      }
      if (perk === 'mentorship') {
        tags.push({ id: 'mentor', label: 'Mentorship', variant: 'perk', color: 'bg-pink-100 text-pink-600 border-pink-200', iconName: 'users' });
      }
  });

  return tags;
}

// --- Helpers ---

function getDaysUntilDeadline(deadlineStr: string): number {
    const today = new Date();
    const deadline = new Date(deadlineStr);
    const diffTime = deadline.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
}

function getTierColor(tier: ProgramTier): string {
  switch (tier) {
    case 'mythic': return 'bg-amber-100 text-amber-700 border-amber-300';
    case 'rare': return 'bg-purple-100 text-purple-700 border-purple-300';
    case 'common': return 'bg-slate-100 text-slate-600 border-slate-300';
    default: return 'bg-slate-100 text-slate-600 border-slate-300';
  }
}

function getTierIconName(tier: ProgramTier): string {
  switch (tier) {
    case 'mythic': return 'crown';
    case 'rare': return 'star';
    case 'common': return 'circle';
    default: return 'circle';
  }
}
