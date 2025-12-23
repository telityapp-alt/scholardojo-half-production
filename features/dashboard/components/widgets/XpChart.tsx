import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, YAxis } from 'recharts';
// Fix: Added missing Target icon import from lucide-react
import { Target } from 'lucide-react';

interface XpChartProps {
    data: { name: string; tasks: number }[];
}

export const XpChart: React.FC<XpChartProps> = ({ data }) => {
    return (
        <div className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[12px] p-8 md:p-10 relative overflow-hidden shadow-sm group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center border-b-4 border-yellow-600 shadow-md transform rotate-3">
                         <span className="text-white font-black text-2xl">XP</span>
                    </div>
                    <div>
                        <h3 className="font-black text-2xl text-slate-800 tracking-tighter">Combat History</h3>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Growth Analytics</p>
                    </div>
                </div>
                <div className="px-5 py-2.5 rounded-2xl bg-slate-50 font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] border-2 border-slate-100 shadow-inner">
                    Tactical Timeline
                </div>
            </div>
            
            <div className="h-64 w-full relative z-10 pr-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff9600" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#ff9600" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900, letterSpacing: '0.1em'}} 
                            dy={15} 
                        />
                        <YAxis hide domain={[0, 'auto']} />
                        <Tooltip 
                            cursor={{ stroke: '#e2e8f0', strokeWidth: 2, strokeDasharray: '5 5' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-slate-900 px-4 py-2.5 rounded-2xl border-b-[5px] border-black shadow-2xl animate-in zoom-in-95 duration-150">
                                            <p className="text-yellow-400 font-black text-lg leading-none">+{payload[0].value} XP</p>
                                            <p className="text-slate-500 font-black text-[9px] uppercase mt-1 tracking-widest">{payload[0].payload.name}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="tasks" 
                            stroke="#ff9600" 
                            strokeWidth={6} 
                            fillOpacity={1} 
                            fill="url(#colorXp)"
                            animationDuration={2000}
                            animationBegin={300}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -left-10 -bottom-10 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-[5000ms]">
                <Target size={300} />
            </div>
        </div>
    );
};