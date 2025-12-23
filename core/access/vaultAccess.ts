
import { DomainType, GenericVaultItem } from '../contracts/entityMap';
import { MOCK_VAULT_ITEMS } from './mockData';
import { ID_CONTENT } from '../contracts/dataLocalization';
import { ForgeService } from '../../features/forge/services/forgeService';

const getActiveRegion = () => localStorage.getItem('dojo_region') || 'global';

export const getVaultItemsByDomain = (domain: DomainType, lang: string = 'en'): GenericVaultItem[] => {
    const region = getActiveRegion();
    
    // 1. Base Mock
    const base = JSON.parse(JSON.stringify(
        MOCK_VAULT_ITEMS.filter(v => v.domain === domain && (v.region === region || v.region === 'global'))
    ));

    // 2. Forge Tracks
    const forgeItems = ForgeService.getFlattenedVaultItems(domain);
    const combined = [...forgeItems, ...base];
    
    if (lang === 'id') {
        return combined.map((v: any) => {
            const trans = ID_CONTENT.vault.find(t => t.id === v.id);
            return trans ? { 
                ...v, 
                title: v.title, 
                description: trans.description, 
                hostName: trans.hostName,
                valueLabel: trans.valueLabel || v.valueLabel,
                category: trans.category || v.category
            } : v;
        });
    }
    return combined;
};

export const getVaultItemsByProgramId = (programId: string, lang: string = 'en'): GenericVaultItem[] => {
    // Search both mock and forge
    const mockBase = MOCK_VAULT_ITEMS.filter(v => v.programId === programId);
    
    // Fix: Search forge by parent program ID and use correct MasterProgram properties. 
    // Removed reference to non-existent forgeTracks property.
    const forgeProgram = ForgeService.getAll().find(p => p.id === programId);
    
    const fromForge: GenericVaultItem[] = forgeProgram ? [{
            id: `v-${forgeProgram.id}`,
            domain: forgeProgram.domain,
            programId: forgeProgram.id,
            hostId: forgeProgram.id, // Using program ID as hostId
            title: forgeProgram.title,
            hostName: forgeProgram.organizer, // Mapped from organizer
            description: forgeProgram.intel.description,
            // Fix: MasterProgram uses 'type' instead of 'category'
            category: forgeProgram.type,
            matchScore: 95,
            deadline: forgeProgram.deadline,
            tier: forgeProgram.tier,
            // Fix: MasterProgram uses intel.stats.targetKeywords instead of tags
            tags: forgeProgram.intel.stats?.targetKeywords || [],
            value: 0,
            valueLabel: 'Grant',
            // Fix: Mapped location from country
            location: forgeProgram.country || 'Global',
            // Fix: MasterProgram uses 'checklist' instead of 'requirements'
            requirements: forgeProgram.checklist.map(c => ({ id: c.id, label: c.label, type: 'task', mandatory: true }))
        }] : [];

    const combined = [...fromForge, ...mockBase];

    if (lang === 'id') {
        return combined.map((v: any) => {
            const trans = ID_CONTENT.vault.find(t => t.id === v.id);
            return trans ? { 
                ...v, 
                title: v.title, 
                description: trans.description, 
                hostName: trans.hostName
            } : v;
        });
    }
    return combined;
};

export const getVaultItemById = (id: string, domain: DomainType, lang: string = 'en'): GenericVaultItem | null => {
    const region = getActiveRegion();
    
    // Forge Check
    const allForge = ForgeService.getFlattenedVaultItems(domain);
    const forgeItem = allForge.find(i => i.id === id);
    if (forgeItem) return forgeItem;

    const item = JSON.parse(JSON.stringify(MOCK_VAULT_ITEMS.find(v => v.id === id) || null));
    if (!item || item.domain !== domain || (item.region !== region && item.region !== 'global')) return null;

    if (lang === 'id') {
        const trans = ID_CONTENT.vault.find(t => t.id === id);
        if (trans) return { 
            ...item, 
            title: item.title, 
            description: trans.description, 
            hostName: trans.hostName,
            valueLabel: trans.valueLabel || item.valueLabel,
            category: trans.category || item.category
        };
    }
    return item;
};
