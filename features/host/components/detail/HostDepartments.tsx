import React, { useState } from 'react';
import { ChevronLeft, Building2, Shield, Heart, Zap, BookOpen, FlaskConical, Cpu } from 'lucide-react';
import { GenericHost, HostDepartment } from '../../../../core/contracts/entityMap';
import { DepartmentModal } from './DepartmentModal';
import { DuoIcon, DuoColor } from '../../../../components/ui/DuoIcon';

interface HostDepartmentsProps {
    host: GenericHost;
}

export const HostDepartments: React.FC<HostDepartmentsProps> = ({ host }) => {
    const [selectedDept, setSelectedDept] = useState<HostDepartment | null>(null);

    // Icon mapping
    const ICONS: any = {
        Building2, Shield, Heart, Zap, BookOpen, FlaskConical, Cpu
    };

    const getDeptColor = (tailwindClass: string): DuoColor => {
        if (tailwindClass.includes('sky') || tailwindClass.includes('blue')) return 'blue';
        if (tailwindClass.includes('green')) return 'green';
        if (tailwindClass.includes('pink') || tailwindClass.includes('red')) return 'red';
        if (tailwindClass.includes('orange')) return 'orange';
        if (tailwindClass.includes('purple')) return 'purple';
        return 'gray';
    };

    if (!host.departments || host.departments.length === 0) {
        return <div className="p-8 text-center text-slate-400 font-bold">No departments listed.</div>;
    }

    return (
        <div className="space-y-4 animate-in fade-in">
            {selectedDept && (
                <DepartmentModal 
                    department={selectedDept} 
                    onClose={() => setSelectedDept(null)} 
                />
            )}

            {host.departments.map((dept, i) => {
                const Icon = ICONS[dept.icon] || BookOpen;
                const colorTheme = getDeptColor(dept.color);

                return (
                    <div 
                        key={dept.id} 
                        onClick={() => setSelectedDept(dept)}
                        className="bg-white p-4 rounded-3xl border-2 border-slate-200 border-b-[6px] hover:border-sky-300 hover:border-b-sky-500 transition-all cursor-pointer group flex items-center gap-4 active:border-b-2 active:translate-y-[4px]"
                    >
                        {/* Icon Block */}
                        <DuoIcon icon={Icon} color={colorTheme} size="xl" />

                        <div className="flex-1">
                            <h4 className="text-lg font-black text-slate-700 group-hover:text-sky-600 transition-colors">{dept.name}</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {dept.degrees.map(deg => (
                                    <span key={deg} className="px-2 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-wide border-b-2 border-slate-200">
                                        {deg}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="hidden md:block pr-4">
                            <ChevronLeft className="w-6 h-6 text-slate-300 rotate-180 stroke-[3px] group-hover:text-sky-400 transition-colors" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};