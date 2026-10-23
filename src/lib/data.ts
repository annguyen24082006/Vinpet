import type { L } from '@/lib/i18n';

export type ServiceSlug =
  | 'pet-stay'
  | 'spa'
  | 'daycare'
  | 'pet-park'
  | 'events';

export interface ServiceSummary {
  slug: ServiceSlug;
  title: string;
  short: L;
  image: string;
  icon: string;
}

export const services: ServiceSummary[] = [
  {
    slug: 'pet-stay',
    title: 'Pet-friendly Stay',
    short: {
      vi: 'Lưu trú chuẩn 5 sao dành riêng cho gia đình mang theo thú cưng.',
      en: 'Five-star stays made just for families travelling with their pets.',
    },
    image:
      'https://images.pexels.com/photos/33154338/pexels-photo-33154338.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'BedDouble',
  },
  {
    slug: 'spa',
    title: 'Pet Spa & Grooming',
    short: {
      vi: 'Chăm sóc sắc đẹp với mỹ phẩm hữu cơ, an toàn cho da nhạy cảm.',
      en: 'Gentle pampering with organic products, safe for even the most sensitive skin.',
    },
    image:
      'https://images.pexels.com/photos/19145879/pexels-photo-19145879.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Sparkles',
  },
  {
    slug: 'daycare',
    title: 'Day-care',
    short: {
      vi: 'Trông giữ theo giờ/ngày, camera giám sát 24/7 truyền về điện thoại.',
      en: 'Hourly or full-day care, with a 24/7 live camera streamed to your phone.',
    },
    image:
      'https://images.pexels.com/photos/37443358/pexels-photo-37443358.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Camera',
  },
  {
    slug: 'pet-park',
    title: 'Pet Park & Café',
    short: {
      vi: 'Sân chơi ngoài trời, agility course và quầy F&B cho cả người lẫn thú cưng.',
      en: 'An outdoor playground, agility course and café treats for both you and your pet.',
    },
    image:
      'https://images.pexels.com/photos/11512316/pexels-photo-11512316.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Trees',
  },
  {
    slug: 'events',
    title: 'Pet Events & Parties',
    short: {
      vi: 'Tiệc sinh nhật, offline cộng đồng, photographer riêng và thiệp mời điện tử.',
      en: 'Birthday parties, community meetups, a personal photographer and e-invitations.',
    },
    image:
      'https://images.pexels.com/photos/15472083/pexels-photo-15472083.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'PartyPopper',
  },
];

export interface RoomInfo {
  type: string;
  desc: L;
  area: string;
  capacity: string;
  bedrooms?: string;
  pricePerNight: number;
  petPackage: L;
  petPackagePrice: number;
  image: string;
  perks?: L[];
}

export interface Destination {
  id: string;
  name: L;
  region: L;
  type: L;
  hero: string;
  petZone: L;
  restricted: L;
  petFeeNote: L;
  /** price: amount in VND, or null when the item is free */
  petSurcharge: { label: L; price: number | null }[];
  rooms: RoomInfo[];
}

export const destinations: Destination[] = [
  {
    id: 'beachfront-nha-trang',
    name: { vi: 'Vinpearl Beachfront Nha Trang', en: 'Vinpearl Beachfront Nha Trang' },
    region: { vi: 'Nha Trang', en: 'Nha Trang' },
    type: { vi: 'Khách sạn căn hộ sát biển', en: 'Beachfront Hotel & Suites' },
    hero: 'https://images.pexels.com/photos/6769701/pexels-photo-6769701.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    petZone: {
      vi: 'Tầng 6–8 chuyên biệt cho khách đi cùng thú cưng, thang máy riêng, hành lang đệm chống trơn trượt.',
      en: 'Floors 6–8 dedicated to guests with pets, private elevator, and non-slip carpeted corridors.',
    },
    restricted: {
      vi: 'Khu vực hồ bơi chung, nhà hàng buffet chính (có khu vực ăn ngoài trời thân thiện thú cưng).',
      en: 'Main pool and indoor buffet restaurant (outdoor pet-friendly dining patio available).',
    },
    petFeeNote: {
      vi: 'Phụ phí thú cưng đồng giá 450.000đ/con/đêm. Miễn phí đồ ăn vặt, đệm nằm, khay cát và lót chuồng.',
      en: 'Flat pet surcharge of 450,000 VND/pet/night. Free snacks, pet bed, litter box, and absorbent pee pads.',
    },
    petSurcharge: [
      { label: { vi: 'Phụ phí dành cho những người bạn 4 chân (/con/đêm)', en: 'Pet surcharge (/pet/night)' }, price: 450000 },
      { label: { vi: 'FREE Đồ ăn vặt / bánh thưởng dinh dưỡng', en: 'FREE Nutritious pet treats & snacks' }, price: null },
      { label: { vi: 'FREE Ổ đệm nằm cao cấp cho thú cưng', en: 'FREE Luxury pet bed & bolster' }, price: null },
      { label: { vi: 'FREE Cát vệ sinh / Khay vệ sinh chuyên dụng', en: 'FREE Cat litter / dedicated pet tray' }, price: null },
      { label: { vi: 'FREE Lót chuồng / Thảm thấm hút kháng khuẩn', en: 'FREE Antibacterial absorbent pee pads' }, price: null },
      { label: { vi: 'Xe điện buggy nội khu có khoang riêng', en: 'Resort buggy with pet cabin' }, price: null },
    ],
    rooms: [
      {
        type: 'Studio Pet Room',
        area: '32 m²',
        capacity: '1–2 người (cho 1–2 chủ và 1 thú cưng)',
        desc: {
          vi: 'Với diện tích 32 m², phù hợp cho phòng có 1–2 chủ và 1 thú cưng. Căn hộ studio tiện nghi, ban công thoáng mát hướng biển, trang bị sẵn khay nước gốm và đệm êm ái.',
          en: '32 m² studio suite, ideal for 1–2 owners and 1 pet. Bright sea breeze balcony, equipped with ceramic bowls and a cosy pet bed.',
        },
        pricePerNight: 1500000,
        petPackage: { vi: 'Phụ phí dành cho những người bạn 4 chân', en: 'Pet surcharge for our 4-legged friends' },
        petPackagePrice: 450000,
        image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
        perks: [
          { vi: 'Diện tích 32 m²', en: '32 m² floor area' },
          { vi: 'Sức chứa: 1–2 khách & thú cưng', en: 'Capacity: 1–2 guests & pets' },
          { vi: 'Ban công hướng biển thoáng đãng', en: 'Airy sea-view balcony' },
        ],
      },
      {
        type: 'Deluxe Pet Room',
        area: '42 m²',
        capacity: '2–4 người',
        desc: {
          vi: 'Với diện tích 42 m², phù hợp cho 2–4 người. Phòng rộng rãi với tầm nhìn vịnh biển Nha Trang thơ mộng, không gian sinh hoạt thoải mái cho cả gia đình và các bé thú cưng.',
          en: '42 m² deluxe room accommodating 2–4 guests. Panoramic bay view with ample space for the family and pets.',
        },
        pricePerNight: 2000000,
        petPackage: { vi: 'Phụ phí dành cho những người bạn 4 chân', en: 'Pet surcharge for our 4-legged friends' },
        petPackagePrice: 450000,
        image: 'https://images.pexels.com/photos/14013257/pexels-photo-14013257.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        perks: [
          { vi: 'Diện tích 42 m²', en: '42 m² floor area' },
          { vi: 'Sức chứa: 2–4 khách', en: 'Capacity: 2–4 guests' },
          { vi: 'Góc ăn ngủ riêng biệt cho thú cưng', en: 'Dedicated pet dining & sleeping corner' },
        ],
      },
    ],
  },
  {
    id: 'resort-nha-trang',
    name: { vi: 'Vinpearl Resort Nha Trang', en: 'Vinpearl Resort Nha Trang' },
    region: { vi: 'Nha Trang', en: 'Nha Trang' },
    type: { vi: 'Resort sát biển đảo Hòn Tre', en: 'Island Beachfront Resort' },
    hero: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
    petZone: {
      vi: 'Khuôn viên đảo Hòn Tre trong lành, đường dạo bộ ven biển dành riêng cho khách dắt thú cưng, bãi cỏ xanh thoáng đãng.',
      en: 'Fresh Hon Tre island setting, seaside walking paths for pet strolling, expansive green lawns.',
    },
    restricted: {
      vi: 'Khu vui chơi VinWonders bên trong công viên, khu vực spa người, hồ bơi chính.',
      en: 'Indoor areas at VinWonders park, human spa pavilions, and main swimming pool.',
    },
    petFeeNote: {
      vi: 'Đồng giá 450.000đ/con/đêm. Đã bao gồm trọn gói đồ ăn vặt, đệm nằm, khay cát và thảm lót vệ sinh.',
      en: 'Flat rate 450,000 VND/pet/night. All inclusive of snacks, pet bed, litter box, and pee pads.',
    },
    petSurcharge: [
      { label: { vi: 'Phụ phí dành cho những người bạn 4 chân (/con/đêm)', en: 'Pet surcharge (/pet/night)' }, price: 450000 },
      { label: { vi: 'FREE Đồ ăn vặt / snack hữu cơ cao cấp', en: 'FREE Premium organic snacks' }, price: null },
      { label: { vi: 'FREE Ổ đệm nằm cao cấp cho thú cưng', en: 'FREE Luxury pet bed' }, price: null },
      { label: { vi: 'FREE Cát vệ sinh / khay cát khử mùi', en: 'FREE Odour-free litter & tray' }, price: null },
      { label: { vi: 'FREE Lót chuồng / thảm thấm hút chuyên dụng', en: 'FREE Absorbent pads' }, price: null },
      { label: { vi: 'Xe buggy trung chuyển đảo có khoang pet', en: 'Island buggy with pet compartment' }, price: null },
    ],
    rooms: [
      {
        type: 'Deluxe Pet Room',
        area: '42 m²',
        capacity: '1–2 người',
        desc: {
          vi: 'Với diện tích 42 m², phù hợp cho 1–2 người. Kiến trúc Indochine sang trọng, ban công đón gió biển trong lành, chuẩn bị đầy đủ bộ vật dụng đón thú cưng 5 sao.',
          en: '42 m² room accommodating 1–2 guests. Refined Indochine design, seaside balcony, fully outfitted with 5-star pet essentials.',
        },
        pricePerNight: 2000000,
        petPackage: { vi: 'Phụ phí dành cho những người bạn 4 chân', en: 'Pet surcharge for our 4-legged friends' },
        petPackagePrice: 450000,
        image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
        perks: [
          { vi: 'Diện tích 42 m²', en: '42 m² floor area' },
          { vi: 'Sức chứa: 1–2 khách', en: 'Capacity: 1–2 guests' },
          { vi: 'Ban công ngắm vườn hoặc vịnh biển', en: 'Garden or ocean view balcony' },
        ],
      },
      {
        type: 'Grand Deluxe Pet Room',
        area: '52 m²',
        capacity: '2–4 người',
        desc: {
          vi: 'Với diện tích 52 m², phù hợp cho 2–4 người. Không gian mở rộng rãi với ghế sofa êm ái, bồn tắm nằm cao cấp và khoảng sàn rộng để các bé thú cưng vui chơi tự do.',
          en: '52 m² grand deluxe suite for 2–4 guests. Expansive open layout with plush lounge sofa and ample floor space for pets.',
        },
        pricePerNight: 3300000,
        petPackage: { vi: 'Phụ phí dành cho những người bạn 4 chân', en: 'Pet surcharge for our 4-legged friends' },
        petPackagePrice: 450000,
        image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
        perks: [
          { vi: 'Diện tích 52 m²', en: '52 m² floor area' },
          { vi: 'Sức chứa: 2–4 khách', en: 'Capacity: 2–4 guests' },
          { vi: 'Không gian phòng khách rộng thoáng', en: 'Spacious living area' },
        ],
      },
      {
        type: 'Villa Pet Room',
        area: '273 m²',
        capacity: '6–12 người',
        bedrooms: 'Biệt thự 2 tầng 3 phòng ngủ',
        desc: {
          vi: 'Biệt thự 2 tầng 3 phòng ngủ và diện tích 273 m², phù hợp cho đại gia đình 6–12 người. Hồ bơi riêng ngoài trời, sân vườn có hàng rào an toàn cho thú cưng tự do vui đùa.',
          en: '2-storey 3-bedroom villa of 273 m², welcoming 6–12 guests. Private outdoor swimming pool and safely fenced garden for pets.',
        },
        pricePerNight: 12000000,
        petPackage: { vi: 'Phụ phí dành cho những người bạn 4 chân', en: 'Pet surcharge for our 4-legged friends' },
        petPackagePrice: 450000,
        image: 'https://images.pexels.com/photos/14013259/pexels-photo-14013259.jpeg?auto=compress&cs=tinysrgb&w=800',
        perks: [
          { vi: 'Diện tích 273 m² · Biệt thự 2 tầng', en: '273 m² · 2 storeys' },
          { vi: '3 phòng ngủ riêng biệt · 6–12 khách', en: '3 bedrooms · 6–12 guests' },
          { vi: 'Hồ bơi riêng & sân cỏ rào kín', en: 'Private pool & fenced lawn' },
        ],
      },
    ],
  },
  {
    id: 'luxury-nha-trang',
    name: { vi: 'Vinpearl Luxury Nha Trang', en: 'Vinpearl Luxury Nha Trang' },
    region: { vi: 'Nha Trang', en: 'Nha Trang' },
    type: { vi: 'Khu biệt thự nghỉ dưỡng 5 sao cao cấp', en: 'Ultra-Luxury Villa Resort' },
    hero: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1200',
    petZone: {
      vi: 'Khu biệt thự biệt lập hoàn toàn với lối đi lát đá riêng, bãi cát biệt lập dành riêng cho chủ nhân và thú cưng.',
      en: 'Exclusive secluded villa enclave with private stone pathways and private beach stretch for pets.',
    },
    restricted: {
      vi: 'Nhà hàng fine-dining trong nhà, quầy bar chính bên hồ bơi vô cực trung tâm.',
      en: 'Indoor fine-dining venue, central infinity poolside bar.',
    },
    petFeeNote: {
      vi: 'Phụ phí 450.000đ/con/đêm đồng giá. Tặng kèm đồ ăn vặt hữu cơ, đệm ngủ êm ái, cát và lót chuồng.',
      en: 'Flat pet surcharge 450,000 VND/pet/night. Complimentary organic treats, pet bed, litter and pads.',
    },
    petSurcharge: [
      { label: { vi: 'Phụ phí dành cho những người bạn 4 chân (/con/đêm)', en: 'Pet surcharge (/pet/night)' }, price: 450000 },
      { label: { vi: 'FREE Đồ ăn vặt / Gourmet treats cao cấp', en: 'FREE Gourmet pet delicacies' }, price: null },
      { label: { vi: 'FREE Ổ đệm nằm cao cấp cho thú cưng', en: 'FREE Luxury pet bed' }, price: null },
      { label: { vi: 'FREE Cát vệ sinh khử mùi tự nhiên', en: 'FREE Natural pet litter' }, price: null },
      { label: { vi: 'FREE Lót chuồng / thảm chống thấm cao cấp', en: 'FREE Waterproof absorbent pads' }, price: null },
      { label: { vi: 'Dịch vụ Butler chăm sóc thú cưng tận phòng', en: 'In-villa Pet Butler service' }, price: null },
    ],
    rooms: [
      {
        type: 'Biệt thự hướng biển',
        area: '75 m²',
        capacity: '2–4 người',
        desc: {
          vi: 'Với diện tích 75 m², phù hợp cho gia đình 2–4 người. Tầm nhìn trực diện biển xanh ngắt, hiên tắm nắng riêng tư cùng bồn tắm jacuzzi thư giãn và không gian rộng rãi cho thú cưng.',
          en: '75 m² beachfront villa ideal for 2–4 guests. Direct oceanfront vista, private sun terrace, jacuzzi and lavish pet amenities.',
        },
        pricePerNight: 7300000,
        petPackage: { vi: 'Phụ phí dành cho những người bạn 4 chân', en: 'Pet surcharge for our 4-legged friends' },
        petPackagePrice: 450000,
        image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
        perks: [
          { vi: 'Diện tích 75 m²', en: '75 m² villa area' },
          { vi: 'Sức chứa: 2–4 khách', en: 'Capacity: 2–4 guests' },
          { vi: 'Sát mép biển & bồn sục ngoài trời', en: 'Beachfront steps & outdoor jacuzzi' },
        ],
      },
      {
        type: 'Biệt thự 2 tầng',
        area: '134 m²',
        capacity: '2–6 người',
        bedrooms: 'Biệt thự thiết kế 2 tầng',
        desc: {
          vi: 'Với diện tích 134 m², biệt thự có thiết kế 2 tầng phù hợp gia đình 2–6 người. Không gian nội thất gỗ trầm ấm cúng, ban công tầng 2 ngắm vịnh biển tuyệt mỹ và vườn cây mát mẻ.',
          en: '134 m² two-storey villa suited for families of 2–6 guests. Warm luxury timber interiors, second-floor panoramic balcony and shaded garden.',
        },
        pricePerNight: 9000000,
        petPackage: { vi: 'Phụ phí dành cho những người bạn 4 chân', en: 'Pet surcharge for our 4-legged friends' },
        petPackagePrice: 450000,
        image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800',
        perks: [
          { vi: 'Diện tích 134 m² · Biệt thự 2 tầng', en: '134 m² · 2 storeys' },
          { vi: 'Sức chứa: 2–6 khách', en: 'Capacity: 2–6 guests' },
          { vi: 'Phòng khách biệt lập & vườn thư giãn', en: 'Separate lounge & private garden' },
        ],
      },
    ],
  },
  {
    id: 'resort-golf-hoi-an',
    name: { vi: 'Vinpearl Resort & Golf Hoi An', en: 'Vinpearl Resort & Golf Hoi An' },
    region: { vi: 'Hội An', en: 'Hoi An' },
    type: { vi: 'Resort & Golf sát biển Nam Hội An', en: 'Beachfront Golf & Resort' },
    hero: 'https://images.pexels.com/photos/33154338/pexels-photo-33154338.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    petZone: {
      vi: 'Khu biệt thự nghỉ ngơi cho phép thú cưng, không gian xanh sân cỏ rộng rãi, khu vực Pet Park và đường dạo riêng.',
      en: 'Pet-friendly villa zone, sprawling green lawns, dedicated Pet Park and private strolling pathways.',
    },
    restricted: {
      vi: 'Sân golf 18 hố, hồ bơi vô cực chung, khu vực nhà hàng chính và spa.',
      en: '18-hole championship golf course, shared infinity pool, main indoor restaurant, and spa.',
    },
    petFeeNote: {
      vi: 'Phụ phí thú cưng 450.000đ/con/đêm đồng giá. Miễn phí đồ ăn vặt, đệm nằm cao cấp, khay cát và lót chuồng.',
      en: 'Flat surcharge 450,000 VND/pet/night. Free treats, luxury pet bed, litter box, and pee pads.',
    },
    petSurcharge: [
      { label: { vi: 'Phụ phí dành cho những người bạn 4 chân (/con/đêm)', en: 'Pet surcharge (/pet/night)' }, price: 450000 },
      { label: { vi: 'FREE Đồ ăn vặt / snack thưởng hữu cơ', en: 'FREE Organic pet treats' }, price: null },
      { label: { vi: 'FREE Ổ đệm nằm cao cấp cho thú cưng', en: 'FREE Luxury pet bed' }, price: null },
      { label: { vi: 'FREE Cát vệ sinh / khay cát khử mùi', en: 'FREE Odour-free litter & tray' }, price: null },
      { label: { vi: 'FREE Lót chuồng / thảm thấm hút chuyên dụng', en: 'FREE Absorbent pads' }, price: null },
      { label: { vi: 'Sử dụng miễn phí Pet Park & Agility', en: 'Complimentary Pet Park access' }, price: null },
    ],
    rooms: [
      {
        type: 'Deluxe Pet Room',
        area: '42 m²',
        capacity: '2–4 người',
        desc: {
          vi: 'Với diện tích 42 m², phù hợp cho 2–4 người. Phòng Deluxe mang phong cách miền di sản kết hợp hiện đại, ban công rộng hướng vườn mát rượi, khay đệm êm cho thú cưng.',
          en: '42 m² Deluxe room welcoming 2–4 guests. Heritage-inspired modern design, wide garden balcony and plush pet bed.',
        },
        pricePerNight: 2000000,
        petPackage: { vi: 'Phụ phí dành cho những người bạn 4 chân', en: 'Pet surcharge for our 4-legged friends' },
        petPackagePrice: 450000,
        image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
        perks: [
          { vi: 'Diện tích 42 m²', en: '42 m² floor area' },
          { vi: 'Sức chứa: 2–4 khách', en: 'Capacity: 2–4 guests' },
          { vi: 'Ban công hướng vườn xanh mát', en: 'Lush tropical garden balcony' },
        ],
      },
      {
        type: 'Garden Villa Pet Room',
        area: '288 m²',
        capacity: '4–8 người',
        bedrooms: 'Biệt thự 2 phòng ngủ',
        desc: {
          vi: 'Với diện tích 288 m², biệt thự có thiết kế 2 phòng ngủ phù hợp gia đình 4–8 người. Sân vườn nhiệt đới xanh mát có rào an toàn, hồ bơi riêng biệt và khu vực vui chơi cho thú cưng.',
          en: '288 m² 2-bedroom villa suited for 4–8 guests. Safely fenced tropical garden, private swimming pool and open lawn for pets.',
        },
        pricePerNight: 7500000,
        petPackage: { vi: 'Phụ phí dành cho những người bạn 4 chân', en: 'Pet surcharge for our 4-legged friends' },
        petPackagePrice: 450000,
        image: 'https://images.pexels.com/photos/4603361/pexels-photo-4603361.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        perks: [
          { vi: 'Diện tích 288 m² · 2 phòng ngủ', en: '288 m² · 2 bedrooms' },
          { vi: 'Sức chứa: 4–8 khách', en: 'Capacity: 4–8 guests' },
          { vi: 'Hồ bơi riêng & sân cỏ nhiệt đới', en: 'Private pool & tropical lawn' },
        ],
      },
      {
        type: 'Beach Villa Pet Room',
        area: '349 m²',
        capacity: '6–12 người',
        bedrooms: 'Biệt thự 3 phòng ngủ sát biển',
        desc: {
          vi: 'Với diện tích 349 m², Biệt Thự 3 Phòng Ngủ phù hợp 6–12 người. Không gian sát biển nguyên sơ, hồ bơi vô cực riêng tư và lối bước chân thẳng ra bãi biển cho thú cưng đùa nghịch sóng biển.',
          en: '349 m² 3-bedroom beachfront villa accommodating 6–12 guests. Direct beach access, private infinity pool and sun-soaked seaside terrace.',
        },
        pricePerNight: 12500000,
        petPackage: { vi: 'Phụ phí dành cho những người bạn 4 chân', en: 'Pet surcharge for our 4-legged friends' },
        petPackagePrice: 450000,
        image: 'https://images.pexels.com/photos/14013259/pexels-photo-14013259.jpeg?auto=compress&cs=tinysrgb&w=800',
        perks: [
          { vi: 'Diện tích 349 m² · 3 phòng ngủ', en: '349 m² · 3 bedrooms' },
          { vi: 'Sức chứa: 6–12 khách', en: 'Capacity: 6–12 guests' },
          { vi: 'Hồ bơi vô cực sát mép sóng biển', en: 'Seaside infinity pool' },
        ],
      },
    ],
  },
  {
    id: 'wonderworld-phu-quoc',
    name: { vi: 'Vinpearl Wonderworld Phú Quốc', en: 'Vinpearl Wonderworld Phu Quoc' },
    region: { vi: 'Phú Quốc', en: 'Phu Quoc' },
    type: { vi: 'Quần thể biệt thự nghỉ dưỡng Bãi Dài', en: 'Luxury All-Villa Beachfront Resort' },
    hero: 'https://images.pexels.com/photos/3051551/pexels-photo-3051551.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    petZone: {
      vi: 'Khu vực bãi biển riêng cho thú cưng, đường đi dạo ven rừng nguyên sinh và bãi cỏ riêng biệt tại từng căn biệt thự.',
      en: 'Private pet-friendly beach, primeval forest strolling path, and private fenced villa lawns.',
    },
    restricted: {
      vi: 'Hồ bơi công cộng trung tâm, nhà hàng chính trong nhà (có phục vụ tiệc BBQ riêng tại sân vườn villa).',
      en: 'Central shared pool, indoor restaurant (in-villa private lawn BBQ available).',
    },
    petFeeNote: {
      vi: 'Phụ phí thú cưng 450.000đ/con/đêm đồng giá. Miễn phí đồ ăn vặt, đệm nằm cao cấp, khay cát và lót chuồng.',
      en: 'Flat surcharge 450,000 VND/pet/night. Free treats, luxury pet bed, litter box, and pee pads.',
    },
    petSurcharge: [
      { label: { vi: 'Phụ phí dành cho những người bạn 4 chân (/con/đêm)', en: 'Pet surcharge (/pet/night)' }, price: 450000 },
      { label: { vi: 'FREE Đồ ăn vặt / snack thưởng dinh dưỡng', en: 'FREE Nutritious pet treats' }, price: null },
      { label: { vi: 'FREE Ổ đệm nằm cao cấp cho thú cưng', en: 'FREE Luxury pet bed' }, price: null },
      { label: { vi: 'FREE Cát vệ sinh / khay cát khử mùi', en: 'FREE Odour-free litter & tray' }, price: null },
      { label: { vi: 'FREE Lót chuồng / thảm thấm hút chuyên dụng', en: 'FREE Absorbent pee pads' }, price: null },
      { label: { vi: 'Xe điện buggy nội khu đón tiễn tận cổng villa', en: 'Private villa buggy transfer' }, price: null },
    ],
    rooms: [
      {
        type: 'Safari Villa Pet Room',
        area: '279 m²',
        capacity: '6–12 người',
        bedrooms: 'Biệt thự 3 phòng ngủ',
        desc: {
          vi: 'Biệt thự 3 phòng ngủ rộng 279 m², phù hợp 6–12 người. Thiết kế hòa quyện cùng thảm thực vật nhiệt đới đảo ngọc, hồ bơi riêng tĩnh lặng và khuôn viên xanh ngát cho thú cưng thỏa thích vận động.',
          en: '3-bedroom villa of 279 m², welcoming 6–12 guests. Lush island nature aesthetics, private sparkling pool and garden area.',
        },
        pricePerNight: 9900000,
        petPackage: { vi: 'Phụ phí dành cho những người bạn 4 chân', en: 'Pet surcharge for our 4-legged friends' },
        petPackagePrice: 450000,
        image: 'https://images.pexels.com/photos/14013259/pexels-photo-14013259.jpeg?auto=compress&cs=tinysrgb&w=800',
        perks: [
          { vi: 'Diện tích 279 m² · 3 phòng ngủ', en: '279 m² · 3 bedrooms' },
          { vi: 'Sức chứa: 6–12 khách', en: 'Capacity: 6–12 guests' },
          { vi: 'Khuôn viên sân vườn rợp bóng cây xanh', en: 'Shaded tropical garden lawn' },
        ],
      },
      {
        type: 'Beach Villa Pet Room',
        area: '405 m²',
        capacity: '10–16 người',
        bedrooms: 'Biệt thự 4 phòng ngủ sát biển',
        desc: {
          vi: 'Với diện tích 405 m² và 4 phòng ngủ, phù hợp 10–16 người. Biệt thự sát biển Bãi Dài với bể bơi vô cực hướng thẳng hoàng hôn biển Tây, sân cỏ rộng có rào chắn cao cấp cho đại gia đình và các bé thú cưng.',
          en: '405 m² 4-bedroom villa accommodating 10–16 guests. Direct Bai Dai beach frontage, sunset infinity pool and private fenced lawn.',
        },
        pricePerNight: 12170000,
        petPackage: { vi: 'Phụ phí dành cho những người bạn 4 chân', en: 'Pet surcharge for our 4-legged friends' },
        petPackagePrice: 450000,
        image: 'https://images.pexels.com/photos/4603361/pexels-photo-4603361.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        perks: [
          { vi: 'Diện tích 405 m² · 4 phòng ngủ sát biển', en: '405 m² · 4 beachfront bedrooms' },
          { vi: 'Sức chứa: 10–16 khách', en: 'Capacity: 10–16 guests' },
          { vi: 'Hồ bơi vô cực ngắm hoàng hôn Bãi Dài', en: 'Sunset infinity pool on Bai Dai beach' },
        ],
      },
      {
        type: 'Ocean Heaven Pet Room',
        area: '360 m²',
        capacity: '10–16 người',
        bedrooms: 'Biệt thự 4 phòng ngủ 2 tầng',
        desc: {
          vi: 'Biệt thự 4 phòng ngủ rộng 360 m², thiết kế 2 tầng, phù hợp 10–16 người. Tọa lạc vị trí đắc địa nhất khu nghỉ dưỡng với kiến trúc tinh xảo 2 tầng lộng lẫy, ban công đón gió biển lộng lẫy và tiện ích thú cưng tiêu chuẩn VIP.',
          en: '4-bedroom 2-storey villa of 360 m², welcoming 10–16 guests. Prime oceanfront position, two-level architectural design and VIP pet amenities.',
        },
        pricePerNight: 15860000,
        petPackage: { vi: 'Phụ phí dành cho những người bạn 4 chân', en: 'Pet surcharge for our 4-legged friends' },
        petPackagePrice: 450000,
        image: 'https://images.pexels.com/photos/33154338/pexels-photo-33154338.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        perks: [
          { vi: 'Diện tích 360 m² · Biệt thự 2 tầng', en: '360 m² · 2-storey luxury villa' },
          { vi: '4 phòng ngủ siêu sang · 10–16 khách', en: '4 luxury suites · 10–16 guests' },
          { vi: 'Tầm nhìn panorama biển ngút ngàn', en: 'Endless panoramic ocean view' },
        ],
      },
    ],
  },
];
