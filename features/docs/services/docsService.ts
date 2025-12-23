
import { SafeAccess } from '../../../core/access/baseAccess';
import { DomainType } from '../../../core/contracts/entityMap';
import { DojoTemplate, TEMPLATE_REGISTRY, PARENT_TEMPLATES } from '../data/templateRegistry';
import { BLOCK_REGISTRY } from '../data/blockRegistry';

export interface DojoDoc {
    id: string;
    title: string;
    type: 'CV' | 'ESSAY' | 'PLAN' | 'LOR' | 'PORTFOLIO';
    category: 'CAREER' | 'SCHOLARSHIP' | 'TECHNICAL' | 'GENERAL';
    content: string; 
    lastModified: number;
    linkedProgramId?: string;
    templateId?: string;
}

const STORAGE_KEY = 'dojo_user_docs_vault_v6';

export const DocsService = {
    // --- USER DOCUMENTS ---
    getAll: (): DojoDoc[] => SafeAccess.pull<DojoDoc[]>(STORAGE_KEY, []),
    
    getById: (id: string): DojoDoc | undefined => 
        DocsService.getAll().find(d => d.id === id),
    
    save: (doc: DojoDoc) => {
        const all = DocsService.getAll();
        const idx = all.findIndex(d => d.id === doc.id);
        if (idx !== -1) all[idx] = { ...doc, lastModified: Date.now() };
        else all.unshift({ ...doc, lastModified: Date.now() });
        SafeAccess.save(STORAGE_KEY, all);
    },
    
    delete: (id: string) => {
        const filtered = DocsService.getAll().filter(d => d.id !== id);
        SafeAccess.save(STORAGE_KEY, filtered);
    },

    acquireTemplate: (temp: DojoTemplate): DojoDoc => {
        const newDoc: DojoDoc = {
            id: `doc-${Date.now()}`,
            title: `${temp.title} Draft`,
            type: temp.parentId.replace('parent-', '').toUpperCase() as any,
            category: temp.domain === DomainType.SCHOLAR ? 'SCHOLARSHIP' : 'CAREER',
            content: temp.content,
            lastModified: Date.now(),
            templateId: temp.id
        };
        DocsService.save(newDoc);
        return newDoc;
    },

    // --- REGISTRY ACCESS ---
    getTemplatesByDomain: (domain: DomainType) => 
        TEMPLATE_REGISTRY.filter(t => t.domain === domain),
    
    getParents: () => PARENT_TEMPLATES,
    
    getBlocksByType: (type: string) => BLOCK_REGISTRY[type] || []
};
