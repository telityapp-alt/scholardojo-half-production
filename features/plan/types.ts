import { GenericEvent, GenericProgram, GenericVaultItem } from '../../core/contracts/entityMap';
import { QuestCard } from '../quest/types';

export type CalendarItemType = 'EVENT' | 'DEADLINE' | 'PROGRAM' | 'QUEST';

export interface CalendarItem {
    id: string;
    date: Date;
    type: CalendarItemType;
    title: string;
    subtitle?: string; // Host name or Quest count
    metadata: {
        originalData: GenericEvent | GenericProgram | GenericVaultItem | QuestCard;
        color: 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'sky';
        icon: string; // Lucide icon name
        status?: string; // 'Open', 'High Priority', etc.
    }
}