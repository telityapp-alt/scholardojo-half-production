
import { DomainType } from '../contracts/entityMap';

export interface DomainBranding {
    primary: string;
    dark: string;
    light: string;
    text: string;
    border: string;
    bg: string;
    shadow: string;
    button: string;
}

export const ThemeEngine = {
    inject: (domain: DomainType) => {
        const root = document.documentElement;
        const colors = {
            [DomainType.STUDENT]: {
                primary: '#58cc02', dark: '#46a302', light: '#d7ffb8', accent: '#1cb0f6', shadow: 'rgba(70, 163, 2, 0.4)'
            },
            [DomainType.INTERN]: {
                primary: '#ff9600', dark: '#cb7700', light: '#fff4e5', accent: '#1cb0f6', shadow: 'rgba(203, 119, 0, 0.4)'
            },
            [DomainType.SCHOLAR]: {
                primary: '#1cb0f6', dark: '#1899d6', light: '#ddf4ff', accent: '#ce82ff', shadow: 'rgba(24, 153, 214, 0.4)'
            },
            [DomainType.DOCS]: {
                primary: '#ce82ff', dark: '#a855f7', light: '#f4e5ff', accent: '#1cb0f6', shadow: 'rgba(168, 85, 247, 0.4)'
            },
            [DomainType.COMPETITION]: {
                primary: '#ff4b4b', dark: '#ea2b2b', light: '#ffdfe0', accent: '#fbbf24', shadow: 'rgba(234, 43, 43, 0.4)'
            },
            [DomainType.RESEARCH]: {
                primary: '#14b8a6', dark: '#0d9488', light: '#f0fdfa', accent: '#0f172a', shadow: 'rgba(13, 148, 136, 0.4)'
            }
        };

        const current = colors[domain] || colors[DomainType.STUDENT];

        root.style.setProperty('--dojo-primary', current.primary);
        root.style.setProperty('--dojo-dark', current.dark);
        root.style.setProperty('--dojo-light', current.light);
        root.style.setProperty('--dojo-accent', current.accent);
        root.style.setProperty('--dojo-shadow', current.shadow);
        
        // Duo Specific Physics
        root.style.setProperty('--duo-bounce', 'cubic-bezier(0.34, 1.56, 0.64, 1)');
        root.style.setProperty('--duo-border-width', '2px');
        root.style.setProperty('--duo-depth', '6px');
    },

    /**
     * Centralized Tailwind class mapping for components.
     * Prevents switch(domain) leakage in UI.
     */
    getBranding: (domain: DomainType): DomainBranding => {
        const mappings: Record<DomainType, DomainBranding> = {
            [DomainType.STUDENT]: {
                primary: 'bg-duo-green', dark: 'border-duo-greenDark', light: 'bg-duo-greenLight',
                text: 'text-duo-green', border: 'border-duo-green', bg: 'bg-duo-green',
                shadow: 'shadow-green-900/10', button: 'bg-duo-green border-duo-greenDark'
            },
            [DomainType.INTERN]: {
                primary: 'bg-duo-orange', dark: 'border-orange-600', light: 'bg-orange-50',
                text: 'text-duo-orange', border: 'border-duo-orange', bg: 'bg-duo-orange',
                shadow: 'shadow-orange-900/10', button: 'bg-duo-orange border-orange-600'
            },
            [DomainType.SCHOLAR]: {
                primary: 'bg-duo-blue', dark: 'border-duo-blueDark', light: 'bg-duo-blueLight',
                text: 'text-duo-blue', border: 'border-duo-blue', bg: 'bg-duo-blue',
                shadow: 'shadow-blue-900/10', button: 'bg-duo-blue border-duo-blueDark'
            },
            [DomainType.DOCS]: {
                primary: 'bg-duo-purple', dark: 'border-duo-purpleDark', light: 'bg-duo-purpleLight',
                text: 'text-duo-purple', border: 'border-duo-purple', bg: 'bg-duo-purple',
                shadow: 'shadow-purple-900/10', button: 'bg-duo-purple border-duo-purpleDark'
            },
            [DomainType.COMPETITION]: {
                primary: 'bg-duo-red', dark: 'border-duo-redDark', light: 'bg-red-50',
                text: 'text-duo-red', border: 'border-duo-red', bg: 'bg-duo-red',
                shadow: 'shadow-red-900/10', button: 'bg-duo-red border-duo-redDark'
            },
            [DomainType.RESEARCH]: {
                primary: 'bg-teal-500', dark: 'border-teal-700', light: 'bg-teal-50',
                text: 'text-teal-600', border: 'border-teal-500', bg: 'bg-teal-500',
                shadow: 'shadow-teal-900/10', button: 'bg-teal-500 border-teal-700'
            }
        };
        return mappings[domain] || mappings[DomainType.STUDENT];
    }
};
