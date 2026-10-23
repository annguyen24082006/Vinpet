import { useState } from 'react';
import { PawPrint, Mail, Phone, Facebook, Send, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLang } from '@/lib/i18n';

export function Footer({ navigate }: { navigate: (path: string) => void }) {
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'err' | 'dup'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('err');
      return;
    }
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email });
    if (error) {
      if (error.code === '23505') setStatus('dup');
      else setStatus('err');
      return;
    }
    setStatus('ok');
    setEmail('');
  };

  return (
    <footer className="relative overflow-hidden bg-sapphire-950 text-ivory">
      <div className="absolute inset-0 bg-sapphire-radial opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-sheen">
                <PawPrint className="h-6 w-6 text-sapphire-950" />
              </span>
              <span className="font-display text-2xl font-semibold">
                Vin<span className="text-gold-gradient">Pet</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sapphire-200">
              Premium, safe and joyful pet experiences within the Vingroup
              lifestyle ecosystem.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-sapphire-700 text-sapphire-200 transition hover:border-gold-400 hover:text-gold-300"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                href="tel:02835889999"
                className="grid h-10 w-10 place-items-center rounded-full border border-sapphire-700 text-sapphire-200 transition hover:border-gold-400 hover:text-gold-300"
              >
                <Phone className="h-4.5 w-4.5" />
              </a>
              <a
                href="mailto:hello@vinpet.vn"
                className="grid h-10 w-10 place-items-center rounded-full border border-sapphire-700 text-sapphire-200 transition hover:border-gold-400 hover:text-gold-300"
              >
                <Mail className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display text-lg font-semibold text-gold-300">
              {t('Khám phá', 'Explore')}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-sapphire-200">
              {[
                [t('Câu chuyện thương hiệu', 'Our Story'), '/story'],
                [t('Điểm đến & Đặt phòng', 'Destinations & Booking'), '/destinations'],
                [t('Dịch vụ VinPet', 'VinPet Services'), '/services'],
                ['Vin Club', '/vinclub'],
                [t('Quy định & Chính sách', 'Policies & Guidelines'), '/policies'],
              ].map(([label, path]) => (
                <li key={path}>
                  <button
                    onClick={() => navigate(path)}
                    className="transition hover:text-gold-200"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="font-display text-lg font-semibold text-gold-300">
              {t('Hệ sinh thái Vingroup', 'The Vingroup Family')}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-sapphire-200">
              {['Vinpearl', 'VinWonders', 'Vinhomes', 'Vinmec', 'Vincom'].map(
                (b) => (
                  <li key={b}>
                    <a href="#" className="transition hover:text-gold-200">
                      {b}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-lg font-semibold text-gold-300">
              {t('Nhận bản tin VinPet', 'Get the VinPet newsletter')}
            </h4>
            <p className="mt-3 text-sm text-sapphire-200">
              {t(
                'Ưu đãi độc quyền, mẹo chăm sóc thú cưng và câu chuyện kỳ nghỉ mới nhất.',
                'Exclusive offers, pet-care tips and our latest getaway stories, delivered to your inbox.'
              )}
            </p>
            <form onSubmit={subscribe} className="mt-4">
              <div className="flex overflow-hidden rounded-full border border-sapphire-700 bg-sapphire-900/60">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('Email của bạn', 'Your email address')}
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-ivory placeholder-sapphire-400 outline-none"
                />
                <button
                  type="submit"
                  className="grid place-items-center bg-gold-sheen px-4 text-sapphire-950 transition hover:brightness-105"
                  aria-label={t('Đăng ký', 'Subscribe')}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {status === 'ok' && (
                <p className="mt-2 text-xs text-gold-300">
                  {t('Cảm ơn bạn đã đăng ký!', 'Thank you for subscribing! 💛')}
                </p>
              )}
              {status === 'dup' && (
                <p className="mt-2 text-xs text-gold-300">
                  {t('Email này đã đăng ký rồi.', 'This email is already on our list. Thank you!')}
                </p>
              )}
              {status === 'err' && (
                <p className="mt-2 text-xs text-rose-300">
                  {t('Vui lòng nhập email hợp lệ.', 'Could you please enter a valid email address?')}
                </p>
              )}
            </form>
            <div className="mt-5 flex items-start gap-2 text-xs text-sapphire-300">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {t(
                  'Số 7 Đường Bằng Lăng 1, Phường Việt Hưng, Quận Long Biên, Hà Nội',
                  'No. 7, Bang Lang 1 Street, Viet Hung Ward, Long Bien District, Hanoi'
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sapphire-800 pt-6 text-xs text-sapphire-400 sm:flex-row">
          <p>© 2026 VinPet — A Vingroup brand. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold-300">
              {t('Chính sách bảo mật', 'Privacy Policy')}
            </a>
            <a href="#" className="hover:text-gold-300">
              {t('Điều khoản sử dụng', 'Terms of Use')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
