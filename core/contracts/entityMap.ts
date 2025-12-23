
// Fix: Removed circular self-import and properly defined/exported all required domain entities.
export enum DomainType {
    STUDENT = 'student',
    INTERN = 'intern',
    SCHOLAR = 'scholar',
    DOCS = 'docs',
    COMPETITION = 'competition',
    RESEARCH = 'research',
}

export type ThemeColor = 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'gray' | 'slate' | 'sky' | 'indigo' | 'pink' | 'teal' | 'crimson';

export type ProgramTier = 'mythic' | 'rare' | 'common';

export interface NavigationItem {
    id: string;
    label: string;
    path: string;
    iconName: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
}

export interface SuperTag {
    id: string;
    label: string;
    variant: string;
    color: string;
    iconName: string;
    animated?: boolean;
}

export interface ProgramRequirement {
    id: string;
    label: string;
    type: string;
    mandatory: boolean;
}

export interface GenericProgram {
    id: string;
    domain: DomainType;
    hostId: string;
    hostName: string;
    title: string;
    description: string;
    fullDescription?: string;
    deadline: string;
    status: 'open' | 'closed' | 'coming_soon';
    tier: ProgramTier;
    progress: number;
    amount?: number;
    perks: string[];
    tags: string[];
    requirements: Record<string, any> | ProgramRequirement[];
    benefits: Record<string, any>;
    category: string;
    link: string;
    region?: string;
}

export interface HostStat {
    label: string;
    value: string | number;
    icon: string;
    color: string;
}

export interface HostDepartment {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    bg: string;
    border: string;
    degrees: string[];
    popularMajors?: string[];
}

export interface GenericHost {
    id: string;
    domain: DomainType;
    name: string;
    logoUrl: string;
    detailImage?: string;
    location?: string;
    overview?: string;
    acceptanceRate?: string;
    rank?: number;
    tags?: string[];
    stats?: HostStat[];
    departments?: HostDepartment[];
    gallery?: { image: string; title: string; tag: string }[];
    funding?: { name: string; amount: string; type: string }[];
}

export type EventCategory = 'Workshop' | 'Webinar' | 'Expo' | 'Coaching' | 'Seminar' | 'Competition';
export type EventLocationType = 'Virtual' | 'Physical' | 'Hybrid';

export interface GenericEvent {
    id: string;
    domain: DomainType;
    title: string;
    description: string;
    fullDescription?: string;
    date: string;
    time: string;
    durationMinutes: number;
    category: EventCategory;
    locationType: EventLocationType;
    locationAddress: string;
    link: string;
    organizer: string;
    image: string;
    price: number;
    tags: string[];
    attendees: number;
    region?: string;
}

export interface GenericVaultItem {
    id: string;
    domain: DomainType;
    programId?: string;
    hostId: string;
    
    title: string;
    hostName: string;
    description: string;
    category: string;
    
    matchScore: number;
    deadline: string;
    tier: ProgramTier;
    tags: string[];
    
    value: number;
    valueLabel: string;
    
    location: string;
    requirements: ProgramRequirement[];
    // Fix: Using any[] here to avoid circular dependency with TargetMilestone type in Target features
    roadmap?: any[]; 
    
    sourceUrl?: string;
    documentUrl?: string;
    region?: string;
}
