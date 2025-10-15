import { getTranslations } from '@/lib/translations';
import type { Lang } from '@/lib/types';
import Header from '@/components/nexus-audit/Header';
import { Metadata, ResolvingMetadata } from 'next';
import { CheckCircle, Shield, Search, Cpu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: { lang: Lang };
}

// SEO Metadata Generation
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const t = getTranslations(params.lang);
  const previousImages = (await parent).openGraph?.images || [];
  
  return {
    title: t.about_meta_title,
    description: t.about_meta_desc,
    openGraph: {
      title: t.about_meta_title,
      description: t.about_meta_desc,
      url: `/${params.lang}/about`,
      images: previousImages,
    },
    twitter: {
      title: t.about_meta_title,
      description: t.about_meta_desc,
      images: previousImages.map(img => (typeof img === 'string' ? img : img.url)),
    },
  };
}

const AboutPage = ({ params: { lang } }: PageProps) => {
  const t = getTranslations(lang);

  const ListItem = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="flex items-start gap-4">
      <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
      <div>
        <h3 className="font-bold text-gray-100 text-lg">{title}</h3>
        <p className="text-gray-400">{children}</p>
      </div>
    </div>
  );

  const UserItem = ({ content }: { content: string }) => (
    <li className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
      <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: content }}></p>
    </li>
  );

  const StepItem = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode; }) => (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 text-center flex flex-col items-center">
      <div className="bg-primary/20 p-4 rounded-full mb-4 border-2 border-primary">
          <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 flex-grow">{children}</p>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <Header lang={lang} t={t} />

        <main className="max-w-5xl mx-auto text-lg leading-relaxed text-gray-300 space-y-16">
          <section className="text-center">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-6 font-headline">
              {t.about_h1}
            </h1>
            <p className="max-w-4xl mx-auto">{t.about_p1}</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-center text-white mb-8 font-headline">{t.about_why_h2}</h2>
            <p className="text-center text-gray-400 mb-10 max-w-3xl mx-auto">{t.about_why_p1}</p>
            <div className="grid md:grid-cols-3 gap-8">
              <StepItem icon={Shield} title={t.about_why_li1_h}>{t.about_why_li1_p}</StepItem>
              <StepItem icon={Search} title={t.about_why_li2_h}>{t.about_why_li2_p}</StepItem>
              <StepItem icon={Cpu} title={t.about_why_li3_h}>{t.about_why_li3_p}</StepItem>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-center text-white mb-8 font-headline">{t.about_who_h2}</h2>
            <p className="text-center text-gray-400 mb-10 max-w-3xl mx-auto">{t.about_who_p1}</p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <UserItem content={t.about_who_li1} />
                <UserItem content={t.about_who_li2} />
                <UserItem content={t.about_who_li3} />
                <UserItem content={t.about_who_li4} />
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-center text-white mb-8 font-headline">{t.about_how_h2}</h2>
            <p className="text-center text-gray-400 mb-10 max-w-3xl mx-auto">{t.about_how_p1}</p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white text-2xl font-bold border-4 border-primary/50">1</div>
                <h3 className="text-xl font-semibold text-gray-100 pt-2">{t.about_how_li1}</h3>
              </div>
              <div className="space-y-2">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white text-2xl font-bold border-4 border-primary/50">2</div>
                <h3 className="text-xl font-semibold text-gray-100 pt-2">{t.about_how_li2}</h3>
              </div>
              <div className="space-y-2">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white text-2xl font-bold border-4 border-primary/50">3</div>
                <h3 className="text-xl font-semibold text-gray-100 pt-2">{t.about_how_li3}</h3>
              </div>
            </div>
          </section>

          <section className="text-center bg-gray-900/60 backdrop-blur-xl rounded-3xl p-10 border border-gray-700/50">
            <h2 className="text-3xl font-bold text-white mb-4 font-headline">{t.about_footer_h2}</h2>
            <p className="max-w-3xl mx-auto text-gray-400 mb-8">{t.about_footer_p1}</p>
            <Button asChild className="h-auto inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg">
              <Link href={`/${lang}`}>{t.scan_security}</Link>
            </Button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AboutPage;
