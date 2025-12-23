import { DomainType, GenericEvent } from '../contracts/entityMap';
import { MOCK_EVENTS } from './mockData';

// ---------------------------------------------------------------------------
// EVENT DATA ACCESS
// ---------------------------------------------------------------------------

/**
 * Internal helper to get active region from storage.
 */
const getActiveRegion = () => localStorage.getItem('dojo_region') || 'global';

export const getEventsByDomain = (domain: DomainType): GenericEvent[] => {
  if (!Object.values(DomainType).includes(domain)) return [];
  const region = getActiveRegion();
  // Filter by domain and region (allow global items) to ensure data isolation
  return MOCK_EVENTS.filter(e => e.domain === domain && (e.region === region || e.region === 'global'));
};

export const getEventById = (id: string): GenericEvent | null => {
  const region = getActiveRegion();
  const event = MOCK_EVENTS.find(e => e.id === id) || null;
  // Security check: ensure the event belongs to the active region or is global
  if (event && event.region !== region && event.region !== 'global') return null;
  return event;
};

export const createEventMock = (event: GenericEvent): GenericEvent => {
    const region = getActiveRegion();
    // Fix: Ensure the event object matches the expected type in MOCK_EVENTS (GenericEvent & { region: string }) 
    // by adding the required region property.
    const eventWithRegion = { ...event, region } as (GenericEvent & { region: string });
    MOCK_EVENTS.push(eventWithRegion);
    return event;
};