
import { DomainType } from '../../../core/contracts/entityMap';
import { SkillMaster, UserSkillProgress } from '../types';

const PROGRESS_KEY = 'dojo_skill_mastery_v1';

const MOCK_SKILLS: SkillMaster[] = [
    {
        id: 'sk-ai-architect',
        domain: DomainType.STUDENT,
        title: 'Mastering AI Prompting',
        description: 'Learn to talk to AI like a Silicon Valley engineer.',
        category: 'Technical',
        image: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
        tags: ['Hot', 'AI', 'Trending'],
        units: [
            {
                id: 'u1',
                title: 'Basics of Instructions',
                description: 'The foundation of AI clarity.',
                color: '#58cc02',
                steps: [
                    {
                        id: 's1',
                        title: 'Context Injection',
                        teaser: 'The secret to AI precision. Learn how to build "fences" around AI logic to prevent hallucinations.',
                        icon: 'Zap',
                        type: 'LESSON',
                        status: 'AVAILABLE',
                        xpReward: 25,
                        slides: [
                            { 
                                type: 'TEXT', 
                                title: 'Phase 1: What is Context?', 
                                content: 'AI needs boundaries. Without context, it guesses. With context, it constructs. **Context is the fence that keeps the AI from roaming into nonsense.**' 
                            },
                            { 
                                type: 'IMAGE', 
                                title: 'Visual Blueprint',
                                content: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000' 
                            },
                            {
                                type: 'TEXT',
                                title: 'The Golden Rule',
                                content: 'Always tell the AI: \n1. Who it should be (Persona)\n2. What it should do (Task)\n3. What constraints it has (Rule)'
                            }
                        ],
                        questions: [
                            {
                                id: 'q1',
                                type: 'MULTIPLE_CHOICE',
                                question: 'Why is context important in a prompt?',
                                options: ['To make the AI faster', 'To limit the scope of answers', 'To save tokens', 'To bypass safety filters'],
                                correctAnswer: 'To limit the scope of answers',
                                explanation: 'Context acts as a constraint that guides the AI toward the intended result.'
                            }
                        ]
                    },
                    {
                        id: 's2',
                        title: 'Role Playing',
                        teaser: 'Act like a pro. Master the technique of shifting the AI\'s persona to get specialized expert responses.',
                        icon: 'User',
                        type: 'QUIZ',
                        status: 'LOCKED',
                        xpReward: 35,
                        slides: [
                            { 
                                type: 'TEXT', 
                                title: 'Setting the Persona',
                                content: 'Telling AI "Act as a Senior HR Manager" changes its vocabulary, tone, and depth. It uses professional jargon automatically.' 
                            },
                            {
                                type: 'VIDEO',
                                title: 'Quick Mastery Video',
                                content: 'https://www.w3schools.com/html/mov_bbb.mp4',
                                description: 'Watch how persona shifting changes the output instantly.'
                            }
                        ],
                        questions: [
                            {
                                id: 'q2',
                                type: 'MULTIPLE_CHOICE',
                                question: 'Which prompt uses "Role Playing" correctly?',
                                options: ['Help me code', 'Act as a Python developer', 'Do my homework', 'Translate this'],
                                correctAnswer: 'Act as a Python developer',
                                explanation: 'Explicitly stating a persona helps the AI adopt a specific expertise.'
                            }
                        ]
                    },
                    {
                        id: 's3',
                        title: 'Zero-Shot Logic',
                        teaser: 'Maximum speed. Learn how to get the right answer without providing any previous examples.',
                        icon: 'Shield',
                        type: 'LESSON',
                        status: 'LOCKED',
                        xpReward: 30,
                        slides: [],
                        questions: []
                    }
                ]
            },
            {
                id: 'u2',
                title: 'Data Extraction',
                description: 'Turn chaos into structure.',
                color: '#ce82ff',
                steps: [
                    {
                        id: 's4',
                        title: 'JSON Forcing',
                        teaser: 'Master the art of output control. Force any AI to return valid, code-ready JSON every time.',
                        icon: 'Target',
                        type: 'LESSON',
                        status: 'LOCKED',
                        xpReward: 40,
                        slides: [],
                        questions: []
                    }
                ]
            }
        ]
    }
];

export const SkillService = {
    getSkills: (domain: DomainType): SkillMaster[] => {
        return MOCK_SKILLS.filter(s => s.domain === domain);
    },

    getSkillById: (id: string): SkillMaster | undefined => {
        return MOCK_SKILLS.find(s => s.id === id);
    },

    getProgress: (skillId: string): UserSkillProgress => {
        const raw = localStorage.getItem(`${PROGRESS_KEY}_${skillId}`);
        if (raw) return JSON.parse(raw);
        return { skillId, completedStepIds: [], masteryStars: 0 };
    },

    completeStep: (skillId: string, stepId: string) => {
        const progress = SkillService.getProgress(skillId);
        if (!progress.completedStepIds.includes(stepId)) {
            progress.completedStepIds.push(stepId);
            localStorage.setItem(`${PROGRESS_KEY}_${skillId}`, JSON.stringify(progress));
        }
    }
};
