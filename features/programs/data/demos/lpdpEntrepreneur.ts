
import { UnifiedProgram } from '../types';
import { DomainType } from '../../../../core/contracts/entityMap';
import { LPDP_ENTREPRENEUR_INTEL } from './lpdpEntrepreneurship/intel';
import { LPDP_ENTREPRENEUR_KEYS } from './lpdpEntrepreneurship/keys';
import { LPDP_ENTREPRENEUR_NEWS } from './lpdpEntrepreneurship/news';

export const LPDP_ENTREPRENEUR_DATA: UnifiedProgram = {
    id: 'lpdp-entrepreneur-2025',
    domain: DomainType.SCHOLAR,
    title: 'LPDP Entrepreneurship Scholarship 2025',
    organizer: 'LPDP - Kementerian Keuangan RI',
    organizerLogo: 'https://lpdp.kemenkeu.go.id/storage/images/lpdp-logo.png',
    type: 'Entrepreneurship Grant (Elite)',
    level: 'Master (S2) Luar Negeri',
    country: 'Global (Selected Universities)',
    deadline: '2025-07-31T23:59:59Z',
    matchScore: 85,
    tier: 'rare',
    difficultyLevel: 'HARD',
    dojoRankRequired: 'Venture Architect Tier',
    senseiProtocolQuote: 'Anda tidak hanya membangun bisnis; Anda membangun ekosistem penggerak ekonomi bangsa.',
    arenaInstructions: 'Persiapkan mental pitching. Panelis akan bertindak seperti Venture Capitalist sekaligus Pejabat Publik.',
    
    dossierRequirementKeys: [
        'cv', 'ijazah', 'transkrip', 'lang_english', 'lor_academic', 'essay_contribution', 'business_plan', 'commitment_letter'
    ],

    intel: {
        ...LPDP_ENTREPRENEUR_INTEL,
        news: LPDP_ENTREPRENEUR_NEWS
    },
    shadowProtocol: LPDP_ENTREPRENEUR_KEYS,
    
    checklist: [
        { 
            id: 'business_plan', label: 'Business Plan (5-10 Pages)', estimate: '14-21 days', completed: false, 
            structure: ['Executive Summary', 'Market Analysis', 'The Founder (3C)', 'Marketing & Sales', 'Financial Projections'],
            proTip: "Gunakan visual data dan grafik yang tajam untuk memikat panelis praktisi."
        },
        { 
            id: 'commitment_letter', label: 'Educator Commitment Letter', estimate: '7 days', completed: false, 
            structure: ['Pernyataan Komitmen', 'Mengetahui Rektor/Dekan', 'Meterai 10000'],
            proTip: "Wajib mendapatkan restu dari institusi pendidikan lokal Anda."
        },
        { 
            id: 'lang_english', label: 'English Cert (IELTS 6.0 / iBT 61)', estimate: '30-60 days', completed: false, 
            structure: ['IELTS Minimal 6.0', 'PTE Academic 65', 'TOEFL iBT 61'],
            proTip: "Ambang batas lebih rendah dari jalur reguler, manfaatkan ini!"
        }
    ],
    curriculum: {
        id: 'lpdp-ent-academy',
        domain: DomainType.SCHOLAR,
        targetProgramId: 'lpdp-entrepreneur-2025',
        title: 'Entrepreneur Strike Academy',
        subtitle: 'The 2025 Blueprint for Future Venture Builders.',
        tier: 'rare',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000',
        author: 'Dojo Sensei',
        lastUpdated: 'Live Feed',
        totalUnits: 5,
        completedUnits: 0,
        tags: ['Entrepreneur', 'Business', 'Indonesia'],
        units: [
            {
                id: 'u1', order: 1, title: 'The 3C Foundation', description: 'Deep dive into Capability, Commitment, and Consistency.', color: 'orange',
                chapters: [
                    { id: 'u1-c1', title: 'The Founder Archetype', description: 'Mapping your strengths to the 3C protocol.', icon: 'User', unlocked: true, points: [
                        { id: 'u1p1', title: 'LOGIC', content: 'LPDP tidak hanya melihat ide bisnis, tapi siapa orang di baliknya.', type: 'LOGIC' }
                    ] }
                ]
            }
        ]
    },
    applyUrl: 'https://beasiswalpdp.kemenkeu.go.id/'
};
