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
    title: { vi: 'Vệ sinh & khử mùi chuyên sâu', en: 'Advanced Hygiene & Odour Control' } as L,
    desc: {
      vi: 'Ứng dụng công nghệ ion/UV trong quy trình vệ sinh, hỗ trợ làm sạch không gian và kiểm soát mùi sau mỗi lượt sử dụng.',
      en: 'Our cleaning protocols incorporate ion and UV technology to help maintain a clean environment and control odours after each use.',
    } as L,
  },
  {
    icon: Stethoscope,
    title: { vi: 'Chăm sóc thú y 24/7', en: '24/7 Veterinary Care' } as L,
    desc: {
      vi: 'Đội ngũ bác sĩ thú y đồng hành cùng thú cưng, với chế độ túc trực ngày đêm nhằm kịp thời hỗ trợ khi cần thiết.',
      en: 'Our veterinary team is on hand around the clock to provide timely support and attend to pets’ needs whenever necessary.',
    } as L,
  },
  {
    icon: Star,
    title: { vi: 'Tiêu chuẩn dịch vụ theo định hướng Vingroup', en: 'Service Standards Inspired by Vingroup' } as L,
    desc: {
      vi: 'Kế thừa tinh thần dịch vụ chuyên nghiệp, chỉn chu và chú trọng trải nghiệm khách hàng, hướng đến không gian chăm sóc thú cưng chất lượng cao.',
      en: 'Reflecting Vingroup’s commitment to professionalism, attention to detail, and customer experience, we strive to create a high-quality environment dedicated to exceptional pet care.',
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
    name: { vi: 'BS. CKI. Nguyễn Phương Thảo', en: 'Dr. Nguyễn Phương Thảo' } as L,
    role: { vi: 'Trưởng bộ phận Thú y', en: 'Head of Veterinary Services' } as L,
    image: '/src/assets/images/vet_dr_thao_1792562583216.jpg',
    category: { vi: 'Bác sĩ Thú y', en: 'Veterinarian' } as L,
    creds: {
      vi: 'Bác sĩ Thú y, Học viện Nông nghiệp Việt Nam; Chuyên khoa Hồi sức cấp cứu · 12 năm trong lĩnh vực thú y lâm sàng · Excellence in Veterinary Care Award 2025',
      en: 'Doctor of Veterinary Medicine, Vietnam National University of Agriculture · Emergency and Critical Care · 12 years of clinical veterinary practice · Excellence in Veterinary Care Award 2025',
    } as L,
  },
  {
    name: { vi: 'BS. Nguyễn Phương An', en: 'Dr. Nguyễn Phương An' } as L,
    role: { vi: 'Phụ trách Ngoại khoa & Da liễu', en: 'Head of Surgery & Dermatology' } as L,
    image: '/src/assets/images/vet_dr_an_1792562583874.jpg',
    category: { vi: 'Bác sĩ Thú y', en: 'Veterinarian' } as L,
    creds: {
      vi: 'Bác sĩ Thú y, Học viện Nông nghiệp Việt Nam · Phẫu thuật Thú y và Chẩn đoán Da liễu – chương trình đào tạo nâng cao giả định tại Bangkok Veterinary Specialist Centre · Clinical Excellence Recognition 2025',
      en: 'Doctor of Veterinary Medicine, Vietnam National University of Agriculture · Veterinary Surgery & Dermatological Diagnostics - Bangkok Veterinary Specialist Centre · Clinical Excellence Recognition 2025',
    } as L,
  },
  {
    name: { vi: 'Trần Hoàng Phương Nhi', en: 'Trần Hoàng Phương Nhi' } as L,
    role: { vi: 'Trưởng bộ phận Grooming', en: 'Head of Grooming' } as L,
    image: '/src/assets/images/groomer_nhi_1792562584269.jpg',
    category: { vi: 'Master Groomer', en: 'Master Groomer' } as L,
    creds: {
      vi: 'Professional Pet Grooming Program (Fi Academy) · Master Groomer – Level A, Fi Grooming Academy · 9 năm trong lĩnh vực Grooming và tạo kiểu chuyên nghiệp · Grooming Excellence Award 2025',
      en: 'Professional Pet Grooming Program, Fi Academy · Master Groomer - Level A, Fi Grooming Academy · 9 years of professional pet grooming and styling · Grooming Excellence Award 2025',
    } as L,
  },
  {
    name: { vi: 'Phan Khánh Vy', en: 'Phan Khánh Vy' } as L,
    role: { vi: 'Senior Groomer | Chuyên trách Show Grooming & Coat Care', en: 'Senior Groomer | Show Grooming & Coat Care Specialist' } as L,
    image: '/src/assets/images/groomer_vy_1792562584033.jpg',
    category: { vi: 'Senior Groomer', en: 'Senior Groomer' } as L,
    creds: {
      vi: 'Advanced Breed Styling & Coat Care · Advanced Show Grooming Certificate – Fi Grooming Academy · Creative Styling Award 2024',
      en: 'Advanced Breed Styling & Coat Care · Advanced Show Grooming Certificate, Fi Grooming Academy · Creative Styling Award 2024',
    } as L,
  },
  {
    name: { vi: 'Nguyễn Phương Anh', en: 'Nguyễn Phương Anh' } as L,
    role: { vi: 'Chuyên trách Spa & Low-Stress Handling', en: 'Pet Spa & Low-Stress Handling Specialist' } as L,
    image: '/src/assets/images/groomer_anh_1792562585028.jpg',
    category: { vi: 'Pet Spa Specialist', en: 'Pet Spa Specialist' } as L,
    creds: {
      vi: 'Pet Spa & Skin-Coat Care · Low-Stress Grooming Practices – Fi Grooming Academy · Compassionate Care Award 2025',
      en: 'Pet Spa & Skin and Coat Care · Low-Stress Grooming Practices, Fi Grooming Academy · Compassionate Care Award 2025',
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
          eyebrow={t('Vì sao chọn VinPet?', 'Why Choose VinPet?')}
          title={t(
            <>Những giá trị <span className="text-gold-gradient">tạo nên sự an tâm</span></>,
            <>The Values <span className="text-gold-gradient">That Inspire Confidence</span></>
          )}
          subtitle={t(
            'Những lý do khiến hàng ngàn gia đình mang theo thú cưng chọn VinPet cho kỳ nghỉ của mình.',
            'Discover why thousands of families choose VinPet to make their holidays with their beloved pets more comfortable, carefree, and memorable.'
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
          eyebrow={t('Dịch vụ tại VinPet', 'Services at VinPet')}
          title={t(
            <>Trọn vẹn trải nghiệm, <span className="text-gold-gradient">chu đáo trong từng dịch vụ</span></>,
            <>A Complete Experience, <span className="text-gold-gradient">Thoughtfully Tailored to Every Need</span></>
          )}
          subtitle={t(
            'Khám phá 5 nhóm dịch vụ dành cho thú cưng, từ lưu trú, vui chơi đến chăm sóc sắc đẹp và tổ chức sự kiện được thiết kế để mỗi trải nghiệm đều thoải mái, thú vị và đáng nhớ.',
            'Explore our five categories of pet services, from comfortable stays and playful experiences to grooming and special celebrations. Each is thoughtfully designed to make every moment comfortable, enjoyable, and memorable for you and your beloved companion.'
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
            <p className="eyebrow text-gold-400">{t('CÂU CHUYỆN THƯƠNG HIỆU', 'OUR BRAND STORY')}</p>
            <h2 className="heading-2 mt-3 text-ivory">
              {t(
                <>Trọn vẹn kỳ nghỉ, <span className="text-gold-gradient">đủ đầy yêu thương</span></>,
                <>A Complete Getaway, <span className="text-gold-gradient">Filled with Love</span></>
              )}
            </h2>
            <div className="gold-divider !mx-0 !my-5" />
            <div className="space-y-4 text-base leading-relaxed text-sapphire-200">
              <p>
                {t(
                  'Tại VinPet, chúng tôi tin rằng một kỳ nghỉ chỉ thực sự trọn vẹn khi mọi thành viên trong gia đình đều được đồng hành - kể cả những người bạn bốn chân đã trở thành một phần không thể thiếu của mái ấm.',
                  'At VinPet, we believe a holiday is truly complete when every member of the family can be part of the journey - including the four-legged companions who have become such an irreplaceable part of our homes and hearts.'
                )}
              </p>
              <p>
                {t(
                  'Từ niềm tin ấy, VinPet ra đời với mong muốn nối dài sự quan tâm và tinh thần hiếu khách của Vingroup, để mỗi hành trình không chỉ là dịp khám phá những điểm đến mới, mà còn là khoảng thời gian quý giá khi cả gia đình được ở bên nhau, không ai phải ở lại phía sau.',
                  'Inspired by this belief, VinPet was created to extend Vingroup’s spirit of care and hospitality to our beloved pets. We aspire to make every journey more than an opportunity to discover new destinations; it is also a precious time for families to be together, creating lasting memories with no one left behind.'
                )}
              </p>
            </div>
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
          eyebrow={t('Đội ngũ đứng đầu VinPet', 'The Experts Behind VinPet')}
          title={t(
            <>Vet Team & <span className="text-gold-gradient">Groomer đạt chuẩn quốc tế</span></>,
            <>International-Standard <span className="text-gold-gradient">Veterinary & Grooming Services</span></>
          )}
          subtitle={t(
            'Đằng sau những chuyên gia giàu kinh nghiệm của VinPet là cả một đội ngũ nhân sự có chuyên môn, luôn chu đáo trong từng chi tiết',
            'Behind VinPet’s trusted experts is a team of dedicated professionals who bring expertise, care, and thoughtful attention to every detail.'
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
