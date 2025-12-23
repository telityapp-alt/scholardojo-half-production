import React from 'react';
import { EventFilterState } from '../types';
import { Monitor, Ticket, Layers } from 'lucide-react';
import { SuperDropdown } from '../../../components/ui/SuperDropdown';

interface EventFilterProps {
    filters: EventFilterState;
    onChange: (newFilters: EventFilterState) => void;
}

const EVENT_FORMATS = [
    { id: 'ALL', label: 'All Formats' },
    { id: 'Virtual', label: 'Virtual' },
    { id: 'Physical', label: 'In-Person' },
    { id: 'Hybrid', label: 'Hybrid' }
];

const EVENT_COSTS = [
    { id: 'ALL', label: 'Any Price' },
    { id: 'Free', label: 'Free Only' },
    { id: 'Paid', label: 'Paid Only' }
];

const EVENT_CATEGORIES = [
    { id: 'ALL', label: 'All Categories' },
    { id: 'Workshop', label: 'Workshop' },
    { id: 'Webinar', label: 'Webinar' },
    { id: 'Expo', label: 'Expo' },
    { id: 'Competition', label: 'Competition' },
    { id: 'Seminar', label: 'Seminar' },
    { id: 'Coaching', label: 'Coaching' }
];

export const EventFilter: React.FC<EventFilterProps> = ({ filters, onChange }) => {
    
    const update = (key: keyof EventFilterState, val: string) => {
        onChange({ ...filters, [key]: val });
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <SuperDropdown 
                label="Location Format" 
                icon={Monitor}
                options={EVENT_FORMATS}
                value={filters.format}
                onChange={(val) => update('format', val as any)}
                color="blue"
            />
            <SuperDropdown 
                label="Entry Cost" 
                icon={Ticket}
                options={EVENT_COSTS}
                value={filters.cost}
                onChange={(val) => update('cost', val as any)}
                color="green"
            />
            <SuperDropdown 
                label="Event Category" 
                icon={Layers}
                options={EVENT_CATEGORIES}
                value={filters.category}
                onChange={(val) => update('category', val as any)}
                color="purple"
            />
        </div>
    );
};