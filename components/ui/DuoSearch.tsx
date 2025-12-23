import React from 'react';
import { Search } from 'lucide-react';

interface DuoSearchProps {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
}

export const DuoSearch: React.FC<DuoSearchProps> = ({ value, onChange, placeholder = "Search..." }) => {
    return (
        <div className="relative w-full">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="w-5 h-5 text-slate-400" strokeWidth={3} />
            </div>
            <input 
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="
                    w-full pl-12 pr-4 py-3.5 
                    bg-white 
                    rounded-2xl 
                    border-2 border-slate-200 border-b-[4px]
                    text-slate-700 font-bold placeholder-slate-400
                    focus:outline-none focus:border-sky-400 focus:bg-sky-50
                    transition-all duration-200
                "
            />
        </div>
    );
};