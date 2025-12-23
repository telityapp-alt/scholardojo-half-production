
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DomainType } from '../../../core/contracts/entityMap';
import { DOMAIN_CONFIGS } from '../../../core/contracts/domainConfig';
import { useDashboardLogic } from '../hooks/useDashboardLogic';
import { AlertTriangle, Lock, RefreshCw, Zap, Fingerprint } from 'lucide-react';

// Widgets
import { WelcomeHeader } from './widgets/WelcomeHeader';
import { StatsRow } from './widgets/StatsRow';
import { QuestFeed } from './widgets/QuestFeed';
import { XpChart } from './widgets/XpChart';
import { LeagueWidget } from './widgets/LeagueWidget';
import { VisionTrigger } from './widgets/VisionTrigger';
import { VisionBoardModal } from './VisionBoardModal';
import { SavedLibrary } from './widgets/SavedLibrary';
import { PricingModal } from '../../premium/components/PricingModal';
import { ProfileFoundation } from './ProfileFoundation';
import { StorageGuard } from '../../../services/storageGuard';
import { ProfileAccess } from '../../../core/access/profileAccess';

export const DashboardView: React.FC = () => {
  const { domain } = useParams<{ domain: string }>();
  const navigate = useNavigate();
  const currentDomain = Object.values(DomainType).find(d => d === domain) as DomainType || DomainType.STUDENT;
  const config = DOMAIN_CONFIGS[currentDomain];

  const { user, stats, quests, xpHistory, loading } = useDashboardLogic(config);
  const [isVisionOpen, setIsVisionOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [storageUsage, setStorageUsage] = useState(0);
  const [dna, setDna] = useState(() => ProfileAccess.getDNA(currentDomain));

  useEffect(() => {
      setStorageUsage(StorageGuard.getUsagePercentage());
      setDna(ProfileAccess.getDNA(currentDomain));
  }, [loading, currentDomain]);

  const handleNavigate = (path: string) => {
      navigate(`/${currentDomain}/workspace/${path}`);
  };

  const handleDiscovery = () => {
      navigate(`/${currentDomain}/discovery/programs`);
  };

  if (loading) {
      return (
          <div className="space-y-12 animate-in fade-in duration-500 px-4 flex flex-col items-center justify-center py-40">
              <div className="w-32 h-32 bg-white rounded-[40px] border-b-[12px] border-slate-200 flex items-center justify-center text-[#1cb0f6] shadow-xl animate-bounce">
                  <RefreshCw size={64} className="animate-spin" />
              </div>
              <p className="font-black text-slate-300 uppercase tracking-[0.4em] text-sm">Syncing Neural Grid...</p>
          </div>
      );
  }

  return (
    <div className="space-y-12 pb-40 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-7xl mx-auto px-4">
      
      {/* STORAGE WARNING BANNER */}
      {storageUsage > 85 && (
          <div className="bg-red-50 border-2 border-red-100 p-5 rounded-[28px] border-b-[6px] border-red-200 flex items-center gap-5 text-red-600 animate-pulse shadow-sm">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md">
                 <AlertTriangle size={20} strokeWidth={3} />
              </div>
              <p className="font-black text-[10px] uppercase tracking-[0.1em] leading-relaxed">
                  Mission Storage Is {storageUsage}% Full. Clean your dossier to ensure tactical continuity.
              </p>
          </div>
      )}

      <VisionBoardModal isOpen={isVisionOpen} onClose={() => setIsVisionOpen(false)} />
      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} currentDomain={currentDomain} />

      <WelcomeHeader user={user} config={config} onPrimaryAction={handleDiscovery} />

      <StatsRow 
          xp={stats.xp} 
          activeQuests={stats.activeQuests} 
          totalApps={stats.totalApps} 
          submittedApps={stats.submittedApps}
          gpa={{ current: dna.currentGpa, max: dna.maxGpa }}
          labels={{ apps: config.labels.requirement + 's', tracker: config.labels.tracker }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-12">
            <VisionTrigger onClick={() => setIsVisionOpen(true)} />
            <QuestFeed quests={quests} onNavigate={handleNavigate} />
            <XpChart data={xpHistory} />
        </div>

        <div className="lg:col-span-4 space-y-10">
             {user && <LeagueWidget user={user} />}
             
             {/* PRO UPGRADE - DUO STYLE */}
             <div 
                onClick={() => setIsPricingOpen(true)}
                className="relative overflow-hidden bg-[#1cb0f6] rounded-[48px] border-b-[16px] border-[#1899d6] p-10 text-white text-center group cursor-pointer active:border-b-0 active:translate-y-[16px] transition-all shadow-2xl hover:brightness-110"
             >
                 <div className="absolute top-0 left-0 w-full h-full bg-white/10 -skew-x-12 scale-150 origin-bottom-left group-hover:translate-x-10 transition-transform duration-1000"></div>
                 <div className="relative z-10">
                    <div className="w-20 h-20 bg-white/20 rounded-[32px] flex items-center justify-center mx-auto mb-6 backdrop-blur-md border-2 border-white/30 shadow-xl group-hover:scale-110 transition-transform">
                        <Lock size={40} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="font-black text-3xl mb-3 tracking-tighter uppercase italic leading-none">Super Ninja</h3>
                    <p className="text-sky-100 text-base font-bold mb-8 leading-relaxed opacity-90">Unlock elite blueprints & priority AI audits.</p>
                    <button className="w-full bg-white text-sky-500 py-5 rounded-[24px] font-black border-b-[8px] border-sky-100 group-active:border-b-0 group-active:translate-y-[8px] transition-all uppercase tracking-widest text-sm shadow-xl">
                        Become Elite
                    </button>
                 </div>
             </div>

             <div className="bg-white p-8 rounded-[40px] border-2 border-slate-200 border-b-[12px] flex items-center gap-6 group hover:border-sky-300 transition-all">
                <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-400 group-hover:bg-sky-400 group-hover:text-white transition-all border-b-4 border-slate-100">
                    <Zap size={28} strokeWidth={3} />
                </div>
                <div>
                    <h4 className="font-black text-slate-700 uppercase tracking-tighter italic">Quick Boost</h4>
                    <p className="text-slate-400 font-bold text-xs">Analyze documents to gain instant XP.</p>
                </div>
             </div>
        </div>
      </div>

      <SavedLibrary domain={currentDomain} />

      {/* --- NEURAL IDENTITY SECTION (FORMERLY PROFILE) --- */}
      <div className="pt-20 border-t-4 border-slate-200 border-dashed">
          <div className="flex items-center gap-4 mb-10 px-2">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl border-b-4 border-black flex items-center justify-center text-white shadow-lg">
                  <Fingerprint size={24} strokeWidth={3} />
              </div>
              <div>
                  <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">Neural Identity</h2>
                  <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mt-1">Foundation Data Management</p>
              </div>
          </div>
          <ProfileFoundation domain={currentDomain} />
      </div>
    </div>
  );
};
