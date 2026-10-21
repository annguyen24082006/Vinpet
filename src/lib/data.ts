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
  rooms: {
    type: string;
    desc: L;
    pricePerNight: number;
    petPackage: L;
    petPackagePrice: number;
    image: string;
  }[];
}

export const destinations: Destination[] = [
  {
    id: 'phu-quoc',
    name: { vi: 'Vinpearl Resort & Spa Phú Quốc', en: 'Vinpearl Resort & Spa Phu Quoc' },
    region: { vi: 'Phú Quốc', en: 'Phu Quoc' },
    type: { vi: 'Resort sát biển', en: 'Beachfront resort' },
    hero: 'https://images.pexels.com/photos/3051551/pexels-photo-3051551.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    petZone: {
      vi: 'Khu vực VinPet riêng biệt, bãi biển dành cho thú cưng, lối đi riêng không đi qua sảnh chính.',
      en: 'A dedicated VinPet area, a beach just for pets, and a private path that avoids the main lobby.',
    },
    restricted: {
      vi: 'Hồ bơi chung, buffet nhà hàng chính, khu vực spa người.',
      en: 'Shared swimming pool, main restaurant buffet and the human spa area.',
    },
    petFeeNote: {
      vi: 'Phí dịch vụ thú cưng được niêm yết minh bạch tại sảnh, không phát sinh chi phí ẩn.',
      en: 'Pet service fees are clearly posted in the lobby, with no hidden costs.',
    },
    petSurcharge: [
      { label: { vi: 'Phụ thu thú cưng / con / đêm', en: 'Pet surcharge / pet / night' }, price: 450000 },
      { label: { vi: 'Giường thú cưng cao cấp', en: 'Premium pet bed' }, price: null },
      { label: { vi: 'Xe điện nội khu (buggy) có khoang riêng', en: 'In-resort buggy with a private pet compartment' }, price: null },
    ],
    rooms: [
      {
        type: 'Ocean Suite Pet',
        desc: {
          vi: 'Suite hướng biển, 45m², lối đi riêng ra khu VinPet, giường thú cưng cao cấp và bát ăn gốm.',
          en: 'Sea-view suite, 45 m², with a private path to the VinPet area, a premium pet bed and a ceramic food bowl.',
        },
        pricePerNight: 4200000,
        petPackage: { vi: 'Gói VinPet Welcome', en: 'VinPet Welcome Package' },
        petPackagePrice: 450000,
        image:
          'https://images.pexels.com/photos/14013259/pexels-photo-14013259.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
      {
        type: 'Beach Villa Pet',
        desc: {
          vi: 'Villa sát biển riêng tư, 90m², sân vườn có hàng rào an toàn cho thú cưng chạy chơi.',
          en: 'Private beachfront villa, 90 m², with a safely fenced garden where your pet can run and play.',
        },
        pricePerNight: 7800000,
        petPackage: { vi: 'Gói VinPet Villa', en: 'VinPet Villa Package' },
        petPackagePrice: 650000,
        image:
          'https://images.pexels.com/photos/4603361/pexels-photo-4603361.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
    ],
  },
  {
    id: 'nha-trang',
    name: { vi: 'Vinpearl Beachfront Nha Trang', en: 'Vinpearl Beachfront Nha Trang' },
    region: { vi: 'Nha Trang', en: 'Nha Trang' },
    type: { vi: 'Khách sạn', en: 'Hotel' },
    hero: 'https://images.pexels.com/photos/6769701/pexels-photo-6769701.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    petZone: {
      vi: 'Tầng 6–8 dành cho khách mang thú cưng, thang máy riêng, lối đi tránh khu vực đông người.',
      en: 'Floors 6–8 are reserved for guests with pets, with a private elevator and routes that avoid busy areas.',
    },
    restricted: {
      vi: 'Khu vực VinWonders, hồ bơi chung, nhà hàng chính.',
      en: 'VinWonders areas, the shared swimming pool and the main restaurant.',
    },
    petFeeNote: {
      vi: 'Bảng giá phụ thu được cập nhật theo mùa, công khai tại trang đặt phòng.',
      en: 'Surcharges are updated by season and shown openly on the booking page.',
    },
    petSurcharge: [
      { label: { vi: 'Phụ thu thú cưng / con / đêm', en: 'Pet surcharge / pet / night' }, price: 380000 },
      { label: { vi: 'Dịch vụ dắt dạo (2 lần/ngày)', en: 'Dog-walking service (twice a day)' }, price: null },
      { label: { vi: 'Xe điện nội khu có khoang riêng', en: 'In-resort buggy with a private pet compartment' }, price: null },
    ],
    rooms: [
      {
        type: 'Deluxe Pet Room',
        desc: {
          vi: 'Phòng 32m², giường đôi, ban công riêng, khu vực ăn ngủ riêng cho thú cưng.',
          en: '32 m² room with a double bed, a private balcony, and a cosy eating and sleeping corner for your pet.',
        },
        pricePerNight: 2800000,
        petPackage: { vi: 'Gói VinPet Comfort', en: 'VinPet Comfort Package' },
        petPackagePrice: 380000,
        image:
          'https://images.pexels.com/photos/14013257/pexels-photo-14013257.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
    ],
  },
  {
    id: 'hoi-an',
    name: { vi: 'Vinpearl Resort & Golf Hoi An', en: 'Vinpearl Resort & Golf Hoi An' },
    region: { vi: 'Hội An', en: 'Hoi An' },
    type: { vi: 'Resort & Golf', en: 'Resort & Golf' },
    hero: 'https://images.pexels.com/photos/33154338/pexels-photo-33154338.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    petZone: {
      vi: 'Khu villa nghỉ ngơi cho phép thú cưng, không gian xanh rộng rãi, khu vực Pet Park riêng.',
      en: 'Pet-friendly villas surrounded by generous green spaces, plus a Pet Park of their own.',
    },
    restricted: {
      vi: 'Sân golf, hồ bơi chung, spa, nhà hàng chính.',
      en: 'The golf course, shared swimming pool, spa and main restaurant.',
    },
    petFeeNote: {
      vi: 'Phí dịch vụ bao gồm dọn vệ sinh, không phát sinh chi phí ẩn.',
      en: 'Service fees already include cleaning, with no hidden costs.',
    },
    petSurcharge: [
      { label: { vi: 'Phụ thu thú cưng / con / đêm', en: 'Pet surcharge / pet / night' }, price: 420000 },
      { label: { vi: 'Sử dụng Pet Park', en: 'Pet Park access' }, price: null },
      { label: { vi: 'Xe điện nội khu có khoang riêng', en: 'In-resort buggy with a private pet compartment' }, price: null },
    ],
    rooms: [
      {
        type: 'Garden Villa Pet',
        desc: {
          vi: 'Villa 120m², vườn riêng có hàng rào, hồ bơi nhỏ riêng tư cho gia đình.',
          en: '120 m² villa with a private fenced garden and a small private pool for your family.',
        },
        pricePerNight: 6400000,
        petPackage: { vi: 'Gói VinPet Garden', en: 'VinPet Garden Package' },
        petPackagePrice: 520000,
        image:
          'https://images.pexels.com/photos/4603361/pexels-photo-4603361.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
    ],
  },
];
