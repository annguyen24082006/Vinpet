import { Check, Crown, Gem, Star, Heart, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { useLang, type L } from '@/lib/i18n';

const tiers = [
  {
    name: 'Pet Lovers',
    icon: Heart,
    fee: 0,
    color: 'from-sapphire-400 to-sapphire-600',
    perks: [
      { vi: 'Tích điểm 1% mỗi kỳ nghỉ', en: 'Earn 1% points on every getaway' },
      { vi: 'Quà sinh nhật Boss điện tử', en: 'E-gift for your Boss’s birthday' },
      { vi: 'Bản tin VinPet độc quyền', en: 'The exclusive VinPet newsletter' },
    ] as L[],
  },
  {
    name: 'Silver',
    icon: Star,
    fee: 1000000,
    color: 'from-slate-400 to-slate-600',
    perks: [
      { vi: 'Tích điểm 3%', en: 'Earn 3% points' },
      { vi: 'Ưu tiên check-in', en: 'Priority check-in' },
      { vi: 'Giảm 10% dịch vụ Spa', en: '10% off Spa services' },
      { vi: '1 ngày Day-care miễn phí/tháng', en: '1 free Day-care day per month' },
    ] as L[],
  },
  {
    name: 'Gold',
    icon: Crown,
    fee: 3000000,
    color: 'from-gold-400 to-gold-600',
    perks: [
      { vi: 'Tích điểm 5%', en: 'Earn 5% points' },
      { vi: 'Check-in riêng khu VinPet', en: 'Private check-in at the VinPet area' },
      { vi: 'Giảm 20% Spa & Grooming', en: '20% off Spa & Grooming' },
      { vi: '3 ngày Day-care miễn phí/tháng', en: '3 free Day-care days per month' },
      { vi: 'Welcome gift cao cấp', en: 'Premium welcome gift' },
    ] as L[],
    featured: true,
  },
  {
    name: 'Platinum',
    icon: Gem,
    fee: 8000000,
    color: 'from-sapphire-700 to-sapphire-950',
    perks: [
      { vi: 'Tích điểm 8%', en: 'Earn 8% points' },
      { vi: 'Butler thú cưng riêng', en: 'A personal pet butler' },
      { vi: 'Spa & Grooming không giới hạn', en: 'Unlimited Spa & Grooming' },
      { vi: 'Day-care không giới hạn', en: 'Unlimited Day-care' },
      { vi: 'Tiệc Boss miễn phí 1 lần/năm', en: 'A free Boss party once a year' },
      { vi: 'Lounge VIP tại sảnh VinPet', en: 'VIP lounge in the VinPet lobby' },
    ] as L[],
  },
];

export function VinClubPage({ navigate }: { navigate: (p: string) => void }) {
  const { t, tr, money } = useLang();
  return (
    <div className="pt-20">
      <section className="relative h-[44vh] min-h-[320px] overflow-hidden">
        <img src="https://images.pexels.com/photos/27175551/pexels-photo-27175551.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Vin Club" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/55 to-sapphire-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">{t('Vin Club · Thành viên', 'Vin Club · Membership')}</p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                <>Ưu đãi <span className="text-gold-gradient">dành cho Boss</span></>,
                <>Special perks for <span className="text-gold-gradient">your little Boss</span></>
              )}
            </h1>
            <p className="mt-4 max-w-lg text-sapphire-200">
              {t(
                'Tích điểm mỗi kỳ nghỉ, đổi dịch vụ spa, daycare và nhận quà sinh nhật cho Boss.',
                'Earn points on every getaway, redeem them for spa and day-care, and receive a birthday gift for your Boss.'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ivory">
        <SectionHeading
          eyebrow={t('Hạng thành viên', 'Membership tiers')}
          title={t(<>Bốn hạng <span className="text-gold-gradient">Vin Club</span></>, <>Four <span className="text-gold-gradient">Vin Club</span> tiers</>)}
          subtitle={t('Lên hạng bằng cách tích điểm mỗi kỳ nghỉ hoặc mua gói thành viên.', 'Move up a tier by earning points on every getaway, or by choosing a membership plan.')}
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((item) => (
            <div
              key={item.name}
              className={`relative rounded-3xl border bg-white p-7 transition-all duration-500 hover:-translate-y-2 ${item.featured ? 'border-gold-400 shadow-gold' : 'border-sapphire-100 shadow-soft'}`}
            >
              {item.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-sheen px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sapphire-950">
                  {t('Phổ biến nhất', 'Most popular')}
                </span>
              )}
              <div className={`mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${item.color}`}>
                <item.icon className="h-7 w-7 text-ivory" />
              </div>
              <h3 className="text-center font-display text-2xl font-semibold text-sapphire-900">{item.name}</h3>
              <p className="text-center text-sm font-semibold text-gold-600">
                {item.fee === 0 ? t('Miễn phí', 'Free') : `${money(item.fee)}${t('/năm', ' / year')}`}
              </p>
              <div className="my-4 h-px bg-sapphire-100" />
              <ul className="space-y-2.5">
                {item.perks.map((p) => (
                  <li key={p.vi} className="flex items-start gap-2 text-xs text-sapphire-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> {tr(p)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-sapphire-950 py-20 text-center text-ivory">
        <div className="absolute inset-0 bg-sapphire-radial" />
        <div className="relative mx-auto max-w-2xl px-5">
          <h2 className="heading-2 text-ivory">{t('Trở thành thành viên Vin Club', 'Become a Vin Club member')}</h2>
          <p className="mt-3 text-sapphire-200">{t('Đăng ký Pet Lovers miễn phí ngay hôm nay.', 'Join Pet Lovers for free today.')}</p>
          <button onClick={() => navigate('/destinations')} className="btn-gold mt-7">
            {t('Bắt đầu kỳ nghỉ đầu tiên', 'Start your first getaway')} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
