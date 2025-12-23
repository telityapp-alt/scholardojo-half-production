
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DomainType } from '../../../core/contracts/entityMap';
import { UnifiedProgramService } from '../services/unifiedProgramService';
import { UnifiedProgram } from '../types';
import { ProgramCard } from './ProgramCard';
import { useProgramFilters } from '../hooks/useProgramFilters';
import { DuoSearch } from '../../../components/ui/DuoSearch';
import { SuperDropdown } from '../../../components/ui/SuperDropdown';
import { 
    X, RotateCcw, SignalLow, Globe, Zap, Crown, MapPin, Target, LayoutGrid, ArrowRight
} from 'lucide-react';
import { DuoCard } from '../../../components/DuoCard';
import { ThemeEngine } from '../../../core/engines/themeEngine';
import { useStorageSync } from '../../../core/hooks/useStorageSync';

interface ProgramsListViewProps {
    securedOnly?: boolean;
}

export const ProgramsListView: React.FC<ProgramsListViewProps> = ({ securedOnly = false }) => {
    const { domain } = useParams<{ domain: string }>();
    const navigate = useNavigate();
    const domainEnum = (domain as DomainType) || DomainType.STUDENT;

    const [allPrograms, setAllPrograms] = useState<UnifiedProgram[]>([]);
    const [loading, setLoading] = useState(true);

    const branding = ThemeEngine.getBranding(domainEnum);

    // MEMOIZED LOAD: Prevents infinite sync loops
    const load = useCallback(async () => {
        setLoading(true);
        let data = await UnifiedProgramService.getAll(domainEnum);
        
        if (securedOnly) {
            const securedIds = JSON.parse(localStorage.getItem('dojo_secured_missions') || '[]');
            data = data.filter(p => securedIds.includes(p.id));
        }
        
        setAllPrograms(data);
        setLoading(false);
    }, [domainEnum, securedOnly]);

    // INITIAL LOAD
    useEffect(() => {
        load();
    }, [load]);

    // SYNC: Replace manual listener with centralized hook
    useStorageSync(load);

    const { 
        filteredPrograms, facets, searchQuery, setSearchQuery, 
        selectedFilters, toggleOption, clearAll 
    } = useProgramFilters(allPrograms);

    const getIconForFacet = (facetId: string) => {
        switch(facetId) {
            case 'type': return Zap;
            case 'tier': return Crown;
            case 'country': return MapPin;
            default: return Target;
        }
    };

    const handleDropdownChange = (facetId: string, value: string) => {
        const currentOptions = selectedFilters[facetId] || [];
        if (value === 'ALL') {
            currentOptions.forEach(opt => toggleOption(facetId, opt));
        } else {
            currentOptions.forEach(opt => toggleOption(facetId, opt));
            toggleOption(facetId, value);
        }
    };

    if (!loading && securedOnly && allPrograms.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
                <DuoCard className="max-w-xl w-full text-center py-20 bg-white border-dashed flex flex-col items-center">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 border-2 border-slate-100">
                        <LayoutGrid className="w-12 h-12 text-slate-200" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-700 mb-2 uppercase italic tracking-tighter">Your mission list is empty</h3>
                    <p className="text-slate-400 font-bold mb-10 max-w-md leading-relaxed px-6">
                        Secure a target program in the explorer to initialize your strike registry.
                    </p>
                    <button 
                        onClick={() => navigate(`/${domainEnum}/discovery/programs`)}
                        className="bg-white hover:bg-slate-50 text-[#1cb0f6] px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest border-2 border-slate-200 border-b-[6px] active:border-b-2 active:translate-y-[4px] transition-all flex items-center justify-center gap-3 shadow-md"
                    >
                        Browse Missions <ArrowRight size={18} strokeWidth={4} />
                    </button>
                </DuoCard>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-in fade-in duration-500 pb-40 max-w-7xl mx-auto px-4">
            <header className="flex flex-col gap-6 relative z-[50]">
                <div className="bg-white p-6 md:p-8 rounded-[40px] border-2 border-slate-200 border-b-[10px] shadow-sm flex flex-col gap-6">
                    <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
                        <div className="flex-1 relative group w-full">
                            <DuoSearch 
                                value={searchQuery} 
                                onChange={setSearchQuery} 
                                placeholder={securedOnly ? "Search your secured missions..." : `Scan ${allPrograms.length} briefings...`} 
                            />
                        </div>
                        
                        <div className="flex items-center gap-3 shrink-0">
                             <div className="hidden sm:flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-50 border-2 border-slate-100 border-b-4">
                                 <div className="w-2.5 h-2.5 bg-[#58cc02] rounded-full animate-ping"></div>
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                                    {filteredPrograms.length} Locked
                                 </p>
                             </div>

                             <div className="flex gap-2">
                                 {(Object.values(selectedFilters).some(v => (v as string[]).length > 0) || searchQuery) && (
                                     <button 
                                        onClick={clearAll}
                                        className="px-6 py-3 rounded-2xl bg-white border-2 border-slate-200 border-b-4 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-red-500 transition-all flex items-center gap-2 active:translate-y-1 shadow-sm"
                                     >
                                         <RotateCcw size={14} strokeWidth={4} /> Reset
                                     </button>
                                 )}
                                 <div className={`hidden md:flex px-8 py-3 rounded-2xl ${branding.primary} ${branding.dark} text-white font-black text-sm uppercase border-b-4 shadow-lg items-center gap-3`}>
                                     <SignalLow size={18} strokeWidth={4} className="animate-pulse" /> Live Grid
                                 </div>
                             </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t-2 border-slate-50 relative z-[60]">
                        {facets.map(facet => (
                            <SuperDropdown
                                key={facet.id}
                                label={facet.label}
                                icon={getIconForFacet(facet.id)}
                                options={[{ id: 'ALL', label: `All ${facet.label}s` }, ...facet.options.map(opt => ({ id: opt, label: opt }))]}
                                value={selectedFilters[facet.id]?.[0] || 'ALL'}
                                onChange={(val) => handleDropdownChange(facet.id, val)}
                                color="blue"
                            />
                        ))}
                    </div>
                </div>
            </header>

            <main className="relative min-h-[600px] z-10">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] h-96 animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredPrograms.map((m, i) => (
                            <div key={m.id} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 30}ms` }}>
                                <ProgramCard program={m} />
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};
