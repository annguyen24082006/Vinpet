import { useEffect } from 'react';
import * as Icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];
  useEffect(() => {}, []);
  if (!C) return null;
  return <C {...props} />;
}
