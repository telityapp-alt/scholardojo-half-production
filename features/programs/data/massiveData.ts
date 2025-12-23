
import { UnifiedProgram } from '../types';
import { GATES_CAMBRIDGE_DATA } from './demos/gatesCambridge';
import { LPDP_REGULER_DATA } from './demos/lpdpReguler';
import { LPDP_ENTREPRENEUR_DATA } from './demos/lpdpEntrepreneur';

// THE POOL: Central registry of all missions.
// Strictly contains only verified elite targets.
export const MASSIVE_PROGRAMS_POOL: UnifiedProgram[] = [
    LPDP_REGULER_DATA,
    GATES_CAMBRIDGE_DATA,
    LPDP_ENTREPRENEUR_DATA
];
