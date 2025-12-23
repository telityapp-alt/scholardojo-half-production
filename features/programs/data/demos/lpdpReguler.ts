
import { UnifiedProgram } from '../types';
import { DomainType } from '../../../../core/contracts/entityMap';
import { LPDP_INTEL } from './lpdpReguler/intel';
import { LPDP_KEYS } from './lpdpReguler/keys';
import { LPDP_NEWS } from './lpdpReguler/news';

export const LPDP_REGULER_DATA: UnifiedProgram = {
    id: 'lpdp-reguler-2026',
    domain: DomainType.SCHOLAR,
    title: 'LPDP Regular Scholarship 2025-2026',
    organizer: 'LPDP - Kementerian Keuangan RI',
    organizerLogo: 'https://lpdp.kemenkeu.go.id/storage/images/lpdp-logo.png',
    type: 'Full Government Grant (Elite)',
    level: 'Master / PhD',
    country: 'Global & Indonesia',
    deadline: '2026-02-15T23:59:59Z',
    matchScore: 88,
    tier: 'mythic',
    difficultyLevel: 'DIFFICULT',
    dojoRankRequired: 'National Patriot Tier',
    senseiProtocolQuote: 'Negara tidak hanya membelikan Anda gelar; negara berinvestasi pada solusi untuk bangsa.',
    arenaInstructions: 'Substansi Interview adalah gauntlet 3-lawan-1. Siapkan jawaban roadmap kontribusi yang sangat tajam.',
    
    dossierRequirementKeys: [
        'cv', 'ijazah', 'transkrip', 'lang_english', 'lor_academic', 'essay_contribution', 'loa'
    ],

    intel: {
        ...LPDP_INTEL,
        news: LPDP_NEWS
    },
    shadowProtocol: LPDP_KEYS,
    
    checklist: [
        { 
            id: 'essay_contribution', label: 'Contribution Essay (1.5k-2k words)', estimate: '7-14 days', completed: false, 
            structure: ['Hook (Data/Masalah)', 'Background Journey', 'Study Plan Alignment', 'Contribution Phases (Short/Mid/Long)', 'Impact Metrics'],
            proTip: "Gunakan struktur Patriot-Builder-Measurer."
        },
        { 
            id: 'lang_english', label: 'English Certification (IELTS/iBT)', estimate: '30-90 days', completed: false, 
            structure: ['S2 Overseas: 6.5 / 80', 'S3 Overseas: 7.0 / 94', 'Dalam Negeri: ITP 500-530'],
            proTip: "Ambil tes 2-3 bulan sebelum pendaftaran."
        },
        { 
            id: 'lor_academic', label: 'Recommendation Letters', estimate: '14-21 days', completed: false, 
            structure: ['Akademisi / Tokoh Masyarakat', 'Leadership evidence', 'Academic excellence', 'Community impact'],
            proTip: "Rekomendasi berlaku maksimal 1 tahun."
        }
    ],
    curriculum: {
        id: 'lpdp-academy',
        domain: DomainType.SCHOLAR,
        targetProgramId: 'lpdp-reguler-2026',
        title: 'LPDP Master Academy',
        subtitle: 'The 2026 Strike Protocol for Indonesian Scholars.',
        tier: 'mythic',
        image: 'https://images.unsplash.com/photo-1523050853064-80356ed980f3?q=80&w=1000',
        author: 'Dojo Sensei',
        lastUpdated: 'Live Feed',
        totalUnits: 4,
        completedUnits: 0,
        tags: ['Indonesia', 'Government', 'Full Ride'],
        units: [
            {
                id: 'u1', order: 1, title: 'Identity & Nationalism', description: 'Aligning your DNA with Indonesian interests.', color: 'red',
                chapters: [
                    { id: 'c1', title: 'The Patriot Narrative', description: 'Drafting your contribution arc.', icon: 'Zap', unlocked: true, points: [
                        { id: 'p1', title: 'LOGIC', content: 'LPDP mencari pembangun bangsa, bukan sekadar mahasiswa pintar.', type: 'LOGIC' }
                    ] }
                ]
            }
        ]
    },
    applyUrl: 'https://lpdp.kemenkeu.go.id/'
};
