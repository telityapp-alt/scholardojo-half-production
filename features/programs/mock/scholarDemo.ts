
import { UnifiedProgram } from '../types';
import { DomainType } from '../../../core/contracts/entityMap';

export const SCHOLAR_ELITE_DEMO: UnifiedProgram = {
    id: 'gates-cambridge-2025',
    domain: DomainType.SCHOLAR,
    title: 'Gates Cambridge Scholarship',
    organizer: 'Bill & Melinda Gates Foundation',
    organizerLogo: 'https://www.gatescambridge.org/wp-content/themes/gates-cambridge/assets/images/logo.png',
    type: 'Full Ride (Elite)',
    level: 'PhD / Master',
    country: 'United Kingdom',
    deadline: '2025-12-05T23:59:59Z',
    matchScore: 96,
    tier: 'mythic',
    difficultyLevel: 'HARD',
    dojoRankRequired: 'Grandmaster Scholar',
    senseiProtocolQuote: 'Cambridge doesn’t want just a student; they want a leader who will change the global equation.',
    arenaInstructions: 'Typical Gates interview lasts 45 mins. Expect behavioral + technical questions from 3 Gates scholars.',
    
    dossierRequirementKeys: [
        'cv', 'essay_personal', 'essay_gates', 'lor_academic'
    ],

    intel: {
        description: 'Beasiswa penuh paling prestisius di dunia untuk kuliah di University of Cambridge. Mencakup seluruh biaya dan tunjangan riset.',
        weights: { academic: 50, assets: 30, matrix: 20 },
        stats: {
            awardeesPerYear: "~80 scholars from 35+ countries",
            acceptanceRate: "0.3% (Highly Selective)",
            totalApplicants: 25000,
            selectivityRatio: "1:300",
            targetKeywords: ["Leadership", "Social Impact", "Research", "Cambridge"],
            minGpa: 3.7,
            nationalityQuota: "No fixed quota, merit-based global pool"
        },
        highlights: ['Full Tuition Coverage', '£20,000 Annual Stipend', 'Global Network of Scholars', 'Leadership Training'],
        entryCriteria: ['Outstanding Academic Record', 'Strong Leadership Evidence', 'Commitment to Community'],
        funding: ['100% Tuition Fee', '£20,000 Maintenance Allowance'],
        strategicWants: ["Evidence of sustained impact (3+ years)", "Connection between research and social change", "Strong Cambridge subject synergy"],
        fundingStatus: 'FULL COVERAGE',
        financialValue: {
            tuition: "£35,000/year",
            living: "£20,000/year",
            flights: "£1,200",
            totalValue: "~£56,000"
        },
        partnerInstitutions: [
            { name: 'University of Cambridge', location: 'UK', rank: '#2 World', deptStats: "MPhil Econ: 15% | PhD Eng: 8%" }
        ],
        timeline: { 
            openDate: 'Sept 2024', 
            docDeadline: 'Dec 2024', 
            selectionPeriod: 'Jan-March 2025', 
            resultEstimate: 'April 2025',
            interviewWindow: "Late Jan - Early Feb"
        },
        destinations: { eligibleMajors: ['All STEM', 'Social Sciences'], targetCountries: ['United Kingdom'], loaStatus: 'MANDATORY' },
        documents: [],
        selectionPhases: [],
        obligations: { bondYears: 0, returnPolicy: 'No bond', expectedContribution: 'Social impact', sanctionWarning: 'Withdrawal for failure' },
        resources: { officialSite: 'https://www.gatescambridge.org/', helpdeskEmail: 'info@gatescambridge.org', guidebookUrl: '#', testimonyCount: 840 },
        secretTips: { redFlags: [], interviewFocus: [], commonMistakes: [] }
    },
    shadowProtocol: {
        expertVerdict: "Evidence of sustained impact (3+ years) is highly preferred by the Gates committee.",
        lethalMistakes: [
            { title: "The Academic Robot", reason: "Focusing only on high GPA without ORGANIZATION impact." },
            { title: "Generic Research", reason: "Failing to explain WHY Cambridge is the only place for this research." }
        ],
        successVault: [
            { id: 'sv-sc-1', title: 'Winning Gates Statement (STEM)', category: 'ESSAY', previewUrl: 'https://www.africau.edu/images/default/sample.pdf', senseiComment: 'Sharp narrative from the first paragraph.' }
        ],
        alumniInsights: [
            { name: "John Doe", year: "2023", insight: "Focus heavily on the leadership section. It's 40% of the scoring." }
        ],
        ghostTasks: [
            { label: "Connect with a current Gates scholar via LinkedIn", importance: "CRITICAL" }
        ],
        docBriefs: [
            {
                id: 'essay_personal',
                label: 'Personal Statement',
                instructions: 'Focus on your leadership arc. How did you identify a problem in your community and act on it?',
                aiAuditCriteria: ['Presence of a clear leadership hook', 'Mention of home country contribution', 'STAR method alignment'],
                suggestedDojoTheme: 'Ivy League Narrative'
            },
            {
                id: 'essay_gates',
                label: 'Gates Cambridge Essay',
                instructions: 'Explain how you meet the Bill & Melinda Gates criteria. Focus on the multiplier effect.',
                aiAuditCriteria: ['Explanation of community multiplier', 'Direct reference to Gates values', 'Future vision clarity'],
                suggestedDojoTheme: 'Social Impact Blueprint'
            },
            {
                id: 'cv',
                label: 'Scholarship CV',
                instructions: 'Prioritize research impact and community awards over standard work duties.',
                aiAuditCriteria: ['Inclusion of publication section', 'Leadership roles highlighted in bold'],
                suggestedDojoTheme: 'Academic Research CV'
            }
        ],
        eliteTips: [
            { id: 'et1', title: 'The Cambridge Syllabi Hack', content: 'Mention specific professors whose recent work aligns with your mission. This shows deep research.', priority: 'CRITICAL' },
            { id: 'et2', title: 'Community Impact Multiplier', content: 'Explain how your research scales. Gates loves "systemic" change, not just individual success.', priority: 'HIGH' }
        ]
    },
    checklist: [
        { 
            id: 'essay_personal', label: 'Gates Personal Statement', estimate: '3d', completed: false,
            subTasks: [
                { id: 'sc1-s1', label: 'Brainstorm leadership examples', completed: false },
                { id: 'sc1-s2', label: 'Draft social impact plan', completed: false }
            ]
        },
        { 
            id: 'cv', label: 'Technical CV / Resume', estimate: '2d', completed: false,
            subTasks: []
        },
        { 
            id: 'lor_academic', label: '2 Academic References', estimate: '14d', completed: false,
            subTasks: []
        }
    ],
    curriculum: {
        id: 'gates-cambridge-2025', 
        domain: DomainType.SCHOLAR,
        targetProgramId: 'gates-cambridge-2025',
        title: 'Gates Cambridge Academy',
        subtitle: 'The elite blueprint for the world’s most selective grant.',
        tier: 'mythic',
        image: 'https://images.unsplash.com/photo-1523050853064-80356ed980f3?q=80&w=1000',
        author: 'Dojo Grandmaster',
        lastUpdated: 'Live Protocol',
        totalUnits: 4,
        completedUnits: 0,
        tags: ['Cambridge', 'Impact', 'Leadership'],
        units: [
            {
                id: 'u1', order: 1, title: 'The Gates Mindset', description: 'Aligning your identity with the foundation’s core values.', color: 'blue',
                chapters: [
                    { id: 'u1-c1', title: 'The Leadership Star', description: 'Mastering the STAR method for scholarship narrative.', icon: 'Zap', unlocked: true, points: [
                        { id: 'u1p1', title: 'LOGIC', content: 'Gates scholars are not just smart; they are catalysts. You must prove you fix things.', type: 'LOGIC' }
                    ] }
                ]
            },
            {
                id: 'u2', order: 2, title: 'Cambridge Synergy', description: 'Research mapping and supervisor targeting.', color: 'purple',
                chapters: [
                    { id: 'u2-c1', title: 'Faculty Intelligence', description: 'Finding the right research niche in the UK.', icon: 'Library', unlocked: true, points: [] }
                ]
            }
        ]
    },
    applyUrl: 'https://www.gatescambridge.org/apply'
};
