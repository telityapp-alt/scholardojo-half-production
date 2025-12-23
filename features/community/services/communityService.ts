
import { DomainType, ProgramTier } from '../../../core/contracts/entityMap';
import { UnifiedProgram } from '../../programs/types';

// THE COMMUNITY REGISTRY (Stored as Full UnifiedProgram Objects)
let COMMUNITY_POOL: UnifiedProgram[] = [
    {
        id: 'comm-monash-global-2025',
        domain: DomainType.SCHOLAR,
        title: 'Monash Global Leaders Grant',
        organizer: 'Monash University Australia',
        organizerLogo: 'https://www.monash.edu/__data/assets/git_bridge/monash-site-assets/images/logo-monash.svg',
        type: 'Excellence Grant (Full)',
        level: 'Master / Bachelor',
        country: 'Australia',
        deadline: '2025-11-30T23:59:59Z',
        matchScore: 92,
        tier: 'mythic',
        difficultyLevel: 'HARD',
        dojoRankRequired: 'Global Elite',
        senseiProtocolQuote: 'Monash doesn’t just fund degrees; they invest in "Global Leaders" who strike with impact.',
        arenaInstructions: 'Expect deep behavioral scrutiny on your leadership arc. They want "Change Makers", not just students.',
        dossierRequirementKeys: ['cv', 'essay_leadership', 'transkrip'],
        
        // 1. INTEL MODULE (The Mission Briefing)
        intel: {
            description: 'Program beasiswa prestisius dari Monash University untuk mahasiswa internasional dengan rekam jejak kepemimpinan luar biasa.',
            highlights: ['100% Tuition Loot', 'Access to Elite Leadership Circles', 'Global Alumni Strike Network', 'VIP Invitation Events'],
            entryCriteria: ['GPA 3.7+ / 4.0', 'Active Leadership History', 'Full-time Enrollment Only'],
            funding: ['Full Tuition Coverage', 'Annual Stipend AUD $10,000 (Optional)', 'Mentorship Program'],
            strategicWants: ["Evidence of Social Innovation", "Global Mindset", "Proven Resilience"],
            fundingStatus: 'FULL COVERAGE',
            weights: { academic: 40, assets: 40, matrix: 20 },
            stats: {
                awardeesPerYear: "~30 global slots",
                acceptanceRate: "2.1% (High Pressure)",
                totalApplicants: 8500,
                selectivityRatio: "1:280",
                targetKeywords: ["Innovation", "Leadership", "Global Impact"],
                minGpa: 3.7,
                nationalityQuota: "Worldwide Open"
            },
            timeline: { 
                openDate: 'August 2024', 
                docDeadline: 'November 2024', 
                selectionPeriod: 'Dec - Jan', 
                resultEstimate: 'February 2025' 
            },
            financialValue: {
                tuition: "AUD $45,000/year",
                living: "Self-Funded (Stipend restricted)",
                flights: "Excluded",
                totalValue: "~AUD $135,000"
            },
            news: [
                { id: 'm-n-1', date: 'Oct 2025', title: 'Quota Expanded for SE Asia', content: 'Monash indicates a higher "Fit Matrix" score for candidates from SE Asia in 2026 cycle.', source: 'Scout Feed', isBreaking: true }
            ],
            officialDocumentList: [
                { id: 'doc-1', name: 'Academic Transcripts', isOnlineForm: false, isUpload: true },
                { id: 'doc-2', name: 'Leadership Statement (500w)', isOnlineForm: false, isUpload: true },
                { id: 'doc-3', name: 'Referee Reports (2)', isOnlineForm: true, isUpload: false }
            ]
        },

        // 2. KEYS MODULE (Shadow Protocol)
        shadowProtocol: {
            expertVerdict: "Don't just list titles. Describe the SPECIFIC problem you solved and the metrics of your leadership strike.",
            lethalMistakes: [
                { title: "The Passive Leader", reason: "Listing club memberships without describing the 'Delta' (change) you caused.", fix: "Use verbs like 'Architected', 'Deployed', 'Engineered'." },
                { title: "GPA Obsession", reason: "Focusing too much on grades and ignoring the 'Global Outlook' requirement." }
            ],
            eliteTips: [
                { id: 'mt-1', title: 'The Monash Innovation Bias', content: 'They love tech-driven leadership. Mention how you use tools to scale impact.', priority: 'CRITICAL' }
            ],
            ghostTasks: [
                { label: "Connect with Monash Global Leader Alumnus", importance: "STRATEGIC", desc: "Validate your essay narrative with someone who secured the loot before." }
            ],
            docBriefs: [
                { id: 'essay_leadership', label: 'Global Leadership Essay', instructions: '500 words. Focus on a moment of crisis where you led a team to success.', aiAuditCriteria: ['Leadership Hook', 'Scale of Impact'], suggestedDojoTheme: 'Commander-Style' }
            ],
            successVault: [],
            alumniInsights: []
        },

        checklist: [],
        curriculum: { id: 'curr-monash', title: 'Monash Academy', units: [] } as any,
        applyUrl: 'https://www.monash.edu/study/fees-scholarships/scholarships'
    }
];

export const CommunityService = {
    getPrograms: (domain: DomainType): UnifiedProgram[] => {
        return COMMUNITY_POOL.filter(p => p.domain === domain);
    },
    
    getProgramById: (id: string): UnifiedProgram | undefined => {
        return COMMUNITY_POOL.find(p => p.id === id);
    },

    uploadProgram: (data: any, domain: DomainType): UnifiedProgram => {
        // Transform AI extraction into Master Template structure
        const newProgram: UnifiedProgram = {
            ...data,
            id: `comm-${Date.now()}`,
            domain,
            tier: data.tier || 'common',
            difficultyLevel: 'NORMAL',
            intel: {
                ...data.intel,
                weights: { academic: 40, assets: 40, matrix: 20 },
                stats: data.stats || { targetKeywords: [] },
            },
            shadowProtocol: data.shadowProtocol || { lethalMistakes: [], ghostTasks: [], docBriefs: [] },
            checklist: [],
            curriculum: { id: `curr-${Date.now()}`, units: [] } as any,
            applyUrl: data.link || '#'
        };
        COMMUNITY_POOL.unshift(newProgram);
        return newProgram;
    }
};
