import { useState, useEffect } from 'react';
import { GenericEvent } from '../../../core/contracts/entityMap';
import { DomainConfig } from '../../../core/contracts/domainConfig';
import { getEventsByDomain, getEventById } from '../../../core/access/eventAccess';
import { EventFilterState, INITIAL_FILTERS } from '../types';

export function useEventLogic(domainConfig: DomainConfig) {
  const [events, setEvents] = useState<GenericEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<EventFilterState>(INITIAL_FILTERS);

  const fetchEvents = () => {
    setLoading(true);
    // Simulate API Delay
    setTimeout(() => {
        const rawEvents = getEventsByDomain(domainConfig.id);
        setEvents(rawEvents);
        setLoading(false);
    }, 600);
  };

  useEffect(() => {
    fetchEvents();
  }, [domainConfig.id]);

  // Client-side filtering
  const filteredEvents = events.filter(event => {
      // 1. Format Filter
      if (filters.format !== 'ALL' && event.locationType !== filters.format) return false;
      
      // 2. Cost Filter
      if (filters.cost === 'Free' && event.price > 0) return false;
      if (filters.cost === 'Paid' && event.price === 0) return false;

      // 3. Category Filter
      if (filters.category !== 'ALL' && event.category !== filters.category) return false;

      return true;
  });

  return { events: filteredEvents, loading, filters, setFilters, refresh: fetchEvents };
}

// NEW: Hook for Single Event Detail
export function useEventDetail(eventId: string | undefined, domainConfig: DomainConfig) {
    const [event, setEvent] = useState<GenericEvent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!eventId) return;
        setLoading(true);
        setTimeout(() => {
            const data = getEventById(eventId);
            // In a real app, verify domain match here
            setEvent(data);
            setLoading(false);
        }, 500);
    }, [eventId, domainConfig.id]);

    return { event, loading };
}