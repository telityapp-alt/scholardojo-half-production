
import React, { useState, useEffect } from 'react';
import { DomainType } from '../../../../core/contracts/entityMap';
import { SaveService, SavedRecord, SavedItemType } from '../../../../core/access/saveAccess';
import { Heart, Trash2, ArrowRight, Library, Zap, GraduationCap, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SavedLibraryProps {
    domain: DomainType;
}

export const SavedLibrary: React.FC<SavedLibraryProps> = ({ domain }) => {
    const navigate = useNavigate();
    const [records, setRecords] = useState<SavedRecord[]>([]);
    const [activeTab, setActiveTab] = useState<SavedItemType | 'ALL'>('ALL');

    const loadRecords = () => {
        setRecords(SaveService.getByDomain(domain));
    };

    useEffect(() => {
        loadRecords();
        // Listen for internal storage events triggered by SaveService
        window.addEventListener('storage', loadRecords);
        return () => window.removeEventListener('storage', loadRecords);
    }, [domain]);

    const handleRemove = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        SaveService.toggle({ id }, 'PROGRAM', domain); 
        loadRecords();
    };

    const handleNavigate = (record: SavedRecord) => {
        const { type, id, domain } = record;
        const base = `/${domain}/discovery`;
        switch(type) {
            case 'PROGRAM': navigate(`${base}/programs/${id}`); break;
            case 'EVENT': navigate(`${base}/events/${id}`); break;
            case 'COMMUNITY': navigate(`${base}/community-board/${id}`); break;
        }
    };

    const filtered = activeTab === 'ALL' ? records : records.filter(r => r.type === activeTab);

    const TABS = [
        { id: 'ALL', label: 'All', icon: Library },
        { id: 'PROGRAM', label: 'Official', icon: GraduationCap },
        { id: 'COMMUNITY', label: 'Scouted', icon: Zap },
        { id: 'EVENT', label: 'Events', icon: Calendar },
    ];

    return (
        <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <Heart size={18} className="text-pink-500 fill-current" />
                    <h2 className="text-xl font-black text-slate-700 uppercase italic tracking-tighter">Collection</h2>
                </div>
                <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`
                                px-3 py-1.5 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all
                                ${activeTab === tab.id 
                                    ? 'bg-white text-pink-500 shadow-sm' 
                                    : 'text-slate-400 hover:text-slate-600'}
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filtered.map(record => (
                        <div 
                            key={record.id}
                            onClick={() => handleNavigate(record)}
                            className="group bg-white rounded-2xl border-2 border-slate-200 border-b-4 p-3 hover:border-pink-300 hover:bg-pink-50/30 transition-all cursor-pointer flex items-center gap-4 relative"
                        >
                            <div className={`w-10 h-10 rounded-xl border-b-2 flex items-center justify-center text-white shrink-0
                                ${record.type === 'COMMUNITY' ? 'bg-sky-400 border-sky-600' :
                                  record.type === 'EVENT' ? 'bg-purple-400 border-purple-600' :
                                  'bg-duo-green border-duo-greenDark'}
                            `}>
                                {React.createElement(TABS.find(t => t.id === record.type)?.icon || Library, { size: 18 })}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-black text-slate-700 truncate group-hover:text-pink-600 transition-colors">
                                    {record.data.title}
                                </h4>
                                <p className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-tight">
                                    {record.data.hostName || 'Organization'}
                                </p>
                            </div>

                            <button 
                                onClick={(e) => handleRemove(e, record.id)}
                                className="p-2 text-slate-200 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center bg-white rounded-[32px] border-2 border-dashed border-slate-200">
                    <Heart size={32} className="text-slate-100 mx-auto mb-2" />
                    <p className="text-xs font-black text-slate-300 uppercase tracking-widest">No bookmarks yet</p>
                </div>
            )}
        </div>
    );
};
