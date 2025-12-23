
import { AdmissionApp, AdmissionRequirement, RequirementStatus } from '../types';
import { DomainType } from '../../../core/contracts/entityMap';
import { SafeAccess } from '../../../core/access/baseAccess';

const STORAGE_KEY = 'dojo_admission_registry_v4';

export const AdmissionService = {
    getApps: (domain?: DomainType): AdmissionApp[] => {
        const all = SafeAccess.pull<AdmissionApp[]>(STORAGE_KEY, []);
        if (domain) return all.filter(a => a.domain === domain);
        return all;
    },

    getAppById: (id: string): AdmissionApp | undefined => {
        return AdmissionService.getApps().find(a => a.id === id || a.targetId === id);
    },

    saveAll: (apps: AdmissionApp[]) => {
        SafeAccess.save(STORAGE_KEY, apps);
        window.dispatchEvent(new Event('storage'));
    },

    /**
     * Fix: Added deleteApp method to resolve property 'deleteApp' does not exist error.
     */
    deleteApp: (id: string) => {
        const all = AdmissionService.getApps();
        const updated = all.filter(a => a.id !== id && a.targetId !== id);
        AdmissionService.saveAll(updated);
    },

    updateRequirement: (appId: string, reqId: string, updates: Partial<AdmissionRequirement>): AdmissionApp[] => {
        const all = AdmissionService.getApps();
        const updated = all.map(app => {
            if (app.id !== appId) return app;
            const newReqs = app.requirements.map(r => r.id === reqId ? { ...r, ...updates } : r);
            const total = newReqs.length;
            const completed = newReqs.filter(r => r.status === 'VERIFIED').length;
            return { ...app, requirements: newReqs, progress: Math.round((completed / total) * 100) };
        });
        AdmissionService.saveAll(updated);
        return updated;
    },

    createFromVault: (vaultItem: any, domain: DomainType): AdmissionApp => {
        const all = AdmissionService.getApps();
        const exists = all.find(a => a.targetId === vaultItem.id && a.domain === domain);
        if (exists) return exists;

        const newApp: AdmissionApp = {
            id: `app_${Date.now()}`,
            domain,
            targetId: vaultItem.id,
            name: vaultItem.title,
            type: domain === DomainType.SCHOLAR ? 'CAMPUS' : domain === DomainType.INTERN ? 'COMPANY' : 'PROGRAM',
            image: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png', 
            progress: 0,
            status: 'DRAFT',
            deadline: vaultItem.deadline,
            requirements: (vaultItem.requirements || []).map((r: any) => ({
                id: r.id,
                label: r.label,
                type: 'DOC',
                status: 'PENDING',
                mandatory: r.mandatory,
                brief: `Guidelines for ${r.label}`
            }))
        };
        
        all.push(newApp);
        AdmissionService.saveAll(all);
        return newApp;
    }
};
