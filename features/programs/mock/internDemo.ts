
import { UnifiedProgram } from '../types';
import { DomainType } from '../../../core/contracts/entityMap';

export const INTERN_ELITE_DEMO: UnifiedProgram = {
    id: 'openai-fellow-2025',
    domain: DomainType.INTERN,
    title: 'AI Research Fellow',
    organizer: 'OpenAI',
    organizerLogo: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg',
    type: 'Paid Fellowship (Elite)',
    level: 'Post-Grad / Senior SWE',
    country: 'San Francisco, USA',
    deadline: '2025-10-15T23:59:59Z',
    matchScore: 92,
    tier: 'mythic',
    difficultyLevel: 'DIFFICULT',
    dojoRankRequired: 'AI Architect Tier',
    senseiProtocolQuote: 'To build the future of AGI, you must first master the constraints of the present.',
    arenaInstructions: 'Full 45-min realistic panel. Expect Sam Altman level grilling on GPU scaling and AI safety.',
    
    dossierRequirementKeys: [
        'cv', 'essay_personal'
    ],

    intel: {
        description: 'Join the world’s leading AI lab. Work on the next generation of GPT models and multimodal intelligence.',
        weights: { academic: 20, assets: 50, matrix: 30 },
        stats: {
            awardeesPerYear: "~15 fellows globally",
            acceptanceRate: "0.1% (Extreme)",
            totalApplicants: 15000,
            selectivityRatio: "1:1000",
            targetKeywords: ["AI", "PyTorch", "Open Source", "AGI", "Math"],
            minGpa: 3.5,
            nationalityQuota: "H1B & O1 Visa Support available",
            ageLimit: "N/A",
            workExpPreference: "Strong open-source history mandatory"
        },
        highlights: ['Direct mentorship from Sam Altman', '$12,000 Monthly Base', 'H1B Visa Support', 'Equity (Units) Options'],
        entryCriteria: ['Deep proficiency in PyTorch', 'History of OS AI contributions', 'Top-tier problem solving', 'System Design at Scale'],
        funding: ['$12,000 Base Salary', 'Relocation Package ($15k)', 'Full Health/Dental Coverage', 'Compute Credits (Unlimited)'],
        strategicWants: ["Direct GPU performance knowledge", "Commitment to AGI safety", "Proved ability to scale systems"],
        fundingStatus: 'FULL COVERAGE',
        financialValue: {
            tuition: "N/A (Paid Role)",
            living: "$12,000/month",
            flights: "$5,000 (Relocation)",
            totalValue: "~$150k Annual Equivalent"
        },
        partnerInstitutions: [{ name: 'OpenAI HQ', location: 'San Francisco', rank: '#1 AI Lab' }],
        timeline: { 
            openDate: 'Aug 2025', 
            docDeadline: 'Oct 2025', 
            selectionPeriod: 'Nov-Dec 2025', 
            resultEstimate: 'Jan 2026',
            interviewWindow: "Late Nov"
        },
        destinations: { eligibleMajors: ['CS', 'Math', 'Physics', 'Stats'], targetCountries: ['USA'], loaStatus: 'OPTIONAL' },
        documents: [
            { label: 'Technical CV', spec: 'Include Arxiv links', type: 'DOC' },
            { label: 'GitHub Link', spec: 'PRs to major AI repos', type: 'TASK' },
            { label: 'AI Philosophy', spec: '500 words on Safety', type: 'ESSAY' }
        ],
        selectionPhases: [
            { name: 'Algorithmic Blitz', weight: 20, format: 'Live Code', focus: "Graph theory & Optimization" },
            { name: 'Research Deep-Dive', weight: 40, format: 'Paper Review', focus: "Attention mechanisms & CUDA kernels" },
            { name: 'Cultural Alignment', weight: 40, format: 'Exec Chat', focus: "AGI ethics & Long-term vision" }
        ],
        obligations: { bondYears: 0, returnPolicy: 'Performance based', expectedContribution: 'AGI Research', sanctionWarning: 'NDA breach = Immediate Termination' },
        resources: { officialSite: 'https://openai.com/careers', helpdeskEmail: 'fellowship@openai.com', guidebookUrl: '#', testimonyCount: 2100 },
        secretTips: { 
            redFlags: ['Not knowing the Attention paper', 'Poor python performance logic', 'Ignoring AI Safety'],
            interviewFocus: ['Scalability', 'Intuition', 'Safety'],
            commonMistakes: ['Over-complicating answers', 'Lack of practical demo']
        }
    },
    shadowProtocol: {
        expertVerdict: "OpenAI seeks obsession. You must explain model architectures down to CUDA kernel levels.",
        lethalMistakes: [
            { title: "The Prompt Engineer", reason: "Knowing how to use GPT is not enough. You must know the MATH behind it." },
            { title: "No GPU Logic", reason: "Failure to understand VRAM constraints in training." }
        ],
        successVault: [],
        alumniInsights: [],
        ghostTasks: [
            { label: "Submit PR to PyTorch or Transformers repo", importance: "CRITICAL" },
            { label: "Re-read 'Attention is All You Need' 5 times", importance: "STRATEGIC" }
        ],
        docBriefs: [
            {
                id: 'cv',
                label: 'Research CV',
                instructions: 'Resumes must look like research papers. Include Arxiv links and citations for every project.',
                aiAuditCriteria: ['Presence of Arxiv links', 'Computational scale metrics (e.g., TFLOPS, cluster size)', 'CUDA kernel implementation mentions'],
                suggestedDojoTheme: 'FAANG Strike Resume'
            }
        ],
        eliteTips: [
            { id: 'it1', title: 'The PPO Optimization Play', content: 'In your interview, mention your thoughts on RLHF vs RLAIF. It shows you follow their latest research papers.', priority: 'CRITICAL' },
            { id: 'it2', title: 'Open Source Signal', content: 'Forking is not enough. You need merged PRs in major repositories to even get a screening call.', priority: 'HIGH' }
        ]
    },
    checklist: [
        { id: 'cv', label: 'Technical AI Resume', estimate: '2d', completed: false, subTasks: [] },
        { id: 'essay_personal', label: 'AGI Safety Statement', estimate: '3d', completed: false, subTasks: [] }
    ],
    curriculum: {
        id: 'openai-academy',
        domain: DomainType.INTERN,
        targetProgramId: 'openai-fellow-2025',
        title: 'AGI Research Academy',
        subtitle: 'Master the foundations of large language models.',
        tier: 'mythic',
        image: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg',
        author: 'Dojo Ninja',
        lastUpdated: 'Live',
        totalUnits: 5,
        completedUnits: 0,
        tags: ['AI', 'Silicon Valley', 'High Pay'],
        units: [
            {
                id: 'u1', order: 1, title: 'The Attention Mechanism', description: 'Master the core of GPT.', color: 'orange',
                chapters: [
                    { id: 'c1', title: 'Self-Attention Math', description: 'Q, K, V matrices explained.', icon: 'Zap', unlocked: true, points: [] }
                ]
            }
        ]
    },
    applyUrl: 'https://openai.com/apply'
};
