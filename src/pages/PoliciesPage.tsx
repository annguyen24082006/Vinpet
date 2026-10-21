import { ShieldCheck, Dog, Car, MapPin, Syringe, Ban, AlertCircle } from 'lucide-react';
import { useLang, type L } from '@/lib/i18n';

const sections = [
  {
    icon: MapPin,
    title: { vi: 'Khu vực được phép (Pet Zone)', en: 'Where your pet is welcome (Pet Zone)' } as L,
    items: [
      { vi: 'Khu vực VinPet riêng biệt tại từng điểm đến', en: 'A dedicated VinPet area at every destination' },
      { vi: 'Bãi biển/ sân vườn dành riêng cho thú cưng', en: 'A pet-only beach or garden' },
      { vi: 'Lối đi riêng không đi qua sảnh chính', en: 'A private path that avoids the main lobby' },
      { vi: 'Pet Park và Pet Café', en: 'Pet Park and Pet Café' },
    ] as L[],
  },
  {
    icon: Ban,
    title: { vi: 'Khu vực cấm tuyệt đối', en: 'Areas where pets are not allowed' } as L,
    items: [
      { vi: 'Hồ bơi chung của người', en: 'Shared swimming pools' },
      { vi: 'Buffet nhà hàng chính', en: 'The main restaurant buffet' },
      { vi: 'Khu vực spa người', en: 'The human spa area' },
      { vi: 'Khu vực VinWonders (xem trang Day-care)', en: 'VinWonders areas (please see our Day-care page)' },
    ] as L[],
  },
  {
    icon: Dog,
    title: { vi: 'Quy định khu vực chung', en: 'Shared-area guidelines' } as L,
    items: [
      { vi: 'Thú cưng phải đeo dây dẫn ở khu vực chung', en: 'Pets must be on a leash in shared areas' },
      { vi: 'Sử dụng xe đẩy riêng khi lên xe điện buggy nội khu', en: 'Please use a pet stroller when riding the in-resort buggy' },
      { vi: 'Nhân viên dắt dạo hỗ trợ nếu cần', en: 'Our staff are happy to help with walks if you need it' },
      { vi: 'Không để thú cưng tự do ngoài Pet Zone', en: 'Please don’t let pets roam freely outside the Pet Zone' },
    ] as L[],
  },
  {
    icon: Syringe,
    title: { vi: 'Quy định tiêm phòng', en: 'Vaccination requirements' } as L,
    items: [
      { vi: 'Sổ tiêm phòng dại hợp lệ bắt buộc', en: 'A valid rabies vaccination booklet is required' },
      { vi: 'Tiêm 5-in-1 (chó) hoặc 3-in-1 (mèo) ít nhất 14 ngày trước nhận phòng', en: 'A 5-in-1 (dogs) or 3-in-1 (cats) vaccine at least 14 days before check-in' },
      { vi: 'Tải ảnh sổ tiêm lên hệ thống khi đặt phòng', en: 'Please upload a photo of the booklet when you book' },
      { vi: 'Thú cưng dưới 3 tháng tuổi chưa tiêm đủ không được nhận', en: 'Pets under 3 months old who haven’t completed their vaccinations can’t be accepted yet' },
    ] as L[],
  },
  {
    icon: Car,
    title: { vi: 'Di chuyển nội khu', en: 'Getting around the resort' } as L,
    items: [
      { vi: 'Xe điện buggy có khoang riêng cho thú cưng', en: 'Buggies with a private compartment for pets' },
      { vi: 'Thú cưng phải ở trong xe đẩy hoặc lồng vận chuyển', en: 'Pets ride in a stroller or carrier' },
      { vi: 'Nhân viên hỗ trợ xếp dỡ xe điện', en: 'Our staff will help you load and unload' },
      { vi: 'Không gian xe điện được vô trùng sau mỗi lượt', en: 'Buggy compartments are sterilised after every trip' },
    ] as L[],
  },
];

export function PoliciesPage() {
  const { t, tr } = useLang();
  return (
    <div className="pt-20">
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img src="https://images.pexels.com/photos/7470634/pexels-photo-7470634.jpeg?auto=compress&cs=tinysrgb&w=1600" alt={t('Quy định', 'Pet policies')} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/55 to-sapphire-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">{t('Quy định & Chính sách', 'Policies & Guidelines')}</p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                <>Quy định khi <span className="text-gold-gradient">mang theo thú cưng</span></>,
                <>Guidelines for <span className="text-gold-gradient">travelling with your pet</span></>
              )}
            </h1>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ivory">
        {/* alert */}
        <div className="mx-auto mb-10 flex max-w-5xl items-start gap-3 rounded-2xl border border-gold-300 bg-gold-50 p-4 text-sm text-sapphire-800">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
          <p>
            {t(
              'Việc tuân thủ quy định đảm bảo an toàn cho thú cưng, khách lưu trú khác và nhân viên VinPet. VinPet có quyền từ chối nhận phòng nếu vi phạm quy định hoặc thông tin thú cưng không chính xác.',
              'Following these guidelines keeps your pet, other guests and our VinPet team safe and happy. VinPet reserves the right to decline check-in if the guidelines are not followed or if the pet information provided is inaccurate.'
            )}
          </p>
        </div>

        <div className="mx-auto max-w-5xl space-y-5">
          {sections.map((s) => (
            <div key={s.title.vi} className="rounded-3xl border border-sapphire-100 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sapphire-50">
                  <s.icon className="h-6 w-6 text-sapphire-700" />
                </span>
                <h2 className="font-display text-2xl font-semibold text-sapphire-900">{tr(s.title)}</h2>
              </div>
              <div className="my-4 h-px bg-sapphire-100" />
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {s.items.map((i) => (
                  <li key={i.vi} className="flex items-start gap-2 text-sm text-sapphire-700">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> {tr(i)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
