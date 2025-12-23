
export interface DojoBlock {
    label: string;
    icon: string;
    content: string;
}

export const BLOCK_REGISTRY: Record<string, DojoBlock[]> = {
    CV: [
        { 
            label: 'Experience Block', 
            icon: 'Briefcase', 
            content: `<h3>[Company Name] | [Job Title]</h3><p><em>[Date Range] | [Location]</em></p><ul><li>Executed [Project] resulting in [Number]% growth in efficiency.</li><li>Led a team of [Number] to deliver [Feature] under deadline.</li></ul>` 
        },
        { 
            label: 'Education Grid', 
            icon: 'GraduationCap', 
            content: `<h3>[University Name]</h3><p><strong>[Degree Name]</strong> | [Graduation Date]</p><ul><li>GPA: [Score]/4.0 | Major: [Focus]</li><li>Key Coursework: [Topic A], [Topic B]</li></ul>` 
        },
        { 
            label: 'Skills Matrix', 
            icon: 'Zap', 
            content: `<p><strong>Core Tech:</strong> [TypeScript, Node.js, AWS]</p><p><strong>Methodologies:</strong> [Agile, TDD, CI/CD]</p>` 
        }
    ],
    ESSAY: [
        { 
            label: 'Identity Hook', 
            icon: 'User', 
            content: `<blockquote>"Start with a high-impact quote or a scene that defines your personal mission."</blockquote><p>Write your narrative here, focusing on the defining moment...</p>` 
        },
        { 
            label: 'Vision Arc', 
            icon: 'Target', 
            content: `<h3>The Long-term Mission</h3><p>By securing this opportunity, I plan to leverage [Skill] to solve [Problem] within [Region/Industry]...</p>` 
        }
    ],
    PLAN: [
        { 
            label: 'Methodology Box', 
            icon: 'Layers', 
            content: `<h2>Methodology</h2><p>This research utilizes a [Qualitative/Quantitative] approach targeting [Population/Dataset].</p>` 
        },
        { 
            label: 'Strategic Timeline', 
            icon: 'Clock', 
            content: `<h3>Mission Timeline</h3><p><strong>Phase 1:</strong> Data Sync ([Month 1])</p><p><strong>Phase 2:</strong> Algorithmic Audit ([Month 2])</p>` 
        }
    ]
};
