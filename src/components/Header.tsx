import { useState } from 'react';
import { PawPrint, Menu, X } from 'lucide-react';
import { type Route } from '@/lib/router';
import { useLang, type L } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const navItems: { label: L; path: string; route: Route['name'] }[] = [
  { label: { vi: 'Trang chủ', en: 'Home' }, path: '/', route: 'home' },
  { label: { vi: 'Câu chuyện', en: 'Our Story' }, path: '/story', route: 'story' },
  { label: { vi: 'Điểm đến & Đặt phòng', en: 'Destinations & Booking' }, path: '/destinations', route: 'destinations' },
  { label: { vi: 'Dịch vụ', en: 'Services' }, path: '/services', route: 'services' },
  { label: { vi: 'Vin Club', en: 'Vin Club' }, path: '/vinclub', route: 'vinclub' },
  { label: { vi: 'Quy định', en: 'Pet Policies' }, path: '/policies', route: 'policies' },
];

export function Header({
  current,
  navigate,
}: {
  current: Route['name'];
  navigate: (path: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const { t, tr } = useLang();

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-sapphire-100/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
        <button
          onClick={() => go('/')}
          className="group flex items-center gap-2.5"
          aria-label={t('VinPet trang chủ', 'VinPet home')}
        >
          <span className="relative grid h-11 w-11 place-items-center rounded-full bg-gold-sheen shadow-gold">
            <PawPrint className="h-6 w-6 text-sapphire-950" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl font-bold tracking-wide text-sapphire-950">
              Vin<span className="text-gold-gradient">Pet</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-sapphire-500">
              by Vingroup
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-1.5 lg:flex">
          {navItems.map((item) => {
            const active = current === item.route;
            return (
              <button
                key={item.path}
                onClick={() => go(item.path)}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? 'text-gold-700 bg-gold-50/90 font-bold shadow-xs'
                    : 'text-sapphire-800 hover:text-gold-700 hover:bg-sapphire-50'
                }`}
              >
                {tr(item.label)}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold-500" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <button onClick={() => go('/destinations')} className="btn-gold text-sm">
            {t('Đặt kỳ nghỉ', 'Book a getaway')}
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full bg-sapphire-50 text-sapphire-900 border border-sapphire-200"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-white/98 backdrop-blur-md border-b border-sapphire-100 shadow-xl transition-all duration-500 lg:hidden ${
          open ? 'max-h-[32rem]' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 pb-6 pt-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => go(item.path)}
              className={`rounded-xl px-4 py-3 text-left text-base font-semibold transition-colors ${
                current === item.route
                  ? 'bg-gold-50 text-gold-700 font-bold border-l-4 border-gold-500'
                  : 'text-sapphire-800 hover:bg-sapphire-50'
              }`}
            >
              {tr(item.label)}
            </button>
          ))}
          <button
            onClick={() => go('/destinations')}
            className="btn-gold mt-2 w-full"
          >
            {t('Đặt kỳ nghỉ cùng thú cưng', 'Book a getaway with your pet')}
          </button>
        </nav>
      </div>
    </header>
  );
}
