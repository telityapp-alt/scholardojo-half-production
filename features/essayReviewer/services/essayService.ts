
import { DomainType } from '../../../core/contracts/entityMap';
import { EssayMission } from '../types';

const MOCK_MISSIONS: EssayMission[] = [
    {
        id: 'em-1',
        programId: 'lpdp-reguler-2026',
        programName: 'LPDP Regular',
        domain: DomainType.SCHOLAR,
        title: 'Rencana Kontribusi Pasca Studi',
        type: 'IMPACT',
        wordCount: 1500,
        difficulty: 'HARD',
        recipe: {
            strategy: "LPDP wants to see your **commitment to return** and solve Indonesian problems.",
            ingredients: [
                { label: "The Problem Hook", desc: "Data-driven opening on a specific national issue." },
                { label: "The Roadmap", desc: "Your 5-10 year career plan in Indonesia." },
                { label: "Sector Synergy", desc: "How your degree fits the national strategic industry." }
            ],
            proTip: "Don't just say 'advancing the nation'. Be specific: names of institutions, projects, and target metrics."
        }
    },
    {
        id: 'em-2',
        programId: 'gates-cambridge-2025',
        programName: 'Gates Cambridge',
        domain: DomainType.SCHOLAR,
        title: 'Leadership & Academic Potential',
        type: 'LEADERSHIP',
        wordCount: 500,
        difficulty: 'HARD',
        recipe: {
            strategy: "Cambridge seeks **change-makers**. Show how you lead when things go wrong.",
            ingredients: [
                { label: "The Crisis", desc: "A specific moment where your leadership was tested." },
                { label: "The Delta", desc: "What changed because YOU were there?" }
            ],
            proTip: "Focus 40% on the result and 60% on the process of leading others."
        }
    },
    {
        id: 'em-3',
        programId: 'openai-fellow-2025',
        programName: 'OpenAI Fellowship',
        domain: DomainType.INTERN,
        title: 'AGI Safety Philosophy',
        type: 'MOTIVATION',
        wordCount: 500,
        difficulty: 'NORMAL',
        recipe: {
            strategy: "OpenAI is obsessed with **alignment**. Show you think about long-term risks.",
            ingredients: [
                { label: "The Risk Matrix", desc: "Which part of AGI safety worries you most?" },
                { label: "Technical Insight", desc: "Don't just talk ethics, talk compute and scaling laws." }
            ],
            proTip: "Read their recent safety papers before drafting a single word."
        }
    },
    {
        id: 'em-4',
        programId: 'lpdp-reguler-2026',
        programName: 'LPDP Regular',
        domain: DomainType.SCHOLAR,
        title: 'Personal Statement',
        type: 'PERSONAL',
        wordCount: 1000,
        difficulty: 'NORMAL',
        recipe: {
            strategy: "Connect your past achievements to your future goals in Indonesia.",
            ingredients: [
                { label: "Past Resilience", desc: "Overcoming specific obstacles." },
                { label: "Future Vision", desc: "How S2 makes you a builder." }
            ],
            proTip: "Use the STAR method for every achievement mentioned."
        }
    }
];

export const EssayService = {
    getMissions: (domain: DomainType): EssayMission[] => {
        return MOCK_MISSIONS.filter(m => m.domain === domain);
    },
    getMissionById: (id: string): EssayMission | undefined => {
        return MOCK_MISSIONS.find(m => m.id === id);
    }
};
