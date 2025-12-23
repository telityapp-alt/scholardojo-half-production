
import React, { useState, useEffect, useCallback } from 'react';
import { CheckSquare, PlusCircle, LayoutGrid, Search, ArrowRight, ClipboardList } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdmissionService } from '../services/admissionService';
import { AdmissionApp } from '../types';
import { AdmissionCard } from './AdmissionCard';
import { AdmissionDetail } from './AdmissionDetail';
import { DomainType } from '../../../core/contracts/entityMap';
import { useStorageSync } from '../../../core/hooks/useStorageSync';

export const AdmissionView: React.FC = () => {
    const { domain } = useParams<{ domain: string }>();
    const navigate = useNavigate();
    const currentDomain = (domain as DomainType) || DomainType.STUDENT;

    const [view, setView] = useState<'LIST' | 'DETAIL'>('LIST');
    const [apps, setApps] = useState<AdmissionApp[]>([]);
    const [selectedApp, setSelectedApp] = useState<AdmissionApp | null>(null);
    const [loading, setLoading] = useState(true);

    const loadApps = useCallback(() => {
        const data = AdmissionService.getApps(currentDomain);
        setApps(data);
        setLoading(false);
    }, [currentDomain]);

    useEffect(() => {
        setLoading(true);
        loadApps();
    }, [loadApps, view]);

    // Memory-safe cross-tab sync
    useStorageSync(loadApps);

    const handleSelect = (app: AdmissionApp) => {
        setSelectedApp(app);
        setView('DETAIL');
    };

    const handleDelete = (id: string) => {
        AdmissionService.deleteApp(id);
        setView('LIST');
        setSelectedApp(null);
    };

    const handleBack = () => {
        setView('LIST');
        setSelectedApp(null);
    };

    const handleFindNew = () => {
        navigate(`/${currentDomain}/discovery/programs`);
    };

    if (view === 'DETAIL' && selectedApp) {
        return (
            <AdmissionDetail 
                app={selectedApp} 
                onBack={handleBack} 
                onDelete={() => handleDelete(selectedApp.id)} 
            />
        );
    }

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500 pb-20 max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 shrink-0">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 flex items-center gap-4 tracking-tighter italic uppercase">
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl border-b-[6px] border-black flex items-center justify-center text-white shadow-xl">
                            <ClipboardList size={28} strokeWidth={3} />
                        </div>
                        Admission Desk
                    </h1>
                    <p className="text-slate-400 font-bold text-sm mt-2 ml-16 uppercase tracking-widest">
                        Your active target mission registry.
                    </p>
                </div>

                <button 
                    onClick={handleFindNew}
                    className="bg-[#1cb0f6] hover:brightness-110 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest border-b-[6px] border-[#1899d6] active:border-b-0 active:translate-y-[6px] transition-all flex items-center gap-3 shadow-xl shadow-sky-900/10"
                >
                    <PlusCircle size={20} strokeWidth={3} /> Add Mission
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1,2,3].map(i => <div key={i} className="h-32 bg-slate-100 rounded-[24px] animate-pulse" />)}
                </div>
            ) : apps.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-[48px] border-2 border-slate-200 border-b-[10px] border-dashed p-12 md:p-20 text-center">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 shadow-sm border-2 border-slate-100">
                        <LayoutGrid className="w-12 h-12 text-slate-200" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-700 mb-2 uppercase italic tracking-tighter">Your desk is clean</h3>
                    <p className="text-slate-400 font-bold mb-10 max-w-md leading-relaxed">
                        No active missions detected. Secure a target program in the explorer to initialize your strike registry.
                    </p>
                    <button 
                        onClick={handleFindNew}
                        className="bg-white hover:bg-slate-50 text-[#1cb0f6] px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest border-2 border-slate-200 border-b-[6px] active:border-b-2 active:translate-y-[4px] transition-all flex items-center gap-3"
                    >
                        Browse Missions <ArrowRight size={18} strokeWidth={4} />
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {apps.map(app => (
                        <AdmissionCard 
                            key={app.id}
                            app={app} 
                            onClick={() => handleSelect(app)}
                        />
                    ))}
                    
                    <button 
                        onClick={handleFindNew}
                        className="group h-[104px] rounded-[24px] border-4 border-dashed border-slate-200 hover:border-sky-300 hover:bg-sky-50 transition-all flex flex-col items-center justify-center cursor-pointer"
                    >
                        <PlusCircle className="w-8 h-8 text-slate-200 group-hover:text-sky-500 transition-colors" strokeWidth={3} />
                        <span className="font-black text-[10px] text-slate-300 group-hover:text-sky-500 uppercase tracking-widest mt-2">New Target</span>
                    </button>
                </div>
            )}
        </div>
    );
};
