
import { DomainType, GenericProgram, GenericHost, GenericEvent, GenericVaultItem } from '../contracts/entityMap';

// Helper to generate a standard functional roadmap for any target
const generateMasterRoadmap = (domain: DomainType, host: string, title: string): any[] => [
    { 
        id: 'm-id', title: 'Identity Scan', icon: 'Fingerprint', status: 'AVAILABLE', type: 'IDENTITY',
        desc: `Synchronize your ${domain} foundation with ${host} requirements.`,
        linkPath: `/${domain}/workspace/profile`
    },
    { 
        id: 'm-skill', title: 'Dojo Training', icon: 'BookOpen', status: 'LOCKED', type: 'SKILL',
        desc: `Master the curriculum required for ${title}.`,
        linkPath: `/${domain}/skillspace/curriculum`
    },
    { 
        id: 'm-specs', title: 'Asset Check', icon: 'FileCheck', status: 'LOCKED', type: 'ADMISSION',
        desc: `Verify all mandatory documents and essays.`,
        linkPath: `/${domain}/workspace/admission`
    },
    { 
        id: 'm-battle', title: 'Arena Battle', icon: 'Swords', status: 'LOCKED', type: 'ARENA',
        desc: `Defeat the ${host} interview boss simulation.`,
        linkPath: `/${domain}/skillspace/arena`
    },
    { 
        id: 'm-final', title: 'Final Strike', icon: 'Target', status: 'LOCKED', type: 'SUBMIT',
        desc: `Deploy your final application to the ${host} portal.`,
        linkPath: '#'
    }
];

export const MOCK_VAULT_ITEMS: (GenericVaultItem & { region: string })[] = [
    {
        id: 'v_id_1',
        domain: DomainType.STUDENT,
        region: 'id',
        programId: 'id_comp_1',
        hostId: 'h_id_univ',
        title: 'Backend Engineering Track (Nasional)',
        hostName: 'UI / Ristek',
        description: 'Jalur pengembangan backend untuk peserta Hackathon Nasional.',
        category: 'Engineering',
        matchScore: 95,
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        tier: 'mythic',
        tags: ['NodeJS', 'Database'],
        value: 50,
        valueLabel: 'Winner Prize',
        location: 'Indonesia',
        requirements: [
            { id: 'r1', label: 'GitHub Repository', type: 'task', mandatory: true },
            { id: 'r2', label: 'Technical Specs', type: 'document', mandatory: true }
        ],
        roadmap: generateMasterRoadmap(DomainType.STUDENT, 'UI / Ristek', 'Backend Track')
    }
];

export const MOCK_HOSTS: GenericHost[] = [
    {
        id: 'h_code',
        domain: DomainType.STUDENT,
        name: 'Code Academy',
        logoUrl: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
        detailImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940',
        location: 'Online',
        overview: 'Premier online coding academy.',
        acceptanceRate: '15%',
        rank: 1,
        tags: ['Education', 'Tech'],
        stats: [{ label: 'Students', value: '50k+', icon: 'Users', color: 'blue' }],
        departments: [
            { id: 'd1', name: 'Software Engineering', description: 'Web & Mobile Dev', icon: 'Cpu', color: 'text-sky-500', bg: 'bg-sky-50', border: 'border-sky-100', degrees: ['Professional Cert'] }
        ]
    },
    {
        id: 'h_tech',
        domain: DomainType.INTERN,
        name: 'TechCorp Inc.',
        logoUrl: 'https://cdn-icons-png.flaticon.com/512/281/281764.png',
        location: 'San Francisco, USA',
        overview: 'Global tech leader.',
        acceptanceRate: '2%',
        rank: 5,
        tags: ['Fortune 500', 'Innovator']
    },
    {
        id: 'h_earth',
        domain: DomainType.SCHOLAR,
        name: 'Earth Institute',
        logoUrl: 'https://cdn-icons-png.flaticon.com/512/2921/2921251.png',
        location: 'Stockholm, Sweden',
        overview: 'Climate research hub.',
        acceptanceRate: '5%',
        rank: 12,
        tags: ['Research', 'Climate']
    }
];

export const MOCK_PROGRAMS: (GenericProgram & { region: string })[] = [
    {
        id: 's1',
        domain: DomainType.STUDENT,
        region: 'global',
        hostId: 'h_code',
        hostName: 'Code Academy',
        title: 'Advanced Python Mastery',
        description: 'Intensive backend bootcamp.',
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'open',
        tier: 'rare',
        progress: 0,
        perks: ['mentorship', 'certificate'],
        tags: ['Python', 'Backend'],
        requirements: {},
        benefits: {},
        category: 'Course',
        link: '#'
    },
    {
        id: 'i1',
        domain: DomainType.INTERN,
        region: 'global',
        hostId: 'h_tech',
        hostName: 'TechCorp Inc.',
        title: 'Frontend Engineer Intern',
        description: 'Work with core product teams.',
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'open',
        tier: 'mythic',
        progress: 0,
        perks: ['remote'],
        tags: ['React', 'Internship'],
        requirements: {},
        benefits: {},
        category: 'Internship',
        link: '#'
    }
];

export const MOCK_EVENTS: (GenericEvent & { region: string })[] = [
    {
        id: 'e1',
        domain: DomainType.STUDENT,
        region: 'global',
        title: 'Winning Essay Masterclass',
        description: 'Learn to write winning scholarship essays.',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        time: '10:00 AM',
        durationMinutes: 60,
        category: 'Workshop',
        locationType: 'Virtual',
        locationAddress: 'Zoom',
        link: '#',
        organizer: 'Code Academy',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940',
        price: 0,
        tags: ['Strategy', 'Writing'],
        attendees: 150
    }
];
