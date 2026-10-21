import { Globe } from 'lucide-react';
import { useLang, type Lang } from '@/lib/i18n';

const options: { code: Lang; label: string; full: string }[] = [
  { code: 'vi', label: 'VI', full: 'Tiếng Việt' },
  { code: 'en', label: 'EN', full: 'English' },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language / Ngôn ngữ"
      className="flex items-center gap-1 rounded-full border border-sapphire-200 bg-white p-1 shadow-xs"
    >
      <Globe className="ml-1.5 h-4 w-4 text-sapphire-600" aria-hidden="true" />
      {options.map((o) => {
        const active = lang === o.code;
        return (
          <button
            key={o.code}
            type="button"
            onClick={() => setLang(o.code)}
            aria-pressed={active}
            title={o.full}
            lang={o.code}
            className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider transition-all duration-300 ${
              active
                ? 'bg-gold-sheen text-sapphire-950 shadow-xs'
                : 'text-sapphire-700 hover:text-sapphire-950 hover:bg-sapphire-50'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
