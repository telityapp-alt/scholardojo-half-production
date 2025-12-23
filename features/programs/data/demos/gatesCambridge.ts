
import { UnifiedProgram } from '../../types';
import { DomainType } from '../../../../core/contracts/entityMap';

export const GATES_CAMBRIDGE_DATA: UnifiedProgram = {
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
    difficultyLevel: 'HARD' as any,
    dojoRankRequired: 'Grandmaster Scholar',
    senseiProtocolQuote: 'Cambridge doesn’t want just a student; they want a leader who will change the global equation.',
    arenaInstructions: 'Typical Gates interview lasts 45 mins. Expect behavioral + technical questions from 3 Gates scholars.',
    dossierRequirementKeys: ['cv', 'essay_personal', 'essay_gates', 'lor_academic'],
    intel: {
        description: 'Beasiswa penuh paling prestisius di dunia untuk kuliah di University of Cambridge. Mencakup seluruh biaya dan tunjangan riset.',
        highlights: ['Full Tuition Coverage', '£20,000 Annual Stipend', 'Global Network of Scholars'],
        entryCriteria: ['Outstanding Academic Record', 'Strong Leadership Evidence'],
        funding: ['100% Tuition Fee', '£20,000 Maintenance Allowance'],
        strategicWants: ["Evidence of sustained impact", "Connection between research and social change"],
        fundingStatus: 'FULL COVERAGE',
        weights: { academic: 50, assets: 30, matrix: 20 },
        stats: {
            awardeesPerYear: "~80 scholars",
            acceptanceRate: "0.3%",
            totalApplicants: 25000,
            selectivityRatio: "1:300",
            targetKeywords: ["Leadership", "Social Impact", "Research"],
            minGpa: 3.7
        },
        partnerInstitutions: [{ name: 'University of Cambridge', location: 'UK', rank: '#2 World' }],
        timeline: { openDate: 'Sept 2024', docDeadline: 'Dec 2024', selectionPeriod: 'Jan-March 2025', resultEstimate: 'April 2025', interviewWindow: "Late Jan" },
        destinations: { eligibleMajors: ['STEM', 'Social Sciences'], targetCountries: ['United Kingdom'], loaStatus: 'MANDATORY' },
        documents: [],
        selectionPhases: [],
        obligations: { bondYears: 0, returnPolicy: 'No bond', expectedContribution: 'Social impact', sanctionWarning: 'Withdrawal for failure' },
        resources: { officialSite: 'https://www.gatescambridge.org/', helpdeskEmail: 'info@gatescambridge.org', guidebookUrl: '#', testimonyCount: 840 },
        secretTips: { redFlags: [], interviewFocus: [], commonMistakes: [] },
        financialValue: { tuition: "£35,000/year", living: "£20,000/year", flights: "£1,200", totalValue: "~£56,000" }
    },
    shadowProtocol: {
        expertVerdict: "Evidence of sustained impact (3+ years) is highly preferred by the Gates committee.",
        lethalMistakes: [{ title: "The Academic Robot", reason: "Focusing only on high GPA without ORGANIZATION impact." }],
        successVault: [],
        alumniInsights: [],
        ghostTasks: [{ label: "Connect with current Gates scholar", importance: "CRITICAL" as any }],
        docBriefs: [
            { id: 'essay_personal', label: 'Personal Statement', instructions: 'Focus on your leadership arc.', aiAuditCriteria: ['Leadership hook'], suggestedDojoTheme: 'Ivy League' }
        ],
        eliteTips: [{ id: 'et1', title: 'The Cambridge Syllabi Hack', content: 'Mention specific professors.', priority: 'CRITICAL' }]
    },
    checklist: [],
    curriculum: { id: 'curr-gates', units: [] } as any,
    applyUrl: 'https://www.gatescambridge.org/apply'
};
