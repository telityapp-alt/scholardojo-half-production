
import React from 'react';
import { ParentMenuId } from '../../core/types/navigation';
import { NAVIGATION_REGISTRY, GET_DOMAIN_PARENTS } from '../../core/contracts/navigationConfig';
import { DomainType } from '../../core/contracts/entityMap';
import { GraduationCap, LayoutDashboard, TrendingUp, Compass, Users, Briefcase, Dumbbell } from 'lucide-react';
import { useLanguage } from '../../core/hooks/useLanguage';

const PARENT_ICONS: Record<string, any> = {
  'GraduationCap': GraduationCap,
  'LayoutDashboard': LayoutDashboard,
  'TrendingUp': TrendingUp,
  'Compass': Compass,
  'Users': Users,
  'Briefcase': Briefcase,
  'Dumbbell': Dumbbell
};

interface ParentMenuBarProps {
  domain: DomainType;
  activeParent: ParentMenuId;
  onParentChange: (parentId: ParentMenuId) => void;
}

export const ParentMenuBar: React.FC<ParentMenuBarProps> = ({ domain, activeParent, onParentChange }) => {
  const { t } = useLanguage();
  const overrides = NAVIGATION_REGISTRY.domainOverrides[domain];
  const availableParents = GET_DOMAIN_PARENTS(domain);

  return (
    <>
      {availableParents.map((parent) => {
        const isActive = activeParent === parent.id;
        const Icon = PARENT_ICONS[parent.icon] || LayoutDashboard;
        
        // Use localized label
        const label = (t.navigation as any)[parent.id] || overrides.parentLabels[parent.id] || parent.label;

        // Strip uppercase and italic, keep font-display
        let baseClasses = "flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-b-[4px] transition-all font-display font-black text-[10px] tracking-tight active:border-b-2 active:translate-y-[2px] whitespace-nowrap shrink-0";
        let colorClasses = "";

        if (isActive) {
           switch(parent.color) {
               case 'blue': colorClasses = 'bg-white border-duo-blue border-b-duo-blueDark text-duo-blue shadow-sm'; break;
               case 'orange': colorClasses = 'bg-white border-duo-orange border-b-orange-600 text-duo-orange shadow-sm'; break;
               case 'red': colorClasses = 'bg-white border-duo-red border-b-duo-redDark text-duo-red shadow-sm'; break;
               case 'purple': colorClasses = 'bg-white border-duo-purple border-b-duo-purpleDark text-duo-purple shadow-sm'; break;
               case 'green': colorClasses = 'bg-white border-duo-green border-b-duo-greenDark text-duo-green shadow-sm'; break;
               default: colorClasses = 'bg-white border-sky-50 border-b-sky-600 text-sky-500 shadow-sm';
           }
        } else {
           colorClasses = 'bg-transparent border-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-600';
        }

        return (
          <button
            key={parent.id}
            onClick={() => onParentChange(parent.id)}
            className={`${baseClasses} ${colorClasses}`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'fill-current' : 'text-slate-300'}`} strokeWidth={3} />
            <span className="hidden lg:inline">{label}</span>
          </button>
        );
      })}
    </>
  );
};
