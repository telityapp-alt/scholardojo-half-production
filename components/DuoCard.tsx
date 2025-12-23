import React from 'react';

interface DuoCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean; // New prop to force active styling if needed
}

export const DuoCard: React.FC<DuoCardProps> = ({ children, className = '', onClick, active }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white 
        rounded-2xl 
        border-2 
        border-slate-200 
        border-b-[6px] 
        p-6 
        relative 
        overflow-hidden
        ${onClick ? 'cursor-pointer hover:bg-slate-50 hover:-translate-y-1 hover:border-b-slate-300 active:border-b-2 active:translate-y-[4px] transition-all duration-150' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};