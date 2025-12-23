
import { useState, useCallback, useEffect } from 'react';
import { SupportedLanguage, TRANSLATIONS, TranslationSchema } from '../contracts/localization';
import { AITranslationEngine } from '../engines/aiTranslationEngine';

export function useLanguage() {
  const [lang, setLang] = useState<SupportedLanguage>(() => {
    // DEFAULT SET TO 'id' FOR INDONESIA ECOSYSTEM PRIORITY
    return (localStorage.getItem('dojo_lang') as SupportedLanguage) || 'id';
  });
  
  const [isChanging, setIsChanging] = useState(false);

  const switchLanguage = useCallback((newLang: SupportedLanguage) => {
    if (newLang === lang) return;
    
    setIsChanging(true);
    setLang(newLang);
    localStorage.setItem('dojo_lang', newLang);
    
    // Global transition delay to ensure all components re-mount with new data
    setTimeout(() => {
        setIsChanging(false);
    }, 1000);
  }, [lang]);

  const translateObject = async (data: any, id: string) => {
      return await AITranslationEngine.transform(data, id, lang);
  };

  const t: TranslationSchema = TRANSLATIONS[lang];

  return { lang, switchLanguage, t, translateObject, isChanging };
}
