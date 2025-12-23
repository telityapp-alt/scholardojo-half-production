
import { UnifiedProgram } from '../../types';
import { DomainType } from '../../../../core/contracts/entityMap';

export const OPEN_AI_FELLOW_DATA: UnifiedProgram = {
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
    difficultyLevel: 'DIFFICULT' as any,
    dojoRankRequired: 'AI Architect Tier',
    senseiProtocolQuote: 'To build the future of AGI, you must first master the constraints of the present.',
    arenaInstructions: 'Full 45-min realistic panel. Expect GPU scaling and AI safety questions.',
    dossierRequirementKeys: ['cv', 'essay_personal'],
    intel: {
        description: 'Join the world’s leading AI lab. Work on the next generation of GPT models and multimodal intelligence.',
        highlights: ['Mentorship from Sam Altman', '$12,000 Monthly Base'],
        entryCriteria: ['Deep proficiency in PyTorch', 'OS AI contributions'],
        funding: ['$12,000 Base Salary', 'Relocation Package ($15k)'],
        strategicWants: ["GPU performance knowledge", "Commitment to AGI safety"],
        fundingStatus: 'FULL COVERAGE',
        weights: { academic: 20, assets: 50, matrix: 30 },
        stats: {
            awardeesPerYear: "~15 fellows",
            acceptanceRate: "0.1%",
            totalApplicants: 15000,
            selectivityRatio: "1:1000",
            targetKeywords: ["AI", "PyTorch", "CUDA"],
            minGpa: 3.5
        },
        partnerInstitutions: [{ name: 'OpenAI HQ', location: 'San Francisco', rank: '#1 AI Lab' }],
        timeline: { openDate: 'Aug 2025', docDeadline: 'Oct 2025', selectionPeriod: 'Nov-Dec 2025', resultEstimate: 'Jan 2026', interviewWindow: "Late Nov" },
        destinations: { eligibleMajors: ['CS', 'Math', 'Physics'], targetCountries: ['USA'], loaStatus: 'OPTIONAL' },
        documents: [],
        selectionPhases: [],
        obligations: { bondYears: 0, returnPolicy: 'Performance based', expectedContribution: 'AGI Research', sanctionWarning: 'NDA breach = Termination' },
        resources: { officialSite: 'https://openai.com/careers', helpdeskEmail: 'fellowship@openai.com', guidebookUrl: '#', testimonyCount: 2100 },
        secretTips: { redFlags: [], interviewFocus: [], commonMistakes: [] },
        financialValue: { tuition: "N/A", living: "$12,000/month", flights: "$5,000", totalValue: "~$150k Annual" }
    },
    shadowProtocol: {
        expertVerdict: "OpenAI seeks obsession. Explain model architectures down to CUDA kernel levels.",
        lethalMistakes: [{ title: "The Prompt Engineer", reason: "Knowing GPT is not enough. You must know the MATH." }],
        successVault: [],
        alumniInsights: [],
        ghostTasks: [{ label: "Submit PR to PyTorch", importance: "CRITICAL" as any }],
        docBriefs: [
            { id: 'cv', label: 'Research CV', instructions: 'Must look like research papers.', aiAuditCriteria: ['Arxiv links'], suggestedDojoTheme: 'FAANG Strike' }
        ],
        eliteTips: [{ id: 'it1', title: 'RLHF vs RLAIF', content: 'Mention your thoughts on safety.', priority: 'CRITICAL' }]
    },
    checklist: [],
    curriculum: { id: 'curr-openai', units: [] } as any,
    applyUrl: 'https://openai.com/apply'
};
