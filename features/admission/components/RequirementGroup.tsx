import React from 'react';
import { AdmissionRequirement } from '../types';
import { RequirementItem } from './RequirementItem';

interface RequirementGroupProps {
    index: number;
    category: string;
    items: AdmissionRequirement[];
    onUpdateStatus: (id: string, status: string) => void;
}

export const RequirementGroup: React.FC<RequirementGroupProps> = ({ index, category, items, onUpdateStatus }) => {
    return (
        <div className="animate-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
            <h3 className="font-black text-slate-700 text-lg mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center border border-indigo-200 shadow-sm">
                    {index + 1}
                </div>
                {category}
            </h3>
            
            <div className="bg-slate-50 rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm">
                {items.map((item, j) => (
                    <RequirementItem 
                        key={item.id} 
                        item={item} 
                        isLast={j === items.length - 1} 
                        onToggle={() => onUpdateStatus(item.id, item.status === 'VERIFIED' ? 'PENDING' : 'VERIFIED')}
                        onUpload={() => onUpdateStatus(item.id, 'UPLOADED')}
                    />
                ))}
            </div>
        </div>
    );
};