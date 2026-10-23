import { ArrowRight, ShieldCheck, Stethoscope, Star, Ban, EyeOff, Wifi, Receipt } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/Icon';
import { services } from '@/lib/data';
import { useLang, type L } from '@/lib/i18n';

const heroSlides = [
  'https://images.pexels.com/photos/3051551/pexels-photo-3051551.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/19145879/pexels-photo-19145879.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/37443358/pexels-photo-37443358.jpeg?auto=compress&cs=tinysrgb&w=1600',
];

const stats: { value: string; label: L }[] = [
  { value: '100%', label: { vi: 'Không gian vô trùng khử mùi', en: 'Sterilised, odour-free spaces' } },
  { value: '24/7', label: { vi: 'Bác sĩ thú y túc trực', en: 'Vets on duty around the clock' } },
  { value: '5★', label: { vi: 'Tiêu chuẩn vận hành Vingroup', en: 'Vingroup service standards' } },
];

const usps = [
  {
    icon: ShieldCheck,
    title: { vi: 'Vô trùng & khử mùi', en: 'Sterilised & odour-free' } as L,
    desc: {
      vi: 'Công nghệ ion/UV hiện đại làm sạch toàn bộ không gian sau mỗi lượt khách.',
      en: 'Modern ion/UV technology freshens every space after each guest, so it’s always clean and cosy.',
    } as L,
  },
  {
    icon: Stethoscope,
    title: { vi: 'Bác sĩ thú y 24/7', en: 'Vets on call 24/7' } as L,
    desc: {
      vi: 'Đội ngũ thú y trực tiếp vận hành, túc trực cả ngày lẫn đêm.',
      en: 'Our veterinary team runs the service hands-on and is by your side day and night.',
    } as L,
  },
  {
    icon: Star,
    title: { vi: 'Chuẩn 5 sao Vingroup', en: 'Vingroup 5-star standard' } as L,
    desc: {
      vi: 'Kế thừa tiêu chuẩn vận hành của Vinpearl & Vingroup.',
      en: 'Built on the trusted service standards of Vinpearl and Vingroup.',
    } as L,
  },
];

const fourNos = [
  {
    icon: Ban,
    title: { vi: 'Không kỳ thị thú cưng', en: 'No pet prejudice' } as L,
    desc: {
      vi: 'Mọi thú cưng đều được chào đón bình đẳng, không phân biệt giống hay kích cỡ.',
      en: 'Every pet is welcome, whatever their breed or size.',
    } as L,
  },
  {
    icon: EyeOff,
    title: { vi: 'Không gian không mùi', en: 'No odours' } as L,
    desc: {
      vi: 'Không gian sống không mùi, vô trùng bằng công nghệ ion/UV sau mỗi lượt khách.',
      en: 'Fresh, odour-free rooms, sterilised with ion/UV technology after every stay.',
    } as L,
  },
  {
    icon: Wifi,
    title: { vi: 'Không gián đoạn vui chơi', en: 'No interrupted fun' } as L,
    desc: {
      vi: 'Dịch vụ Day-care trọn gói giúp bạn yên tâm tham quan khi thú cưng được chăm sóc.',
      en: 'Our all-in-one Day-care lets you explore with peace of mind while your pet is well looked after.',
    } as L,
  },
  {
    icon: Receipt,
    title: { vi: 'Không phát sinh chi phí ẩn', en: 'No hidden fees' } as L,
    desc: {
      vi: 'Bảng giá minh bạch toàn bộ, niêm yết công khai tại sảnh và trên hệ thống.',
      en: 'Fully transparent pricing, displayed openly in the lobby and online.',
    } as L,
  },
];

const vets = [
  {
    name: { vi: 'BS. CK1. Nguyễn Phương Thảo', en: 'Dr. Nguyễn Phương Thảo, DVM' } as L,
    role: { vi: 'Bác sĩ Thú y Trưởng · Trưởng khoa Cấp cứu & Nội khoa', en: 'Chief Veterinary Officer · Emergency & Internal Care' } as L,
    image: '/src/assets/images/vet_dr_thao_1792562583216.jpg',
    category: { vi: 'Bác sĩ Thú y', en: 'Veterinarian' } as L,
    creds: {
      vi: 'ThS. Thú y ĐH Nông Lâm · Chứng chỉ Cấp cứu Quốc tế AVMA · 12 năm kinh nghiệm',
      en: 'Master of Vet Med (NLU) · AVMA Emergency Certified · 12 yrs exp',
    } as L,
  },
  {
    name: { vi: 'BS. Nguyễn Phương An', en: 'Dr. Nguyễn Phương An, DVM' } as L,
    role: { vi: 'Bác sĩ Thú y Ngoại khoa & Da liễu Thú cưng', en: 'Veterinary Surgeon · Soft Tissue & Dermatology' } as L,
    image: '/src/assets/images/vet_dr_an_1792562583874.jpg',
    category: { vi: 'Bác sĩ Thú y', en: 'Veterinarian' } as L,
    creds: {
      vi: 'Bác sĩ Thú y Chính quy · Tu nghiệp Phẫu thuật Vi phẫu Bangkok · Thành viên ISFM',
      en: 'DVM · Advanced Surgery Fellow Bangkok · ISFM Member',
    } as L,
  },
  {
    name: { vi: 'Master Groomer Trần Hoàng Phương Nhi', en: 'Master Groomer Trần Hoàng Phương Nhi' } as L,
    role: { vi: 'Trưởng nhóm Tạo kiểu & Spa Thú cưng VinPet', en: 'Head of Styling & Luxury Pet Spa' } as L,
    image: '/src/assets/images/groomer_nhi_1792562584269.jpg',
    category: { vi: 'Master Groomer', en: 'Master Groomer' } as L,
    creds: {
      vi: 'Chứng chỉ Master IPG Quốc tế Hạng A · Giải Vàng Taiwan Pet Grooming Championship · 9 năm kinh nghiệm',
      en: 'IPG Master Groomer Class A · Taiwan Grooming Championship Gold Medalist · 9 yrs exp',
    } as L,
  },
  {
    name: { vi: 'Senior Groomer Phan Khánh Vy', en: 'Senior Groomer Phan Khánh Vy' } as L,
    role: { vi: 'Chuyên viên Tạo kiểu Show Dog & Phục hồi Lông da', en: 'Senior Pet Stylist · Show Dog & Coat Care' } as L,
    image: '/src/assets/images/groomer_vy_1792562584033.jpg',
    category: { vi: 'Senior Groomer', en: 'Senior Groomer' } as L,
    creds: {
      vi: 'Chứng chỉ FCI Quốc tế · Chuyên gia Liệu pháp Spa Thảo Dược & Sục Khí Microbubble',
      en: 'FCI International Stylist · Herbal Hydro-Spa & Microbubble Specialist',
    } as L,
  },
  {
    name: { vi: 'Groomer Nguyễn Phương Anh', en: 'Groomer Nguyễn Phương Anh' } as L,
    role: { vi: 'Chuyên viên Spa & Thư giãn Fear-Free', en: 'Pet Wellness Groomer · Fear-Free Spa' } as L,
    image: '/src/assets/images/groomer_anh_1792562585028.jpg',
    category: { vi: 'Groomer', en: 'Groomer' } as L,
    creds: {
      vi: 'Chứng chỉ KKK Hàn Quốc · Chuyên gia Chăm sóc Không Căng thẳng Fear-Free Certified',
      en: 'KKK Korea Certified Stylist · Fear-Free Certified Pet Professional',
    } as L,
  },
];

export function HomePage({ navigate }: { navigate: (path: string) => void }) {
  const { t, tr } = useLang();
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden pt-24 sm:pt-28">
        <div className="absolute inset-0">
          {heroSlides.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 transition-opacity duration-[2200ms]"
              style={{
                opacity: i === 0 ? 1 : 0,
                animation: 'slowZoom 18s ease-in-out infinite alternate',
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/60 via-sapphire-950/40 to-sapphire-950/90" />
          <div className="absolute inset-0 bg-grain opacity-10 mix-blend-overlay" />
        </div>

        {/* twinkles */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-gold-200 animate-twinkle"
              style={{
                top: `${(i * 37) % 100}%`,
                left: `${(i * 53) % 100}%`,
                animationDelay: `${(i % 5) * 0.4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 sm:px-8 py-6 sm:py-10">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3 sm:mb-4 text-gold-300">by Vingroup · A Vinpearl brand</p>
            <h1 className="heading-1 font-medium text-ivory text-shadow-luxe">
              {t(
                <>Kỳ nghỉ trọn vẹn cho cả <span className="text-gold-gradient">những đứa trẻ bốn chân</span></>,
                <>A perfect getaway for your <span className="text-gold-gradient">four-legged family</span></>
              )}
            </h1>
            <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-sapphire-100">
              {t(
                'VinPet mang đến trải nghiệm nghỉ dưỡng 5 sao cho gia đình đa thế hệ có mang theo thú cưng — nơi tình yêu thương được chào đón ở mọi điểm đến.',
                'VinPet brings five-star holidays to multi-generational families travelling with their pets, so love is welcome at every destination.'
              )}
            </p>
            <div className="mt-6 sm:mt-9 flex flex-wrap gap-3 sm:gap-4">
              <button onClick={() => navigate('/destinations')} className="btn-gold">
                {t('Đặt kỳ nghỉ cùng thú cưng', 'Book a getaway with your pet')}
                <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => navigate('/services')} className="btn-white">
                {t('Khám phá dịch vụ', 'Explore our services')}
              </button>
            </div>
          </div>
        </div>

        {/* stat strip */}
        <div className="relative z-10 w-full border-t border-sapphire-700/50 bg-sapphire-950/70 backdrop-blur-md">
          <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-sapphire-700/50 px-2 py-3 sm:px-8 sm:py-5">
            {stats.map((s) => (
              <div key={s.label.vi} className="px-1.5 py-1 text-center sm:px-4 sm:py-2">
                <p className="font-display text-xl font-bold text-gold-300 sm:text-3xl">{s.value}</p>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-sapphire-200">
                  {tr(s.label)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section-pad bg-ivory">
        <SectionHeading
          eyebrow={t('Tại sao chọn VinPet', 'Why choose VinPet')}
          title={t(
            <>USP & RTB <span className="text-gold-gradient">đáng tin cậy</span></>,
            <>Reasons families <span className="text-gold-gradient">trust us</span></>
          )}
          subtitle={t(
            'Những lý do khiến hàng ngàn gia đình mang theo thú cưng chọn VinPet cho kỳ nghỉ của mình.',
            'Here’s why thousands of families travelling with their pets choose VinPet for their holidays.'
          )}
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-3">
          {usps.map((u) => (
            <div key={u.title.vi} className="card-luxe group p-7 text-center">
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-sapphire-50 transition-all duration-500 group-hover:bg-sapphire-900">
                <u.icon className="h-8 w-8 text-sapphire-700 transition-colors group-hover:text-gold-300" />
              </div>
              <h3 className="heading-3 text-sapphire-900">{tr(u.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-sapphire-600">{tr(u.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-pad bg-cream">
        <SectionHeading
          eyebrow={t('Dịch vụ VinPet', 'VinPet Services')}
          title={t(
            <>Trải nghiệm <span className="text-gold-gradient">trọn gói</span> cho thú cưng</>,
            <>Complete care, <span className="text-gold-gradient">all in one place</span></>
          )}
          subtitle={t(
            'Năm dịch vụ chủ đạo, từ lưu trú đến vui chơi, chăm sóc sắc đẹp và tổ chức sự kiện.',
            'Five signature services, from cosy stays and playtime to pampering and special celebrations.'
          )}
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <button
              key={s.slug}
              onClick={() => navigate(`/services/${s.slug}`)}
              className={`card-luxe group relative h-72 text-left ${i === 0 ? 'lg:row-span-2 lg:h-[36rem]' : ''}`}
            >
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sapphire-950/90 via-sapphire-950/30 to-transparent" />
              <div className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 backdrop-blur">
                <Icon name={s.icon} className="h-5 w-5 text-gold-200" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl font-semibold text-ivory text-shadow-luxe">{s.title}</h3>
                <p className="mt-2 text-sm text-sapphire-100 opacity-90">{tr(s.short)}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-300">
                  {t('Khám phá', 'Explore')} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* BRAND STORY TEASER */}
      <section className="relative overflow-hidden bg-sapphire-950 py-24 text-ivory">
        <div className="absolute inset-0 bg-sapphire-radial opacity-70" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold-400">{t('Câu chuyện thương hiệu', 'Our Story')}</p>
            <h2 className="heading-2 mt-3 text-ivory">
              {t(
                <>Sứ mệnh mang lại kỳ nghỉ <span className="text-gold-gradient">trọn vẹn 100%</span></>,
                <>Our mission: a <span className="text-gold-gradient">truly complete</span> getaway</>
              )}
            </h2>
            <div className="gold-divider !mx-0 !my-5" />
            <p className="text-base leading-relaxed text-sapphire-200">
              {t(
                'Gia đình đa thế hệ của Vingroup tin rằng một kỳ nghỉ chỉ thực sự trọn vẹn khi không một thành viên nào bị bỏ lại phía sau — kể cả những chú chó mèo đã trở thành một phần gia đình. VinPet ra đời để nối dài tình yêu ấy vào mỗi điểm đến của Vingroup.',
                'We believe a holiday is only complete when no one is left behind, including the dogs and cats who have become part of the family. VinPet was created to carry that love to every Vingroup destination.'
              )}
            </p>
            <button onClick={() => navigate('/story')} className="btn-gold mt-7">
              {t('Đọc câu chuyện đầy đủ', 'Read our full story')} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/19490691/pexels-photo-19490691.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt={t('Chó và mèo cùng nhau', 'A dog and a cat together')}
              className="aspect-[4/3] w-full rounded-3xl border border-gold-400/40 object-cover shadow-sapphire"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-ivory p-5 shadow-soft sm:block">
              <p className="font-display text-4xl text-sapphire-900">100%</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-sapphire-600">{t('Gia đình đi cùng nhau', 'Family travelling together')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUR NO */}
      <section className="section-pad bg-ivory">
        <SectionHeading
          eyebrow={t('Cam kết 4 Không', 'Our Four “No” Promise')}
          title={t(
            <>Lời hứa <span className="text-gold-gradient">của VinPet</span></>,
            <>The VinPet <span className="text-gold-gradient">promise</span></>
          )}
          subtitle={t(
            'Bốn cam kết không thể thiếu để mỗi kỳ nghỉ đều an tâm và trọn vẹn.',
            'Four simple promises so every getaway feels safe, easy and complete.'
          )}
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fourNos.map((n) => (
            <div key={n.title.vi} className="group relative overflow-hidden rounded-3xl border border-sapphire-100 bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-gold-300">
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sapphire-700 to-sapphire-900">
                <n.icon className="h-7 w-7 text-gold-300" />
              </div>
              <h3 className="font-display text-xl font-semibold text-sapphire-900">{tr(n.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-sapphire-600">{tr(n.desc)}</p>
              <span className="pointer-events-none absolute -right-6 -top-6 font-display text-7xl font-bold text-sapphire-50 transition-colors group-hover:text-gold-50">4</span>
            </div>
          ))}
        </div>
      </section>

      {/* VET TEAM */}
      <section className="section-pad bg-cream">
        <SectionHeading
          eyebrow={t('Đội ngũ chuyên gia', 'Meet our experts')}
          title={t(
            <>Vet Team & <span className="text-gold-gradient">Groomer quốc tế</span></>,
            <>Vet Team & <span className="text-gold-gradient">International Groomers</span></>
          )}
          subtitle={t(
            'Đội ngũ gồm 2 Bác sĩ thú y giàu kinh nghiệm lâm sàng cùng 3 Master & Senior Groomer quốc tế trực tiếp chăm sóc thú cưng của bạn.',
            'Our expert team of 2 experienced veterinarians and 3 international master groomers personally caring for your pets.'
          )}
        />
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {vets.map((v) => (
            <div key={v.name.vi} className="card-luxe flex flex-col overflow-hidden group">
              <div className="relative h-80 overflow-hidden bg-sapphire-900">
                <img
                  src={v.image}
                  alt={tr(v.name)}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sapphire-950/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-sapphire-950/85 px-2.5 py-1 text-[11px] font-semibold text-gold-300 backdrop-blur border border-gold-400/30 shadow-sm">
                  {tr(v.category)}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4 text-center">
                <h3 className="font-display text-lg font-bold text-sapphire-900 group-hover:text-gold-600 transition-colors">
                  {tr(v.name)}
                </h3>
                <p className="mt-1 text-xs font-semibold text-gold-600 min-h-[36px] flex items-center justify-center">
                  {tr(v.role)}
                </p>
                <div className="my-2.5 h-px w-10 mx-auto bg-gold-200" />
                <p className="mt-auto text-[11px] leading-relaxed text-sapphire-600">{tr(v.creds)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SLOGAN CTA */}
      <section className="relative overflow-hidden bg-sapphire-950 py-24">
        <div className="absolute inset-0 bg-sapphire-radial" />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="font-display text-3xl italic leading-snug text-ivory sm:text-4xl">
            "Premium, safe and joyful pet experiences within the{' '}
            <span className="text-gold-gradient">Vingroup lifestyle ecosystem</span>."
          </p>
          <div className="gold-divider" />
          <p className="text-sm uppercase tracking-[0.3em] text-gold-400">{t('Slogan VinPet', 'The VinPet slogan')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/destinations')} className="btn-gold">
              {t('Đặt kỳ nghỉ cùng thú cưng', 'Book a getaway with your pet')} <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => navigate('/services')} className="btn-white">
              {t('Khám phá dịch vụ', 'Explore our services')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
