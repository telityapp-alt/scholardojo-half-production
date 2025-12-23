
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DomainType } from '../../core/contracts/entityMap';
import { ProgramsListView } from '../../features/programs/components/ProgramsListView';
import { ProgramDetailView } from '../../features/programs/components/ProgramDetailView';
import { EventsView } from '../../features/events/components/EventsView';
import { EventDetail } from '../../features/events/components/EventDetail'; 
import { HostsView } from '../../features/host/components/HostsView';
import { HostDetail } from '../../features/host/components/HostDetail';
import { QuestView } from '../../features/quest/components/QuestView';
import { PlanView } from '../../features/plan/components/PlanView';
import { AdmissionView } from '../../features/admission/components/AdmissionView';
import { DashboardView } from '../../features/dashboard/components/DashboardView';
import { CommunityHub } from '../../features/community/components/CommunityHub';
import { CommunityDetail } from '../../features/community/components/CommunityDetail';
import { CurriculumView } from '../../features/curriculum/components/CurriculumView';
import { CurriculumDetail } from '../../features/curriculum/components/CurriculumDetail';
import { MelyticsView } from '../../features/melytics/components/MelyticsView';
import { ArenaView } from '../../features/arena/components/ArenaView';
import { SkillsView } from '../../features/skills/components/SkillsView';
import { TargetView } from '../../features/target/components/TargetView';
import { TargetDashboard } from '../../features/target/components/TargetDashboard';
import { TargetDemo } from '../../features/target/components/TargetDemo';
import { ForgeView } from '../../features/forge/components/ForgeView';
import { DocsHome } from '../../features/docs/components/DocsHome';
import { DocsEditor } from '../../features/docs/components/DocsEditor';
import { CompetitionHome } from '../../features/competition/components/CompetitionHome';
import { ResearchHome } from '../../features/research/components/ResearchHome';
import { EssayReviewerMain } from '../../features/essayReviewer/components/EssayReviewerMain';
import { EssayReviewerHome } from '../../features/essayReviewer/components/EssayReviewerHome';

const ComingSoonPlaceholder: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
    <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mb-6">
       <div className="text-4xl">🚧</div>
    </div>
    <h2 className="text-3xl font-black text-slate-700 mb-2">{title}</h2>
    <p className="text-slate-400 font-bold max-w-md text-center">
      We are currently building this feature. Check back later!
    </p>
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
    case 'ProfileView': return <MelyticsView />;
    case 'ForgeView': return <ForgeView />;
         
    default:
      return <ComingSoonPlaceholder title={tabId.charAt(0).toUpperCase() + tabId.slice(1)} />;
  }
};
