
import React from 'react';
import { NavigationItem } from '../core/contracts/entityMap';
import { DomainConfig } from '../core/contracts/domainConfig';
import { NAV_ICON_MAP } from '../core/contracts/featureRegistry';

interface SidebarProps {
  config: DomainConfig;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ config, currentPath, onNavigate }) => {
  
  // Removed Profile (E) as it is now part of Workspace Home (A)
  const menuItems: NavigationItem[] = [
    { id: 'home', label: 'Learn (A)', path: `/${config.id}`, iconName: 'map' },
    { id: 'program', label: config.labels.program + 's (B)', path: `/${config.id}/programs`, iconName: 'program' },
    { id: 'tracker', label: config.labels.tracker + ' (C)', path: `/${config.id}/tracker`, iconName: 'tracker' },
    { id: 'host', label: config.labels.hostEntity + 's (D)', path: `/${config.id}/hosts`, iconName: 'host' },
  ];

  // Helper to get the correct "Light" background for the active state/icon wrapper
  const getThemeColors = () => {
    switch (config.theme) {
      case 'green': return { text: 'text-duo-green', bgLight: 'bg-duo-greenLight', border: 'border-duo-green', bg: 'bg-duo-green' };
      case 'blue': return { text: 'text-duo-blue', bgLight: 'bg-duo-blueLight', border: 'border-duo-blue', bg: 'bg-duo-blue' };
      case 'purple': return { text: 'text-duo-purple', bgLight: 'bg-duo-purpleLight', border: 'border-duo-purple', bg: 'bg-duo-purple' };
      case 'orange': return { text: 'text-duo-orange', bgLight: 'bg-orange-50', border: 'border-orange-600', bg: 'bg-duo-orange' };
      case 'red': return { text: 'text-duo-red', bgLight: 'bg-red-50', border: 'border-duo-red', bg: 'bg-duo-red' };
      default: return { text: 'text-duo-green', bgLight: 'bg-duo-greenLight', border: 'border-duo-green', bg: 'bg-duo-green' };
    }
  };

  const theme = getThemeColors();

  return (
    <aside className="fixed left-0 top-0 h-full w-20 lg:w-72 bg-white border-r-2 border-slate-200 flex flex-col p-4 z-50">
      {/* Logo Area */}
      <div className="mb-8 px-4 mt-2">
        <h1 className={`text-3xl font-black ${theme.text} tracking-tight hidden lg:block`}>
          dojo
        </h1>
        <h1 className={`text-3xl font-black ${theme.text} lg:hidden text-center`}>
          D
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => {
          const Icon = NAV_ICON_MAP[item.iconName] || NAV_ICON_MAP['program'];
          const isActive = currentPath === item.path || (item.path !== `/${config.id}` && currentPath.startsWith(item.path));
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.path)}
              className={`
                group flex items-center w-full p-2 lg:px-4 lg:py-3 rounded-2xl transition-all border-2
                ${isActive 
                  ? `${theme.bgLight} ${theme.border} text-slate-800` 
                  : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-100'
                }
              `}
            >
              <div className="relative">
                 <span className="sr-only">{item.label}</span>
                 <Icon 
                    className={`w-7 h-7 lg:mr-4 ${isActive ? theme.text : 'text-slate-400 group-hover:text-slate-600'}`} 
                    strokeWidth={3} 
                 />
              </div>
              <span className={`hidden lg:block font-black uppercase text-sm tracking-widest ${isActive ? theme.text : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
      
      {/* Domain Switcher */}
      <div className="mt-auto pt-6 border-t-2 border-slate-200">
        <p className="text-xs font-black text-slate-400 mb-4 uppercase hidden lg:block px-2 tracking-widest">Switch Dojo</p>
        <div className="flex lg:flex-col gap-3">
             <button onClick={() => onNavigate('/scholar')} className="relative group w-full">
               <div className="w-10 h-10 lg:w-full lg:h-auto lg:p-3 rounded-2xl bg-white border-2 border-b-4 border-slate-200 group-hover:bg-slate-50 flex items-center justify-center lg:justify-start transition-all active:border-b-2 active:translate-y-[2px]">
                   <div className="w-4 h-4 rounded-full bg-duo-purple mr-3 hidden lg:block"></div>
                   <span className="hidden lg:block text-slate-600 font-black text-xs uppercase tracking-wider">Scholar</span>
                   <div className="lg:hidden w-4 h-4 rounded-full bg-duo-purple"></div>
               </div>
            </button>
             <button onClick={() => onNavigate('/intern')} className="relative group w-full">
               <div className="w-10 h-10 lg:w-full lg:h-auto lg:p-3 rounded-2xl bg-white border-2 border-b-4 border-slate-200 group-hover:bg-slate-50 flex items-center justify-center lg:justify-start transition-all active:border-b-2 active:translate-y-[2px]">
                   <div className="w-4 h-4 rounded-full bg-duo-blue mr-3 hidden lg:block"></div>
                   <span className="hidden lg:block text-slate-600 font-black text-xs uppercase tracking-wider">Intern</span>
                   <div className="lg:hidden w-4 h-4 rounded-full bg-duo-blue"></div>
               </div>
            </button>
        </div>
      </div>
    </aside>
  );
};
