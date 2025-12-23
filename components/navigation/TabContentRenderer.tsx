
import React, { lazy, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DomainType } from '../../core/contracts/entityMap';
import { ErrorBoundary } from '../shared/ErrorBoundary';
import { RefreshCw } from 'lucide-react';

// LAZY LOAD ALL FEATURES
const ProgramsListView = lazy(() => import('../../features/programs/components/ProgramsListView').then(m => ({ default: m.ProgramsListView })));
const ProgramDetailView = lazy(() => import('../../features/programs/components/ProgramDetailView').then(m => ({ default: m.ProgramDetailView })));
const EventsView = lazy(() => import('../../features/events/components/EventsView').then(m => ({ default: m.EventsView })));
const EventDetail = lazy(() => import('../../features/events/components/EventDetail').then(m => ({ default: m.EventDetail })));
const HostsView = lazy(() => import('../../features/host/components/HostsView').then(m => ({ default: m.HostsView })));
const HostDetail = lazy(() => import('../../features/host/components/HostDetail').then(m => ({ default: m.HostDetail })));
const QuestView = lazy(() => import('../../features/quest/components/QuestView').then(m => ({ default: m.QuestView })));
const PlanView = lazy(() => import('../../features/plan/components/PlanView').then(m => ({ default: m.PlanView })));
const AdmissionView = lazy(() => import('../../features/admission/components/AdmissionView').then(m => ({ default: m.AdmissionView })));
const DashboardView = lazy(() => import('../../features/dashboard/components/DashboardView').then(m => ({ default: m.DashboardView })));
const CommunityHub = lazy(() => import('../../features/community/components/CommunityHub').then(m => ({ default: m.CommunityHub })));
const CommunityDetail = lazy(() => import('../../features/community/components/CommunityDetail').then(m => ({ default: m.CommunityDetail })));
const CurriculumView = lazy(() => import('../../features/curriculum/components/CurriculumView').then(m => ({ default: m.CurriculumView })));
const CurriculumDetail = lazy(() => import('../../features/curriculum/components/CurriculumDetail').then(m => ({ default: m.CurriculumDetail })));
const MelyticsView = lazy(() => import('../../features/melytics/components/MelyticsView').then(m => ({ default: m.MelyticsView })));
const ArenaView = lazy(() => import('../../features/arena/components/ArenaView').then(m => ({ default: m.ArenaView })));
const SkillsView = lazy(() => import('../../features/skills/components/SkillsView').then(m => ({ default: m.SkillsView })));
const TargetView = lazy(() => import('../../features/target/components/TargetView').then(m => ({ default: m.TargetView })));
const TargetDashboard = lazy(() => import('../../features/target/components/TargetDashboard').then(m => ({ default: m.TargetDashboard })));
const TargetDemo = lazy(() => import('../../features/target/components/TargetDemo').then(m => ({ default: m.TargetDemo })));
const ForgeView = lazy(() => import('../../features/forge/components/ForgeView').then(m => ({ default: m.ForgeView })));
const DocsHome = lazy(() => import('../../features/docs/components/DocsHome').then(m => ({ default: m.DocsHome })));
const DocsEditor = lazy(() => import('../../features/docs/components/DocsEditor').then(m => ({ default: m.DocsEditor })));
const CompetitionHome = lazy(() => import('../../features/competition/components/CompetitionHome').then(m => ({ default: m.CompetitionHome })));
const ResearchHome = lazy(() => import('../../features/research/components/ResearchHome').then(m => ({ default: m.ResearchHome })));
const EssayReviewerMain = lazy(() => import('../../features/essayReviewer/components/EssayReviewerMain').then(m => ({ default: m.EssayReviewerMain })));
const EssayReviewerHome = lazy(() => import('../../features/essayReviewer/components/EssayReviewerHome').then(m => ({ default: m.EssayReviewerHome })));

const LoadingFallback = () => (
    <div className="w-full py-40 flex flex-col items-center justify-center animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-white rounded-2xl border-b-[8px] border-slate-200 flex items-center justify-center text-sky-500 shadow-xl mb-6">
            <RefreshCw className="animate-spin" size={32} />
        </div>
        <p className="font-black text-[10px] text-slate-300 uppercase tracking-[0.4em]">Neural Sync...</p>
    </div>
);

interface TabContentRendererProps {
  tabId: string;
  componentKey: string;
  domain: DomainType;
  detailId?: string; 
}

export const TabContentRenderer: React.FC<TabContentRendererProps> = ({ tabId, componentKey, domain, detailId }) => {
  const navigate = useNavigate();

  const renderContent = () => {
    switch (componentKey) {
        case 'CompetitionHome': return <CompetitionHome />;
        case 'ResearchHome': return <ResearchHome />;
        
        case 'EssayReviewer': 
            if (detailId) return <EssayReviewerMain />;
            return <EssayReviewerHome />;
        
        case 'UnifiedProgramsView':
          if (detailId) return <ProgramDetailView />;
          return <ProgramsListView />;
    
        case 'SecuredProgramsView':
          if (detailId) return <ProgramDetailView />;
          return <ProgramsListView securedOnly={true} />;
    
        case 'EventsView':
          if (detailId) return <EventDetail />;
          return <EventsView />;
          
        case 'HostsView':
          if (detailId) return <HostDetail />; 
          return <HostsView />;
    
        case 'CommunityScoutHub':
          if (detailId) return <CommunityDetail />;
          return <CommunityHub />;
    
        case 'CurriculumView':
          if (detailId) return <CurriculumDetail />;
          return <CurriculumView />;
    
        case 'TargetView':
          if (detailId === 'demo-room') return <TargetDemo />;
          if (detailId) return <TargetDashboard />;
          return <TargetView onNavigate={navigate} />;
    
        case 'DocsHome':
          if (detailId) return <DocsEditor />;
          return <DocsHome />;
    
        case 'QuestView': return <QuestView />;
        case 'PlanView': return <PlanView />;
        case 'AdmissionView': return <AdmissionView />;
        case 'WorkspaceHome': return <DashboardView />;
        case 'ArenaView': return <ArenaView />;
        case 'SkillsView': return <SkillsView />;
        case 'ForgeView': return <ForgeView />;
        default: return <div className="py-20 text-center text-slate-300 font-black uppercase tracking-widest">Node Null • Check Registry</div>;
      }
  };

  return (
    <ErrorBoundary featureName={componentKey}>
        <Suspense fallback={<LoadingFallback />}>
            {renderContent()}
        </Suspense>
    </ErrorBoundary>
  );
};
