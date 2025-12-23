
import { DomainType } from '../../../core/contracts/entityMap';
import { TargetAnalysis } from '../types';
import { getVaultItemById } from '../../../core/access/vaultAccess';
import { UnifiedProgramService } from '../../programs/services/unifiedProgramService';
import { DossierService } from './dossierService';
import { ProfileAccess } from '../../../core/access/profileAccess';

export const TargetService = {
    analyzeTarget: async (id: string, domain: DomainType): Promise<TargetAnalysis | null> => {
        const ledger = DossierService.getLedger(id);
        const vaultItem = getVaultItemById(id, domain);
        const staticProgram = UnifiedProgramService.getById(id);
        const dna = ProfileAccess.getDNA(domain);
        
        if (!ledger && !vaultItem && !staticProgram) return null;

        const programData = staticProgram || (vaultItem as any);
        
        // 1. TACTICAL WEIGHTS
        const weights = programData.intel?.weights || { academic: 40, assets: 40, matrix: 20 };

        // 2. ACADEMIC SIGNAL (From Central DNA)
        const userGpa = dna.currentGpa;
        const minGpa = programData.intel?.stats?.minGpa || 3.0;
        
        let academicScore = (userGpa / dna.maxGpa) * 100;
        
        // CRITICAL: Penalty if below threshold
        if (userGpa < minGpa) {
            academicScore *= 0.3; // Brutal penalty
        }

        // 3. ASSET SYNERGY (Real progress in Dossier)
        const requirements = ledger?.requirements || [];
        const completedCount = requirements.filter(r => r.status === 'COMPLETED' || r.status === 'AI_VERIFIED').length;
        const totalCount = requirements.length || 1;
        const assetScore = (completedCount / totalCount) * 100;

        // 4. DNA MATRIX POWER (Average of core stats)
        const matrixScores = dna.scores;
        const avgMatrix = (
            matrixScores.technical + 
            matrixScores.leadership + 
            matrixScores.resilience + 
            matrixScores.fit + 
            matrixScores.impact
        ) / 5;

        // 5. HUMBLE WEIGHTED COMPUTATION
        // Use a conservative multiplier (0.85) to prevent over-optimism as requested
        const totalWeight = weights.academic + weights.assets + weights.matrix;
        const rawWeighted = ((academicScore * weights.academic) + (assetScore * weights.assets) + (avgMatrix * weights.matrix)) / totalWeight;
        
        // Final probability logic: Cap at 88% to keep users humble/motivated
        const finalProb = Math.max(5, Math.min(88, Math.round(rawWeighted * 0.85)));

        return {
            scholarship: {
                id: programData.id,
                name: programData.title,
                organization: programData.organizer || programData.hostName,
                deadline: programData.deadline,
                category: programData.type || programData.category,
                minGpa: minGpa
            },
            competition: {
                totalApplicants: programData.intel?.stats?.totalApplicants || 10000,
                userRank: 1, 
                percentile: Math.max(1, 100 - finalProb),
                ratioString: programData.intel?.stats?.selectivityRatio || "Competitive",
                standingLabel: finalProb > 75 ? 'Elite Candidate' : finalProb > 40 ? 'Strong Contender' : 'Rising Ninja'
            },
            prediction: {
                score: finalProb,
                confidence: 'High',
                breakdown: {
                    academicBoost: Math.round((academicScore * weights.academic) / totalWeight * 0.85),
                    assetBoost: Math.round((assetScore * weights.assets) / totalWeight * 0.85),
                    matrixBoost: Math.round((avgMatrix * weights.matrix) / totalWeight * 0.85),
                    difficultyPenalty: programData.difficultyLevel === 'HARD' ? -10 : programData.difficultyLevel === 'DIFFICULT' ? -15 : 0
                }
            },
            // Fix: removed 'PENDING' comparison as it does not exist in the MasterChecklistItem status type
            missionStream: { stats: { nextMilestone: ledger?.requirements.find(r => r.status === 'MISSING')?.label || 'Verify Dossier' } },
            roadmap: [],
            admissionApp: ledger as any
        };
    }
};
