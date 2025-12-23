import { EventCategory, EventLocationType } from '../../core/contracts/entityMap';

export interface EventFilterState {
    format: 'ALL' | EventLocationType;
    cost: 'ALL' | 'Free' | 'Paid';
    category: 'ALL' | EventCategory;
}

export const INITIAL_FILTERS: EventFilterState = {
    format: 'ALL',
    cost: 'ALL',
    category: 'ALL'
};
