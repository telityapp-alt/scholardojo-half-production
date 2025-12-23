import React from 'react';
import { Sparkles } from 'lucide-react';

interface VisionTriggerProps {
    onClick: () => void;
}

export const VisionTrigger: React.FC<VisionTriggerProps> = ({ onClick }) => {
    return (
        <div 
            onClick={onClick}
            className="bg-sky-400 rounded-[32px] border-b-[8px] border-sky-600 p-6 flex flex-col md:flex-row items-center gap-6 cursor-pointer hover:bg-sky-300 active:border-b-0 active:translate-y-[6px] transition-all relative overflow-hidden group shadow-xl shadow-sky-100"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30 shrink-0 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-white fill-white" />
            </div>
            <div className="flex-1 text-center md:text-left relative z-10">
                <h3 className="text-2xl font-black text-white mb-1">Manifest Your Future</h3>
                <p className="text-sky-100 font-bold text-sm">Open your Vision Board contract and set your goals.</p>
            </div>
            <div className="bg-white text-sky-500 px-6 py-3 rounded-xl font-black uppercase text-sm border-b-[4px] border-sky-200 shrink-0 shadow-sm">
                Open Contract
            </div>
        </div>
    );
};