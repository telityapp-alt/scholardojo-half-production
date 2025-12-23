
import React, { useState, useEffect } from 'react';
import { Sparkles, PenTool, Quote, Fingerprint, RefreshCw, Loader2, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VisionService } from '../services/visionService';
import { useVisionAuth } from '../hooks/useVisionAuth';
import { DomainType, GenericHost, GenericVaultItem } from '../../../core/contracts/entityMap';
import { useParams } from 'react-router-dom';

interface VisionBoardProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Manifestation {
    year: string;
    campusId: string;
    major: string;
    scholarshipId: string;
    backupCampusId: string;
    isLocked: boolean;
    signedDate?: Date;
}

export const VisionBoardModal: React.FC<VisionBoardProps> = ({ isOpen, onClose }) => {
    const { domain } = useParams<{ domain: string }>();
    const currentDomain = (domain as DomainType) || DomainType.STUDENT;
    
    const { user } = useVisionAuth(currentDomain);
    const [loading, setLoading] = useState(true);
    
    // Data Sources
    const [campuses, setCampuses] = useState<GenericHost[]>([]);
    const [scholarships, setScholarships] = useState<GenericVaultItem[]>([]);
    const [majors, setMajors] = useState<string[]>([]);

    // Form State
    const [state, setState] = useState<Manifestation>({
        year: (new Date().getFullYear() + 1).toString(),
        campusId: '',
        major: '',
        scholarshipId: '',
        backupCampusId: '',
        isLocked: false
    });

    // --- INITIAL DATA LOAD ---
    useEffect(() => {
        if (!isOpen) return;

        const loadData = async () => {
            setLoading(true);
            try {
                const [campusList, vaultList] = await Promise.all([
                    VisionService.getHosts(currentDomain),
                    VisionService.getVaultItems(currentDomain)
                ]);

                setCampuses(campusList);
                setScholarships(vaultList);

                // Extract fake majors from departments for demo
                const allMajors = new Set<string>();
                campusList.forEach(c => {
                    c.departments?.forEach(d => {
                        allMajors.add(d.name); // Using dept name as proxy for Major
                        d.popularMajors?.forEach(m => allMajors.add(m));
                    });
                });
                // Fallbacks if empty
                if (allMajors.size === 0) {
                    allMajors.add('Computer Science');
                    allMajors.add('Business Administration');
                    allMajors.add('Psychology');
                }
                setMajors(Array.from(allMajors).sort());

                if (campusList.length > 0 && !state.campusId) {
                    setState(prev => ({
                        ...prev,
                        campusId: campusList[0].id,
                        backupCampusId: campusList[1]?.id || campusList[0].id,
                        major: Array.from(allMajors)[0] || 'Computer Science'
                    }));
                }
            } catch (e) {
                console.error("Failed to load manifestation data", e);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [isOpen, currentDomain]);

    // --- HANDLERS ---
    const handleManifest = () => {
        if (!state.campusId || !state.major) return;

        setState(prev => ({ ...prev, isLocked: true, signedDate: new Date() }));

        const duration = 3000;
        const end = Date.now() + duration;
        const frame = () => {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#1cb0f6', '#fbbf24', '#38bdf8'],
                zIndex: 202
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#1cb0f6', '#fbbf24', '#38bdf8'],
                zIndex: 202
            });
            if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
    };

    const handleEdit = () => {
        setState(prev => ({ ...prev, isLocked: false }));
    };

    const handleChange = (field: keyof Manifestation, value: string) => {
        setState(prev => ({ ...prev, [field]: value }));
    };

    // --- UI HELPERS ---
    const Select = ({ value, onChange, options }: any) => {
        if (state.isLocked) {
            const selectedLabel = options.find((o: any) => o.value === value)?.label || value;
            return (
                <span className="inline-block px-3 py-1 bg-[#1cb0f6]/10 border-2 border-[#1cb0f6] rounded-xl text-[#1cb0f6] font-black mx-1">
                    {selectedLabel}
                </span>
            );
        }
        return (
            <div className="relative inline-block mx-1 group align-middle my-1">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="appearance-none bg-white hover:bg-sky-50 border-2 border-slate-200 border-b-4 hover:border-sky-400 active:border-b-2 active:translate-y-[2px] text-sky-600 font-bold px-4 py-2 pr-8 rounded-2xl outline-none cursor-pointer transition-all min-w-[140px] text-center shadow-sm"
                >
                    {options.map((o: any) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sky-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        );
    };

    if (!isOpen) return null;

    const yearOptions = Array.from({ length: 6 }, (_, i) => {
        const y = new Date().getFullYear() + i;
        return { value: y.toString(), label: y.toString() };
    });
    const campusOptions = campuses.map(c => ({ value: c.id, label: c.name }));
    const scholarshipOptions = scholarships.map(s => ({ value: s.id, label: s.title }));
    const majorOptions = majors.map(m => ({ value: m, label: m }));

    // Terminology Adaptations based on Domain
    const terms = {
        host: currentDomain === DomainType.INTERN ? 'Company' : 'Student',
        target: currentDomain === DomainType.INTERN ? 'work at' : 'be a student at',
        role: currentDomain === DomainType.INTERN ? 'master the role of' : 'master',
        fund: currentDomain === DomainType.INTERN ? 'earning' : 'fully funded by the',
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>

            {/* Paper Card Container */}
            <div className="relative w-full max-w-4xl bg-[#fff9f0] rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300 border-4 border-slate-200">
                
                {/* Paper Texture Overlay (Subtle) */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 pointer-events-none z-0 mix-blend-multiply"></div>

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 w-12 h-12 bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl flex items-center justify-center transition-all border-2 border-slate-200 border-b-4 active:border-b-2 active:translate-y-[2px]"
                >
                    <X className="w-6 h-6 stroke-[3px]" />
                </button>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 relative z-10 scrollbar-thin scrollbar-thumb-slate-300">
                    
                    {loading ? (
                        <div className="h-96 flex flex-col items-center justify-center text-slate-300 animate-pulse">
                            <Loader2 className="w-16 h-16 mb-4 animate-spin text-sky-400" />
                            <p className="font-black text-2xl text-slate-400">Opening Scroll...</p>
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-6 py-2 mb-4 font-black uppercase text-xs tracking-widest rounded-full border-b-4 border-yellow-600 shadow-sm transform -rotate-2">
                                    <Sparkles className="w-4 h-4" /> Official Manifestation
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-700 leading-tight mb-2">
                                    The <span className="text-sky-500">Prophecy</span>
                                </h2>
                                <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">
                                    {currentDomain}Dojo Contract • #{Math.floor(Math.random() * 10000)}
                                </p>
                            </div>

                            {/* Main Content Area - The "Paper" Body */}
                            <div className={`
                                relative p-8 md:p-12 rounded-[32px] border-4 transition-all duration-500
                                ${state.isLocked ? 'bg-white border-[#1cb0f6] shadow-xl' : 'bg-white border-slate-200 border-dashed shadow-sm'}
                            `}>
                                {/* Decorative Quote Icon */}
                                <div className="absolute -top-6 -left-4">
                                    <div className="w-16 h-16 bg-sky-400 rounded-full flex items-center justify-center border-4 border-white shadow-lg text-white">
                                        <Quote className="w-8 h-8 fill-current" />
                                    </div>
                                </div>

                                <div className="mt-4 font-bold text-2xl md:text-3xl text-slate-500 leading-relaxed md:leading-[2.2]">
                                    <p className="mb-4">
                                        I, <span className="text-slate-800 font-black border-b-4 border-sky-200 px-1">{user?.name || "The Candidate"}</span>, hereby declare that in the year{" "}
                                        <Select 
                                            value={state.year} 
                                            onChange={(v: string) => handleChange('year', v)} 
                                            options={yearOptions} 
                                        />
                                        {" "}I will {terms.target}{" "}
                                        <Select 
                                            value={state.campusId} 
                                            onChange={(v: string) => handleChange('campusId', v)} 
                                            options={campusOptions} 
                                        />
                                        .
                                    </p>
                                    
                                    <p className="mb-4">
                                        I will {terms.role}{" "}
                                        <Select 
                                            value={state.major} 
                                            onChange={(v: string) => handleChange('major', v)} 
                                            options={majorOptions} 
                                        />
                                        , {terms.fund}{" "}
                                        <Select 
                                            value={state.scholarshipId} 
                                            onChange={(v: string) => handleChange('scholarshipId', v)} 
                                            options={scholarshipOptions} 
                                        />
                                        .
                                    </p>
                                    
                                    <p>
                                        Even if the path changes, I will succeed at{" "}
                                        <Select 
                                            value={state.backupCampusId} 
                                            onChange={(v: string) => handleChange('backupCampusId', v)} 
                                            options={campusOptions} 
                                        />
                                        .
                                    </p>
                                </div>

                                {/* Locked Status Footer */}
                                {state.isLocked && (
                                    <div className="mt-10 pt-8 border-t-2 border-slate-100 flex items-center justify-between animate-in slide-in-from-bottom-4 fade-in duration-700">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center border-4 border-green-200 text-green-600">
                                                <Fingerprint className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-0.5">Signed & Sealed</p>
                                                <p className="font-black text-slate-700 text-xl">{user?.name}</p>
                                                <p className="text-xs font-bold text-green-500 mt-0.5">
                                                    {state.signedDate?.toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="hidden md:block transform rotate-12">
                                            <div className="border-4 border-[#1cb0f6] text-[#1cb0f6] px-4 py-2 rounded-xl font-black text-2xl uppercase tracking-widest opacity-30">
                                                Committed
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-12 flex justify-center">
                                {!state.isLocked ? (
                                    <button 
                                        onClick={handleManifest}
                                        className="px-10 py-5 bg-[#1cb0f6] hover:bg-[#1899d6] text-white font-black text-xl rounded-2xl border-b-[6px] border-[#1899d6] active:border-b-0 active:translate-y-[6px] transition-all uppercase tracking-widest shadow-xl flex items-center gap-3 group"
                                    >
                                        Sign Commitment <PenTool className="w-6 h-6 stroke-[3px] group-hover:rotate-12 transition-transform" />
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handleEdit}
                                        className="text-slate-400 hover:text-sky-500 font-black text-sm uppercase tracking-widest flex items-center gap-2 transition-colors px-6 py-3 rounded-2xl hover:bg-white border-2 border-transparent hover:border-slate-200"
                                    >
                                        <RefreshCw className="w-4 h-4 stroke-[3px]" /> Edit Goals
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
