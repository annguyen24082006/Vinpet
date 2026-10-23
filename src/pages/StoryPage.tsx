import { ArrowRight, Heart, Sparkles, Globe2, Users } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { useLang, type L } from '@/lib/i18n';

const pillars = [
  {
    icon: Heart,
    title: { vi: 'Yêu thương trọn vẹn', en: 'Love Without Limits' } as L,
    text: {
      vi: 'Thú cưng là một phần của gia đình. Mỗi hành trình nghỉ dưỡng trở thành khoảng thời gian gắn kết, nơi không thành viên nào phải ở lại phía sau.',
      en: 'Pets are family. We transform every vacation into a meaningful bonding journey, ensuring that no member of the family is ever left behind.',
    } as L,
  },
  {
    icon: Sparkles,
    title: { vi: 'Chất lượng tạo dựng niềm tin', en: 'Trust Built on Quality' } as L,
    text: {
      vi: 'Mọi dịch vụ cho thú cưng đều đạt chuẩn Vingroup: chỉn chu, an toàn và chuyên nghiệp trong từng trải nghiệm.',
      en: 'Every pet service reflects Vingroup’s commitment to quality, with thoughtful attention to detail, safety, and professionalism at every step of the experience.',
    } as L,
  },
  {
    icon: Globe2,
    title: { vi: 'Kết nối hành trình, mở rộng trải nghiệm', en: 'Connecting Journeys, Enriching Experiences' } as L,
    text: {
      vi: 'VinPet mong muốn mang đến những lựa chọn thuận tiện hơn cho các gia đình có thú cưng.',
      en: 'VinPet strives to make every journey more convenient for families travelling with pets, with a vision of greater connectivity across the ecosystem.',
    } as L,
  },
  {
    icon: Users,
    title: { vi: 'Gắn kết cộng đồng yêu thú cưng', en: 'Bringing Pet-Loving Communities Together' } as L,
    text: {
      vi: 'Không gian gặp gỡ những gia đình cùng đam mê, nơi Boss được tôn trọng như thành viên gia đình.',
      en: 'A welcoming space for like-minded families to connect, where every pet is cherished and respected as a member of the family.',
    } as L,
  },
];

const timeline = [
  {
    year: '2025',
    title: { vi: 'Khởi nguồn ý tưởng', en: 'The Idea Takes Shape' } as L,
    text: {
      vi: 'Từ nhu cầu ngày càng được quan tâm về trải nghiệm nghỉ dưỡng cùng thú cưng, ý tưởng VinPet hướng đến việc mở rộng lựa chọn cho các gia đình yêu động vật.',
      en: 'Inspired by the growing interest in holiday experiences with pets, the idea for VinPet emerged with a vision to offer more choices for families who love animals.',
    } as L,
  },
  {
    year: '2026',
    title: { vi: 'Giai đoạn thí điểm', en: 'Pilot Phase' } as L,
    text: {
      vi: 'Dự kiến triển khai mô hình tại Phú Quốc, Nha Trang và Hội An, từng bước hoàn thiện quy trình vận hành và trải nghiệm dịch vụ dành cho thú cưng.',
      en: 'VinPet plans to pilot its model in Phu Quoc, Nha Trang, and Hoi An, gradually refining operational processes and developing a seamless service experience tailored to pets and their owners.',
    } as L,
  },
  {
    year: '2028',
    title: { vi: 'Hướng tới mở rộng hệ sinh thái', en: 'Expanding the Ecosystem' } as L,
    text: {
      vi: 'Định hướng mở rộng dịch vụ tại các điểm đến nghỉ dưỡng, hướng đến trải nghiệm đồng bộ và thuận tiện hơn cho những gia đình đi du lịch cùng thú cưng.',
      en: 'With a vision to expand its services across resort destinations, VinPet aims to create a more consistent and convenient experience for families travelling with their pets.',
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
            <p className="eyebrow text-gold-300">{t('Câu chuyện về VinPet', 'The Story Behind VinPet')}</p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                <>Trọn vẹn kỳ nghỉ, <span className="text-gold-gradient">đủ đầy yêu thương</span></>,
                <>A Complete Getaway, <span className="text-gold-gradient">Filled with Love</span></>
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
              '"Mang đến những trải nghiệm nghỉ dưỡng thân thiện với thú cưng, để mỗi thành viên trong gia đình đều có thể đồng hành trên cùng một hành trình, cùng sẻ chia những khoảnh khắc đáng nhớ."',
              '“To create pet-friendly holiday experiences where every member of the family can be part of the journey and share in life’s most memorable moments together.”'
            )}
          </p>
          <div className="gold-divider" />
          <p className="text-sm uppercase tracking-[0.3em] text-gold-600">{t('Sứ mệnh VinPet', 'VinPet’s Mission')}</p>
        </div>
      </section>

      {/* pillars */}
      <section className="section-pad bg-cream">
        <SectionHeading
          eyebrow={t('GIÁ TRỊ CỐT LÕI', 'OUR CORE VALUES')}
          title={t(
            <>Bốn giá trị tạo nên <span className="text-gold-gradient">bản sắc VinPet</span></>,
            <>The Four Values That <span className="text-gold-gradient">Define VinPet</span></>
          )}
        />
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
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-3 text-gold-600">{t('CỘT MỐC ĐÁNG NHỚ', 'MEMORABLE MILESTONES')}</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sapphire-950 tracking-tight">
            {t(
              <>Hành trình <span className="text-gold-gradient">phát triển</span></>,
              <>Our <span className="text-gold-gradient">Journey</span></>
            )}
          </h2>
          <div className="gold-divider" />
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-sapphire-700">
            {t(
              'Từng bước kiến tạo hành trình nghỉ dưỡng thân thiện với thú cưng cùng chuẩn mực 5 sao Vingroup.',
              'Building a five-star pet-friendly holiday experience, one milestone at a time.'
            )}
          </p>
        </div>
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
