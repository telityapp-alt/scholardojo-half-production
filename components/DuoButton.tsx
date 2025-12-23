
import React from 'react';
import { ThemeColor } from '../core/contracts/entityMap';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'navigation';

interface DuoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  themeColor?: ThemeColor | string; 
  fullWidth?: boolean;
  startIcon?: React.ElementType;
  endIcon?: React.ElementType;
  isLoading?: boolean;
  iconSize?: number;
}

export const DuoButton: React.FC<DuoButtonProps> = ({ 
  children, 
  variant = 'primary', 
  themeColor = 'green', 
  fullWidth = false,
  className = '',
  startIcon: StartIcon,
  endIcon: EndIcon,
  isLoading,
  disabled,
  iconSize = 20,
  ...props 
}) => {
  
  const getDynamicStyles = () => {
    const useVariable = themeColor === 'green' || themeColor === 'blue' || themeColor === 'orange' || themeColor === 'purple';
    
    if (useVariable && variant === 'primary') {
      return {
        backgroundColor: 'var(--dojo-primary)',
        borderColor: 'var(--dojo-dark)',
        color: 'white',
      };
    }
    return {};
  };

  const getColorClasses = (variant: ButtonVariant, color: string) => {
    const isGray = color === 'gray' || color === 'slate';
    
    const colors: Record<string, any> = {
        green: { bg: 'bg-duo-green', border: 'border-duo-greenDark', text: 'text-duo-green' },
        blue: { bg: 'bg-duo-blue', border: 'border-duo-blueDark', text: 'text-duo-blue' },
        purple: { bg: 'bg-duo-purple', border: 'border-duo-purpleDark', text: 'text-duo-purple' },
        red: { bg: 'bg-duo-red', border: 'border-duo-redDark', text: 'text-duo-red' },
        orange: { bg: 'bg-duo-orange', border: 'border-orange-600', text: 'text-duo-orange' },
        sky: { bg: 'bg-sky-500', border: 'border-sky-600', text: 'text-sky-500' },
        slate: { bg: 'bg-slate-500', border: 'border-slate-600', text: 'text-slate-500' },
    };

    const c = colors[color] || colors.green;

    switch (variant) {
        case 'primary':
            return `border-b-[6px] text-white hover:brightness-110 active:border-b-0 active:translate-y-[6px] ${c.bg} ${c.border}`;
        case 'secondary':
            return `bg-white border-2 border-b-[6px] ${isGray ? 'border-slate-200 text-slate-500' : `${c.border} ${c.text}`} hover:bg-slate-50 active:border-b-2 active:translate-y-[4px]`;
        case 'outline':
             return `bg-transparent border-2 border-b-[4px] ${isGray ? 'border-slate-200 text-slate-400' : `${c.border} ${c.text}`} hover:bg-slate-50 active:border-b-2 active:translate-y-[2px]`;
        case 'ghost':
            return `bg-transparent text-slate-400 hover:bg-slate-100 border-none`;
        case 'navigation':
             return 'text-slate-400 hover:text-slate-600';
        default:
            return '';
    }
  };

  const baseStyles = "relative rounded-2xl font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none select-none";
  const sizeStyles = variant === 'navigation' ? 'py-2 px-3 pl-2' : 'py-4 px-6'; 
  const widthStyle = fullWidth ? "w-full" : "";
  const colorStyle = getColorClasses(variant as ButtonVariant, themeColor);

  if (variant === 'navigation') {
      return (
        <button 
            className={`group flex items-center gap-3 rounded-2xl hover:bg-slate-100 transition-all pr-4 py-2 pl-2 w-fit ${className}`}
            disabled={disabled}
            {...props}
        >
            <div className={`
                w-10 h-10 rounded-xl bg-white border-2 border-slate-200 border-b-4 
                flex items-center justify-center 
                group-hover:border-slate-300 group-active:border-b-2 group-active:translate-y-[2px] transition-all
                text-slate-400 group-hover:text-slate-600
            `}>
                {isLoading ? <Loader2 className="animate-spin" size={20} strokeWidth={2.5} /> : (StartIcon && <StartIcon size={20} strokeWidth={2.5} />)}
            </div>
            <span className="text-slate-400 font-bold uppercase text-xs tracking-widest group-hover:text-slate-600">
                {children}
            </span>
        </button>
      );
  }

  return (
    <button 
      className={`${baseStyles} ${sizeStyles} ${colorStyle} ${widthStyle} ${className}`}
      style={getDynamicStyles()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={iconSize} strokeWidth={2.5} />
      ) : (
        <>
            {StartIcon && <StartIcon size={iconSize} strokeWidth={2.5} />}
            <span className="relative top-[-1px]">{children}</span>
            {EndIcon && <EndIcon size={iconSize} strokeWidth={2.5} />}
        </>
      )}
    </button>
  );
};
