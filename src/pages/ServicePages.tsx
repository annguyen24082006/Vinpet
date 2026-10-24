import { useState } from 'react';
import { Check, ChevronRight, ArrowRight, Sparkles, Info, X, Coffee, Utensils, Scissors, Bath, Heart, Clock } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { useLang } from '@/lib/i18n';
import { supabase, genCode } from '@/lib/supabase';

export function PetStayPage({ navigate }: { navigate: (p: string) => void }) {
  const { t } = useLang();
  return (
    <div className="pt-20">
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img src="https://images.pexels.com/photos/33154338/pexels-photo-33154338.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Pet-friendly Stay" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/50 to-sapphire-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">Pet-friendly Stay</p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                <>Lưu trú <span className="text-gold-gradient">5 sao</span> cho cả gia đình</>,
                <>Five-star stays for the <span className="text-gold-gradient">whole family</span></>
              )}
            </h1>
            <p className="mt-4 max-w-lg text-sapphire-200">
              {t(
                'Phòng và villa được thiết kế riêng cho gia đình mang theo thú cưng — lối đi riêng, giường thú cưng cao cấp, không gian vô trùng khử mùi.',
                'Rooms and villas designed for families travelling with pets, with a private path, a premium pet bed and fresh, sterilised, odour-free spaces.'
              )}
            </p>
            <button onClick={() => navigate('/destinations')} className="btn-gold mt-6">
              {t('Xem điểm đến', 'See our destinations')} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ivory">
        <SectionHeading eyebrow={t('Tiện ích đi kèm', 'What’s included')} title={t(<>Gói lưu trú <span className="text-gold-gradient">VinPet</span></>, <>The <span className="text-gold-gradient">VinPet</span> stay package</>)} />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            t('Giường thú cưng cao cấp & bát ăn gốm', 'Premium pet bed & ceramic food bowl'),
            t('Lối đi riêng tránh khu vực đông người', 'A private path that avoids busy areas'),
            t('Xe điện buggy có khoang riêng cho thú cưng', 'Buggy rides with a private pet compartment'),
            t('Dịch vụ dắt dạo 2 lần/ngày (miễn phí)', 'Dog-walking twice a day (free)'),
            t('Kit chào mừng: snack hữu cơ, đồ chơi', 'Welcome kit: organic snacks and toys'),
            t('Vô trùng khử mùi toàn bộ phòng sau mỗi lượt khách', 'The whole room is sterilised and freshened after every guest'),
          ].map((t) => (
            <div key={t} className="flex items-start gap-2.5 rounded-2xl border border-sapphire-100 bg-white p-4">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sapphire-50">
                <Check className="h-3.5 w-3.5 text-sapphire-700" />
              </span>
              <p className="text-sm text-sapphire-700">{t}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

interface SpaServiceItem {
  id: string;
  code: string;
  title: { vi: string; en: string };
  desc: { vi: string; en: string };
  duration: { vi: string; en: string };
  img: string;
  pricing: {
    xs: number; // under 4kg
    s: number;  // 4-7kg
    m: number;  // 7-10kg
    l: number;  // 10-15kg
  };
}

export function SpaPage() {
  const { t, money } = useLang();
  const [selectedSize, setSelectedSize] = useState<'all' | 'xs' | 's' | 'm' | 'l' | 'xl'>('all');
  const [detailModal, setDetailModal] = useState<SpaServiceItem | null>(null);

  const spaPackages: SpaServiceItem[] = [
    {
      id: 'therapeutic-bath',
      code: '01',
      title: { vi: 'Tắm trị liệu', en: 'Therapeutic Bath' },
      desc: {
        vi: 'Liệu trình làm sạch toàn diện kết hợp dưỡng ẩm da và lông, sấy khô, cắt móng, cùng vệ sinh tai và mắt chu đáo.',
        en: 'A complete cleansing treatment with skin and coat moisturizing, blow-drying, nail trimming, plus careful ear and eye cleaning.',
      },
      duration: { vi: '60 phút', en: '60 minutes' },
      img: 'https://images.pexels.com/photos/19145895/pexels-photo-19145895.jpeg?auto=compress&cs=tinysrgb&w=800',
      pricing: { xs: 350000, s: 420000, m: 500000, l: 580000 },
    },
    {
      id: 'trim-styling',
      code: '02',
      title: { vi: 'Cắt tỉa & tạo kiểu', en: 'Trim & Styling' },
      desc: {
        vi: 'Bao gồm trọn gói dịch vụ Vệ Sinh Cơ Bản, kết hợp tư vấn tạo kiểu riêng, cắt tỉa toàn thân phù hợp theo từng giống loài và tạo dáng tỉ mỉ bằng kéo chuyên dụng.',
        en: 'Includes the full Basic Hygiene service, plus a personal styling consultation, a full-body trim suited to each breed, and meticulous shaping with professional scissors.',
      },
      duration: { vi: '90 phút', en: '90 minutes' },
      img: 'https://images.pexels.com/photos/6816841/pexels-photo-6816841.jpeg?auto=compress&cs=tinysrgb&w=800',
      pricing: { xs: 550000, s: 650000, m: 780000, l: 900000 },
    },
    {
      id: 'premium-coat',
      code: '03',
      title: { vi: 'Dưỡng lông cao cấp', en: 'Premium Coat Care' },
      desc: {
        vi: 'Liệu trình chăm sóc chuyên sâu giúp nuôi dưỡng bộ lông mềm mượt với mặt nạ xả hữu cơ (organic), tinh dầu dưỡng chuyên dụng và tắm bồn thư giãn. Giải pháp lý tưởng để gỡ rối và phục hồi độ bóng mượt cho lông.',
        en: 'An intensive treatment that nourishes the coat to silky softness with an organic conditioning mask, specialty nourishing oils and a relaxing soak. Ideal for detangling and restoring shine.',
      },
      duration: { vi: '75 phút', en: '75 minutes' },
      img: 'https://images.pexels.com/photos/19145897/pexels-photo-19145897.jpeg?auto=compress&cs=tinysrgb&w=800',
      pricing: { xs: 480000, s: 580000, m: 680000, l: 800000 },
    },
    {
      id: 'ears-teeth',
      code: '04',
      title: { vi: 'Vệ sinh tai, tuyến hôi & đánh răng', en: 'Ears, Scent Glands & Teeth' },
      desc: {
        vi: 'Quy trình làm sạch tai nhẹ nhàng, vắt tuyến hôi giúp khử mùi triệt để và đánh răng giúp hơi thở thơm sạch, đi kèm bước kiểm tra tổng quát tình trạng da bên ngoài cho bé.',
        en: "Gentle ear cleaning, scent gland expression for lasting odor control and teeth brushing for fresh breath, plus a general check of your pet's skin condition.",
      },
      duration: { vi: '30 phút', en: '30 minutes' },
      img: 'https://images.pexels.com/photos/19145879/pexels-photo-19145879.jpeg?auto=compress&cs=tinysrgb&w=800',
      pricing: { xs: 200000, s: 220000, m: 250000, l: 280000 },
    },
  ];

  const getDisplayPrice = (pkg: SpaServiceItem) => {
    switch (selectedSize) {
      case 'xs':
        return money(pkg.pricing.xs);
      case 's':
        return money(pkg.pricing.s);
      case 'm':
        return money(pkg.pricing.m);
      case 'l':
        return money(pkg.pricing.l);
      case 'xl':
        return money(Math.round(pkg.pricing.l * 1.2));
      default:
        return `${money(pkg.pricing.xs)} - ${money(pkg.pricing.l)}`;
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/19145879/pexels-photo-19145879.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Spa"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/60 to-sapphire-950/95" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">
              VINPET · BY VINGROUP · A VINPEARL BRAND
            </p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                <>Gói <span className="text-gold-gradient">Spa &amp; Grooming</span></>,
                <><span className="text-gold-gradient">Spa &amp; Grooming</span> Packages</>
              )}
            </h1>
            <p className="mt-4 max-w-lg text-sapphire-200">
              {t(
                'Chăm sóc chuyên nghiệp cho vẻ đẹp và sức khỏe của người bạn bốn chân. Bảng giá chi tiết theo từng kích cỡ cân nặng với mỹ phẩm hữu cơ cao cấp.',
                'Professional care for the beauty and health of your four-legged friends. Detailed pricing tailored by pet weight sizes with organic wellness products.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="section-pad bg-ivory">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={t('BẢNG GIÁ DỊCH VỤ SPA & GROOMING', 'SPA & GROOMING SERVICE MENU')}
            title={t(
              <>Bảng giá <span className="text-gold-gradient">chia theo cân nặng thú cưng</span></>,
              <>Service Pricing <span className="text-gold-gradient">by Pet Weight Tiers</span></>
            )}
            subtitle={t(
              'Chọn kích cỡ để xem giá trực tiếp, hoặc ấn vào từng dịch vụ để xem bảng chi tiết từng mức cân.',
              'Select a weight size to preview instant pricing, or click on any service to view the complete weight-tier breakdown.'
            )}
          />

          {/* Weight Size Filter Tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { id: 'all', label: t('Tất cả các size', 'All sizes'), sub: '' },
              { id: 'xs', label: 'XS', sub: t('dưới 4 kg', 'under 4 kg') },
              { id: 's', label: 'S', sub: '4 – 7 kg' },
              { id: 'm', label: 'M', sub: '7 – 10 kg' },
              { id: 'l', label: 'L', sub: '10 – 15 kg' },
              { id: 'xl', label: '+20%', sub: t('trên 15 kg', 'over 15 kg') },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedSize(tab.id as typeof selectedSize)}
                className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  selectedSize === tab.id
                    ? 'bg-sapphire-950 text-gold-300 shadow-md ring-2 ring-gold-400'
                    : 'bg-white text-sapphire-800 border border-sapphire-200 hover:border-gold-400 hover:bg-gold-50/40'
                }`}
              >
                <span className="font-extrabold">{tab.label}</span>
                {tab.sub && <span className="ml-1.5 font-normal opacity-80 text-[11px]">({tab.sub})</span>}
              </button>
            ))}
          </div>

          {/* 4 Interactive Service Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {spaPackages.map((p) => (
              <div
                key={p.id}
                onClick={() => setDetailModal(p)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-sapphire-200/90 bg-white p-6 shadow-soft transition-all duration-300 hover:border-gold-400 hover:shadow-xl hover:-translate-y-0.5"
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="relative h-44 sm:h-auto sm:w-44 shrink-0 overflow-hidden rounded-2xl bg-sapphire-100">
                    <img
                      src={p.img}
                      alt={t(p.title.vi, p.title.en)}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2 left-2 rounded-lg bg-sapphire-950/85 px-2 py-0.5 font-display text-sm font-bold text-gold-300 backdrop-blur">
                      {p.code}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-xl font-bold text-sapphire-950 group-hover:text-gold-600 transition-colors">
                          {t(p.title.vi, p.title.en)}
                        </h3>
                        <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-sapphire-50 px-2.5 py-0.5 text-[11px] font-semibold text-sapphire-700 border border-sapphire-200">
                          <Clock className="h-3 w-3" />
                          {t(p.duration.vi, p.duration.en)}
                        </span>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-sapphire-700 line-clamp-3">
                        {t(p.desc.vi, p.desc.en)}
                      </p>
                    </div>

                    <div className="mt-4 border-t border-sapphire-100 pt-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[11px] font-medium text-sapphire-500 block">
                            {selectedSize === 'all'
                              ? t('Mức giá theo cân nặng:', 'Price range by weight:')
                              : t(`Giá áp dụng size ${selectedSize.toUpperCase()}:`, `Price for size ${selectedSize.toUpperCase()}:`)}
                          </span>
                          <span className="font-display text-xl font-black text-gold-600">
                            {getDisplayPrice(p)}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="btn-outline !py-1.5 !px-3 text-xs flex items-center gap-1 font-bold text-sapphire-900 border-gold-400 group-hover:bg-gold-50"
                        >
                          <Info className="h-3.5 w-3.5 text-gold-600" />
                          {t('Xem bảng giá chi tiết', 'View weight table')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MASTER PRICING TABLE (MATCHING THE ATTACHED POSTER) */}
          <div className="mt-14 overflow-hidden rounded-3xl border border-gold-300 bg-white shadow-soft">
            <div className="border-b border-sapphire-900 bg-sapphire-950 px-6 py-5 text-ivory flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="eyebrow text-gold-400">VINPET · BY VINGROUP · A VINPEARL BRAND</p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {t('Bảng giá Gói Spa & Grooming', 'Spa & Grooming Packages')}
                </h3>
                <p className="mt-0.5 text-xs text-sapphire-200">
                  {t('Áp dụng cho chó và mèo mọi kích cỡ', 'Applicable to dogs and cats of all sizes')}
                </p>
              </div>
              <span className="self-start sm:self-auto rounded-full bg-gold-400/20 border border-gold-400/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-300">
                {t('Niêm yết minh bạch', 'Official Transparent Rates')}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-sapphire-100 bg-sapphire-900 text-ivory">
                    <th className="px-6 py-4 font-display text-base font-bold text-gold-300">
                      {t('Dịch vụ', 'Service')}
                    </th>
                    <th className="px-4 py-4 text-center">
                      <div className="font-bold text-gold-300">XS</div>
                      <div className="text-[11px] font-normal text-sapphire-200">{t('dưới 4 kg', 'under 4 kg')}</div>
                    </th>
                    <th className="px-4 py-4 text-center">
                      <div className="font-bold text-gold-300">S</div>
                      <div className="text-[11px] font-normal text-sapphire-200">4 – 7 kg</div>
                    </th>
                    <th className="px-4 py-4 text-center">
                      <div className="font-bold text-gold-300">M</div>
                      <div className="text-[11px] font-normal text-sapphire-200">7 – 10 kg</div>
                    </th>
                    <th className="px-4 py-4 text-center">
                      <div className="font-bold text-gold-300">L</div>
                      <div className="text-[11px] font-normal text-sapphire-200">10 – 15 kg</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sapphire-100 text-sapphire-900">
                  {spaPackages.map((pkg, idx) => (
                    <tr
                      key={pkg.id}
                      className={idx % 2 === 0 ? 'bg-[#FAF7F2]' : 'bg-[#F2ECE3]'}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-start gap-3">
                          <span className="font-display text-xl font-black text-gold-600">
                            {pkg.code}
                          </span>
                          <div>
                            <p className="font-display text-base font-bold text-sapphire-950">
                              {t(pkg.title.vi, pkg.title.en)}
                            </p>
                            <p className="mt-1 max-w-md text-xs leading-relaxed text-sapphire-700">
                              {t(pkg.desc.vi, pkg.desc.en)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-center font-display text-base font-bold text-sapphire-950">
                        {money(pkg.pricing.xs)}
                      </td>
                      <td className="px-4 py-5 text-center font-display text-base font-bold text-sapphire-950">
                        {money(pkg.pricing.s)}
                      </td>
                      <td className="px-4 py-5 text-center font-display text-base font-bold text-sapphire-950">
                        {money(pkg.pricing.m)}
                      </td>
                      <td className="px-4 py-5 text-center font-display text-base font-bold text-sapphire-950">
                        {money(pkg.pricing.l)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* VERY PROMINENT SURCHARGE BANNER AS REQUESTED IN PDF */}
            <div className="border-t-2 border-gold-400 bg-sapphire-950 p-6 sm:p-7 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="flex h-16 w-28 shrink-0 items-center justify-center rounded-2xl bg-gold-400 text-sapphire-950 shadow-gold">
                  <span className="font-display text-3xl font-extrabold tracking-tight">+20%</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-gold-300">
                    {t('Thú cưng trên 15 kg', 'Pets over 15 kg')}
                  </h4>
                  <p className="text-sm sm:text-base text-sapphire-100 font-medium leading-relaxed">
                    {t(
                      'Bảng giá chuẩn áp dụng cho thú cưng dưới 15 kg. Thú cưng trên 15 kg áp dụng phụ thu 20% trên giá niêm yết của từng dịch vụ.',
                      'Standard pricing applies to dogs and cats under 15 kg. A 20% surcharge applies to the listed price of each service for pets over 15 kg.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAIL MODAL FOR CLICKED SERVICE */}
      {detailModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-sapphire-950/80 p-4 backdrop-blur-sm"
          onClick={() => setDetailModal(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-44 overflow-hidden bg-sapphire-950">
              <img
                src={detailModal.img}
                alt={t(detailModal.title.vi, detailModal.title.en)}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sapphire-950 via-sapphire-950/50 to-transparent" />
              <button
                onClick={() => setDetailModal(null)}
                className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full bg-sapphire-950/70 text-white hover:bg-sapphire-900"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-5 right-5">
                <span className="font-display text-sm font-black text-gold-300">
                  DỊCH VỤ {detailModal.code}
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  {t(detailModal.title.vi, detailModal.title.en)}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-xs sm:text-sm leading-relaxed text-sapphire-700">
                {t(detailModal.desc.vi, detailModal.desc.en)}
              </p>

              <div className="mt-5 rounded-2xl border border-sapphire-200 overflow-hidden">
                <div className="bg-sapphire-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gold-300">
                  {t('Bảng giá chi tiết theo từng mức cân:', 'Detailed Pricing by Weight Tier:')}
                </div>
                <div className="divide-y divide-sapphire-100 text-xs sm:text-sm">
                  <div className="flex justify-between px-4 py-2.5 bg-amber-50/40">
                    <span className="font-bold text-sapphire-900">XS (dưới 4 kg / under 4 kg)</span>
                    <strong className="font-display font-extrabold text-sapphire-950">{money(detailModal.pricing.xs)}</strong>
                  </div>
                  <div className="flex justify-between px-4 py-2.5 bg-white">
                    <span className="font-bold text-sapphire-900">S (4 – 7 kg)</span>
                    <strong className="font-display font-extrabold text-sapphire-950">{money(detailModal.pricing.s)}</strong>
                  </div>
                  <div className="flex justify-between px-4 py-2.5 bg-amber-50/40">
                    <span className="font-bold text-sapphire-900">M (7 – 10 kg)</span>
                    <strong className="font-display font-extrabold text-sapphire-950">{money(detailModal.pricing.m)}</strong>
                  </div>
                  <div className="flex justify-between px-4 py-2.5 bg-white">
                    <span className="font-bold text-sapphire-900">L (10 – 15 kg)</span>
                    <strong className="font-display font-extrabold text-sapphire-950">{money(detailModal.pricing.l)}</strong>
                  </div>
                  <div className="flex justify-between px-4 py-3 bg-sapphire-950 text-gold-300 font-bold">
                    <span>{t('Thú cưng trên 15 kg (+20% phụ thu)', 'Pets over 15 kg (+20% surcharge)')}</span>
                    <strong className="font-display font-extrabold text-gold-400">
                      {money(Math.round(detailModal.pricing.l * 1.2))}
                    </strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setDetailModal(null)}
                className="btn-gold mt-6 w-full shadow-md"
              >
                {t('Đã hiểu & Đóng', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function DaycarePage() {
  const { t, money } = useLang();
  const [form, setForm] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    pet_name: '',
    pet_breed: '',
    slot_date: '',
    pickup_date: '',
    slot_start: '',
    slot_end: '',
  });
  const [pkg, setPkg] = useState<'hourly' | 'daily'>('hourly');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ pin: string } | null>(null);
  const [error, setError] = useState('');

  const submit = async () => {
    setSubmitting(true);
    setError('');
    if (!form.contact_name || !form.contact_phone || !form.pet_name || !form.slot_date || !form.pickup_date) {
      setError(t('Vui lòng điền đầy đủ thông tin bắt buộc (bao gồm ngày gửi và ngày đón).', 'Could you please fill in all the required fields (including drop-off and pick-up dates)?'));
      setSubmitting(false);
      return;
    }
    if (form.pickup_date < form.slot_date) {
      setError(t('Ngày đón không thể trước ngày gửi.', 'Pick-up date cannot be before drop-off date.'));
      setSubmitting(false);
      return;
    }
    const pin = genCode(6);
    try {
      const { error: dbError } = await supabase.from('daycare_bookings').insert({
        contact_name: form.contact_name,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone,
        pet_name: form.pet_name,
        pet_breed: form.pet_breed,
        slot_date: form.slot_date,
        slot_start: form.slot_start || '08:00',
        slot_end: form.slot_end || (pkg === 'daily' ? '18:00' : '10:00'),
        package: pkg,
        pin_code: pin,
      });
      if (dbError) {
        console.warn('Daycare booking log:', dbError);
      }
    } catch (err) {
      console.warn('Daycare booking network error:', err);
    }

    try {
      const existing = JSON.parse(localStorage.getItem('vinpet_daycare_bookings') || '[]');
      existing.push({ ...form, pin, pkg, createdAt: new Date().toISOString() });
      localStorage.setItem('vinpet_daycare_bookings', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setSubmitting(false);
    setDone({ pin });
  };

  return (
    <div className="pt-20">
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img src="https://images.pexels.com/photos/37443358/pexels-photo-37443358.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Daycare" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/50 to-sapphire-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">{t('DAY-CARE | TRÔNG GIỮ THÚ CƯNG', 'DAY CARE | PET SITTING')}</p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                <>An tâm trải nghiệm, <span className="text-gold-gradient">thú cưng luôn được chăm sóc</span></>,
                <>Enjoy Your Stay, <span className="text-gold-gradient">Knowing Your Pet Is in Caring Hands</span></>
              )}
            </h1>
            <p className="mt-4 max-w-lg text-sapphire-200">
              {t(
                'Giải pháp trông giữ linh hoạt theo giờ hoặc cả ngày, dành cho những lúc bạn tham gia các hoạt động, vui chơi hay dùng bữa tại những địa điểm chưa phù hợp để đưa thú cưng đi cùng. Với hệ thống camera trực tuyến, bạn có thể theo dõi người bạn bốn chân ngay trên điện thoại, dù đang ở bất cứ đâu trong khuôn viên.',
                'Flexible hourly and full-day pet care, thoughtfully designed for those moments when you wish to enjoy activities, entertainment, or dining experiences at venues that are not suitable for pets. With our live camera system, you can check in on your four-legged companion directly from your phone, wherever you are on the property.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* highlight */}
      <section className="section-pad bg-ivory">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          {[
            {
              t: t('Livestream/Camera 24/7', '24/7 Live Camera Streaming'),
              d: t(
                'Khách lưu trú có thể mở app VinID/Vinpearl để xem cún cưng của mình đang làm gì.',
                'Pet owners can easily access the VinID or Vinpearl app at any time to check in and see what their beloved canine is up to.'
              ),
            },
            {
              t: t('Hạ tầng chuẩn resort', 'Resort-Standard Infrastructure'),
              d: t(
                'Phòng máy lạnh 100%, có khu bãi cỏ ngoài trời an toàn để các bé chạy nhảy',
                'Fully air-conditioned indoor spaces, complemented by a safe outdoor grassy area where pets can run, play, and explore freely.'
              ),
            },
            {
              t: t('Chăm sóc chuyên nghiệp', 'Professional Care'),
              d: t(
                'Đã bao gồm bữa ăn nhẹ (pate cao cấp hoặc súp thưởng), nước uống tinh khiết và có nhân viên dắt đi dạo 2 lần/ngày',
                'Enjoy complimentary light meals, including premium pâté or treat soups, fresh drinking water, and two supervised walks per day with our dedicated team.'
              ),
            },
          ].map((x) => (
            <div key={x.t} className="card-luxe p-6 text-center">
              <h3 className="font-display text-xl font-semibold text-sapphire-900">{x.t}</h3>
              <p className="mt-2 text-sm text-sapphire-600">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* booking */}
      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow={t('DAY-CARE', 'DAY CARE')}
            title={t(<>Đặt lịch <span className="text-gold-gradient">Day-care</span></>, <>Book <span className="text-gold-gradient">Pet Day Care</span></>)}
          />
          {done ? (
            <div className="mt-8 rounded-3xl border-2 border-emerald-400 bg-white p-8 text-center shadow-soft">
              <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <Check className="h-7 w-7 stroke-[3]" />
              </div>
              <h3 className="heading-2 font-display text-emerald-700">{t('Đã đặt lịch thành công', 'Booking successful')}</h3>
              <p className="mt-2 text-sapphire-700">{t('Mã PIN Live Camera của bạn:', 'Your Live Camera PIN:')}</p>
              <p className="mt-2 font-display text-4xl font-bold tracking-widest text-gold-gradient">{done.pin}</p>
              <p className="mt-3 text-xs text-sapphire-500">{t('Dùng mã này để đăng nhập xem webcam trực tiếp từ điện thoại.', 'Use this code to log in and watch the live webcam from your phone.')}</p>
              <button onClick={() => setDone(null)} className="btn-outline mt-6 text-xs">
                {t('Đặt lịch thêm cho bé khác', 'Book another session')}
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-4 rounded-3xl border border-sapphire-100 bg-white p-6 shadow-soft">
              <div>
                <p className="label-luxe">{t('Chọn gói', 'Select Your Package')}</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'hourly', label: t('Theo giờ', 'Hourly Care'), price: `${money(110000)}${t('/giờ', ' / hour')}` },
                    { id: 'daily', label: t('Trọn ngày', 'Full-Day Care'), price: `${money(999000)}${t('/ngày', ' / day')}` },
                  ].map((p) => (
                    <button key={p.id} onClick={() => setPkg(p.id as 'hourly' | 'daily')} className={`rounded-xl border-2 px-4 py-3 text-left ${pkg === p.id ? 'border-gold-400 bg-gold-50' : 'border-sapphire-100'}`}>
                      <p className="text-sm font-bold text-sapphire-900">{p.label}</p>
                      <p className="text-xs text-sapphire-500">{p.price}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div><label className="label-luxe">{t('Họ tên *', 'Full name *')}</label><input className="input-luxe" value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} /></div>
                <div><label className="label-luxe">{t('SĐT *', 'Phone *')}</label><input className="input-luxe" value={form.contact_phone} onChange={(e) => setForm({ ...form, contact_phone: e.target.value })} /></div>
                <div><label className="label-luxe">Email</label><input className="input-luxe" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} /></div>
                <div><label className="label-luxe">{t('Tên thú cưng *', 'Pet’s name *')}</label><input className="input-luxe" value={form.pet_name} onChange={(e) => setForm({ ...form, pet_name: e.target.value })} /></div>
                <div className="sm:col-span-2"><label className="label-luxe">{t('Giống loài', 'Breed')}</label><input className="input-luxe" value={form.pet_breed} onChange={(e) => setForm({ ...form, pet_breed: e.target.value })} /></div>
                <div>
                  <label className="label-luxe">{t('Ngày gửi *', 'Drop-off date *')}</label>
                  <input
                    type="date"
                    className="input-luxe"
                    value={form.slot_date}
                    onChange={(e) => {
                      const val = e.target.value;
                      setForm((prev) => ({
                        ...prev,
                        slot_date: val,
                        pickup_date: prev.pickup_date && prev.pickup_date < val ? val : (prev.pickup_date || val),
                      }));
                    }}
                  />
                </div>
                <div>
                  <label className="label-luxe">{t('Ngày đón *', 'Pick-up date *')}</label>
                  <input
                    type="date"
                    min={form.slot_date}
                    className="input-luxe"
                    value={form.pickup_date}
                    onChange={(e) => setForm({ ...form, pickup_date: e.target.value })}
                  />
                </div>
                <div><label className="label-luxe">{t('Giờ bắt đầu (gửi)', 'Drop-off time')}</label><input type="time" className="input-luxe" value={form.slot_start} onChange={(e) => setForm({ ...form, slot_start: e.target.value })} /></div>
                <div><label className="label-luxe">{t('Giờ kết thúc (đón)', 'Pick-up time')}</label><input type="time" className="input-luxe" value={form.slot_end} onChange={(e) => setForm({ ...form, slot_end: e.target.value })} /></div>
              </div>
              {error && <p className="text-sm text-rose-500">{error}</p>}
              <button onClick={submit} disabled={submitting} className="btn-sapphire w-full disabled:opacity-60">
                {submitting ? t('Đang xử lý...', 'Processing...') : t('Đặt lịch ngay', 'Book now')}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
         

import { Check } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { SectionHeading } from '@/components/SectionHeading';

// 👉 Import chuẩn theo đúng vị trí file ảnh trên thư mục src/assets/images/ của An
import petCafeMenuImg from '@/assets/images/pet-cafe-menu.png';

export function PetParkPage() {
  const { t, money } = useLang();

  const amenities = [
    { vi: 'Khu vận động Agility', en: 'Agility Play Zone' },
    { vi: 'Thảm cỏ tự nhiên', en: 'Natural Grass Lawn' },
    { vi: 'Không côn trùng/thuốc trừ sâu', en: 'Insecticide-Free Environment' },
    { vi: 'Café dành cho cả bạn và thú cưng', en: 'Pet-Friendly Café' },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/11512316/pexels-photo-11512316.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Pet Park"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/50 to-sapphire-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">
              {t('PET PARK & CAFÉ | SÂN CHƠI & CÀ PHÊ', 'PET PARK & CAFÉ | PLAY & RELAX')}
            </p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                'Không gian vui chơi, những phút giây thư thái',
                'Room to Play, Moments to Unwind'
              )}
            </h1>
            <p className="mt-4 max-w-lg text-sapphire-200">
              {t(
                'Không gian ngoài trời dành cho những người bạn bốn chân thỏa sức vận động, khám phá và kết nối. Trong khi thú cưng tận hưởng thời gian vui chơi trên thảm cỏ xanh, chủ nuôi có thể thư giãn với cà phê và các món ăn nhẹ tại quầy café.',
                'An inviting outdoor space where four-legged companions can stretch their legs, explore, and socialise. While pets enjoy carefree play on the lush green lawn, their owners can unwind over freshly brewed coffee and light bites at our café.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="section-pad bg-ivory">
        <SectionHeading
          eyebrow={t('TIỆN ÍCH', 'AMENITIES')}
          title={t('Vui chơi thỏa thích, an tâm khám phá', 'Play Freely, Explore with Peace of Mind')}
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((item) => (
            <div key={item.vi} className="rounded-2xl border border-sapphire-100 bg-white p-5 text-center">
              <Check className="mx-auto mb-2 h-6 w-6 text-sapphire-700" />
              <p className="text-sm font-semibold text-sapphire-700">{t(item.vi, item.en)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PET CAFÉ MENU SECTION: DISPLAY DESIGNED IMAGE */}
      <section className="section-pad bg-sapphire-950 text-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-10">
            <p className="eyebrow text-gold-400">VINPET · BY VINGROUP · A VINPEARL BRAND</p>
            <h2 className="heading-1 mt-2 text-white font-serif">
              {t(
                <>Menu <span className="text-gold-gradient">Pet Café</span></>,
                <><span className="text-gold-gradient">Pet Café</span> Menu</>
              )}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-sapphire-200">
              {t(
                'Dành cho chủ nuôi và những người bạn bốn chân, mỗi lựa chọn góp thêm một khoảnh khắc thư giãn trọn vẹn.',
                'For owners and their four-legged friends, every choice adds a moment of complete relaxation.'
              )}
            </p>
          </div>

          {/* Hiển thị ảnh menu thông qua biến đã import */}
          <div className="flex justify-center">
            <img 
              src={petCafeMenuImg} 
              alt="VinPet Café Menu" 
              className="w-full max-w-4xl rounded-3xl shadow-2xl border-2 border-gold-400/40 object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export function EventsPage() {
  const { t } = useLang();
  const [form, setForm] = useState({ contact_name: '', contact_email: '', contact_phone: '', human_count: 1, pet_count: 1, budget: '', event_type: 'birthday', preferred_date: '', note: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    setSubmitting(true);
    setError('');
    if (!form.contact_name || !form.contact_phone) {
      setError(t('Vui lòng điền họ tên và SĐT.', 'Could you please enter your name and phone number?'));
      setSubmitting(false);
      return;
    }
    try {
      const { error: dbError } = await supabase.from('event_inquiries').insert({
        contact_name: form.contact_name,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone,
        human_count: Number(form.human_count),
        pet_count: Number(form.pet_count),
        budget: form.budget,
        event_type: form.event_type,
        preferred_date: form.preferred_date || null,
        note: form.note,
      });
      if (dbError) {
        console.warn('Event inquiry log:', dbError);
      }
    } catch (err) {
      console.warn('Event inquiry network error:', err);
    }

    try {
      const existing = JSON.parse(localStorage.getItem('vinpet_event_inquiries') || '[]');
      existing.push({ ...form, createdAt: new Date().toISOString() });
      localStorage.setItem('vinpet_event_inquiries', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setSubmitting(false);
    setDone(true);
  };

  const packages = [
    {
      name: t('Tiệc sinh nhật cho Boss', 'Birthday Party for Your Furry Friend'),
      includes: [
        t('Trang trí theo chủ đề lựa chọn', 'Customisable themed decorations'),
        t('Bánh sinh nhật với thành phần phù hợp cho thú cưng', 'A birthday cake made with pet-friendly ingredients'),
        t('Dịch vụ chụp ảnh chuyên nghiệp trong 2 giờ', 'Professional photography for two hours'),
        t('Thiệp mời điện tử dành cho khách tham dự', 'Digital invitations for guests'),
      ],
    },
    {
      name: t('Gặp gỡ cộng đồng thú cưng', 'Pet Community Gatherings'),
      includes: [
        t('Không gian tổ chức riêng tại Pet Park', 'A private event space at the Pet Park'),
        t('Hoạt động vận động và thử thách Agility', 'Fun exercise activities and Agility challenges'),
        t('Dịch vụ đồ ăn, thức uống tại quầy F&B', 'Food and beverage services from our F&B counter'),
        t('MC điều phối và kết nối chương trình', 'A dedicated host to coordinate activities and engage guests'),
      ],
    },
    {
      name: t('Kỷ niệm ngày đặc biệt của Boss', 'Celebrating Your Pet’s Special Milestones'),
      includes: [
        t('Trang trí theo chủ đề kỷ niệm', 'Decorations tailored to your chosen celebration theme'),
        t('Bánh kem dành riêng cho chủ nuôi và thú cưng', 'A celebratory cake for both pets and their owners'),
        t('Album ảnh được thực hiện chuyên nghiệp', 'A professionally curated photo album'),
        t('Quà tặng lưu niệm dành cho Boss', 'A commemorative gift for your beloved companion'),
      ],
    },
  ];

  return (
    <div className="pt-20">
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img src="https://images.pexels.com/photos/15472083/pexels-photo-15472083.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Events" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/50 to-sapphire-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">{t('PET EVENTS & PARTIES | SỰ KIỆN DÀNH CHO THÚ CƯNG', 'PET EVENTS & PARTIES')}</p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                'Những dịp đặc biệt, những kỷ niệm đáng nhớ',
                'Special Occasions, Unforgettable Memories'
              )}
            </h1>
            <p className="mt-4 max-w-lg text-sapphire-200">
              {t(
                'Từ tiệc sinh nhật đáng yêu đến những buổi gặp gỡ cộng đồng và dấu mốc đặc biệt của người bạn bốn chân, VinPet đồng hành cùng bạn tạo nên những sự kiện được chăm chút từ không gian, hoạt động đến từng khoảnh khắc đáng nhớ.',
                'From adorable birthday parties to community gatherings and special milestones in your four-legged companion’s life, VinPet is here to help you create memorable celebrations, thoughtfully curated from the setting and activities to every little moment that makes the occasion special.'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ivory">
        <SectionHeading
          eyebrow={t('CÁC GÓI SỰ KIỆN', 'EVENT PACKAGES')}
          title={t(<>Mỗi dịp vui, <span className="text-gold-gradient">một dấu ấn riêng</span></>, <>Every Celebration, <span className="text-gold-gradient">Uniquely Yours</span></>)}
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-3">
          {packages.map((p) => (
            <div key={p.name} className="card-luxe p-7">
              <h3 className="font-display text-2xl font-semibold text-sapphire-900">{p.name}</h3>
              <div className="my-4 h-px bg-sapphire-100" />
              <ul className="space-y-2.5">
                {p.includes.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-sapphire-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-2xl">
          <SectionHeading eyebrow={t('Đăng ký', 'Sign up')} title={t(<>Tư vấn <span className="text-gold-gradient">tổ chức tiệc</span></>, <>Plan your <span className="text-gold-gradient">party</span> with us</>)} />
          {done ? (
            <div className="mt-8 rounded-3xl border-2 border-emerald-400 bg-white p-8 text-center shadow-soft">
              <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <Check className="h-7 w-7 stroke-[3]" />
              </div>
              <h3 className="heading-2 font-display text-emerald-700">{t('Đã gửi thành công', 'Sent successfully')}</h3>
              <p className="mt-2 text-sapphire-700">{t('Đội ngũ sự kiện VinPet đã nhận được yêu cầu và sẽ liên hệ với bạn trong vòng 24 giờ.', 'Our VinPet events team has received your request and will contact you within 24 hours.')}</p>
              <button onClick={() => setDone(false)} className="btn-outline mt-6 text-xs">
                {t('Gửi yêu cầu khác', 'Send another request')}
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-4 rounded-3xl border border-sapphire-100 bg-white p-6 shadow-soft">
              <div className="grid gap-3 sm:grid-cols-2">
                <div><label className="label-luxe">{t('Họ tên *', 'Full name *')}</label><input className="input-luxe" value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} /></div>
                <div><label className="label-luxe">{t('SĐT *', 'Phone *')}</label><input className="input-luxe" value={form.contact_phone} onChange={(e) => setForm({ ...form, contact_phone: e.target.value })} /></div>
                <div><label className="label-luxe">Email</label><input className="input-luxe" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} /></div>
                <div><label className="label-luxe">{t('Loại sự kiện', 'Event type')}</label>
                  <select className="input-luxe" value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })}>
                    <option value="birthday">{t('Tiệc sinh nhật Boss', 'Boss’s Birthday Party')}</option>
                    <option value="anniversary">{t('Mừng Boss tròn năm', 'Boss’s Anniversary')}</option>
                    <option value="community">{t('Offline cộng đồng', 'Community Meetup')}</option>
                  </select>
                </div>
                <div><label className="label-luxe">{t('Số lượng khách', 'Number of guests')}</label><input type="number" min={1} className="input-luxe" value={form.human_count} onChange={(e) => setForm({ ...form, human_count: Number(e.target.value) })} /></div>
                <div><label className="label-luxe">{t('Số lượng thú cưng', 'Number of pets')}</label><input type="number" min={1} className="input-luxe" value={form.pet_count} onChange={(e) => setForm({ ...form, pet_count: Number(e.target.value) })} /></div>
                <div><label className="label-luxe">{t('Ngân sách dự kiến', 'Estimated budget')}</label><input className="input-luxe" placeholder={t('VD: 10–20 triệu', 'e.g. 10–20 million VND')} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} /></div>
                <div><label className="label-luxe">{t('Ngày dự kiến', 'Preferred date')}</label><input type="date" className="input-luxe" value={form.preferred_date} onChange={(e) => setForm({ ...form, preferred_date: e.target.value })} /></div>
              </div>
              <div><label className="label-luxe">{t('Ghi chú', 'Notes')}</label><textarea rows={2} className="input-luxe" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></div>
              {error && <p className="text-sm text-rose-500">{error}</p>}
              <button onClick={submit} disabled={submitting} className="btn-gold w-full disabled:opacity-60">
                {submitting ? t('Đang gửi...', 'Sending...') : t('Gửi yêu cầu tư vấn', 'Send my request')}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
