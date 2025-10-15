import type { ReactNode } from 'react';
import type { Lang } from '@/lib/types';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Lang };
}) {
  const dir = params.lang === 'ar' ? 'rtl' : 'ltr';
  return (
    <div dir={dir} className="font-body">
      {children}
    </div>
  );
}
