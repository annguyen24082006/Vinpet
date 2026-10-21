import { useEffect, useState, useCallback } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'story' }
  | { name: 'destinations' }
  | { name: 'services' }
  | { name: 'service'; slug: string }
  | { name: 'vinclub' }
  | { name: 'policies' };

const routes: { match: RegExp; build: (parts: string[]) => Route }[] = [
  { match: /^\/?$/, build: () => ({ name: 'home' }) },
  { match: /^\/story\/?$/, build: () => ({ name: 'story' }) },
  { match: /^\/destinations\/?$/, build: () => ({ name: 'destinations' }) },
  { match: /^\/services\/?$/, build: () => ({ name: 'services' }) },
  { match: /^\/services\/([\w-]+)\/?$/, build: (p) => ({ name: 'service', slug: p[0] }) },
  { match: /^\/vinclub\/?$/, build: () => ({ name: 'vinclub' }) },
  { match: /^\/policies\/?$/, build: () => ({ name: 'policies' }) },
];

function parse(): Route {
  const hash = window.location.hash.replace(/^#/, '');
  const path = hash || '/';
  const parts = path.split('/').filter(Boolean);
  for (const r of routes) {
    const m = path.match(r.match);
    if (m) {
      return r.build(m.slice(1).concat(parts));
    }
  }
  return { name: 'home' };
}

export function useRoute(): [Route, (path: string) => void] {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onChange = () => {
      setRoute(parse());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
  }, []);

  return [route, navigate];
}

export function link(path: string): string {
  return `#${path}`;
}
