import { useState } from 'react';
import {
  ShieldCheck,
  MapPin,
  Users,
  HeartPulse,
  Car,
  UserCheck,
  AlertTriangle,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useLang, type L } from '@/lib/i18n';

interface PolicyCard {
  id: string;
  tag: string;
  title: L;
  enLabel: string;
  icon: typeof ShieldCheck;
  highlight: L;
  content: {
    heading?: L;
    points: L[];
  }[];
}

const policyCards: PolicyCard[] = [
  {
    id: '01',
    tag: '01',
    title: { vi: 'Điều kiện tiếp nhận thú cưng', en: 'Pet Admission Requirements' },
    enLabel: 'Pet Eligibility',
    icon: ShieldCheck,
    highlight: {
      vi: 'Tiếp nhận chó và mèo khỏe mạnh, có hồ sơ tiêm phòng hợp lệ theo yêu cầu của cơ sở.',
      en: 'Healthy dogs and cats with valid vaccination records meeting property standards.',
    },
    content: [
      {
        points: [
          {
            vi: 'VinPet tiếp nhận chó và mèo khỏe mạnh, có thông tin nhận diện và hồ sơ tiêm phòng hợp lệ theo yêu cầu của cơ sở.',
            en: 'VinPet welcomes healthy dogs and cats with identification information and valid vaccination records that meet the requirements of the property.',
          },
          {
            vi: 'Khách hàng cần khai báo số lượng, loài, độ tuổi, cân nặng và các thông tin liên quan đến tình trạng sức khỏe của thú cưng khi đặt phòng.',
            en: 'Guests must declare the number, species, age, weight, and relevant health information of their pets at the time of booking.',
          },
          {
            vi: 'Khách hàng cung cấp hồ sơ tiêm phòng trước ngày nhận phòng và xuất trình bản gốc hoặc bản điện tử hợp lệ khi được yêu cầu.',
            en: 'Guests must submit vaccination records before check-in and present valid original or electronic records upon request.',
          },
          {
            vi: 'Thú cưng phải đáp ứng các điều kiện về tiêm phòng, độ tuổi và sức khỏe do VinPet công bố cho từng cơ sở.',
            en: 'Pets must meet the vaccination, age, and health requirements published by VinPet for each property.',
          },
          {
            vi: 'VinPet có quyền từ chối tiếp nhận thú cưng không đáp ứng điều kiện an toàn, có dấu hiệu mắc bệnh truyền nhiễm hoặc có thông tin khai báo không chính xác. Việc từ chối sẽ được giải thích cho khách hàng theo chính sách đã công bố.',
            en: 'VinPet reserves the right to refuse admission to pets that do not meet safety requirements, show signs of a contagious disease, or have inaccurate declaration information. Any refusal will be explained to guests in accordance with the published policy.',
          },
        ],
      },
    ],
  },
  {
    id: '02',
    tag: '02',
    title: { vi: 'Khu vực được phép & hạn chế', en: 'Permitted and Restricted Areas' },
    enLabel: 'Permitted Areas',
    icon: MapPin,
    highlight: {
      vi: 'Quy định rõ ràng giữa khu vực tự do vui chơi (Pet Zone) và các khu vực hạn chế vì an toàn vệ sinh.',
      en: 'Clear zoning between pet-friendly spaces (Pet Zones) and designated human-only areas.',
    },
    content: [
      {
        heading: { vi: 'Khu vực được phép', en: 'Permitted Areas' },
        points: [
          {
            vi: 'Phòng lưu trú dành riêng cho khách đi cùng thú cưng.',
            en: 'Accommodation rooms designated for guests travelling with pets.',
          },
          {
            vi: 'Pet Zone, Pet Park, Pet Café và các khu vực ngoài trời có biển chỉ dẫn cho phép thú cưng.',
            en: 'Pet Zones, Pet Parks, Pet Cafés, and outdoor areas displaying signs permitting pets.',
          },
          {
            vi: 'Lối đi và khu vực vận chuyển được VinPet bố trí riêng.',
            en: 'Designated pathways and transport areas arranged by VinPet.',
          },
        ],
      },
      {
        heading: { vi: 'Khu vực không được phép', en: 'Restricted Areas' },
        points: [
          {
            vi: 'Hồ bơi dành cho người và khu vực spa dành cho người.',
            en: 'Swimming pools for people and spa areas designated for people.',
          },
          {
            vi: 'Khu vực buffet và khu vực chế biến thực phẩm.',
            en: 'Buffet dining areas and food preparation areas.',
          },
          {
            vi: 'Các trò chơi, điểm tham quan hoặc khu vực hạn chế thú cưng tại VinWonders.',
            en: 'Rides, attractions, or areas within VinWonders where pets are restricted.',
          },
          {
            vi: 'Những khu vực có biển báo cấm hoặc thông báo hạn chế vì lý do vệ sinh và an toàn.',
            en: 'Areas displaying prohibition signs or restrictions for hygiene and safety reasons.',
          },
          {
            vi: 'Việc tiếp cận các khu vực khác phụ thuộc quy định riêng của từng cơ sở. Khách hàng vui lòng tuân thủ hướng dẫn của nhân viên.',
            en: 'Access to other areas is subject to the individual property’s regulations. Guests are requested to follow staff instructions.',
          },
        ],
      },
    ],
  },
  {
    id: '03',
    tag: '03',
    title: { vi: 'Quy định tại khu vực chung', en: 'Rules in Shared Areas' },
    enLabel: 'Shared Areas',
    icon: Users,
    highlight: {
      vi: 'Đeo dây dắt, sử dụng xe đẩy/lồng vận chuyển và luôn thu dọn vệ sinh để giữ gìn không gian chung.',
      en: 'Keep on leash/carrier, clean up pet waste promptly, and maintain peaceful shared atmosphere.',
    },
    content: [
      {
        points: [
          {
            vi: 'Chó phải được đeo dây dắt và có người kiểm soát; mèo phải ở trong lồng vận chuyển hoặc xe đẩy phù hợp, trừ khu vực được cho phép khác.',
            en: 'Dogs must be kept on a leash and under control. Cats must remain in a suitable carrier or pet stroller, except in areas where otherwise permitted.',
          },
          {
            vi: 'Không để thú cưng tự do chạy nhảy ngoài khu vực được chỉ định.',
            en: 'Pets must not roam freely outside designated areas.',
          },
          {
            vi: 'Chủ nuôi có trách nhiệm thu gom và xử lý chất thải của thú cưng đúng nơi quy định.',
            en: 'Owners are responsible for collecting and disposing of their pets’ waste in designated areas.',
          },
          {
            vi: 'Không để thú cưng tiếp cận, quấy rầy hoặc gây nguy hiểm cho khách lưu trú, trẻ em, nhân viên và các động vật khác.',
            en: 'Pets must not approach, disturb, or endanger other guests, children, staff, or other animals.',
          },
          {
            vi: 'Khách hàng cần chủ động hạn chế tiếng sủa, tiếng kêu hoặc các hành vi gây ảnh hưởng đến khách xung quanh.',
            en: 'Guests must take reasonable measures to minimise barking, vocalisation, and other behaviours that may disturb surrounding guests.',
          },
          {
            vi: 'Không để thú cưng một mình trong phòng hoặc tại khu vực chung khi chưa có sự chấp thuận của VinPet.',
            en: 'Pets must not be left unattended in accommodation rooms or shared areas without VinPet’s prior approval.',
          },
        ],
      },
    ],
  },
  {
    id: '04',
    tag: '04',
    title: { vi: 'Quy định về vệ sinh & sức khỏe', en: 'Hygiene and Health Regulations' },
    enLabel: 'Health & Hygiene',
    icon: HeartPulse,
    highlight: {
      vi: 'Yêu cầu tiêm chủng bắt buộc, thông báo tiền sử bệnh lý và chuẩn bị đồ dùng chăm sóc chu đáo.',
      en: 'Mandatory vaccination proof, advance health declarations, and proper medication care.',
    },
    content: [
      {
        points: [
          {
            vi: 'Thú cưng phải có hồ sơ tiêm phòng phù hợp với yêu cầu được thông báo trước khi đặt phòng.',
            en: 'Pets must have vaccination records that meet the requirements communicated before booking.',
          },
          {
            vi: 'Không tiếp nhận thú cưng có dấu hiệu nghi ngờ mắc bệnh truyền nhiễm hoặc tình trạng sức khỏe có thể gây nguy hiểm cho các động vật khác.',
            en: 'Pets showing signs of a suspected contagious disease or a health condition that may pose a risk to other animals will not be admitted.',
          },
          {
            vi: 'Khách hàng cần thông báo trước cho VinPet về bệnh lý, dị ứng, nhu cầu chăm sóc đặc biệt hoặc hành vi có thể ảnh hưởng đến quá trình lưu trú.',
            en: 'Guests must inform VinPet in advance of any medical conditions, allergies, special care needs, or behavioural concerns that may affect the stay.',
          },
          {
            vi: 'Khách hàng có trách nhiệm cung cấp thức ăn, thuốc và hướng dẫn chăm sóc cần thiết, trừ khi dịch vụ tương ứng đã được xác nhận trong gói đặt trước.',
            en: 'Guests are responsible for providing necessary food, medication, and care instructions unless the relevant services have been confirmed as part of a booking package.',
          },
          {
            vi: 'VinPet có thể yêu cầu khách hàng đưa thú cưng đến cơ sở thú y khi cần thiết để bảo đảm an toàn.',
            en: 'VinPet may request that guests take their pets to a veterinary facility when necessary to ensure safety.',
          },
        ],
      },
    ],
  },
  {
    id: '05',
    tag: '05',
    title: { vi: 'Di chuyển trong khu nghỉ dưỡng', en: 'Transportation Within the Resort' },
    enLabel: 'Transportation',
    icon: Car,
    highlight: {
      vi: 'Di chuyển bằng xe điện buggy chuyên dụng có khoang lồng riêng và khử trùng định kỳ sau mỗi chuyến.',
      en: 'Travel via approved pet buggies with carriers, fully disinfected between every transfer.',
    },
    content: [
      {
        points: [
          {
            vi: 'Thú cưng chỉ được di chuyển bằng phương tiện và trên lộ trình được VinPet cho phép.',
            en: 'Pets may only travel using transport options and routes permitted by VinPet.',
          },
          {
            vi: 'Khi sử dụng xe điện nội khu, thú cưng phải được đặt trong lồng vận chuyển hoặc xe đẩy phù hợp với thiết kế phương tiện và hướng dẫn của nhân viên.',
            en: 'When using electric vehicles within the resort, pets must be placed in a suitable carrier or pet stroller compatible with the vehicle’s design and staff instructions.',
          },
          {
            vi: 'Khách hàng cần tuân thủ hướng dẫn lên, xuống xe và bảo đảm thú cưng được kiểm soát trong suốt hành trình.',
            en: 'Guests must follow boarding and alighting instructions and ensure their pets remain under control throughout the journey.',
          },
          {
            vi: 'Phương tiện được vệ sinh, khử khuẩn theo quy trình vận hành sau mỗi lượt sử dụng.',
            en: 'Transport vehicles are cleaned and sanitised after each use in accordance with operational procedures.',
          },
          {
            vi: 'Dịch vụ nhân viên hỗ trợ dắt dạo hoặc vận chuyển thú cưng cần được đặt trước và xác nhận về phạm vi phục vụ, phí dịch vụ và trách nhiệm chăm sóc.',
            en: 'Pet-walking or pet-transport assistance provided by staff must be booked in advance, with the service scope, applicable fees, and care responsibilities confirmed beforehand.',
          },
        ],
      },
    ],
  },
  {
    id: '06',
    tag: '06',
    title: { vi: 'Trách nhiệm của khách hàng', en: 'Guest Responsibilities' },
    enLabel: 'Guest Responsibilities',
    icon: UserCheck,
    highlight: {
      vi: 'Chủ nuôi chịu trách nhiệm giám sát, chăm sóc và bồi thường thiệt hại thực tế theo quy định.',
      en: 'Owners remain responsible for pet supervision and actual damages caused under policy terms.',
    },
    content: [
      {
        points: [
          {
            vi: 'Chủ nuôi chịu trách nhiệm giám sát, kiểm soát và chăm sóc thú cưng trong suốt thời gian lưu trú, trừ phạm vi dịch vụ chăm sóc đã được VinPet tiếp nhận rõ ràng.',
            en: 'Owners are responsible for supervising, controlling, and caring for their pets throughout the stay, except for care services explicitly accepted by VinPet.',
          },
          {
            vi: 'Khách hàng chịu trách nhiệm đối với thiệt hại thực tế do thú cưng gây ra theo quy định pháp luật và chính sách bồi thường được công bố.',
            en: 'Guests are responsible for actual damage caused by their pets in accordance with applicable laws and the published compensation policy.',
          },
          {
            vi: 'Không tự ý sử dụng đồ dùng, thức ăn hoặc thuốc của khách khác cho thú cưng.',
            en: 'Guests must not use other guests’ belongings, food, or medication for their pets without permission.',
          },
          {
            vi: 'Tuân thủ hướng dẫn của nhân viên khi xảy ra sự cố, thú cưng đi lạc, có hành vi bất thường hoặc tiếp xúc gây thương tích với người hay động vật khác.',
            en: 'Guests must follow staff instructions in the event of an incident, a missing pet, unusual behaviour, or an interaction resulting in injury to a person or another animal.',
          },
        ],
      },
    ],
  },
  {
    id: '07',
    tag: '07',
    title: { vi: 'Xử lý vi phạm & sự cố', en: 'Violation and Incident Management' },
    enLabel: 'Violations & Incidents',
    icon: AlertTriangle,
    highlight: {
      vi: 'Quy trình xử lý minh bạch, từ nhắc nhở, phối hợp cách ly đến từ chối dịch vụ khi tái phạm.',
      en: 'Transparent escalation protocol from warnings and containment to service refusal for serious violations.',
    },
    content: [
      {
        points: [
          {
            vi: 'VinPet có thể nhắc nhở, yêu cầu khách hàng khắc phục hoặc hạn chế quyền tiếp cận một số khu vực khi phát hiện vi phạm.',
            en: 'VinPet may issue reminders, request corrective action, or restrict access to certain areas when violations are identified.',
          },
          {
            vi: 'Trong trường hợp có nguy cơ mất an toàn, VinPet có thể yêu cầu đưa thú cưng ra khỏi khu vực liên quan và phối hợp với khách hàng để xử lý.',
            en: 'In cases involving safety risks, VinPet may require pets to be removed from the affected area and coordinate with guests to resolve the situation.',
          },
          {
            vi: 'Trường hợp vi phạm nghiêm trọng hoặc tái diễn, VinPet có thể từ chối tiếp tục cung cấp dịch vụ theo điều kiện đặt phòng và chính sách đã công bố.',
            en: 'In cases of serious or repeated violations, VinPet may refuse to continue providing services in accordance with the applicable booking conditions and published policies.',
          },
          {
            vi: 'Các khoản phí vệ sinh chuyên sâu, sửa chữa hoặc bồi thường chỉ được áp dụng khi có căn cứ, được thông báo minh bạch và phù hợp với chính sách đã công bố.',
            en: 'Additional charges for deep cleaning, repairs, or compensation will only be applied when justified, transparently communicated, and consistent with the published policy.',
          },
        ],
      },
    ],
  },
  {
    id: '08',
    tag: '08',
    title: { vi: 'Cam kết minh bạch', en: 'Transparency Commitment' },
    enLabel: 'Transparency',
    icon: FileCheck2,
    highlight: {
      vi: 'Công khai mọi điều kiện tiếp nhận, phụ thu, dịch vụ chăm sóc và chính sách hoàn hủy trước khi xác nhận.',
      en: 'All conditions, fees, pet services, and cancellation rules are communicated clearly upfront.',
    },
    content: [
      {
        points: [
          {
            vi: 'Các điều kiện tiếp nhận, phụ thu, dịch vụ chăm sóc, chính sách hủy hoặc thay đổi đặt phòng và trách nhiệm bồi thường sẽ được thông báo trước khi khách hàng xác nhận đặt phòng.',
            en: 'Admission requirements, surcharges, pet care services, cancellation or booking amendment policies, and compensation responsibilities will be communicated before guests confirm their bookings.',
          },
          {
            vi: 'VinPet có thể cập nhật quy định để phù hợp với điều kiện vận hành, yêu cầu an toàn và quy định pháp luật.',
            en: 'VinPet may update these regulations to reflect operational conditions, safety requirements, and applicable laws.',
          },
          {
            vi: 'Những thay đổi ảnh hưởng đến đặt phòng đã xác nhận cần được thông báo và xử lý theo điều kiện đặt phòng áp dụng.',
            en: 'Changes affecting confirmed bookings must be communicated and handled in accordance with the applicable booking terms.',
          },
        ],
      },
    ],
  },
];

export function PoliciesPage() {
  const { t, tr } = useLang();
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    '01': true,
    '02': false,
    '03': false,
    '04': false,
    '05': false,
    '06': false,
    '07': false,
    '08': false,
  });

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  return (
    <div className="pt-20">
      {/* Hero Header */}
      <section className="relative h-[42vh] min-h-[320px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/7470634/pexels-photo-7470634.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt={t('Quy định VinPet', 'VinPet policies')}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-950/70 via-sapphire-950/85 to-sapphire-950" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="eyebrow text-gold-300">{t('Quy định & Chính sách', 'Policies & Regulations')}</p>
            <h1 className="heading-1 mt-3 text-ivory">
              {t(
                <>Quy định lưu trú cùng <span className="text-gold-gradient">thú cưng VinPet</span></>,
                <>VinPet Pet-Friendly <span className="text-gold-gradient">Accommodation Policy</span></>
              )}
            </h1>
            <p className="mt-4 text-base text-sapphire-200 leading-relaxed max-w-2xl">
              {t(
                'VinPet chào đón bạn và người bạn bốn chân trong một kỳ nghỉ an toàn, thoải mái và trọn vẹn. Để bảo đảm chất lượng trải nghiệm cho tất cả khách lưu trú, vui lòng đọc và tuân thủ các quy định dưới đây.',
                'VinPet warmly welcomes you and your four-legged companion to enjoy a safe, comfortable, and memorable getaway. To ensure a quality experience for all guests, please read and comply with the following regulations.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section-pad bg-ivory">
        <div className="mx-auto max-w-7xl">

          {/* 8 POLICY CARDS IN 4 COLUMNS X 2 ROWS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {policyCards.map((card) => {
              const isExpanded = !!expandedCards[card.id];
              const IconComp = card.icon;

              return (
                <div
                  key={card.id}
                  className={`group relative rounded-3xl border bg-white p-6 transition-all duration-300 ${
                    isExpanded
                      ? 'border-gold-400 shadow-md ring-1 ring-gold-400/30'
                      : 'border-sapphire-100 shadow-soft hover:border-gold-300 hover:shadow-md'
                  }`}
                >
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-start justify-between">
                    <span className="font-display text-2xl font-black tracking-wider text-gold-500">
                      {card.tag}
                    </span>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sapphire-50 text-sapphire-800 transition-colors group-hover:bg-gold-50 group-hover:text-gold-700">
                      <IconComp className="h-6 w-6 stroke-[1.8]" />
                    </span>
                  </div>

                  {/* Subtitle / English Label */}
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-sapphire-400">
                    {card.enLabel}
                  </p>

                  {/* Main Title */}
                  <h3 className="mt-1 font-display text-lg font-bold text-sapphire-950 leading-snug">
                    {tr(card.title)}
                  </h3>

                  {/* Concise Summary Excerpt */}
                  <p className="mt-2.5 text-xs leading-relaxed text-sapphire-600 line-clamp-3">
                    {tr(card.highlight)}
                  </p>

                  {/* Expand / Collapse Button */}
                  <button
                    type="button"
                    onClick={() => toggleCard(card.id)}
                    className="mt-4 flex w-full items-center justify-between rounded-xl bg-sapphire-50/70 px-3 py-2 text-xs font-bold text-sapphire-800 transition hover:bg-gold-50 hover:text-gold-800"
                  >
                    <span>
                      {isExpanded ? t('Thu gọn chi tiết', 'Collapse') : t('Xem toàn bộ điều khoản', 'Read full details')}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-gold-600" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-sapphire-500" />
                    )}
                  </button>

                  {/* Expandable Content Verbatim from PDF Page 2 */}
                  {isExpanded && (
                    <div className="mt-4 space-y-4 border-t border-sapphire-100 pt-4 text-xs text-sapphire-800 animate-fadeIn">
                      {card.content.map((sec, idx) => (
                        <div key={idx} className="space-y-2">
                          {sec.heading && (
                            <h4 className="font-bold text-sapphire-950 uppercase tracking-wide text-[11px] text-gold-700">
                              {tr(sec.heading)}
                            </h4>
                          )}
                          <ul className="space-y-2.5">
                            {sec.points.map((pt, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5" />
                                <span>{tr(pt)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Support Banner / Hotline Footer */}
          <div className="mt-14 rounded-3xl bg-sapphire-950 p-6 sm:p-8 text-ivory">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold-400 text-sapphire-950">
                  <Info className="h-6 w-6 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-white">
                    {t('Cần tư vấn thêm về quy định đón tiếp thú cưng?', 'Need additional guidance regarding pet admission?')}
                  </h4>
                  <p className="mt-1 text-xs text-sapphire-300">
                    {t(
                      'Đội ngũ chăm sóc khách hàng và bác sĩ thú y trực 24/7 luôn sẵn sàng hỗ trợ giải đáp mọi thắc mắc.',
                      'Our 24/7 concierge and veterinary staff are on standby to assist with any questions.'
                    )}
                  </p>
                </div>
              </div>
              <a
                href="tel:02835889999"
                className="btn-gold whitespace-nowrap text-xs font-bold px-6 py-3 shadow-md"
              >
                {t('Hotline: 028 3588 9999', 'Call 028 3588 9999')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
