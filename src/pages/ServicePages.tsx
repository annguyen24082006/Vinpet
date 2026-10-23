import { useState } from 'react';
import { Check, ChevronRight, ArrowRight } from 'lucide-react';
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

export function SpaPage() {
  const { t, money } = useLang();
  const spaPackages = [
    {
      name: t('Tắm trị liệu', 'Basic Pet Grooming'),
      desc: t(
        'Liệu trình làm sạch toàn diện kết hợp dưỡng ẩm da và lông, sấy khô, cắt móng, cùng vệ sinh tai và mắt chu đáo.',
        'A thorough cleansing treatment featuring skin and coat moisturizing, blow-drying, nail trimming, and ear and eye cleaning.'
      ),
      duration: t('60 phút', '60 minutes'),
      price: 400000,
      img: 'https://images.pexels.com/photos/19145895/pexels-photo-19145895.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: t('Cắt tỉa & tạo kiểu', 'Haircut & Styling'),
      desc: t(
        'Bao gồm trọn gói dịch vụ Vệ Sinh Cơ Bản, kết hợp tư vấn tạo kiểu riêng, cắt tỉa toàn thân phù hợp theo từng giống loài và tạo dáng tỉ mỉ bằng kéo chuyên dụng.',
        'Includes everything in the Basic Grooming package, plus personalized style consultations, breed-appropriate body trimming, and precise scissoring.'
      ),
      duration: t('90 phút', '90 minutes'),
      price: 550000,
      img: 'https://images.pexels.com/photos/6816841/pexels-photo-6816841.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: t('Dưỡng lông cao cấp', 'Premium Coat Conditioning'),
      desc: t(
        'Liệu trình chăm sóc chuyên sâu giúp nuôi dưỡng bộ lông mềm mượt với mặt nạ xả hữu cơ (organic), tinh dầu dưỡng chuyên dụng và tắm bồn thư giãn. (Giải pháp lý tưởng để gỡ rối và phục hồi độ bóng mượt cho lông).',
        'An indulgent coat care treatment featuring an organic conditioning mask, specialized nourishing oils, and a relaxing bath. (Ideal for detangling and restoring shine).'
      ),
      duration: t('75 phút', '75 minutes'),
      price: 550000,
      img: 'https://images.pexels.com/photos/19145897/pexels-photo-19145897.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: t('Vệ sinh tai & tuyến hôi', 'Ear Cleaning & Anal Gland Care'),
      desc: t(
        'Quy trình làm sạch tai nhẹ nhàng và vắt tuyến hôi giúp khử mùi triệt để, đi kèm bước kiểm tra tổng quát tình trạng da bên ngoài cho bé.',
        'Gentle ear cleaning and anal gland expression to help manage odors, accompanied by a basic skin condition check.'
      ),
      duration: t('20 phút', '20 minutes'),
      price: 150000,
      img: 'https://images.pexels.com/photos/19145879/pexels-photo-19145879.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <div className="pt-20">
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img src="https://images.pexels.com/photos/19145879/pexels-photo-19145879.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Spa" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/50 to-sapphire-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">{t('DỊCH VỤ VINPET', 'VINPET SERVICES')}</p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                <>Spa & Grooming - <span className="text-gold-gradient">Chăm sóc và làm đẹp chuyên nghiệp</span></>,
                <>Spa & Grooming – <span className="text-gold-gradient">Professional Care & Styling</span></>
              )}
            </h1>
            <p className="mt-4 max-w-lg text-sapphire-200">
              {t(
                'Khám phá các liệu trình chăm sóc được thiết kế phù hợp với nhu cầu của từng thú cưng, từ vệ sinh cơ bản đến dưỡng lông chuyên sâu và tạo kiểu.',
                'Discover thoughtfully tailored grooming treatments designed around your pet’s individual needs, from essential hygiene care to intensive coat conditioning and professional styling.'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ivory">
        <SectionHeading
          eyebrow={t('Dịch vụ Spa & Grooming', 'Spa & Grooming Services')}
          title={t(<>Gói <span className="text-gold-gradient">spa & grooming</span></>, <><span className="text-gold-gradient">Spa & grooming</span> packages</>)}
          subtitle={t(
            'Bảng giá áp dụng cho thú cưng dưới 15 kg. Thú cưng trên 15 kg áp dụng phụ thu 20%.',
            'Pricing applies to pets weighing under 15 kg. A 20% surcharge applies to pets weighing over 15 kg.'
          )}
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2">
          {spaPackages.map((p) => (
            <div key={p.name} className="card-luxe flex overflow-hidden">
              <img src={p.img} alt={p.name} className="h-44 w-32 shrink-0 object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-2xl font-semibold text-sapphire-900">{p.name}</h3>
                <p className="mt-1 text-sm text-sapphire-600">{p.desc}</p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="chip">{p.duration}</span>
                  <span className="font-display text-2xl font-bold text-sapphire-900">{money(p.price)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function DaycarePage() {
  const { t, money } = useLang();
  const [form, setForm] = useState({ contact_name: '', contact_email: '', contact_phone: '', pet_name: '', pet_breed: '', slot_date: '', slot_start: '', slot_end: '' });
  const [pkg, setPkg] = useState<'hourly' | 'daily'>('hourly');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ pin: string } | null>(null);
  const [error, setError] = useState('');

  const submit = async () => {
    setSubmitting(true);
    setError('');
    if (!form.contact_name || !form.contact_phone || !form.pet_name || !form.slot_date) {
      setError(t('Vui lòng điền đầy đủ thông tin bắt buộc.', 'Could you please fill in all the required fields?'));
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
                <div><label className="label-luxe">{t('Giống loài', 'Breed')}</label><input className="input-luxe" value={form.pet_breed} onChange={(e) => setForm({ ...form, pet_breed: e.target.value })} /></div>
                <div><label className="label-luxe">{t('Ngày *', 'Date *')}</label><input type="date" className="input-luxe" value={form.slot_date} onChange={(e) => setForm({ ...form, slot_date: e.target.value })} /></div>
                <div><label className="label-luxe">{t('Giờ bắt đầu', 'Start time')}</label><input type="time" className="input-luxe" value={form.slot_start} onChange={(e) => setForm({ ...form, slot_start: e.target.value })} /></div>
                <div><label className="label-luxe">{t('Giờ kết thúc', 'End time')}</label><input type="time" className="input-luxe" value={form.slot_end} onChange={(e) => setForm({ ...form, slot_end: e.target.value })} /></div>
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

export function PetParkPage() {
  const { t, money } = useLang();
  const menu = [
    {
      section: t('Menu thú cưng', 'Pet Menu'),
      items: [
        {
          name: 'Puppuccino',
          desc: t('Sữa chuyên dụng cho thú cưng (Pet Milk) sục bọt mịn.', 'Frothed Pet Milk — Smooth, velvety foam made with specially formulated pet milk.'),
          price: 65000,
        },
        {
          name: 'Paw-tato',
          desc: t('Bánh quy ngũ cốc hữu cơ', 'Organic Grain Biscuits — Wholesome biscuits made with organic grains for a delightful little treat.'),
          price: 55000,
        },
        {
          name: 'Cat-Pudding',
          desc: t('Nước hầm xương gà đông thành pudding', 'Chicken Bone Broth Pudding — A savoury pudding made from chicken bone broth, gently set to create a soft, jelly-like texture for feline companions.'),
          price: 60000,
        },
        {
          name: 'Bark-becue',
          desc: t('Gà nướng thái nhỏ, không gia vị', 'Grilled Chicken Bites — Tender pieces of grilled chicken, prepared without seasoning.'),
          price: 95000,
        },
      ],
    },
    {
      section: t('Menu người', 'Human Menu'),
      items: [
        { name: t('Cà phê specialty', 'Specialty coffee'), desc: t('Hạt Arabica Việt Nam rang vừa', 'Vietnamese Arabica beans, medium roast'), price: 55000 },
        { name: t('Trà trái cây', 'Fruit tea'), desc: t('Trà hoa quả nhiệt đới', 'Refreshing tropical fruit tea'), price: 65000 },
        { name: t('Bánh ngọt tươi', 'Fresh pastries'), desc: t('Croissant, muffin, bánh tiêu', 'Croissants, muffins and Vietnamese doughnuts'), price: 45000 },
      ],
    },
  ];

  const amenities = [
    { vi: 'Khu vận động Agility', en: 'Agility Play Zone' },
    { vi: 'Thảm cỏ tự nhiên', en: 'Natural Grass Lawn' },
    { vi: 'Không côn trùng/thuốc trừ sâu', en: 'Insecticide-Free Environment' },
    { vi: 'Café dành cho cả bạn và thú cưng', en: 'Pet-Friendly Café' },
  ];

  return (
    <div className="pt-20">
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img src="https://images.pexels.com/photos/11512316/pexels-photo-11512316.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Pet Park" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/50 to-sapphire-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">{t('PET PARK & CAFÉ | SÂN CHƠI & CÀ PHÊ', 'PET PARK & CAFÉ | PLAY & RELAX')}</p>
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

      <section className="section-pad bg-cream">
        <SectionHeading
          eyebrow={t('PET CAFÉ MENU', 'PET CAFÉ MENU')}
          title={t(<>Hương vị <span className="text-gold-gradient">dành cho mọi thành viên</span></>, <>A Taste <span className="text-gold-gradient">for Every Member of the Family</span></>)}
          subtitle={t(
            'Từ những món ăn nhẹ dành cho thú cưng đến cà phê và bánh ngọt dành cho chủ nuôi, mỗi lựa chọn góp phần làm nên những phút giây thư giãn trọn vẹn.',
            'From delicious treats for your beloved pets to freshly brewed coffee and tempting pastries for their owners, every choice adds a little more pleasure to your moments of relaxation together.'
          )}
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
          {menu.map((sec) => (
            <div key={sec.section} className="rounded-3xl border border-sapphire-100 bg-white p-6 shadow-soft">
              <h3 className="font-display text-2xl font-semibold text-sapphire-900">{sec.section}</h3>
              <div className="my-4 h-px bg-sapphire-100" />
              <div className="space-y-3">
                {sec.items.map((it) => (
                  <div key={it.name} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-sapphire-900">{it.name}</p>
                      <p className="text-xs text-sapphire-500">{it.desc}</p>
                    </div>
                    <span className="shrink-0 font-display text-lg font-semibold text-gold-600">{money(it.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
