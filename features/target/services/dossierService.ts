import { SafeAccess } from '../../../core/access/baseAccess';
import { DomainType } from '../../../core/contracts/entityMap';
import { UnifiedProgramService } from '../../programs/services/unifiedProgramService';

export interface MasterChecklistItem {
    id: string;
    label: string;
    status: 'MISSING' | 'COMPLETED' | 'AI_VERIFIED';
    type: 'DOC' | 'ESSAY' | 'TASK' | 'FIELD';
    mandatory: boolean;
    category?: string;
    content?: string;
    score?: number;
}

export interface CampaignLedger {
    targetId: string;
    domain: DomainType;
    title: string;
    progress: number;
    lastStrike: number;
    requirements: MasterChecklistItem[];
    stats: {
        gpa: string;
        major: string;
    };
}

// Fix: Export CampaignDossier interface to resolve missing member error in widgets
export interface CampaignDossier extends CampaignLedger {
    categories: { id: string; title: string; items: MasterChecklistItem[] }[];
    gpa?: string;
    major?: string;
}

const LEDGER_KEY_PREFIX = 'dojo_mission_ledger_v1_';

export const DossierService = {
    /**
     * getLedger - The "Master-Instance" Merger
     * It pulls the Static Blueprint from ProgramService and merges it with User Progress.
     */
    getLedger: (targetId: string): CampaignLedger | null => {
        // 1. Get Static Master Data (The "Blueprint")
        const program = UnifiedProgramService.getById(targetId);
        if (!program) return null;

        // 2. Get Dynamic User Data (The "Progress")
        const userProgress = SafeAccess.pull<any>(`${LEDGER_KEY_PREFIX}${targetId}`, null);

        // 3. MERGE LOGIC: Combine labels from Blueprint with status from UserProgress
        // This ensures that even if we change the "Hardcoded" text, user progress stays.
        const mergedRequirements: MasterChecklistItem[] = (program.intel?.officialDocumentList || []).map((doc: any) => {
            const userState = userProgress?.requirements?.find((r: any) => r.id === doc.id);
            return {
                id: doc.id,
                label: doc.name, // Static text from Hardcode
                type: doc.isUpload ? 'DOC' : 'FIELD',
                mandatory: true,
                category: 'Official Requirements',
                // Persistence from User Progress
                status: userState?.status || 'MISSING',
                content: userState?.content || '',
                score: userState?.score || 0
            };
        });

        return {
            targetId: program.id,
            domain: program.domain,
            title: program.title,
            progress: DossierService.calculateProgress(mergedRequirements),
            lastStrike: userProgress?.lastStrike || Date.now(),
            requirements: mergedRequirements,
            stats: userProgress?.stats || { gpa: '', major: '' }
        };
    },

    // Fix: Added syncMission to initialize the mission ledger when securing a target
    syncMission: (program: any) => {
        const ledger = DossierService.getLedger(program.id);
        if (ledger) {
            DossierService.saveLedger(ledger);
        }
    },

    // Fix: Added createInitial as a fallback method requested by UI components
    createInitial: (targetId: string): CampaignDossier | null => {
        return DossierService.getForTarget(targetId);
    },

    calculateProgress: (reqs: MasterChecklistItem[]) => {
        const mandatory = reqs.filter(r => r.mandatory);
        if (mandatory.length === 0) return 0;
        const completed = mandatory.filter(r => r.status === 'COMPLETED' || r.status === 'AI_VERIFIED').length;
        return Math.round((completed / mandatory.length) * 100);
    },

    saveLedger: (ledger: CampaignLedger) => {
        // Only save the dynamic parts to minimize storage footprint (Supabase ready)
        const progressSnapshot = {
            lastStrike: Date.now(),
            stats: ledger.stats,
            requirements: ledger.requirements.map(r => ({
                id: r.id,
                status: r.status,
                content: r.content,
                score: r.score
            }))
        };
        
        SafeAccess.save(`${LEDGER_KEY_PREFIX}${ledger.targetId}`, progressSnapshot);
        window.dispatchEvent(new Event('storage'));
    },

    toggleItem: (targetId: string, itemId: string) => {
        const ledger = DossierService.getLedger(targetId);
        if (!ledger) return;
        
        ledger.requirements = ledger.requirements.map(r => 
            r.id === itemId ? { ...r, status: r.status === 'COMPLETED' ? 'MISSING' : 'COMPLETED' } as MasterChecklistItem : r
        );
        
        DossierService.saveLedger(ledger);
    },

    saveForTarget: (targetId: string, updates: { gpa?: string, major?: string }) => {
        const ledger = DossierService.getLedger(targetId);
        if (!ledger) return;
        ledger.stats = { ...ledger.stats, ...updates };
        DossierService.saveLedger(ledger);
    },

    getItem: (targetId: string, itemId: string): MasterChecklistItem | undefined => {
        const ledger = DossierService.getLedger(targetId);
        return ledger?.requirements.find(r => r.id === itemId);
    },

    getForTarget: (targetId: string): CampaignDossier | null => {
        const ledger = DossierService.getLedger(targetId);
        if (!ledger) return null;

        // Grouping for UI
        const categoriesMap: Record<string, MasterChecklistItem[]> = {};
        ledger.requirements.forEach(r => {
            const cat = r.category || 'General';
            if (!categoriesMap[cat]) categoriesMap[cat] = [];
            categoriesMap[cat].push(r);
        });

        const categories = Object.entries(categoriesMap).map(([title, items]) => ({
            id: title.toLowerCase().replace(/\s+/g, '-'),
            title,
            items
        }));

        // Fix: Explicitly return CampaignDossier with flattened stats for UI components
        return { 
            ...ledger, 
            categories,
            gpa: ledger.stats.gpa,
            major: ledger.stats.major
        };
    }
};