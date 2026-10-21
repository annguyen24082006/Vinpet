import { useMemo, useState } from 'react';
import { Search, MapPin, BedDouble, Check, ChevronRight, Upload, ShieldCheck, CreditCard, X } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { destinations, type Destination } from '@/lib/data';
import { useLang, type L } from '@/lib/i18n';
import { supabase, genCode } from '@/lib/supabase';

const ALL = 'all';

// "value" is the Vietnamese name used to match the data; "label" is what the guest sees.
const typeOptions: { value: string; label: L }[] = [
  { value: ALL, label: { vi: 'Tất cả', en: 'All' } },
  { value: 'Khách sạn', label: { vi: 'Khách sạn', en: 'Hotel' } },
  { value: 'Resort sát biển', label: { vi: 'Resort sát biển', en: 'Beachfront resort' } },
  { value: 'Resort & Golf', label: { vi: 'Resort & Golf', en: 'Resort & Golf' } },
  { value: 'Villa sát biển', label: { vi: 'Villa sát biển', en: 'Beachfront villa' } },
];

export function DestinationsPage() {
  const { t, tr, money } = useLang();
  const [region, setRegion] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [active, setActive] = useState<Destination | null>(null);

  const regions = useMemo(
    () => [
      { value: ALL, label: { vi: 'Tất cả', en: 'All' } as L },
      ...destinations.map((d) => ({ value: d.region.vi, label: d.region })),
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
      {/* search banner */}
      <section className="relative overflow-hidden bg-sapphire-950 py-16 text-ivory">
        <div className="absolute inset-0 bg-sapphire-radial opacity-70" />
        <div className="absolute inset-0 opacity-20 bg-grain mix-blend-overlay" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <p className="eyebrow text-gold-400">{t('Điểm đến & Đặt phòng', 'Destinations & Booking')}</p>
          <h1 className="heading-1 mt-3 text-ivory">
            {t(
              <>Tìm kỳ nghỉ <span className="text-gold-gradient">pet-friendly</span> lý tưởng</>,
              <>Find your perfect <span className="text-gold-gradient">pet-friendly</span> getaway</>
            )}
          </h1>
          <p className="mt-4 max-w-xl text-sapphire-200">
            {t(
              'Tích hợp trực tiếp hệ thống đặt phòng Vinpearl, kèm gói dịch vụ VinPet tương ứng.',
              'Connected directly to the Vinpearl booking system, with the matching VinPet service package included.'
            )}
          </p>

          {/* filter bar */}
          <div className="mt-8 grid gap-3 rounded-3xl border border-sapphire-200 bg-white p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="label-luxe text-sapphire-800">{t('Địa điểm', 'Location')}</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="input-luxe bg-sapphire-50/50 border-sapphire-200 text-sapphire-900 focus:bg-white"
              >
                {regions.map((r) => (
                  <option key={r.value} value={r.value} className="bg-white text-sapphire-900">{tr(r.label)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-luxe text-sapphire-800">{t('Loại hình lưu trú', 'Type of stay')}</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input-luxe bg-sapphire-50/50 border-sapphire-200 text-sapphire-900 focus:bg-white"
              >
                {typeOptions.map((r) => (
                  <option key={r.value} value={r.value} className="bg-white text-sapphire-900">{tr(r.label)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-luxe text-sapphire-800">{t('Loại phòng', 'Room type')}</label>
              <select className="input-luxe bg-sapphire-50/50 border-sapphire-200 text-sapphire-900 focus:bg-white">
                <option className="bg-white text-sapphire-900">{t('Tất cả phòng', 'All rooms')}</option>
                <option className="bg-white text-sapphire-900">Pet Room</option>
                <option className="bg-white text-sapphire-900">Pet Villa</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="btn-gold w-full">
                <Search className="h-4 w-4" /> {t('Tìm kiếm', 'Search')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* destination grid */}
      <section className="section-pad bg-ivory">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-2">
            {filtered.map((d) => (
              <article key={d.id} className="card-luxe overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <img src={d.hero} alt={tr(d.name)} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-sapphire-950/80 to-transparent" />
                  <span className="chip absolute left-4 top-4 !bg-sapphire-950/70 !text-gold-300 !border-gold-400/40">
                    <MapPin className="h-3.5 w-3.5" /> {tr(d.region)}
                  </span>
                  <span className="chip absolute right-4 top-4 !bg-gold-400/90 !text-sapphire-950 !border-0">
                    {tr(d.type)}
                  </span>
                  <h3 className="absolute bottom-4 left-4 right-4 font-display text-2xl font-semibold text-ivory text-shadow-luxe">
                    {tr(d.name)}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-start gap-2">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sapphire-50">
                      <Check className="h-3.5 w-3.5 text-sapphire-700" />
                    </span>
                    <p className="text-sm text-sapphire-700">{tr(d.petZone)}</p>
                  </div>
                  <div className="mb-4 flex items-start gap-2">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-50">
                      <X className="h-3.5 w-3.5 text-rose-500" />
                    </span>
                    <p className="text-sm text-sapphire-600">{tr(d.restricted)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-sapphire-500">
                      {t('Từ', 'From')}{' '}
                      <span className="font-display text-xl font-semibold text-sapphire-900">{money(d.rooms[0].pricePerNight)}</span>
                      {t('/đêm', ' / night')}
                    </p>
                    <button onClick={() => { setActive(d); }} className="btn-sapphire text-sm">
                      {t('Xem chi tiết', 'View details')} <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-sapphire-500">{t('Không tìm thấy điểm đến phù hợp.', 'We couldn’t find a matching destination. Please try a different filter.')}</p>
          )}
        </div>
      </section>

      {active && <BookingModal dest={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function BookingModal({ dest, onClose }: { dest: Destination; onClose: () => void }) {
  const { t, tr, money } = useLang();
  const [step, setStep] = useState(0);
  const [roomIdx, setRoomIdx] = useState(0);
  const [pkg, setPkg] = useState(true);
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
    payment: 'vnpay',
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ code: string } | null>(null);
  const [error, setError] = useState('');

  const room = dest.rooms[roomIdx];

  const submit = async () => {
    setSubmitting(true);
    setError('');
    if (!form.consent) {
      setError(t('Vui lòng xác nhận cam kết thông tin thú cưng.', 'Please confirm that your pet’s information is accurate.'));
      setSubmitting(false);
      return;
    }
    const code = genCode(8);
    const { error } = await supabase.from('bookings').insert({
      contact_name: form.contact_name,
      contact_email: form.contact_email,
      contact_phone: form.contact_phone,
      destination: dest.name.vi,
      room_type: room.type,
      pet_package: pkg ? room.petPackage.vi : 'Không chọn gói',
      pet_name: form.pet_name,
      pet_breed: form.pet_breed,
      pet_weight_kg: form.pet_weight_kg ? Number(form.pet_weight_kg) : null,
      vaccination_note: form.vaccination_note,
      special_note: form.special_note,
      consent_confirmed: true,
      payment_method: form.payment,
      confirmation_code: code,
    });
    setSubmitting(false);
    if (error) {
      setError(t('Không thể hoàn tất đặt phòng. Vui lòng thử lại.', 'Oops, we couldn’t complete your booking. Please try again 🙏'));
      return;
    }
    setDone({ code });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-sapphire-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-ivory shadow-sapphire sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-sapphire-900 px-6 py-4 text-ivory">
          <div>
            <p className="text-xs uppercase tracking-wider text-gold-300">{t('Đặt phòng', 'Booking')} · {tr(dest.name)}</p>
            <h3 className="font-display text-xl font-semibold">{room.type}</h3>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-sapphire-800 hover:bg-sapphire-700">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* step indicator */}
        {done ? null : (
          <div className="flex items-center justify-center gap-2 px-6 pt-6">
            {[t('Phòng & gói', 'Room & package'), t('Thông tin thú cưng', 'Pet details'), t('Thanh toán', 'Payment')].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold ${i <= step ? 'bg-sapphire-800 text-gold-300' : 'bg-sapphire-100 text-sapphire-400'}`}>
                  {i + 1}
                </div>
                {i < 2 && <div className={`h-0.5 w-10 ${i < step ? 'bg-sapphire-800' : 'bg-sapphire-100'}`} />}
              </div>
            ))}
          </div>
        )}

        <div className="p-6">
          {done ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-sapphire-50">
                <Check className="h-8 w-8 text-sapphire-700" />
              </div>
              <h3 className="heading-2 text-sapphire-900">{t('Đặt phòng thành công!', 'You’re all booked!')}</h3>
              <p className="mt-3 text-sapphire-600">{t('Mã xác nhận của bạn:', 'Your confirmation code:')}</p>
              <p className="mt-2 font-display text-4xl font-bold tracking-widest text-gold-gradient">{done.code}</p>
              <p className="mt-4 text-sm text-sapphire-500">{t('Mã xác nhận đã được gửi qua Email/SMS. Vui lòng kiểm tra hộp thư.', 'We’ve sent your confirmation code by email/SMS. Please check your inbox 💛')}</p>
              <button onClick={onClose} className="btn-sapphire mt-7">{t('Hoàn tất', 'Done')}</button>
            </div>
          ) : step === 0 ? (
            <div className="space-y-5">
              <div>
                <p className="label-luxe">{t('Chọn phòng', 'Choose your room')}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {dest.rooms.map((r, i) => (
                    <button
                      key={r.type}
                      onClick={() => setRoomIdx(i)}
                      className={`overflow-hidden rounded-2xl border-2 text-left transition ${i === roomIdx ? 'border-gold-400 shadow-soft' : 'border-sapphire-100'}`}
                    >
                      <img src={r.image} alt={r.type} className="h-24 w-full object-cover" />
                      <div className="p-3">
                        <p className="text-sm font-bold text-sapphire-900">{r.type}</p>
                        <p className="text-xs text-sapphire-500">{money(r.pricePerNight)}{t('/đêm', ' / night')}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-sapphire-100 bg-white p-4">
                <p className="label-luxe">{t('Gói dịch vụ VinPet', 'VinPet service package')}</p>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={pkg}
                    onChange={(e) => setPkg(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-sapphire-700"
                  />
                  <div>
                    <p className="text-sm font-bold text-sapphire-900">{tr(room.petPackage)}</p>
                    <p className="text-xs text-sapphire-500">{money(room.petPackagePrice)} {t('/ thú cưng / đêm', '/ pet / night')}</p>
                  </div>
                </label>
              </div>
              {/* surcharge */}
              <div className="rounded-2xl border border-sapphire-100 bg-sapphire-50 p-4">
                <p className="label-luxe">{t('Bảng giá phụ thu thú cưng', 'Pet surcharge rates')}</p>
                <ul className="space-y-1.5">
                  {dest.petSurcharge.map((s) => (
                    <li key={s.label.vi} className="flex justify-between text-sm">
                      <span className="text-sapphire-700">{tr(s.label)}</span>
                      <span className="font-semibold text-sapphire-900">{s.price === null ? t('Miễn phí', 'Free') : money(s.price)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-sapphire-500">{tr(dest.petFeeNote)}</p>
              </div>
              <button onClick={() => setStep(1)} className="btn-sapphire w-full">
                {t('Tiếp tục', 'Continue')} <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ) : step === 1 ? (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-luxe">{t('Họ và tên người đặt', 'Your full name')}</label>
                  <input className="input-luxe" value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} />
                </div>
                <div>
                  <label className="label-luxe">{t('Số điện thoại', 'Phone number')}</label>
                  <input className="input-luxe" value={form.contact_phone} onChange={(e) => setForm({ ...form, contact_phone: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="label-luxe">{t('Email nhận mã xác nhận', 'Email for your confirmation code')}</label>
                <input type="email" className="input-luxe" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} />
              </div>
              <div className="mt-2 rounded-2xl border border-sapphire-100 bg-white p-4">
                <p className="label-luxe">{t('Thông tin thú cưng', 'Pet details')}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="label-luxe">{t('Tên thú cưng', 'Pet’s name')}</label>
                    <input className="input-luxe" value={form.pet_name} onChange={(e) => setForm({ ...form, pet_name: e.target.value })} />
                  </div>
                  <div>
                    <label className="label-luxe">{t('Giống loài', 'Breed')}</label>
                    <input className="input-luxe" value={form.pet_breed} onChange={(e) => setForm({ ...form, pet_breed: e.target.value })} />
                  </div>
                  <div>
                    <label className="label-luxe">{t('Cân nặng (kg)', 'Weight (kg)')}</label>
                    <input type="number" className="input-luxe" value={form.pet_weight_kg} onChange={(e) => setForm({ ...form, pet_weight_kg: e.target.value })} />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="label-luxe">{t('Sổ tiêm phòng dại (bắt buộc tải ảnh)', 'Rabies vaccination booklet (photo required)')}</label>
                  <div className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-sapphire-200 bg-sapphire-50 px-4 py-4 text-sapphire-500 transition hover:border-gold-400">
                    <Upload className="h-5 w-5" />
                    <span className="text-sm">{t('Kéo thả hoặc bấm để tải ảnh sổ tiêm lên', 'Drag and drop, or tap to upload a photo of the booklet')}</span>
                  </div>
                  <input className="input-luxe mt-2" placeholder={t('Ghi chú về sổ tiêm (ngày tiêm, cơ sở)', 'Notes on the booklet (vaccination date, clinic)')} value={form.vaccination_note} onChange={(e) => setForm({ ...form, vaccination_note: e.target.value })} />
                </div>
                <div className="mt-3">
                  <label className="label-luxe">{t('Ghi chú đặc biệt (tập tính, dị ứng...)', 'Special notes (habits, allergies...)')}</label>
                  <textarea className="input-luxe" rows={2} value={form.special_note} onChange={(e) => setForm({ ...form, special_note: e.target.value })} />
                </div>
                <label className="mt-3 flex cursor-pointer items-start gap-2.5">
                  <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 h-4 w-4 accent-sapphire-700" />
                  <span className="text-xs text-sapphire-700">
                    {t('Tôi cam kết thông tin trên là đúng và chịu trách nhiệm nếu thông tin sai lệch.', 'I confirm that the information above is accurate, and I take responsibility if it turns out to be incorrect.')}
                  </span>
                </label>
              </div>
              {error && <p className="text-sm text-rose-500">{error}</p>}
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="btn-outline flex-1">{t('Quay lại', 'Back')}</button>
                <button onClick={() => setStep(2)} className="btn-sapphire flex-1">
                  {t('Tiếp tục', 'Continue')} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-2xl border border-sapphire-100 bg-white p-5">
                <div className="flex items-center gap-2 text-sapphire-900">
                  <BedDouble className="h-5 w-5 text-sapphire-700" />
                  <span className="font-semibold">{room.type}</span>
                  <span className="ml-auto font-display text-xl">{money(room.pricePerNight)}</span>
                </div>
                {pkg && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-sapphire-600">
                    <ShieldCheck className="h-4 w-4 text-gold-500" /> {tr(room.petPackage)} — {money(room.petPackagePrice)}
                  </div>
                )}
                <div className="my-3 h-px bg-sapphire-100" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sapphire-600">{t('Thú cưng', 'Pet')}: {form.pet_name || '—'} ({form.pet_breed || '—'})</span>
                </div>
              </div>

              <div>
                <p className="label-luxe">{t('Phương thức thanh toán', 'Payment method')}</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {[
                    { id: 'vnpay', label: 'VNPay' },
                    { id: 'card', label: t('Thẻ tín dụng', 'Credit card') },
                    { id: 'vingroup', label: 'Vingroup Pay' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setForm({ ...form, payment: p.id })}
                      className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition ${form.payment === p.id ? 'border-gold-400 bg-gold-50 text-sapphire-900' : 'border-sapphire-100 text-sapphire-600'}`}
                    >
                      <CreditCard className="h-4 w-4" /> {p.label}
                    </button>
                  ))}
                </div>
              </div>
              {error && <p className="text-sm text-rose-500">{error}</p>}
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-outline flex-1">{t('Quay lại', 'Back')}</button>
                <button onClick={submit} disabled={submitting} className="btn-gold flex-1 disabled:opacity-60">
                  {submitting ? t('Đang xử lý...', 'Processing...') : t('Thanh toán bảo mật', 'Pay securely')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
