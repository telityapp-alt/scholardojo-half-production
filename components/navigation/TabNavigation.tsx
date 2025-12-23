
import React from 'react';
import { ParentMenuConfig } from '../../core/types/navigation';
import { DomainType } from '../../core/contracts/entityMap';
import { NAVIGATION_REGISTRY } from '../../core/contracts/navigationConfig';
import { isTabUnlocked } from '../../core/engines/levelEngine';
import { NAV_ICON_MAP } from '../../core/contracts/featureRegistry';
import { LockedTabTooltip } from './LockedTabTooltip';
import { Lock, Sparkles } from 'lucide-react';
import { useLanguage } from '../../core/hooks/useLanguage';

interface TabNavigationProps {
  parent: ParentMenuConfig;
  activeTab: string;
  domain: DomainType;
  userLevel: number;
  onTabChange: (tabId: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ parent, activeTab, domain, userLevel, onTabChange }) => {
  const { t } = useLanguage();
  const overrides = NAVIGATION_REGISTRY.domainOverrides[domain];

  return (
    <nav className="flex items-center gap-3 overflow-x-visible pb-4 pt-2 px-1 w-full no-scrollbar relative z-[60]">
      {parent.tabs.map((tab) => {
        const unlocked = isTabUnlocked(tab, userLevel);
        const isActive = activeTab === tab.id;
        const isScout = tab.id === 'community-board';
        
        // Use localization map
        const label = (t.navigation as any)[tab.id] || overrides.tabLabels[tab.id] || tab.label;
        const Icon = NAV_ICON_MAP[tab.icon] || NAV_ICON_MAP['program'];

        let baseClasses = "relative group flex items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-200 border-2 border-b-[5px] shrink-0 focus:outline-none capitalize whitespace-nowrap";
        let stateClasses = "";
        
        if (isActive) {
             if (isScout) {
                 stateClasses = 'bg-sky-50 border-duo-blue text-duo-blue active:border-b-2 active:translate-y-[3px] shadow-sm';
             } else {
                 switch(parent.color) {
                    case 'blue': stateClasses = 'bg-duo-blueLight border-duo-blue text-duo-blue active:border-b-2 active:translate-y-[3px]'; break;
                    case 'orange': stateClasses = 'bg-orange-50 border-duo-orange text-duo-orange active:border-b-2 active:translate-y-[3px]'; break;
                    case 'red': stateClasses = 'bg-red-50 border-duo-red text-duo-red active:border-b-2 active:translate-y-[3px]'; break;
                    case 'purple': stateClasses = 'bg-duo-purpleLight border-duo-purple text-duo-purple active:border-b-2 active:translate-y-[3px]'; break;
                    case 'green': stateClasses = 'bg-duo-greenLight border-duo-green text-duo-green active:border-b-2 active:translate-y-[3px]'; break;
                    default: stateClasses = 'bg-sky-100 border-sky-500 text-sky-600 active:border-b-2 active:translate-y-[3px]';
                }
             }
        } else if (unlocked) {
            stateClasses = isScout 
                ? 'bg-white border-sky-200 text-sky-500 hover:bg-sky-50 border-b-sky-300' 
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 border-b-slate-300 hover:-translate-y-0.5';
        } else {
            stateClasses = 'bg-slate-100 border-slate-200 text-slate-300 border-b-slate-200 cursor-not-allowed';
        }

        return (
          <button
            key={tab.id}
            onClick={() => unlocked && onTabChange(tab.id)}
            disabled={!unlocked}
            className={`${baseClasses} ${stateClasses}`}
          >
            {unlocked ? (
                 <Icon className={`w-5 h-5 ${isActive ? 'fill-current' : isScout ? 'text-sky-400' : 'text-slate-400'}`} strokeWidth={2} />
            ) : (
                 <Lock className="w-4 h-4" />
            )}
            
            <span className="font-bold text-sm tracking-tight uppercase">
              {label}
            </span>

            {isScout && (
                <div className="absolute -top-3 -right-2 bg-sky-500 text-white text-[7px] font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-md flex items-center gap-0.5 z-[70] transform rotate-3">
                    <Sparkles size={6} fill="currentColor" /> SCOUT
                </div>
            )}

            {tab.comingSoon && unlocked && (
                <span className="bg-slate-200 text-slate-500 text-[10px] px-2 py-0.5 rounded-lg font-bold uppercase ml-1">Soon</span>
            )}

            {!unlocked && <LockedTabTooltip tab={tab} currentLevel={userLevel} />}
          </button>
        );
      })}
    </nav>
  );
};
