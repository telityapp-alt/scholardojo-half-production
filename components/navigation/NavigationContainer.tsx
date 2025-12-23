
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DomainType } from '../../core/contracts/entityMap';
import { ParentMenuId } from '../../core/types/navigation';
import { NAVIGATION_REGISTRY, GET_DOMAIN_PARENTS } from '../../core/contracts/navigationConfig';
import { useUserProgress } from '../../core/hooks/useUserProgress';
import { ParentMenuBar } from './ParentMenuBar';
import { TabNavigation } from './TabNavigation';
import { TabContentRenderer } from './TabContentRenderer';
import { 
    Swords, ChevronDown, Flame, Gem, Globe, Hammer, 
    FileText, Languages, Wrench, X, Info, Target, 
    GraduationCap, Briefcase, Sparkles, CheckCircle2 
} from 'lucide-react';
import { DuoIcon } from '../ui/DuoIcon';
import { DOMAIN_CONFIGS } from '../../core/contracts/domainConfig';
import { SenseiTrigger } from '../../features/sensei/components/SenseiTrigger';
import { RegionSwitcher } from './RegionSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../../core/hooks/useLanguage';
import { useRegion } from '../../core/hooks/useRegion';
import { UserFloatingCard } from '../../features/profile/components/UserFloatingCard';
import { ThemeEngine } from '../../core/engines/themeEngine';
import { EcosystemSwitcher } from './EcosystemSwitcher';

export const NavigationContainer: React.FC = () => {
  const navigate = useNavigate();
  const { domain, parent, tab, detailId } = useParams<{ domain: string; parent: string; tab: string; detailId?: string }>();
  const { lang, t } = useLanguage();
  const { regionId, activeRegion, isSwitching } = useRegion();
  
  const currentDomain = Object.values(DomainType).includes(domain as DomainType) ? (domain as DomainType) : DomainType.SCHOLAR;
  
  useEffect(() => {
    ThemeEngine.inject(currentDomain);
  }, [currentDomain]);

  const availableParents = GET_DOMAIN_PARENTS(currentDomain);
  const currentParentId = (parent as ParentMenuId) || availableParents[0].id;
  const currentParentConfig = availableParents.find(p => p.id === currentParentId) || availableParents[0];
  const currentTabId = tab || currentParentConfig.defaultTab;
  const currentTabConfig = currentParentConfig.tabs.find(t => t.id === currentTabId) || currentParentConfig.tabs[0];

  const { streak, gems, level } = useUserProgress(currentDomain);
  const domainConfig = DOMAIN_CONFIGS[currentDomain];
  
  const brand = currentDomain === 'intern' ? { text: 'text-duo-orange', icon: 'orange' } : 
                currentDomain === 'scholar' ? { text: 'text-duo-blue', icon: 'blue' } : 
                currentDomain === 'docs' ? { text: 'text-duo-purple', icon: 'purple' } :
                { text: 'text-duo-green', icon: 'green' };

  const handleTabChange = (tabId: string) => {
      navigate(`/${currentDomain}/${currentParentId}/${tabId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700 pb-20 relative">
      
      {/* NEW FLOATING ECOSYSTEM SWITCHER */}
      <EcosystemSwitcher />

      {/* TOP NAVIGATION BAR - CLEANED & COMPACT */}
      <div className="w-full px-4 pt-4 z-[3000] relative">
        <div className="max-w-6xl mx-auto w-full">
            <header className="flex flex-col gap-3">
                <div className="bg-white rounded-[28px] border-2 border-slate-200 border-b-[6px] p-1.5 flex flex-col xl:flex-row items-center justify-between shadow-sm gap-2">
                    <div className="w-full xl:w-auto flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <div className="relative shrink-0 w-full md:w-auto">
                            <div className="flex items-center gap-2.5 p-1.5 rounded-2xl group cursor-default">
                                <div className="relative group-hover:scale-110 transition-transform">
                                    <DuoIcon icon={currentDomain === 'docs' ? FileText : Swords} color={brand.icon as any} size="sm" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xl font-display font-black tracking-tighter ${brand.text}`}>
                                        {currentDomain.charAt(0).toUpperCase() + currentDomain.slice(1)}<span className="text-slate-800">dojo</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide shrink-0 px-2">
                            {currentDomain !== 'docs' ? (
                                <ParentMenuBar 
                                    domain={currentDomain} 
                                    activeParent={currentParentId} 
                                    onParentChange={(p) => navigate(`/${currentDomain}/${p}/${availableParents.find(p_ => p_.id === p)?.defaultTab}`)} 
                                />
                            ) : (
                                <div className="px-3 py-1 bg-purple-50 text-purple-600 rounded-xl font-display font-black text-[9px] uppercase tracking-widest border-2 border-purple-100 border-b-4 shadow-sm">Studio Protocol</div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pr-2">
                        <button 
                            onClick={() => navigate('/landing')}
                            className="p-1.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-300 hover:text-sky-500 hover:bg-sky-50 transition-all active:scale-90"
                            title="Mission Info"
                        >
                            <Info size={14} strokeWidth={3} />
                        </button>

                        <div className="flex items-center gap-1.5">
                            <LanguageSwitcher />
                            <RegionSwitcher />
                        </div>
                        
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-xl border-2 border-slate-200 border-b-4 group transition-colors">
                            <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'fill-orange-500 stroke-orange-600 animate-pulse-slow' : 'text-slate-200'}`} />
                            <span className="font-black text-slate-400 group-hover:text-orange-500 text-[10px]">{streak}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-xl border-2 border-slate-200 border-b-4 group transition-colors">
                            <Gem className={`w-3.5 h-3.5 ${gems > 0 ? 'fill-sky-400 stroke-sky-600' : 'text-slate-200'}`} />
                            <span className="font-black text-slate-400 group-hover:text-sky-500 text-[10px]">{gems}</span>
                        </div>
                    </div>
                </div>
                {currentDomain !== 'docs' && (
                    <TabNavigation parent={currentParentConfig} activeTab={currentTabId} domain={currentDomain} userLevel={level} onTabChange={handleTabChange} />
                )}
            </header>
        </div>
      </div>

      <main className="px-4 pt-1 z-[10]">
         <div className="max-w-6xl mx-auto">
            <TabContentRenderer tabId={currentTabId} componentKey={currentTabConfig.component} domain={currentDomain} detailId={detailId} />
         </div>
      </main>

      <UserFloatingCard />
      <SenseiTrigger config={domainConfig} />
    </div>
  );
};
