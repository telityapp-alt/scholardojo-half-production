
import { UnifiedProgram } from '../../features/programs/types';
import { ProfileAccess } from '../access/profileAccess';

export const MatchEngine = {
    calculateScore: (program: UnifiedProgram, domain: string): number => {
        const dna = ProfileAccess.getDNA(domain as any);
        let score = 40; // Conservative baseline

        // Defensive extraction
        const s = dna.scores;
        const tech = Number(s.technical) || 0;
        const lead = Number(s.leadership) || 0;
        const impact = Number(s.impact) || 0;
        const fit = Number(s.fit) || 0;

        // 1. Title/Tag Matching
        const context = (program.title + " " + (program.intel?.highlights?.join(" ") || "")).toLowerCase();
        
        if (context.includes('tech') || context.includes('engineer') || context.includes('ai')) {
            score += (tech / 100) * 40;
        } else {
            score += (lead / 100) * 20;
        }

        // 2. Fit Multiplier
        score += (fit / 100) * 15;
        
        // 3. Impact Multiplier for Mythic
        if (program.tier === 'mythic') {
            score += (impact / 100) * 15;
        }

        const final = Math.min(99, Math.round(score));
        return isNaN(final) ? 50 : final;
    }
};
