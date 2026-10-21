import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/Icon';
import { services } from '@/lib/data';
import { useLang } from '@/lib/i18n';

export function ServicesIndexPage({ navigate }: { navigate: (p: string) => void }) {
  const { t, tr } = useLang();
  return (
    <div className="pt-20">
      <section className="relative h-[44vh] min-h-[320px] overflow-hidden">
        <img src="https://images.pexels.com/photos/19145897/pexels-photo-19145897.jpeg?auto=compress&cs=tinysrgb&w=1600" alt={t('Dịch vụ VinPet', 'VinPet services')} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/55 to-sapphire-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">{t('Trải nghiệm & Dịch vụ', 'Experiences & Services')}</p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                <>Chăm sóc <span className="text-gold-gradient">từng khoảnh khắc</span> cho Boss</>,
                <>Caring for <span className="text-gold-gradient">every little moment</span> of your Boss’s day</>
              )}
            </h1>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ivory">
        <SectionHeading
          eyebrow={t('5 dịch vụ chủ đạo', '5 signature services')}
          title={t(<>Trải nghiệm <span className="text-gold-gradient">trọn gói</span></>, <>Complete care, <span className="text-gold-gradient">all in one place</span></>)}
          subtitle={t('Chọn một dịch vụ để xem chi tiết gói và đặt lịch ngay.', 'Pick a service to see the details and book your spot.')}
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <button key={s.slug} onClick={() => navigate(`/services/${s.slug}`)} className="card-luxe group relative h-80 text-left">
              <img src={s.image} alt={s.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-sapphire-950/90 via-sapphire-950/40 to-transparent" />
              <div className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 backdrop-blur">
                <Icon name={s.icon} className="h-5 w-5 text-gold-200" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl font-semibold text-ivory text-shadow-luxe">{s.title}</h3>
                <p className="mt-2 text-sm text-sapphire-100 opacity-90">{tr(s.short)}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-300">
                  {t('Xem chi tiết', 'View details')} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
