import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useLang, type L } from '@/lib/i18n';

type Msg = { role: 'user'; text: string } | { role: 'bot'; text: L };

const quickPrompts: L[] = [
  { vi: 'Cho tôi xem menu Pet Café', en: 'Show me the Pet Café menu' },
  { vi: 'Quy định tiêm phòng gồm những gì?', en: 'What are the vaccination rules?' },
  { vi: 'Dịch vụ Day-care hoạt động thế nào?', en: 'How does the Day-care service work?' },
];

// Each topic can be recognised in Vietnamese or English, whichever language the guest types in.
const knowledge: { q: RegExp[]; a: L }[] = [
  {
    q: [/menu|cafe|cà phê|f&b|đồ ăn|thức ăn/i, /menu|caf[eé]|f&b|food|drink|snack|treat/i],
    a: {
      vi: 'Menu Pet Café bao gồm: Puppuccino (sữa chuyên dụng cho thú cưng sục bọt mịn), "Paw-tato" bánh quy ngũ cốc hữu cơ, "Cat-Pudding" nước hầm xương gà đông thành pudding cho mèo, "Bark-becue" gà nướng thái nhỏ không gia vị. Menu người: cà phê specialty, trà trái cây, bánh ngọt tươi.',
      en: 'Here’s what’s on the Pet Café menu 🐾 For your pet: Puppuccino (frothed pet milk), “Paw-tato” organic grain biscuits, “Cat-Pudding” chicken bone broth pudding for cats, and “Bark-becue” unseasoned grilled chicken bites. For you: specialty coffee, fruit tea, and fresh pastries.',
    },
  },
  {
    q: [/tiêm phòng|vaccine|dại|rabies|sổ tiêm/i, /vaccin|rabies|shots?\b|immuni[sz]/i],
    a: {
      vi: 'Quy định tiêm phòng: (1) Sổ tiêm phòng dại hợp lệ bắt buộc, có dấu tròn trúng tiêm cơ sở thú y. (2) Tiêm 5-in-1 hoặc 7-in-1 cho chó và 3-in-1 cho mèo ít nhất 14 ngày trước ngày nhận phòng. (3) Tải ảnh sổ tiêm lên hệ thống khi đặt phòng. (4) Thú cưng dưới 3 tháng tuổi chưa tiêm đủ liều không được nhận.',
      en: 'Vaccination rules: (1) A valid rabies vaccination booklet, stamped by the veterinary clinic, is required. (2) Dogs need a 5-in-1 or 7-in-1 vaccine and cats a 3-in-1, given at least 14 days before check-in. (3) Please upload a photo of the booklet when you book. (4) Pets under 3 months old who haven’t completed their vaccinations can’t be accepted just yet, sorry!',
    },
  },
  {
    q: [/so sánh|hotel|villa|phòng|15kg|so sanh/i, /compar|hotel|villa|room|15 ?kg/i],
    a: {
      vi: 'So sánh Hotel vs Villa (chó 15kg):\n• Hotel (Deluxe Pet Room 32m², ~2.8tr/đêm): phù hợp chó nhỏ–trung, có ban công riêng, phụ thu 380k/con/đêm.\n• Villa (Beach/Garden Villa 90–120m², từ 6.4–7.8tr/đêm): sân vườn có hàng rào cho chó chạy chơi, hồ bơi riêng, phụ thu 450–650k/con/đêm.\n→ Khuyến nghị Villa cho chó 15kg cần không gian vận động.',
      en: 'Hotel vs. Villa for a 15 kg dog:\n• Hotel (Deluxe Pet Room, 32 m², about 2.8M VND/night): great for small to medium dogs, with a private balcony. Pet surcharge is 380,000 VND/pet/night.\n• Villa (Beach/Garden Villa, 90–120 m², from 6.4M–7.8M VND/night): a fenced garden for zoomies, a private pool, and a pet surcharge of 450,000–650,000 VND/pet/night.\n→ We’d suggest a Villa for a 15 kg dog who loves room to run!',
    },
  },
  {
    q: [/daycare|trông giữ|giữ thú|theo giờ/i, /day-?care|babysit|hourly|drop.?off/i],
    a: {
      vi: 'Day-care: tính theo giờ (110.000đ/giờ) hoặc trọn ngày (999.000đ/ngày). Hạ tầng chuẩn resort với phòng máy lạnh 100%, bãi cỏ ngoài trời an toàn, livestream camera 24/7 qua app VinID/Vinpearl, chăm sóc chuyên nghiệp với bữa ăn nhẹ và dắt đi dạo 2 lần/ngày. Đặt lịch tại trang Dịch vụ → Day-care.',
      en: 'Day-care is charged by the hour (110,000 VND/hour) or for a full day (999,000 VND/day). Resort-standard infrastructure with 100% air conditioning, a safe outdoor lawn, 24/7 live camera streaming via VinID/Vinpearl app, and professional care including light meals and two supervised walks daily. Book on Services → Day-care.',
    },
  },
  {
    q: [/spa|grooming|tắm|cắt tỉa|lông/i, /\bspa\b|groom|bath|haircut|trim/i],
    a: {
      vi: 'Pet Spa & Grooming: các gói gồm Tắm trị liệu, Cắt tỉa tạo kiểu, Dưỡng lông, Vệ sinh tai/tuyến hôi. Mỹ phẩm hữu cơ, an toàn cho da nhạy cảm. Quy trình kiểm tra da lông trước khi làm dịch vụ. Giá từ 250k–900k tuỳ gói.',
      en: 'Pet Spa & Grooming offers therapeutic baths, styling trims, coat conditioning, and ear and scent-gland cleaning. We use organic products that are gentle on sensitive skin, and always check your pet’s skin and coat first. Prices range from 250,000–900,000 VND depending on the package.',
    },
  },
  {
    q: [/event|tiệc|sinh nhật|party|offline/i, /event|party|parties|birthday|meet-?up|celebrat/i],
    a: {
      vi: 'Dịch vụ sự kiện: tiệc sinh nhật, tiệc "Boss" tròn năm, offline cộng đồng. Gói gồm trang trí theme, bánh kem an toàn cho thú cưng, photographer riêng, thiệp mời điện tử. Điền form tư vấn tại trang Dịch vụ → Pet Events & Parties.',
      en: 'We host birthday parties, “Boss” anniversary celebrations and community meetups 🎉 Packages include themed decorations, pet-safe cakes, a personal photographer and e-invitations. Fill in the consultation form on Services → Pet Events & Parties and we’ll take it from there.',
    },
  },
  {
    q: [/vin ?club|thành viên|member|ưu đãi|khuyến mãi/i, /vin ?club|member|perk|reward|discount|promo|offer/i],
    a: {
      vi: 'Vin Club 4 hạng: Pet Lovers (free), Silver, Gold, Platinum. Tích điểm mỗi kỳ nghỉ, đổi dịch vụ spa/daycare, ưu tiên check-in, quà sinh nhật cho Boss. Xem chi tiết tại trang Vin Club.',
      en: 'Vin Club has 4 tiers: Pet Lovers (free), Silver, Gold and Platinum. Earn points on every getaway, redeem them for spa or day-care services, enjoy priority check-in, and receive a birthday gift for your little Boss. See the Vin Club page for details.',
    },
  },
  {
    q: [/quy định|chính sách|khu vực cấm|hồ bơi|dây dẫn|buggy|xe điện/i, /rule|polic|restrict|leash|buggy|pool|allowed/i],
    a: {
      vi: 'Quy định: (1) Thú cưng phải đeo dây dẫn ở khu vực chung. (2) Sử dụng xe đẩy riêng khi lên xe điện buggy nội khu. (3) Cấm tuyệt đối: hồ bơi chung, buffet nhà hàng chính, khu vực spa người. (4) Khu vực Pet Zone được đánh dấu rõ trên bản đồ zoning.',
      en: 'House rules: (1) Pets need to be on a leash in shared areas. (2) Please use a pet stroller when riding the in-resort buggy. (3) Pets are not allowed in the shared pool, the main restaurant buffet or the human spa area. (4) Pet Zones are clearly marked on the zoning map.',
    },
  },
];

const fallbackAnswer: L = {
  vi: 'Cảm ơn câu hỏi của bạn! VinPet sẽ ghi nhận và đội ngũ tư vấn viên sẽ liên hệ. Bạn có thể thử các câu hỏi nhanh bên dưới, hoặc liên hệ hotline 028 3588 9999.',
  en: 'Thank you for your question! We’ve noted it down and our advisors will get in touch with you. You’re welcome to try the quick questions below, or call our hotline at +84 28 3588 9999.',
};

function answer(input: string): L {
  for (const k of knowledge) {
    if (k.q.some((re) => re.test(input))) return k.a;
  }
  return fallbackAnswer;
}

const welcome: L = {
  vi: 'Xin chào, mình là trợ lý ảo VinPet. Mình có thể giúp bạn tìm dịch vụ, quy định và bảng giá. Bạn cần hỗ trợ gì?',
  en: 'Hello! I’m the VinPet virtual assistant 🐾 I can help you find services, house rules and prices. What can I help you with today?',
};

export function ChatWidget() {
  const { t, tr } = useLang();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'bot', text: welcome }]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [msgs, open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: 'user', text: t }]);
    setInput('');
    setTimeout(() => {
      setMsgs((m) => [...m, { role: 'bot', text: answer(t) }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="animate-floatUp flex h-[30rem] w-[21rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl border border-sapphire-200 bg-white shadow-sapphire sm:w-[23rem]">
          {/* header */}
          <div className="flex items-center justify-between bg-sapphire-900 px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-sheen">
                <Sparkles className="h-4.5 w-4.5 text-sapphire-950" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-ivory">{t('Trợ lý VinPet', 'VinPet Assistant')}</p>
                <p className="text-[11px] text-gold-300">{t('Online · Trả lời tức thì', 'Online · Instant replies')}</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full text-sapphire-200 hover:bg-sapphire-800"
              aria-label={t('Đóng', 'Close')}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-sapphire-50 px-3.5 py-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-sapphire-800 text-ivory'
                      : 'border border-sapphire-100 bg-white text-sapphire-900 shadow-soft'
                  }`}
                >
                  {m.role === 'bot' ? tr(m.text) : m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* quick prompts */}
          <div className="flex flex-wrap gap-1.5 border-t border-sapphire-100 bg-white px-3 py-2">
            {quickPrompts.map((p) => (
              <button
                key={p.vi}
                onClick={() => send(tr(p))}
                className="rounded-full border border-sapphire-200 bg-sapphire-50 px-2.5 py-1 text-[11px] font-medium text-sapphire-700 transition hover:border-gold-400 hover:text-sapphire-900"
              >
                {tr(p)}
              </button>
            ))}
          </div>

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-sapphire-100 bg-white p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('Nhập câu hỏi...', 'Type your question...')}
              className="flex-1 rounded-full border border-sapphire-200 px-4 py-2.5 text-sm outline-none focus:border-gold-400"
            />
            <button
              type="submit"
              className="grid h-10 w-10 place-items-center rounded-full bg-sapphire-800 text-ivory transition hover:bg-sapphire-700"
              aria-label={t('Gửi', 'Send')}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-gold-sheen shadow-gold transition hover:scale-105"
        aria-label={t('Trò chuyện với trợ lý VinPet', 'Chat with the VinPet assistant')}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-gold-300/40" />
        {open ? (
          <X className="h-6 w-6 text-sapphire-950" />
        ) : (
          <MessageCircle className="h-6 w-6 text-sapphire-950" />
        )}
      </button>
    </div>
  );
}
