import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Lang = 'vi' | 'en';

/** A piece of text written in both languages. */
export interface L {
  vi: string;
  en: string;
}

const STORAGE_KEY = 'vinpet-lang';

const PAGE_TITLE: L = {
  vi: 'VinPet — Kỳ nghỉ trọn vẹn cho cả những đứa trẻ bốn chân',
  en: 'VinPet — A perfect getaway for your four-legged family',
};

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'vi' || saved === 'en') return saved;
  } catch {
    /* storage may be unavailable (private mode) */
  }
  return 'vi';
}

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Pick the right text (or JSX) for the current language: t(vi, en) */
  t: <T>(vi: T, en: T) => T;
  /** Resolve a { vi, en } object for the current language */
  tr: (text: L) => string;
  /** Format a VND amount: "4.200.000đ" (vi) or "4,200,000 VND" (en) */
  money: (n: number) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = PAGE_TITLE[lang];
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t: (vi, en) => (lang === 'vi' ? vi : en),
      tr: (text) => text[lang],
      money: (n) =>
        lang === 'vi'
          ? new Intl.NumberFormat('vi-VN').format(n) + 'đ'
          : new Intl.NumberFormat('en-US').format(n) + ' VND',
    }),
    [lang, setLang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLang(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
