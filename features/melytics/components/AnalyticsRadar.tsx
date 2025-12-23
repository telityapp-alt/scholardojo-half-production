
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

interface AnalyticsRadarProps {
    scores: {
        technical: number;
        leadership: number;
        resilience: number;
        academic: number;
        fit: number;
        impact: number;
    };
    color?: string;
}

export const AnalyticsRadar: React.FC<AnalyticsRadarProps> = ({ scores, color = "#1cb0f6" }) => {
    // Corrected Mapping: ACAD must be first to appear at the TOP (12 o'clock)
    // Using values from Profile DNA directly
    const data = [
        { subject: 'ACAD', A: Math.max(10, Number(scores.academic) || 0) },
        { subject: 'TECH', A: Math.max(10, Number(scores.technical) || 0) },
        { subject: 'LEAD', A: Math.max(10, Number(scores.leadership) || 0) },
        { subject: 'IMPACT', A: Math.max(10, Number(scores.impact) || 0) },
        { subject: 'FIT', A: Math.max(10, Number(scores.fit) || 0) },
        { subject: 'RESIL', A: Math.max(10, Number(scores.resilience) || 0) },
    ];

    return (
        <div className="flex items-center justify-center overflow-visible">
            {/* 
                ULTIMATE PIXEL PRECISION:
                OuterRadius reduced to 50% of container to give 
                labels maximum breathing room. No more overlaps.
            */}
            <RadarChart 
                cx={125} 
                cy={100} 
                outerRadius={55} 
                width={250} 
                height={200} 
                data={data}
                className="drop-shadow-sm"
            >
                <PolarGrid stroke="#e2e8f0" strokeWidth={2} />
                <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900, letterSpacing: '0.02em' }} 
                />
                <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={false} 
                    axisLine={false} 
                />
                <Radar
                    name="Dojo Matrix"
                    dataKey="A"
                    stroke={color}
                    strokeWidth={4}
                    fill={color}
                    fillOpacity={0.4}
                    animationDuration={1000}
                    isAnimationActive={true}
                />
            </RadarChart>
        </div>
    );
};
