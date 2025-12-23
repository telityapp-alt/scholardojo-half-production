
import { GenericProgram } from '../contracts/entityMap';
import { UnifiedProgramService } from '../../features/programs/services/unifiedProgramService';
import { DossierService } from '../../features/target/services/dossierService';
import { getQuestsByDomain, deleteQuest } from './questAccess';

export const MissionOrchestrator = {
    /**
     * Secures a target mission and initializes the unified ledger.
     */
    secureTarget: (program: GenericProgram): boolean => {
        try {
            const status = UnifiedProgramService.toggleSecure(program.id);
            
            if (status) {
                // Initialize the UNIFIED LEDGER (The Single Source of Truth)
                DossierService.syncMission(program);
                
                console.log(`%c[Orchestrator] Mission Ledger ${program.id} Forged.`, "color: #1cb0f6; font-weight: bold;");
            } else {
                console.warn(`[Orchestrator] Mission Ledger ${program.id} Terminated.`);
                
                // Cleanup relational dependencies
                localStorage.removeItem(`dojo_mission_ledger_v1_${program.id}`);
                
                const quests = getQuestsByDomain(program.domain);
                quests.filter(q => q.id.includes(program.id)).forEach(q => deleteQuest(q.id));
            }

            window.dispatchEvent(new Event('storage'));
            return status;
        } catch (e) {
            console.error("[Orchestrator] Integrity breach", e);
            return false;
        }
    }
};
