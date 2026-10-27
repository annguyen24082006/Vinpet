import { useMemo, useState } from 'react';
import {
  Search,
  MapPin,
  BedDouble,
  Check,
  ChevronRight,
  Upload,
  ShieldCheck,
  CreditCard,
  QrCode,
  Copy,
  Info,
  Users,
  Maximize2,
  Plus,
  Minus,
  Sparkles,
  Heart,
  X,
  Gift,
  Calendar,
  Stethoscope,
  Clock,
} from 'lucide-react';
import { destinations, type Destination, type RoomInfo } from '@/lib/data';
import { useLang, type L } from '@/lib/i18n';
import { supabase, genCode } from '@/lib/supabase';

const ALL = 'all';

const typeOptions: { value: string; label: L }[] = [
  { value: ALL, label: { vi: 'Tất cả loại hình', en: 'All stay types' } },
  { value: 'Khách sạn căn hộ sát biển', label: { vi: 'Khách sạn căn hộ sát biển', en: 'Beachfront Hotel & Suites' } },
  { value: 'Resort sát biển đảo Hòn Tre', label: { vi: 'Resort sát biển đảo Hòn Tre', en: 'Island Beachfront Resort' } },
  { value: 'Khu biệt thự nghỉ dưỡng 5 sao cao cấp', label: { vi: 'Khu biệt thự 5 sao cao cấp', en: 'Ultra-Luxury Villa Resort' } },
  { value: 'Resort & Golf sát biển Nam Hội An', label: { vi: 'Resort & Golf Hội An', en: 'Beachfront Golf & Resort' } },
  { value: 'Quần thể biệt thự nghỉ dưỡng Bãi Dài', label: { vi: 'Biệt thự Bãi Dài Phú Quốc', en: 'Luxury All-Villa Beachfront Resort' } },
];

export function DestinationsPage() {
  const { t, tr, money } = useLang();
  const [region, setRegion] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [activeDest, setActiveDest] = useState<Destination | null>(null);
  const [previewRoom, setPreviewRoom] = useState<{ room: RoomInfo; destName: L } | null>(null);

  const regions = useMemo(
    () => [
      { value: ALL, label: { vi: 'Tất cả điểm đến', en: 'All destinations' } as L },
      ...Array.from(new Set(destinations.map((d) => d.region.vi))).map((regVi) => {
        const item = destinations.find((d) => d.region.vi === regVi);
        return { value: regVi, label: item?.region || { vi: regVi, en: regVi } };
      }),
    ],
    []
  );

  const filtered = destinations.filter(
    (d) =>
      (region === ALL || d.region.vi === region) &&
      (type === ALL || d.type.vi === type)
  );

  return (
    <div className="pt-20">
      {/* Search Header */}
      <section className="relative overflow-hidden bg-sapphire-950 py-14 lg:py-20 text-ivory">
        <img
          src="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Vinpearl Pet-Friendly Resort"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/85 via-sapphire-950/90 to-sapphire-950" />
        <div className="absolute inset-0 bg-sapphire-radial opacity-60" />
        <div className="absolute inset-0 opacity-20 bg-grain mix-blend-overlay" />
        
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center md:text-left">
            <p className="eyebrow text-gold-400">{t('Điểm đến & Đặt phòng', 'Destinations & Booking')}</p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                <>Tìm kỳ nghỉ <span className="text-gold-gradient">pet-friendly</span> lý tưởng</>,
                <>Find your perfect <span className="text-gold-gradient">pet-friendly</span> getaway</>
              )}
            </h1>
            <p className="mt-3 max-w-2xl text-sapphire-200">
              {t(
                'Khám phá 5 điểm đến nghỉ dưỡng cao cấp cùng những căn phòng, villa biệt lập được thiết kế đặc quyền cho gia đình mang theo thú cưng.',
                'Discover 5 luxury destinations with private rooms and villas tailored specifically for families travelling with their beloved pets.'
              )}
            </p>
          </div>

          {/* PROMINENT POLICY BANNER - FRAMED & LARGE TEXT AS REQUESTED IN PDF */}
          <div className="mt-8 overflow-hidden rounded-3xl border-2 border-gold-400/90 bg-gradient-to-br from-sapphire-900/95 via-sapphire-950/95 to-slate-900/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  {t('CHÍNH SÁCH ĐỒNG GIÁ DÀNH CHO THÚ CƯNG', 'FLAT PET RATE POLICY')}
                </div>
                
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
                    450.000đ <span className="text-2xl sm:text-3xl font-medium text-gold-300">/ pet</span>
                  </span>
                  <span className="rounded-xl border border-gold-400/50 bg-gold-500/20 px-3 py-1 font-display text-sm sm:text-base font-bold uppercase tracking-wider text-gold-300">
                    {t('ĐỒNG GIÁ TOÀN HỆ THỐNG', 'FLAT RATE ALL RESORTS')}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-sapphire-200">
                  {t(
                    'Áp dụng đồng nhất cho mọi resort thuộc hệ thống VinPet. Không phụ thu ẩn, không tính thêm chi phí theo kích thước.',
                    'Flat fee applied across all VinPet resorts. Zero hidden charges, no extra fee by pet weight.'
                  )}
                </p>
              </div>

              {/* Free perks box */}
              <div className="rounded-2xl border border-gold-400/30 bg-sapphire-800/40 p-4 sm:p-5 lg:max-w-md">
                <p className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-gold-300">
                  <Gift className="h-4 w-4 text-gold-400" />
                  {t('ĐẶC QUYỀN MIỄN PHÍ ĐI KÈM TRONG PHÒNG:', 'COMPLIMENTARY IN-ROOM AMENITIES:')}
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-medium text-white">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-gold-400" />
                    <span>{t('FREE Đồ ăn vặt / bánh thưởng', 'FREE Pet treats & snacks')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-gold-400" />
                    <span>{t('FREE Ổ / đệm nằm thú cưng', 'FREE Luxury pet bed')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-gold-400" />
                    <span>{t('FREE Cát vệ sinh chuyên dụng', 'FREE Dedicated cat litter')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-gold-400" />
                    <span>{t('FREE Lót chuồng / thảm thấm', 'FREE Absorbent pee pads')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="mt-8 grid gap-3 rounded-3xl border border-sapphire-200 bg-white p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="label-luxe text-sapphire-800">{t('Điểm đến', 'Destination')}</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="input-luxe bg-sapphire-50/50 border-sapphire-200 text-sapphire-900 focus:bg-white"
              >
                {regions.map((r) => (
                  <option key={r.value} value={r.value} className="bg-white text-sapphire-900">
                    {tr(r.label)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-luxe text-sapphire-800">{t('Loại hình nghỉ dưỡng', 'Stay type')}</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input-luxe bg-sapphire-50/50 border-sapphire-200 text-sapphire-900 focus:bg-white"
              >
                {typeOptions.map((r) => (
                  <option key={r.value} value={r.value} className="bg-white text-sapphire-900">
                    {tr(r.label)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end sm:col-span-2 lg:col-span-1">
              <button
                onClick={() => {
                  setRegion(ALL);
                  setType(ALL);
                }}
                className="btn-gold w-full flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                {t('Xem tất cả 5 khu nghỉ dưỡng', 'View all 5 resorts')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations List */}
      <section className="section-pad bg-ivory">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="heading-2 text-sapphire-950">
                {t('Danh sách khu nghỉ dưỡng Vinpearl Pet-friendly', 'Vinpearl Pet-friendly Resort Collection')}
              </h2>
              <p className="mt-1 text-sm text-sapphire-600">
                {t('5 khu nghỉ dưỡng 5 sao tiêu chuẩn Vingroup chào đón thú cưng', '5 five-star resorts welcoming pets across Vietnam')}
              </p>
            </div>
            <span className="hidden sm:inline-block rounded-full bg-sapphire-100 px-3.5 py-1 text-xs font-semibold text-sapphire-800">
              {filtered.length} {t('khu nghỉ dưỡng', 'resorts')}
            </span>
          </div>

          <div className="space-y-12">
            {filtered.map((dest) => (
              <article
                key={dest.id}
                className="overflow-hidden rounded-3xl border border-sapphire-100 bg-white shadow-soft transition-all duration-300 hover:shadow-xl"
              >
                {/* Resort Hero Top Banner */}
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img
                    src={dest.hero}
                    alt={tr(dest.name)}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sapphire-950 via-sapphire-950/40 to-transparent" />

                  <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    <span className="chip !bg-sapphire-950/80 !text-gold-300 !border-gold-400/40 backdrop-blur">
                      <MapPin className="h-3.5 w-3.5" /> {tr(dest.region)}
                    </span>
                    <span className="chip !bg-gold-500/90 !text-sapphire-950 !border-0 font-bold backdrop-blur">
                      {tr(dest.type)}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white text-shadow-luxe">
                        {tr(dest.name)}
                      </h3>
                      <p className="mt-1 flex items-center gap-2 text-xs sm:text-sm text-sapphire-200">
                        <Check className="h-4 w-4 text-gold-400" /> {tr(dest.petZone)}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveDest(dest)}
                      className="btn-gold self-start sm:self-auto shrink-0 shadow-lg text-sm"
                    >
                      {t('Đặt phòng tại đây', 'Book this resort')} <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Rooms List for this Resort */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between border-b border-sapphire-100 pb-4">
                    <h4 className="font-display text-lg font-bold text-sapphire-900">
                      {t('Các hạng phòng dành cho thú cưng', 'Available Pet-friendly Rooms & Villas')} ({dest.rooms.length})
                    </h4>
                    <span className="text-xs text-sapphire-500">
                      {t('Phụ phí thú cưng:', 'Pet surcharge:')} <strong className="text-sapphire-900">450.000đ/con</strong>
                    </span>
                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {dest.rooms.map((room) => (
                      <div
                        key={room.type}
                        className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-sapphire-100 bg-sapphire-50/30 transition hover:border-gold-400/70 hover:bg-white hover:shadow-soft"
                      >
                        <div>
                          <div className="relative h-44 overflow-hidden">
                            <img
                              src={room.image}
                              alt={room.type}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-2.5 right-2.5 rounded-full bg-sapphire-950/80 px-2.5 py-1 text-xs font-semibold text-gold-300 backdrop-blur">
                              {room.area}
                            </div>
                          </div>

                          <div className="p-4 sm:p-5">
                            <h5 className="font-display text-lg font-bold text-sapphire-900 group-hover:text-gold-600 transition-colors">
                              {room.type}
                            </h5>

                            {/* Badges for capacity and area */}
                            <div className="mt-2.5 flex flex-wrap gap-2 text-xs text-sapphire-700">
                              <span className="inline-flex items-center gap-1 rounded-md bg-sapphire-100/80 px-2 py-0.5 font-medium">
                                <Maximize2 className="h-3 w-3 text-sapphire-600" />
                                {room.area}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-md bg-gold-100/80 px-2 py-0.5 font-medium text-amber-900">
                                <Users className="h-3 w-3 text-gold-600" />
                                {room.capacity}
                              </span>
                            </div>

                            <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-sapphire-600">
                              {tr(room.desc)}
                            </p>
                          </div>
                        </div>

                        <div className="border-t border-sapphire-100/80 bg-white p-4">
                          <div className="flex items-baseline justify-between mb-3">
                            <span className="text-xs text-sapphire-500">{t('Giá phòng', 'Room rate')}</span>
                            <span className="font-display text-lg font-bold text-sapphire-900">
                              {money(room.pricePerNight)}
                              <span className="text-xs font-normal text-sapphire-500">{t('/đêm', '/night')}</span>
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => setPreviewRoom({ room, destName: dest.name })}
                              className="btn-outline !py-2 !px-2.5 text-xs flex items-center justify-center gap-1 border-sapphire-200"
                            >
                              <Info className="h-3.5 w-3.5" />
                              {t('Xem chi tiết', 'Details')}
                            </button>
                            <button
                              onClick={() => setActiveDest(dest)}
                              className="btn-sapphire !py-2 !px-2.5 text-xs flex items-center justify-center gap-1"
                            >
                              {t('Đặt phòng', 'Book')}
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-base text-sapphire-600">
                {t('Không tìm thấy điểm đến phù hợp với bộ lọc.', 'No matching destinations found. Please try another filter.')}
              </p>
              <button
                onClick={() => {
                  setRegion(ALL);
                  setType(ALL);
                }}
                className="btn-gold mt-4 inline-flex items-center gap-2"
              >
                {t('Đặt lại bộ lọc', 'Reset filter')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 24/7 Female Veterinary Care on Duty Banner */}
      <section className="bg-gradient-to-b from-ivory to-cream py-12 border-t border-sapphire-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-3xl border border-gold-400/80 bg-gradient-to-r from-sapphire-950 via-sapphire-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-300">
                  <Stethoscope className="h-3.5 w-3.5" />
                  {t('ĐỘI NGŨ Y TẾ THÚ Y TRỰC 24/7', '24/7 ON-CALL VETERINARY CARE')}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {t(
                    <>Đội ngũ <span className="text-gold-gradient">Bác sĩ Thú y Nữ</span> tận tâm &amp; giàu kinh nghiệm</>,
                    <>Dedicated &amp; Highly Experienced <span className="text-gold-gradient">Female Veterinarians</span></>
                  )}
                </h3>
                <p className="text-xs sm:text-sm text-sapphire-200 leading-relaxed">
                  {t(
                    'Tại mỗi điểm đến của VinPet, các Bác sĩ Thú y chuyên khoa luôn túc trực ngày đêm để kiểm tra sức khỏe ban đầu, theo dõi thể trạng và sẵn sàng can thiệp kịp thời cho thú cưng của bạn trong suốt kỳ nghỉ.',
                    'At every VinPet destination, certified veterinarians are on duty 24/7 to provide initial health checkups, monitor wellness, and offer immediate medical support for your pet throughout your getaway.'
                  )}
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gold-200">
                  <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-gold-400" /> {t('Khám sàng lọc khi check-in', 'Check-in health screening')}</span>
                  <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-gold-400" /> {t('Phòng y tế vô trùng chuyên biệt', 'Sterile medical exam room')}</span>
                  <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-gold-400" /> {t('Túc trực khẩn cấp 24/7', '24/7 emergency response')}</span>
                </div>
              </div>

              {/* Photos of female veterinarians */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="rounded-2xl border border-gold-400/40 bg-sapphire-900/80 p-3 text-center shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=400&q=80"
                    alt="BS. CKI. Nguyễn Phương Thảo"
                    className="h-28 w-28 rounded-xl object-cover object-top border border-gold-400/40"
                  />
                  <p className="mt-2 text-xs font-bold text-white">BS. CKI. Phương Thảo</p>
                  <p className="text-[10px] text-gold-400 font-semibold">{t('Giám đốc Y khoa', 'Medical Director')}</p>
                </div>

                <div className="rounded-2xl border border-gold-400/40 bg-sapphire-900/80 p-3 text-center shadow-md">
                  <img
                    src="https://images.pexels.com/photos/6235122/pexels-photo-6235122.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="BS. Nguyễn Phương An"
                    className="h-28 w-28 rounded-xl object-cover object-top border border-gold-400/40"
                  />
                  <p className="mt-2 text-xs font-bold text-white">BS. Phương An</p>
                  <p className="text-[10px] text-gold-400 font-semibold">{t('Trưởng khoa Phẫu thuật & Da liễu', 'Director of Surgical & Dermatological Care')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room Detail Preview Modal */}
      {previewRoom && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-sapphire-950/75 p-4 backdrop-blur-sm"
          onClick={() => setPreviewRoom(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={previewRoom.room.image}
                alt={previewRoom.room.type}
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => setPreviewRoom(null)}
                className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full bg-sapphire-950/70 text-white hover:bg-sapphire-900"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <span className="rounded-full bg-sapphire-950/80 px-3 py-1 text-xs font-semibold text-gold-300 backdrop-blur">
                  {tr(previewRoom.destName)}
                </span>
                <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-sapphire-950">
                  {previewRoom.room.area}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-display text-2xl font-bold text-sapphire-900">
                {previewRoom.room.type}
              </h3>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-sapphire-100 px-3 py-1 font-semibold text-sapphire-800">
                  <Maximize2 className="h-3.5 w-3.5 text-sapphire-600" />
                  {t('Diện tích:', 'Floor area:')} {previewRoom.room.area}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-gold-100 px-3 py-1 font-semibold text-amber-900">
                  <Users className="h-3.5 w-3.5 text-gold-600" />
                  {t('Sức chứa:', 'Capacity:')} {previewRoom.room.capacity}
                </span>
                {previewRoom.room.bedrooms && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1 font-semibold text-emerald-800">
                    <BedDouble className="h-3.5 w-3.5 text-emerald-600" />
                    {previewRoom.room.bedrooms}
                  </span>
                )}
              </div>

              <div className="mt-4 rounded-2xl border border-sapphire-100 bg-sapphire-50/50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-sapphire-700">
                  {t('Mô tả chi tiết phòng', 'Detailed Room Description')}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-sapphire-800">
                  {tr(previewRoom.room.desc)}
                </p>
              </div>

              {previewRoom.room.perks && previewRoom.room.perks.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-sapphire-700">
                    {t('Tiện ích nổi bật', 'Key highlights')}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {previewRoom.room.perks.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-sapphire-700">
                        <Check className="h-3.5 w-3.5 text-gold-500" />
                        {tr(p)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between border-t border-sapphire-100 pt-4">
                <div>
                  <p className="text-xs text-sapphire-500">{t('Giá phòng mỗi đêm', 'Price per night')}</p>
                  <p className="font-display text-2xl font-bold text-sapphire-900">
                    {money(previewRoom.room.pricePerNight)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const found = destinations.find((d) => d.name.vi === previewRoom.destName.vi);
                    setPreviewRoom(null);
                    if (found) setActiveDest(found);
                  }}
                  className="btn-gold"
                >
                  {t('Đặt phòng ngay', 'Book now')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Booking Modal */}
      {activeDest && <BookingModal dest={activeDest} onClose={() => setActiveDest(null)} />}
    </div>
  );
}

function BookingModal({ dest, onClose }: { dest: Destination; onClose: () => void }) {
  const { t, tr, money } = useLang();
  const getTomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };
  const getFutureStr = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  };
  const calculateNights = (inDate: string, outDate: string) => {
    if (!inDate || !outDate) return 1;
    const d1 = new Date(inDate);
    const d2 = new Date(outDate);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const [step, setStep] = useState(0);
  const [roomIdx, setRoomIdx] = useState(0);
  const [petCount, setPetCount] = useState(1);
  const [checkInDate, setCheckInDate] = useState(() => getTomorrowStr());
  const [checkOutDate, setCheckOutDate] = useState(() => getFutureStr(3)); // 2 nights default
  const [includePetFee, setIncludePetFee] = useState(true);
  const [showRoomInfo, setShowRoomInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'card'>('qr');
  const [copiedCode, setCopiedCode] = useState(false);

  const [form, setForm] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    pet_name: '',
    pet_breed: '',
    pet_weight_kg: '',
    vaccination_note: '',
    special_note: '',
    consent: false,
    cardNumber: '9704 2201 **** 8899',
    cardHolder: 'NGUYEN VAN A',
    cardExpiry: '12/28',
    cardCvv: '***',
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{
    code: string;
    totalAmount: number;
    roomType: string;
    petCount: number;
    totalPetFee: number;
    guestName: string;
    checkInDate: string;
    checkOutDate: string;
    nights: number;
    totalRoomPrice: number;
  } | null>(null);
  const [error, setError] = useState('');

  const room = dest.rooms[roomIdx] || dest.rooms[0];
  const nights = calculateNights(checkInDate, checkOutDate);
  const petSurchargePerPet = 450000;
  const totalRoomPrice = room.pricePerNight * nights;
  const totalPetFee = includePetFee ? petCount * petSurchargePerPet * nights : 0;
  const grandTotal = totalRoomPrice + totalPetFee;

  const setDurationNights = (n: number) => {
    const base = checkInDate ? new Date(checkInDate) : new Date();
    base.setDate(base.getDate() + n);
    setCheckOutDate(base.toISOString().split('T')[0]);
  };

  const handleCheckInChange = (newDate: string) => {
    setCheckInDate(newDate);
    const inD = new Date(newDate);
    const outD = new Date(checkOutDate);
    if (outD <= inD) {
      const nextD = new Date(inD);
      nextD.setDate(nextD.getDate() + 1);
      setCheckOutDate(nextD.toISOString().split('T')[0]);
    }
  };

  const submit = async () => {
    setSubmitting(true);
    setError('');
    if (!form.consent) {
      setError(t('Vui lòng xác nhận cam kết thông tin thú cưng.', 'Please confirm that your pet’s information is accurate.'));
      setSubmitting(false);
      return;
    }
    const code = genCode(8);
    const { error: dbError } = await supabase.from('bookings').insert({
      contact_name: form.contact_name || 'Khách đặt phòng VinPet',
      contact_email: form.contact_email || 'khach@vinpet.vn',
      contact_phone: form.contact_phone || '0901234567',
      destination: dest.name.vi,
      room_type: room.type,
      pet_package: includePetFee
        ? `Phụ phí dành cho những người bạn 4 chân (${petCount} bé × ${nights} đêm: ${money(totalPetFee)})`
        : 'Không chọn phụ phí thú cưng',
      pet_name: form.pet_name || 'Thú cưng',
      pet_breed: form.pet_breed || 'Không rõ',
      pet_weight_kg: form.pet_weight_kg ? Number(form.pet_weight_kg) : null,
      vaccination_note: form.vaccination_note,
      special_note: `Check-in: ${checkInDate}, Check-out: ${checkOutDate} (${nights} đêm). ${form.special_note}`,
      consent_confirmed: true,
      payment_method: paymentMethod === 'qr' ? 'VietQR Techcombank' : 'Thẻ thanh toán Card',
      confirmation_code: code,
    });

    setSubmitting(false);
    if (dbError) {
      console.warn('Booking log:', dbError);
    }
    // Proceed to success screen
    setDone({
      code,
      totalAmount: grandTotal,
      roomType: room.type,
      petCount,
      totalPetFee,
      guestName: form.contact_name || 'Quý khách',
      checkInDate,
      checkOutDate,
      nights,
      totalRoomPrice,
    });
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-sapphire-950/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-ivory shadow-sapphire sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-sapphire-800 bg-sapphire-950 px-6 py-4 text-ivory">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gold-300">
              {t('Đặt phòng trực tuyến', 'Online Reservation')} · {tr(dest.name)}
            </p>
            <h3 className="font-display text-xl font-semibold text-white">
              {room.type}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-sapphire-800/80 text-sapphire-200 transition hover:bg-sapphire-700 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step Indicator */}
        {!done && (
          <div className="border-b border-sapphire-100 bg-white px-6 py-3.5">
            <div className="flex items-center justify-center gap-2">
              {[
                t('1. Chọn phòng & thú cưng', '1. Room & Pets'),
                t('2. Thông tin thú cưng', '2. Pet Details'),
                t('3. Thanh toán', '3. Payment'),
              ].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition ${
                      i === step
                        ? 'bg-sapphire-900 text-gold-300 shadow-sm'
                        : i < step
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-sapphire-100 text-sapphire-400'
                    }`}
                  >
                    <span>{i + 1}</span>
                    <span className="hidden sm:inline">{label.replace(/^\d\.\s/, '')}</span>
                  </div>
                  {i < 2 && <div className={`h-0.5 w-6 sm:w-10 ${i < step ? 'bg-emerald-500' : 'bg-sapphire-100'}`} />}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-6">
          {done ? (
            /* Success confirmation with 'Xác nhận thông tin đặt phòng' */
            <div className="py-4 text-center">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700 shadow-sm">
                <Check className="h-8 w-8 stroke-[3]" />
              </div>
              <h2 className="heading-1 font-display text-sapphire-950 text-2xl sm:text-3xl font-extrabold">
                {t('Xác nhận thông tin đặt phòng', 'Booking Confirmation')}
              </h2>
              <p className="mt-1.5 text-sm text-gold-600 font-medium">
                {t('Đặt phòng thành công! VinPet hân hạnh chào đón quý khách và các bé cưng.', 'Reservation confirmed! VinPet looks forward to welcoming you and your furry companions.')}
              </p>

              {/* Booking Summary Box */}
              <div className="mx-auto mt-6 max-w-lg rounded-2xl border-2 border-gold-400 bg-white p-5 text-left shadow-md">
                <div className="flex items-center justify-between border-b border-sapphire-100 pb-3">
                  <span className="text-xs uppercase tracking-wider text-sapphire-600 font-bold">
                    {t('Mã đặt phòng', 'Confirmation Code')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xl font-extrabold tracking-wider text-sapphire-950">
                      {done.code}
                    </span>
                    <button
                      onClick={() => copyText(done.code)}
                      className="grid h-7 w-7 place-items-center rounded-lg bg-sapphire-50 border border-sapphire-200 text-sapphire-700 hover:bg-gold-100"
                      title={t('Sao chép mã', 'Copy code')}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                {copiedCode && (
                  <p className="mt-1 text-right text-xs font-semibold text-emerald-600">
                    {t('Đã sao chép mã đặt phòng!', 'Code copied to clipboard!')}
                  </p>
                )}

                <div className="mt-4 space-y-2.5 text-xs sm:text-sm text-sapphire-800">
                  <div className="flex justify-between">
                    <span className="text-sapphire-600">{t('Điểm đến:', 'Destination:')}</span>
                    <strong className="text-right text-sapphire-950">{tr(dest.name)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sapphire-600">{t('Hạng phòng:', 'Room type:')}</span>
                    <strong className="text-right text-sapphire-950">{done.roomType}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sapphire-600">{t('Khách hàng:', 'Guest:')}</span>
                    <strong className="text-right text-sapphire-950">{done.guestName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sapphire-600">{t('Thời gian lưu trú:', 'Stay duration:')}</span>
                    <strong className="text-right text-sapphire-950">
                      {done.checkInDate} → {done.checkOutDate} ({done.nights} {t('đêm', 'night(s)')})
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sapphire-600">{t('Tiền phòng:', 'Room total:')}</span>
                    <span className="font-semibold text-sapphire-950">
                      {money(done.totalRoomPrice)} ({money(room.pricePerNight)} × {done.nights} {t('đêm', 'nights')})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sapphire-600">{t('Số lượng thú cưng:', 'Number of pets:')}</span>
                    <span className="font-semibold text-sapphire-950">{done.petCount} {t('bé', 'pet(s)')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sapphire-600">{t('Phụ phí dành cho những người bạn 4 chân:', 'Pet surcharge:')}</span>
                    <span className="font-semibold text-gold-600">
                      {money(done.totalPetFee)} ({money(450000)} × {done.petCount} bé × {done.nights} đêm)
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-sapphire-100 pt-3 text-base">
                    <span className="font-bold text-sapphire-950">{t('Tổng thanh toán:', 'Total paid:')}</span>
                    <strong className="font-display font-extrabold text-gold-600">{money(done.totalAmount)}</strong>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-5 max-w-lg rounded-xl bg-sapphire-50 p-3.5 text-xs text-sapphire-700">
                {t(
                  'Chi tiết xác nhận và hướng dẫn check-in kèm theo đã được gửi đến số điện thoại và email của quý khách.',
                  'Confirmation details and pet check-in guidelines have been sent to your phone and email.'
                )}
              </div>

              <button onClick={onClose} className="btn-gold mt-6 w-full max-w-xs shadow-md">
                {t('Hoàn tất & Đóng', 'Complete & Close')}
              </button>
            </div>
          ) : step === 0 ? (
            /* STEP 0: Select Dates, Room, Pet Count, and Surcharge */
            <div className="space-y-6">
              {/* STAY DATES PICKER & DURATION MULTIPLIER AS REQUESTED */}
              <div className="rounded-2xl border-2 border-gold-300 bg-white p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gold-600" />
                    <p className="label-luxe mb-0">{t('Thời gian lưu trú (Check-in & Check-out)', 'Stay Dates (Check-in & Check-out)')}</p>
                  </div>
                  <span className="rounded-full bg-gold-100 px-3 py-1 font-display text-xs font-bold text-amber-900 shadow-sm">
                    {nights} {t('đêm', 'night(s)')} (x{nights})
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-sapphire-700 block mb-1">
                      {t('Ngày nhận phòng (Check-in):', 'Check-in date:')}
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={checkInDate}
                      onChange={(e) => handleCheckInChange(e.target.value)}
                      className="input-luxe text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-sapphire-700 block mb-1">
                      {t('Ngày trả phòng (Check-out):', 'Check-out date:')}
                    </label>
                    <input
                      type="date"
                      min={checkInDate}
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="input-luxe text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Quick night duration buttons */}
                <div className="mt-3.5 pt-3 border-t border-sapphire-100">
                  <p className="text-[11px] font-semibold text-sapphire-600 mb-2">
                    {t('Chọn nhanh số đêm lưu trú (giá phòng & phụ phí nhân theo ngày):', 'Quick duration select (pricing multiplies by days):')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { n: 1, label: { vi: '1 đêm (x1)', en: '1 night (x1)' } },
                      { n: 2, label: { vi: '2 đêm (x2)', en: '2 nights (x2)' } },
                      { n: 3, label: { vi: '3 đêm (x3)', en: '3 nights (x3)' } },
                      { n: 4, label: { vi: '4 đêm (x4)', en: '4 nights (x4)' } },
                      { n: 5, label: { vi: '5 đêm (x5)', en: '5 nights (x5)' } },
                      { n: 7, label: { vi: '1 tuần (x7)', en: '1 week (x7)' } },
                    ].map((btn) => (
                      <button
                        key={btn.n}
                        type="button"
                        onClick={() => setDurationNights(btn.n)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                          nights === btn.n
                            ? 'bg-sapphire-900 text-gold-300 shadow-sm ring-2 ring-gold-400/50'
                            : 'bg-sapphire-50 text-sapphire-700 hover:bg-gold-50 border border-sapphire-200'
                        }`}
                      >
                        {tr(btn.label)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Room selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="label-luxe">{t('1. Chọn hạng phòng / biệt thự', '1. Select room / villa')}</p>
                  <button
                    type="button"
                    onClick={() => setShowRoomInfo(!showRoomInfo)}
                    className="flex items-center gap-1 text-xs font-semibold text-sapphire-700 hover:text-gold-600"
                  >
                    <Info className="h-3.5 w-3.5" />
                    {showRoomInfo ? t('Ẩn chi tiết phòng', 'Hide details') : t('Xem chi tiết phòng', 'View room details')}
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {dest.rooms.map((r, i) => (
                    <button
                      key={r.type}
                      type="button"
                      onClick={() => setRoomIdx(i)}
                      className={`group relative overflow-hidden rounded-2xl border-2 text-left transition-all ${
                        i === roomIdx
                          ? 'border-gold-500 bg-gold-50/20 shadow-md ring-2 ring-gold-400/20'
                          : 'border-sapphire-100 bg-white hover:border-sapphire-200'
                      }`}
                    >
                      <div className="relative h-28 w-full overflow-hidden">
                        <img src={r.image} alt={r.type} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                        <span className="absolute top-2 right-2 rounded-full bg-sapphire-950/80 px-2 py-0.5 text-[11px] font-bold text-gold-300 backdrop-blur">
                          {r.area}
                        </span>
                      </div>
                      <div className="p-3.5">
                        <p className="text-sm font-bold text-sapphire-950">{r.type}</p>
                        <p className="mt-0.5 text-xs text-sapphire-600">{r.capacity}</p>
                        <p className="mt-2 font-display text-sm font-bold text-gold-600">
                          {money(r.pricePerNight)}
                          <span className="text-[11px] font-normal text-sapphire-500"> /đêm</span>
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Room Details Accordion / Box */}
              <div className="rounded-2xl border border-sapphire-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600">
                      {t('Phòng đang chọn:', 'Selected room:')}
                    </span>
                    <h4 className="font-display text-base font-bold text-sapphire-950">{room.type}</h4>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="rounded-md bg-sapphire-100 px-2.5 py-1 font-semibold text-sapphire-800">
                      {room.area}
                    </span>
                    <span className="rounded-md bg-gold-100 px-2.5 py-1 font-semibold text-amber-900">
                      {room.capacity}
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-sapphire-700">
                  {tr(room.desc)}
                </p>

                {room.bedrooms && (
                  <p className="mt-2 text-xs font-semibold text-sapphire-900">
                    <BedDouble className="inline h-3.5 w-3.5 mr-1 text-sapphire-600" />
                    {room.bedrooms}
                  </p>
                )}
              </div>

              {/* PET COUNTER & PRICE MULTIPLIER AS REQUESTED */}
              <div className="rounded-2xl border-2 border-gold-400/80 bg-gold-50/40 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-sapphire-950">
                      <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                      {t('Số lượng thú cưng đi cùng', 'Number of accompanying pets')}
                    </label>
                    <p className="mt-0.5 text-xs text-sapphire-600">
                      {t('Phụ phí đồng giá 450.000đ/con, giá tiền tự động nhân lên theo số lượng.', 'Flat 450,000 VND/pet, multiplied by pet quantity.')}
                    </p>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <button
                      type="button"
                      disabled={petCount <= 1}
                      onClick={() => setPetCount((prev) => Math.max(1, prev - 1))}
                      className="grid h-9 w-9 place-items-center rounded-xl border border-sapphire-300 bg-white text-sapphire-800 shadow-sm transition hover:bg-gold-50 disabled:opacity-40"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-8 text-center font-display text-xl font-bold text-sapphire-950">
                      {petCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPetCount((prev) => Math.min(10, prev + 1))}
                      className="grid h-9 w-9 place-items-center rounded-xl border border-sapphire-300 bg-white text-sapphire-800 shadow-sm transition hover:bg-gold-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <span className="text-xs font-semibold text-sapphire-700">
                      {t('thú cưng', 'pets')}
                    </span>
                  </div>
                </div>

                {/* Pet Surcharge Checkbox / Included Status */}
                <div className="mt-4 border-t border-gold-200/80 pt-4">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={includePetFee}
                      onChange={(e) => setIncludePetFee(e.target.checked)}
                      className="mt-1 h-5 w-5 rounded border-sapphire-300 text-sapphire-900 focus:ring-gold-400 accent-sapphire-800"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-sm font-bold text-sapphire-950">
                          {t('Phụ phí dành cho những người bạn 4 chân', 'Pet surcharge for our 4-legged friends')}
                        </span>
                        <span className="font-display text-base font-bold text-gold-700">
                          {money(totalPetFee)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-sapphire-600">
                        {money(petSurchargePerPet)} × {petCount} {t('thú cưng', 'pets')} × {nights} {t('đêm', 'night(s)')} = {money(totalPetFee)}
                      </p>
                      
                      {/* Complimentary inclusions list */}
                      <div className="mt-2.5 rounded-xl bg-white/80 p-2.5 border border-gold-300/60 text-xs text-sapphire-800">
                        <p className="font-bold text-gold-700 flex items-center gap-1.5 mb-1">
                          <Check className="h-3.5 w-3.5" />
                          {t('ĐÃ BAO GỒM TRỌN GÓI CHO MỖI BÉ:', 'ALL-INCLUSIVE PERKS PER PET:')}
                        </p>
                        <p className="leading-relaxed">
                          {t(
                            'FREE Đồ ăn vặt bánh thưởng • Ổ đệm nằm cao cấp • Cát vệ sinh chuyên dụng • Lót chuồng kháng khuẩn • Xe buggy di chuyển nội khu',
                            'FREE Pet treats & snacks • Luxury pet bed • Litter box & sand • Absorbent pee pads • Resort buggy transfer'
                          )}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Total Calculation Strip */}
              <div className="rounded-2xl border border-sapphire-100 bg-sapphire-950 p-4 text-ivory flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-sapphire-300">{t('Tạm tính phòng & phụ phí thú cưng:', 'Estimated room & pet fee:')}</p>
                    <span className="rounded-full bg-gold-400/20 px-2 py-0.5 text-[11px] font-bold text-gold-300">
                      {nights} {t('đêm', 'night(s)')}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <p className="font-display text-2xl font-bold text-gold-300">{money(grandTotal)}</p>
                    <p className="text-[11px] text-sapphire-300">
                      ({money(room.pricePerNight)} × {nights}đ + {money(totalPetFee)})
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-gold shadow-md flex items-center justify-center gap-2"
                >
                  {t('Tiếp tục', 'Continue')} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : step === 1 ? (
            /* STEP 1: Guest & Pet Details */
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-luxe">{t('Họ và tên người đặt *', 'Full name *')}</label>
                  <input
                    className="input-luxe"
                    placeholder={t('Nguyễn Văn A', 'Nguyen Van A')}
                    value={form.contact_name}
                    onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label-luxe">{t('Số điện thoại nhận SMS *', 'Phone number *')}</label>
                  <input
                    className="input-luxe"
                    placeholder="0912 345 678"
                    value={form.contact_phone}
                    onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="label-luxe">{t('Email nhận mã xác nhận *', 'Email address *')}</label>
                <input
                  type="email"
                  className="input-luxe"
                  placeholder="contact@gmail.com"
                  value={form.contact_email}
                  onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                />
              </div>

              <div className="mt-3 rounded-2xl border border-sapphire-100 bg-white p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-sapphire-800">
                    {t('Thông tin thú cưng đồng hành', 'Accompanying Pet Details')} ({petCount} {t('bé', 'pet(s)')})
                  </p>
                  <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
                    {t('Phụ phí:', 'Surcharge:')} {money(totalPetFee)}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="label-luxe">{t('Tên thú cưng', 'Pet name')}</label>
                    <input
                      className="input-luxe"
                      placeholder="Milo / Bông..."
                      value={form.pet_name}
                      onChange={(e) => setForm({ ...form, pet_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-luxe">{t('Giống loài', 'Breed / Species')}</label>
                    <input
                      className="input-luxe"
                      placeholder="Poodle / Corgi / Mèo Anh..."
                      value={form.pet_breed}
                      onChange={(e) => setForm({ ...form, pet_breed: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-luxe">{t('Cân nặng ước tính (kg)', 'Estimated weight (kg)')}</label>
                    <input
                      type="number"
                      className="input-luxe"
                      placeholder="5"
                      value={form.pet_weight_kg}
                      onChange={(e) => setForm({ ...form, pet_weight_kg: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="label-luxe">{t('Sổ tiêm phòng dại / Vaccine (ảnh chụp)', 'Rabies Vaccination Record')}</label>
                  <div className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-sapphire-200 bg-sapphire-50/60 px-4 py-3 text-sapphire-600 transition hover:border-gold-400">
                    <Upload className="h-5 w-5 text-gold-600 shrink-0" />
                    <span className="text-xs sm:text-sm">
                      {t('Tải lên ảnh sổ tiêm chủng hoặc giấy khám gần nhất', 'Tap to upload photo of vaccination booklet')}
                    </span>
                  </div>
                  <input
                    className="input-luxe mt-2 text-xs"
                    placeholder={t('Ghi chú tiêm phòng (ngày tiêm, mũi tiêm bổ sung nếu có)...', 'Vaccine notes...')}
                    value={form.vaccination_note}
                    onChange={(e) => setForm({ ...form, vaccination_note: e.target.value })}
                  />
                </div>

                <div className="mt-3">
                  <label className="label-luxe">{t('Ghi chú đặc biệt (dị ứng thức ăn, thói quen sinh hoạt)', 'Special notes (diet, allergies)')}</label>
                  <textarea
                    className="input-luxe text-xs"
                    rows={2}
                    placeholder={t('Ví dụ: bé thích nằm gần ban công, không ăn được thịt bò...', 'E.g. dislikes beef, loves sunny balcony...')}
                    value={form.special_note}
                    onChange={(e) => setForm({ ...form, special_note: e.target.value })}
                  />
                </div>

                <label className="mt-3 flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-1 h-4 w-4 accent-sapphire-800"
                  />
                  <span className="text-xs text-sapphire-700">
                    {t(
                      'Tôi cam kết thông tin thú cưng và sổ tiêm chủng là chính xác, đồng thời tuân thủ quy tắc ứng xử của VinPet.',
                      'I confirm that the pet vaccination records are genuine and agree to follow VinPet house rules.'
                    )}
                  </span>
                </label>
              </div>

              {error && <p className="text-xs font-semibold text-rose-500">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(0)} className="btn-outline flex-1">
                  {t('Quay lại', 'Back')}
                </button>
                <button type="button" onClick={() => setStep(2)} className="btn-sapphire flex-1 flex items-center justify-center gap-1.5">
                  {t('Sang bước thanh toán', 'Proceed to payment')} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: SIMPLIFIED TO 2 PAYMENT METHODS: QR CODE & CARD */
            <div className="space-y-5">
              {/* Booking Summary Card */}
              <div className="rounded-2xl border border-sapphire-100 bg-white p-4 sm:p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-sapphire-500">{tr(dest.name)}</p>
                    <h4 className="font-display text-lg font-bold text-sapphire-950">{room.type}</h4>
                    <p className="text-xs text-sapphire-600">{room.area} · {room.capacity}</p>
                  </div>
                  <span className="font-display text-xl font-bold text-sapphire-900">
                    {money(room.pricePerNight)}
                  </span>
                </div>

                <div className="mt-3 divide-y divide-sapphire-100/70 border-t border-sapphire-100 pt-3 text-xs">
                  <div className="flex justify-between py-1.5 text-sapphire-700">
                    <span>{t('Thời gian lưu trú:', 'Stay duration:')}</span>
                    <strong className="text-sapphire-900">
                      {checkInDate} → {checkOutDate} ({nights} {t('đêm', 'night(s)')})
                    </strong>
                  </div>

                  <div className="flex justify-between py-1.5 text-sapphire-700">
                    <span>{t('Tiền phòng:', 'Room charge:')} ({money(room.pricePerNight)} × {nights} {t('đêm', 'nights')})</span>
                    <span className="font-semibold text-sapphire-900">{money(totalRoomPrice)}</span>
                  </div>

                  {includePetFee && (
                    <div className="flex justify-between py-1.5 text-sapphire-700">
                      <span>
                        {t('Phụ phí dành cho những người bạn 4 chân', 'Pet surcharge')} ({petCount} {t('bé', 'pet(s)')} × {nights} {t('đêm', 'nights')}):
                      </span>
                      <span className="font-semibold text-sapphire-900">{money(totalPetFee)}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-2 text-sm font-bold text-sapphire-950">
                    <span>{t('Tổng thanh toán:', 'Grand total:')}</span>
                    <span className="font-display text-xl text-gold-600">{money(grandTotal)}</span>
                  </div>
                </div>
              </div>

              {/* TWO PAYMENT METHODS SELECTOR: QR CODE & CARD */}
              <div>
                <p className="label-luxe mb-2">
                  {t('Chọn 1 trong 2 phương thức thanh toán:', 'Select payment method:')}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qr')}
                    className={`flex items-center justify-center gap-2.5 rounded-2xl border-2 p-3.5 text-sm font-bold transition ${
                      paymentMethod === 'qr'
                        ? 'border-gold-500 bg-gold-50/50 text-sapphire-950 shadow-sm'
                        : 'border-sapphire-100 bg-white text-sapphire-600 hover:border-sapphire-200'
                    }`}
                  >
                    <QrCode className="h-5 w-5 text-gold-600" />
                    <span>{t('Mã QR (VietQR)', 'VietQR Code')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center gap-2.5 rounded-2xl border-2 p-3.5 text-sm font-bold transition ${
                      paymentMethod === 'card'
                        ? 'border-gold-500 bg-gold-50/50 text-sapphire-950 shadow-sm'
                        : 'border-sapphire-100 bg-white text-sapphire-600 hover:border-sapphire-200'
                    }`}
                  >
                    <CreditCard className="h-5 w-5 text-gold-600" />
                    <span>{t('Thẻ (Card)', 'Card')}</span>
                  </button>
                </div>
              </div>

              {/* METHOD 1: QR CODE */}
              {paymentMethod === 'qr' && (
                <div className="rounded-2xl border border-sapphire-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col items-center gap-5 sm:flex-row">
                    {/* VietQR Frame */}
                    <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-gold-400 bg-gradient-to-b from-white to-sapphire-50/30 p-3 shadow-md">
                      <div className="mb-1 flex items-center justify-between w-full px-1">
                        <span className="font-display text-[11px] font-black tracking-wider text-sapphire-900">
                          Viet<span className="text-red-600">QR</span>
                        </span>
                        <span className="text-[9px] font-bold text-sapphire-600">Napas 247</span>
                      </div>

                      {/* Dynamic QR image */}
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                          `00020101021238580010A000000727012800069704070114190367899990180208QRIBFTTA5303704540${grandTotal}5802VN62200816VINPETBOOKING6304`
                        )}`}
                        alt="Mã QR Chuyển khoản VinPet"
                        className="h-36 w-36 rounded-lg object-contain"
                      />

                      <p className="mt-1.5 text-[10px] font-semibold text-sapphire-600">
                        {t('Quét bằng app ngân hàng / MoMo', 'Scan with any banking app')}
                      </p>
                    </div>

                    {/* Account details */}
                    <div className="flex-1 space-y-2 text-xs">
                      <div>
                        <span className="text-sapphire-500">{t('Ngân hàng thụ hưởng:', 'Bank name:')}</span>
                        <p className="font-bold text-sapphire-950">Techcombank (Ngân hàng TMCP Kỹ Thương)</p>
                      </div>

                      <div>
                        <span className="text-sapphire-500">{t('Số tài khoản:', 'Account number:')}</span>
                        <div className="flex items-center gap-2">
                          <p className="font-mono text-sm font-bold text-sapphire-950">1903 6789 999 018</p>
                          <button
                            type="button"
                            onClick={() => copyText('19036789999018')}
                            className="rounded border border-sapphire-200 bg-sapphire-50 px-1.5 py-0.5 text-[10px] font-semibold text-sapphire-700 hover:bg-gold-100"
                          >
                            {t('Copy', 'Copy')}
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-sapphire-500">{t('Chủ tài khoản:', 'Account holder:')}</span>
                        <p className="font-bold text-sapphire-950">CONG TY CP VINPEARL - VINPET</p>
                      </div>

                      <div>
                        <span className="text-sapphire-500">{t('Số tiền chính xác:', 'Exact amount:')}</span>
                        <p className="font-display text-base font-bold text-gold-600">{money(grandTotal)}</p>
                      </div>

                      <div className="rounded-lg bg-sapphire-50 p-2 text-[11px] text-sapphire-700">
                        <span>{t('Nội dung chuyển khoản: ', 'Transfer memo: ')}</span>
                        <strong className="text-sapphire-950">VINPET {dest.id.slice(0, 4).toUpperCase()}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* METHOD 2: CARD */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 rounded-2xl border border-sapphire-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-sapphire-100 pb-2">
                    <span className="text-xs font-bold text-sapphire-800">
                      {t('Thẻ quốc tế & ATM nội địa', 'Credit / Debit / ATM Card')}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                      256-bit SSL Secure
                    </span>
                  </div>

                  <div>
                    <label className="label-luxe">{t('Số thẻ', 'Card number')}</label>
                    <input
                      className="input-luxe font-mono"
                      value={form.cardNumber}
                      onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label-luxe">{t('Tên in trên thẻ', 'Cardholder name')}</label>
                      <input
                        className="input-luxe uppercase"
                        value={form.cardHolder}
                        onChange={(e) => setForm({ ...form, cardHolder: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="label-luxe">{t('Hạn thẻ', 'Expiry')}</label>
                        <input
                          className="input-luxe text-center"
                          placeholder="MM/YY"
                          value={form.cardExpiry}
                          onChange={(e) => setForm({ ...form, cardExpiry: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="label-luxe">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          className="input-luxe text-center"
                          value={form.cardCvv}
                          onChange={(e) => setForm({ ...form, cardCvv: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {error && <p className="text-xs font-semibold text-rose-500">{error}</p>}

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1">
                  {t('Quay lại', 'Back')}
                </button>
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="btn-gold flex-1 flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
                >
                  <ShieldCheck className="h-4 w-4" />
                  {submitting
                    ? t('Đang xác nhận...', 'Confirming...')
                    : `${t('Xác nhận thanh toán', 'Confirm payment')} · ${money(grandTotal)}`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
