
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { DomainType } from '../../../core/contracts/entityMap';
import { SkillService } from '../services/skillService';
import { SkillMaster } from '../types';
import { DuoSearch } from '../../../components/ui/DuoSearch';
import { SuperDropdown } from '../../../components/ui/SuperDropdown';
import { BookOpen, Layers, Search, ArrowRight, Star, Target } from 'lucide-react';
import { SkillPath } from './SkillPath';

export const SkillsView: React.FC = () => {
    const { domain } = useParams<{ domain: string }>();
    const domainEnum = (domain as DomainType) || DomainType.STUDENT;

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('ALL');
    const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

    const skills = useMemo(() => SkillService.getSkills(domainEnum), [domainEnum]);

    const filteredSkills = skills.filter(s => {
        if (search && !s.title.toLowerCase().includes(search.toLowerCase())) return false;
        if (category !== 'ALL' && s.category !== category) return false;
        return true;
    });

    const selectedSkill = useMemo(() => 
        skills.find(s => s.id === selectedSkillId) || null
    , [selectedSkillId, skills]);

    const CATEGORY_OPTIONS = [
        { id: 'ALL', label: 'All Categories' },
        { id: 'Technical', label: 'Technical' },
        { id: 'Soft Skills', label: 'Soft Skills' },
        { id: 'Language', label: 'Language' },
        { id: 'Strategic', label: 'Strategic' },
    ];

    return (
        <div className="h-[calc(100vh-160px)] flex gap-0 -mx-4 -mt-4 overflow-hidden">
            {/* LEFT PANE: LIST AREA */}
            <div className={`flex flex-col h-full transition-all duration-500 ease-in-out px-4 py-6 ${selectedSkill ? 'w-[40%]' : 'w-full'}`}>
                {/* Header Section */}
                <div className="shrink-0 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b-2 border-slate-200 pb-8">
                        <div>
                            <h1 className="text-3xl font-black text-slate-700 tracking-tight flex items-center gap-3">
                                <div className="w-12 h-12 bg-[#58cc02] rounded-xl border-b-[5px] border-[#46a302] flex items-center justify-center text-white shadow-lg shrink-0">
                                    <Target size={28} strokeWidth={2.5} />
                                </div>
                                Skillspace
                            </h1>
                            <p className="text-slate-400 font-bold text-sm mt-2">
                                Power up your profile with Master Skills.
                            </p>
                        </div>
                        <div className={`w-full transition-all ${selectedSkill ? 'md:w-48' : 'md:w-80'}`}>
                            <DuoSearch value={search} onChange={setSearch} placeholder="Search skills..." />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <div className="w-56">
                            <SuperDropdown 
                                label="Category" 
                                icon={Layers} 
                                options={CATEGORY_OPTIONS} 
                                value={category} 
                                onChange={setCategory} 
                                color="green" 
                            />
                        </div>
                    </div>
                </div>

                {/* Grid Area */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-12 scrollbar-thin scrollbar-thumb-slate-200">
                    <div className={`grid gap-6 ${selectedSkill ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {filteredSkills.map(skill => {
                            const isActive = selectedSkillId === skill.id;
                            return (
                                <div 
                                    key={skill.id} 
                                    onClick={() => setSelectedSkillId(isActive ? null : skill.id)}
                                    className={`
                                        group rounded-[32px] border-2 border-b-[8px] p-6 cursor-pointer transition-all active:translate-y-[4px] active:border-b-2
                                        ${isActive 
                                            ? 'bg-sky-50 border-sky-400 border-b-sky-600 scale-[1.02]' 
                                            : 'bg-white border-slate-200 border-b-slate-300 hover:border-sky-300 hover:bg-slate-50'}
                                    `}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 bg-white rounded-2xl border-2 border-slate-100 flex items-center justify-center p-3 shadow-sm shrink-0 group-hover:rotate-2 transition-transform">
                                            <img src={skill.image} alt="" className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className={`text-xl font-black leading-tight truncate ${isActive ? 'text-sky-700' : 'text-slate-700'}`}>{skill.title}</h3>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <Star size={10} className="text-yellow-400 fill-current" />
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{skill.category}</span>
                                            </div>
                                        </div>
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-sky-500 text-white border-b-4 border-sky-700' : 'bg-slate-50 text-slate-200 border-b-4 border-slate-100 group-hover:text-sky-400'}`}>
                                            <ArrowRight size={20} strokeWidth={4} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredSkills.length === 0 && (
                        <div className="py-20 text-center">
                            <Search size={48} className="text-slate-200 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold">No skills found in this Dojo.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT PANE: INTEGRATED ROADMAP SIDEBAR */}
            <div className={`h-full transition-all duration-500 ease-out overflow-hidden ${selectedSkill ? 'w-[60%]' : 'w-0'}`}>
                {selectedSkill ? (
                    <div className="h-full">
                         <SkillPath 
                            skill={selectedSkill} 
                            onClose={() => setSelectedSkillId(null)} 
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
};
