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
  const fontClass = params.lang === 'ar' ? 'font-cairo' : 'font-body';
  return (
    <div dir={dir} className={fontClass}>
      {children}
    </div>
  );
}
