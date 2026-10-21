import { ArrowRight, Heart, Sparkles, Globe2, Users } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { useLang, type L } from '@/lib/i18n';

const pillars = [
  {
    icon: Heart,
    title: { vi: 'Tình yêu không để ai lại phía sau', en: 'Love that leaves no one behind' } as L,
    text: {
      vi: 'Không một chú chó hay mèo nào nên bị bỏ lại khi cả gia đình đi nghỉ dưỡng. VinPet nối dài tình yêu ấy.',
      en: 'No dog or cat should be left at home when the whole family goes on holiday. VinPet carries that love with you.',
    } as L,
  },
  {
    icon: Sparkles,
    title: { vi: 'Chuẩn 5 sao, trọn vẹn niềm vui', en: 'Five-star care, full of joy' } as L,
    text: {
      vi: 'Mọi dịch vụ cho thú cưng đều đạt chuẩn Vingroup — vô trùng, an toàn, đội ngũ chuyên nghiệp.',
      en: 'Every pet service meets Vingroup standards: sterilised, safe and delivered by a professional team.',
    } as L,
  },
  {
    icon: Globe2,
    title: { vi: 'Hệ sinh thái Vingroup', en: 'The Vingroup ecosystem' } as L,
    text: {
      vi: 'VinPet hoạt động song hành cùng Vinpearl, VinWonders, Vinhomes — một hành trình liền mạch.',
      en: 'VinPet works hand in hand with Vinpearl, VinWonders and Vinhomes for one smooth, seamless journey.',
    } as L,
  },
  {
    icon: Users,
    title: { vi: 'Cộng đồng yêu thú cưng', en: 'A community of pet lovers' } as L,
    text: {
      vi: 'Không gian gặp gỡ những gia đình cùng đam mê, nơi Boss được tôn trọng như thành viên gia đình.',
      en: 'A place to meet families who share your passion, where every little Boss is treated as part of the family.',
    } as L,
  },
];

const timeline = [
  {
    year: '2024',
    title: { vi: 'Khởi niệm VinPet', en: 'The idea of VinPet' } as L,
    text: {
      vi: 'Vingroup nhận thấy nhu cầu kỳ nghỉ pet-friendly ngày càng tăng tại Việt Nam.',
      en: 'Vingroup noticed a growing wish among Vietnamese families for pet-friendly holidays.',
    } as L,
  },
  {
    year: '2025',
    title: { vi: 'Thí điểm 3 điểm đến', en: 'Pilot at 3 destinations' } as L,
    text: {
      vi: 'Phú Quốc, Nha Trang và Hội An — nơi đầu tiên áp dụng tiêu chuẩn VinPet.',
      en: 'Phu Quoc, Nha Trang and Hoi An became the first places to adopt the VinPet standard.',
    } as L,
  },
  {
    year: '2026',
    title: { vi: 'Mở rộng hệ sinh thái', en: 'Growing the ecosystem' } as L,
    text: {
      vi: 'Kế hoạch phủ 12 điểm đến Vinpearl với đầy đủ dịch vụ VinPet.',
      en: 'The plan is to bring the full VinPet experience to 12 Vinpearl destinations.',
    } as L,
  },
];

export function StoryPage({ navigate }: { navigate: (p: string) => void }) {
  const { t, tr } = useLang();
  return (
    <div className="pt-20">
      {/* hero */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src="https://images.pexels.com/photos/35711491/pexels-photo-35711491.jpeg?auto=compress&cs=tinysrgb&w=1600" alt={t('Chó và mèo', 'A dog and a cat')} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/55 to-sapphire-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">{t('Câu chuyện thương hiệu', 'Our Story')}</p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                <>Kỳ nghỉ <span className="text-gold-gradient">trọn vẹn 100%</span> cho mọi thành viên</>,
                <>A <span className="text-gold-gradient">100% complete</span> holiday for every family member</>
              )}
            </h1>
          </div>
        </div>
      </section>

      {/* mission */}
      <section className="section-pad bg-ivory">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-2xl italic leading-relaxed text-sapphire-800">
            {t(
              '"Sứ mệnh của VinPet là mang lại kỳ nghỉ trọn vẹn 100% cho gia đình đa thế hệ có cả thú cưng của Vingroup — nơi tình yêu thương được chào đón ở mọi điểm đến."',
              '“VinPet’s mission is to give every multi-generational Vingroup family, pets included, a 100% complete holiday, where love is welcome at every destination.”'
            )}
          </p>
          <div className="gold-divider" />
          <p className="text-sm uppercase tracking-[0.3em] text-gold-600">{t('Sứ mệnh VinPet', 'The VinPet mission')}</p>
        </div>
      </section>

      {/* pillars */}
      <section className="section-pad bg-cream">
        <SectionHeading eyebrow={t('Giá trị cốt lõi', 'Core values')} title={t(<>Bốn trụ cột của <span className="text-gold-gradient">VinPet</span></>, <>The four pillars of <span className="text-gold-gradient">VinPet</span></>)} />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title.vi} className="card-luxe p-7 text-center">
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-sapphire-50">
                <p.icon className="h-8 w-8 text-sapphire-700" />
              </div>
              <h3 className="font-display text-xl font-semibold text-sapphire-900">{tr(p.title)}</h3>
              <p className="mt-2 text-sm text-sapphire-600">{tr(p.text)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* timeline */}
      <section className="section-pad bg-ivory">
        <SectionHeading eyebrow={t('Hành trình', 'Our journey')} title={t(<>Dấu ấn <span className="text-gold-gradient">VinPet</span></>, <>VinPet <span className="text-gold-gradient">milestones</span></>)} />
        <div className="mx-auto mt-14 max-w-3xl">
          {timeline.map((item, i) => (
            <div key={item.year} className="relative flex gap-6 pb-10 last:pb-0">
              <div className="relative">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-sapphire-900 text-center font-display text-sm font-bold text-gold-300">
                  {item.year}
                </div>
                {i < timeline.length - 1 && <div className="absolute left-1/2 top-14 h-full w-px -translate-x-1/2 bg-sapphire-200" />}
              </div>
              <div className="pt-2">
                <h3 className="font-display text-2xl font-semibold text-sapphire-900">{tr(item.title)}</h3>
                <p className="mt-2 text-sapphire-600">{tr(item.text)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-sapphire-950 py-20 text-center text-ivory">
        <div className="absolute inset-0 bg-sapphire-radial" />
        <div className="relative mx-auto max-w-2xl px-5">
          <h2 className="heading-2 text-ivory">{t('Sẵn sàng cùng VinPet?', 'Ready to join VinPet?')}</h2>
          <p className="mt-3 text-sapphire-200">{t('Khám phá điểm đến và dịch vụ dành cho Boss của bạn.', 'Discover destinations and services made for your little Boss.')}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/destinations')} className="btn-gold">{t('Đặt kỳ nghỉ', 'Book a getaway')} <ArrowRight className="h-4 w-4" /></button>
            <button onClick={() => navigate('/services')} className="btn-white">{t('Dịch vụ', 'Services')}</button>
          </div>
        </div>
      </section>
    </div>
  );
}
