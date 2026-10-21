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
    { name: t('Tắm trị liệu', 'Therapeutic bath'), desc: t('Tắm sâu, dưỡng ẩm, sấy tạo phom, vệ sinh tai/mắt.', 'Deep cleansing bath, moisturising, blow-dry styling, and ear and eye cleaning.'), duration: t('60 phút', '60 min'), price: 250000, img: 'https://images.pexels.com/photos/19145895/pexels-photo-19145895.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: t('Cắt tỉa tạo kiểu', 'Styling trim'), desc: t('Tư vấn kiểu, cắt tỉa theo giống, tỉa lông vùng mắt/móng.', 'Style consultation, a breed-specific trim, and tidying around the eyes and paws.'), duration: t('90 phút', '90 min'), price: 550000, img: 'https://images.pexels.com/photos/6816841/pexels-photo-6816841.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: t('Dưỡng lông cao cấp', 'Luxury coat care'), desc: t('Mặt nạ lông hữu cơ, dầu dưỡng, massage thư giãn.', 'An organic coat mask, nourishing oil and a relaxing massage.'), duration: t('75 phút', '75 min'), price: 650000, img: 'https://images.pexels.com/photos/19145897/pexels-photo-19145897.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: t('Vệ sinh tai & tuyến hôi', 'Ear & scent-gland cleaning'), desc: t('Làm sạch chuyên sâu, giảm mùi, kiểm tra da.', 'Thorough cleaning that reduces odour, plus a gentle skin check.'), duration: t('45 phút', '45 min'), price: 350000, img: 'https://images.pexels.com/photos/19145879/pexels-photo-19145879.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ];

  return (
    <div className="pt-20">
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img src="https://images.pexels.com/photos/19145879/pexels-photo-19145879.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Spa" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/50 to-sapphire-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">Pet Spa & Grooming</p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                <>Chăm sóc sắc đẹp <span className="text-gold-gradient">chuẩn cao</span></>,
                <>Pampering to the <span className="text-gold-gradient">highest standard</span></>
              )}
            </h1>
            <p className="mt-4 max-w-lg text-sapphire-200">
              {t(
                'Mỹ phẩm hữu cơ an toàn cho da nhạy cảm, quy trình kiểm tra da lông trước khi làm dịch vụ.',
                'Organic products that are gentle on sensitive skin, and a careful skin and coat check before every service.'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ivory">
        <SectionHeading eyebrow={t('Các gói dịch vụ', 'Our packages')} title={t(<>Gói <span className="text-gold-gradient">spa & grooming</span></>, <><span className="text-gold-gradient">Spa & grooming</span> packages</>)} subtitle={t('Giá áp dụng cho thú cưng dưới 15kg. Trên 15kg phụ thu 20%.', 'Prices are for pets under 15 kg. A 20% surcharge applies to pets over 15 kg.')} />
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
    const { error } = await supabase.from('daycare_bookings').insert({
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
    setSubmitting(false);
    if (error) {
      setError(t('Không thể đặt lịch. Vui lòng thử lại.', 'Oops, we couldn’t make the booking. Please try again 🙏'));
      return;
    }
    setDone({ pin });
  };

  return (
    <div className="pt-20">
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img src="https://images.pexels.com/photos/37443358/pexels-photo-37443358.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Daycare" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/50 to-sapphire-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">Day-care</p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                <>Trông giữ <span className="text-gold-gradient">theo giờ/ngày</span></>,
                <>Day-care by the <span className="text-gold-gradient">hour or day</span></>
              )}
            </h1>
            <p className="mt-4 max-w-lg text-sapphire-200">
              {t(
                'Giải pháp khi bạn muốn vào VinWonders hoặc nhà hàng không cho phép thú cưng. Camera giám sát 24/7 truyền trực tiếp về điện thoại.',
                'The perfect solution for visiting VinWonders or restaurants where pets aren’t allowed. A 24/7 camera streams live to your phone, so you can check in anytime.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* highlight */}
      <section className="section-pad bg-ivory">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          {[
            { t: t('Camera 24/7', '24/7 camera'), d: t('Truyền trực tiếp webcam phòng con bạn về điện thoại.', 'Watch a live webcam of your pet’s room right on your phone.') },
            { t: t('Khu vực trong nhà', 'Indoor play area'), d: t('Điều hòa, nhân viên túc trực chơi cùng thú cưng.', 'Air-conditioned, with staff always on hand to play with your pet.') },
            { t: 'Live Camera Access', d: t('Khách đặt Day-care nhận mã PIN để xem webcam mọi lúc.', 'Guests who book Day-care receive a PIN to watch the webcam anytime.') },
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
          <SectionHeading eyebrow={t('Đặt lịch', 'Booking')} title={t(<>Đặt lịch <span className="text-gold-gradient">Day-care</span></>, <>Book <span className="text-gold-gradient">Day-care</span></>)} />
          {done ? (
            <div className="mt-8 rounded-3xl border border-sapphire-100 bg-white p-8 text-center shadow-soft">
              <h3 className="heading-3 text-sapphire-900">{t('Đặt lịch thành công!', 'Your booking is confirmed!')}</h3>
              <p className="mt-2 text-sapphire-600">{t('Mã PIN Live Camera của bạn:', 'Your Live Camera PIN:')}</p>
              <p className="mt-2 font-display text-4xl font-bold tracking-widest text-gold-gradient">{done.pin}</p>
              <p className="mt-3 text-xs text-sapphire-500">{t('Dùng mã này để đăng nhập xem webcam trực tiếp từ điện thoại.', 'Use this code to log in and watch the live webcam from your phone.')}</p>
            </div>
          ) : (
            <div className="mt-8 space-y-4 rounded-3xl border border-sapphire-100 bg-white p-6 shadow-soft">
              <div>
                <p className="label-luxe">{t('Chọn gói', 'Choose a plan')}</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'hourly', label: t('Theo giờ', 'By the hour'), price: `${money(180000)}${t('/giờ', ' / hour')}` },
                    { id: 'daily', label: t('Trọn ngày', 'Full day'), price: `${money(1200000)}${t('/ngày', ' / day')}` },
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
    { section: t('Menu thú cưng', 'Pet menu'), items: [
      { name: 'Puppuccino', desc: t('Kem whipping không đường, an toàn cho chó', 'Sugar-free whipped cream, safe for dogs'), price: 65000 },
      { name: 'Paw-tato', desc: t('Bánh quy ngũ cốc hữu cơ', 'Organic grain cookies'), price: 55000 },
      { name: 'Meow-chiato', desc: t('Sữa dừa cho mèo, kích thích vị giác', 'Coconut milk for cats, a treat for the taste buds'), price: 60000 },
      { name: 'Bark-becue', desc: t('Gà nướng thái nhỏ, không gia vị', 'Shredded grilled chicken, no seasoning'), price: 95000 },
    ] },
    { section: t('Menu người', 'Human menu'), items: [
      { name: t('Cà phê specialty', 'Specialty coffee'), desc: t('Hạt Arabica Việt Nam rang vừa', 'Vietnamese Arabica beans, medium roast'), price: 55000 },
      { name: t('Trà trái cây', 'Fruit tea'), desc: t('Trà hoa quả nhiệt đới', 'Refreshing tropical fruit tea'), price: 65000 },
      { name: t('Bánh ngọt tươi', 'Fresh pastries'), desc: t('Croissant, muffin, bánh tiêu', 'Croissants, muffins and Vietnamese doughnuts'), price: 45000 },
    ] },
  ];

  return (
    <div className="pt-20">
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img src="https://images.pexels.com/photos/11512316/pexels-photo-11512316.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Pet Park" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/50 to-sapphire-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">Pet Park & Café</p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                <>Sân chơi <span className="text-gold-gradient">ngoài trời</span> & quầy F&B</>,
                <>An <span className="text-gold-gradient">outdoor playground</span> & café counter</>
              )}
            </h1>
            <p className="mt-4 max-w-lg text-sapphire-200">
              {t(
                'Thảm cỏ tự nhiên kiểm tra định kỳ không côn trùng/thuốc trừ sâu, agility course, quầy cà phê cho cả người lẫn thú cưng.',
                'Natural grass regularly checked to be free of insects and pesticides, an agility course, and a café counter for both people and pets.'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ivory">
        <SectionHeading eyebrow={t('Tiện ích', 'Facilities')} title={t(<>Sân chơi <span className="text-gold-gradient">an toàn tuyệt đối</span></>, <>A playground that is <span className="text-gold-gradient">completely safe</span></>)} />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[t('Chướng ngại vật agility', 'Agility obstacles'), t('Thảm cỏ tự nhiên', 'Natural grass'), t('Kiểm tra không côn trùng/thuốc trừ sâu', 'Checked for insects and pesticides'), t('Quầy F&B cho người & thú cưng', 'Food & drink counter for people and pets')].map((t) => (
            <div key={t} className="rounded-2xl border border-sapphire-100 bg-white p-5 text-center">
              <Check className="mx-auto mb-2 h-6 w-6 text-sapphire-700" />
              <p className="text-sm font-semibold text-sapphire-700">{t}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-cream">
        <SectionHeading eyebrow="Pet Café Menu" title={t(<>Menu <span className="text-gold-gradient">Pet Café</span></>, <>The <span className="text-gold-gradient">Pet Café</span> menu</>)} subtitle={t('Đồ ăn và thức uống cho cả du khách và thú cưng.', 'Tasty food and drinks for guests and pets alike.')} />
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
    const { error } = await supabase.from('event_inquiries').insert({
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
    setSubmitting(false);
    if (error) {
      setError(t('Không gửi được. Vui lòng thử lại.', 'Oops, we couldn’t send that. Please try again 🙏'));
      return;
    }
    setDone(true);
  };

  const packages = [
    { name: t('Tiệc sinh nhật Boss', 'Boss’s Birthday Party'), includes: [t('Trang trí theme', 'Themed decorations'), t('Bánh kem an toàn cho thú cưng', 'A pet-safe cake'), t('Photographer 2 giờ', '2 hours with a photographer'), t('Thiệp mời điện tử', 'E-invitations')] },
    { name: t('Offline cộng đồng', 'Community Meetup'), includes: [t('Không gian riêng tại Pet Park', 'A private space at the Pet Park'), t('Teambuilding agility', 'Agility team-building'), t('Quầy F&B', 'Food & drink counter'), t('MC sự kiện', 'Event host (MC)')] },
    { name: t('Mừng "Boss" tròn năm', 'Boss’s Anniversary'), includes: [t('Trang trí kỷ niệm', 'Anniversary decorations'), t('Bánh kem đôi (người + thú cưng)', 'Two cakes (one for people, one for pets)'), t('Album ảnh pro', 'A professional photo album'), t('Quà tặng kỷ niệm', 'A keepsake gift')] },
  ];

  return (
    <div className="pt-20">
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img src="https://images.pexels.com/photos/15472083/pexels-photo-15472083.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Events" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/50 to-sapphire-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">Pet Events & Parties</p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                <>Tiệc cho <span className="text-gold-gradient">"Boss"</span> đáng nhớ</>,
                <>A party your <span className="text-gold-gradient">“Boss”</span> will never forget</>
              )}
            </h1>
            <p className="mt-4 max-w-lg text-sapphire-200">
              {t(
                'Sinh nhật, offline cộng đồng, kỷ niệm tròn năm — tổ chức trọn gói với photographer riêng và thiệp mời điện tử.',
                'Birthdays, community meetups and anniversaries, all planned for you with a personal photographer and e-invitations.'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ivory">
        <SectionHeading eyebrow={t('Gói sự kiện', 'Event packages')} title={t(<>Chi tiết <span className="text-gold-gradient">gói tổ chức</span></>, <>Package <span className="text-gold-gradient">details</span></>)} />
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
            <div className="mt-8 rounded-3xl border border-sapphire-100 bg-white p-8 text-center shadow-soft">
              <Check className="mx-auto mb-3 h-10 w-10 text-sapphire-700" />
              <h3 className="heading-3 text-sapphire-900">{t('Đã ghi nhận yêu cầu!', 'We’ve got your request!')}</h3>
              <p className="mt-2 text-sapphire-600">{t('Đội ngũ sự kiện VinPet sẽ liên hệ với bạn trong vòng 24 giờ.', 'Our VinPet events team will be in touch within 24 hours 💛')}</p>
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
