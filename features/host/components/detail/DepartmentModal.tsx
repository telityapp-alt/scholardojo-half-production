import React from 'react';
import { X, CheckCircle2, GraduationCap, ExternalLink, BookOpen } from 'lucide-react';
import { HostDepartment } from '../../../../core/contracts/entityMap';

interface DepartmentModalProps {
    department: HostDepartment;
    onClose: () => void;
}

export const DepartmentModal: React.FC<DepartmentModalProps> = ({ department, onClose }) => {
    
    // Dynamic deep link fallback
    const handleVisitSite = () => {
        const query = encodeURIComponent(`${department.name} information`);
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Card */}
            <div className="relative w-full max-w-2xl bg-white rounded-t-[32px] md:rounded-[32px] border-2 border-slate-200 border-b-0 md:border-b-[8px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300">
                
                {/* Header */}
                <div className={`p-6 md:p-8 ${department.bg} relative overflow-hidden shrink-0 border-b-2 ${department.border}`}>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 bg-white/50 hover:bg-white rounded-full flex items-center justify-center text-slate-500 transition-all border-2 border-white/20"
                    >
                        <X className="w-5 h-5 stroke-[3px]" />
                    </button>

                    <div className="relative z-10">
                        <div className={`w-16 h-16 rounded-2xl bg-white border-2 border-b-4 ${department.border} flex items-center justify-center mb-4 shadow-sm`}>
                            <span className="text-3xl">🎓</span> 
                        </div>
                        <h2 className={`text-3xl font-black leading-tight mb-2 ${department.color.replace('text-', 'text-slate-800')}`}>{department.name}</h2>
                        <p className="font-bold text-slate-600 text-sm md:text-base max-w-lg leading-relaxed">
                            {department.description}
                        </p>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50">
                    
                    {/* Degrees/Roles Section */}
                    <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 border-b-[6px]">
                        <h3 className="text-lg font-black text-slate-700 mb-4 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-sky-500" /> Tracks / Degrees
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {department.degrees.map((deg, i) => (
                                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-50 border-2 border-sky-100">
                                    <span className="font-black text-sky-600 text-sm">{deg}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Majors/Stack Section */}
                    {department.popularMajors && (
                        <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 border-b-[6px]">
                            <h3 className="text-lg font-black text-slate-700 mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-purple-500" /> Key Areas
                            </h3>
                            <div className="space-y-3">
                                {department.popularMajors.map((major, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border-2 border-slate-100">
                                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                        <span className="font-bold text-slate-600 text-sm">{major}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Box */}
                    <div className="flex gap-4 p-4 bg-green-50 rounded-2xl border-2 border-green-200">
                        <div className="shrink-0">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h4 className="font-black text-green-800 text-sm mb-1">Applications Open</h4>
                            <p className="text-green-700 text-xs font-bold leading-relaxed">
                                This department is currently accepting new applicants for the upcoming cycle.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Sticky Footer */}
                <div className="p-6 bg-white border-t-2 border-slate-100 flex items-center justify-between gap-4 shrink-0">
                    <div className="hidden md:block">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Department</p>
                        <p className="font-black text-slate-700">Admissions Open</p>
                    </div>
                    <button 
                        onClick={handleVisitSite}
                        className="w-full md:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest border-b-[6px] border-slate-900 active:border-b-0 active:translate-y-[6px] transition-all flex items-center justify-center gap-2 shadow-xl"
                    >
                        Visit Website <ExternalLink className="w-5 h-5 stroke-[3px]" />
                    </button>
                </div>

            </div>
        </div>
    );
};