import type { ReactNode } from 'react';
import type { Lang } from '@/lib/types';
import { Metadata, ResolvingMetadata } from 'next';
import { getTranslations } from '@/lib/translations';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexusaudit.com";

export async function generateMetadata({ params }: { params: { lang: Lang } }, parent: ResolvingMetadata): Promise<Metadata> {
  const t = getTranslations(params.lang);
  const previousImages = (await parent).openGraph?.images || [];

  const enMetadata = {
    title: "Free Security Headers Analyzer | Website Security Test Tool",
    description: "Test your website's HTTP Security Headers instantly and for free. Analyze CSP, HSTS, X-Frame-Options, and more. Improve your site's security score today!",
    keywords: ["security headers", "HTTP headers analyzer", "website security test", "CSP analyzer", "HSTS checker", "X-Frame-Options", "Content-Security-Policy", "free website security tool"],
    openGraph: {
      title: "Security Headers Analyzer - Free Website Security Test",
      description: "Instantly test your website’s security headers and improve your protection against attacks.",
      url: `${siteUrl}/en`,
      siteName: "Nexus Audit",
      type: 'website' as 'website',
      images: previousImages,
    },
     twitter: {
      card: "summary_large_image" as "summary_large_image",
      title: "Security Headers Analyzer - Free Website Security Test",
      description: "Instantly test your website’s security headers and improve your protection against attacks.",
      images: previousImages.map(img => (typeof img === 'string' ? img : img.url)),
    },
  };

  const arMetadata = {
    title: "أداة مجانية لتحليل رؤوس الأمان | اختبار أمان المواقع",
    description: "اختبر رؤوس أمان HTTP لموقعك فورًا ومجانًا. حلل CSP، HSTS، X-Frame-Options، وغيرها. حسّن درجة أمان موقعك اليوم!",
    keywords: ["رؤوس الأمان", "تحليل رؤوس HTTP", "اختبار أمان المواقع", "محلل CSP", "فاحص HSTS", "X-Frame-Options", "أداة أمان مجانية للمواقع"],
    openGraph: {
      title: "محلل رؤوس الأمان - اختبار مجاني لأمان موقعك",
      description: "اختبر رؤوس أمان موقعك فورًا وحسّن حمايتك ضد الهجمات.",
      url: `${siteUrl}/ar`,
      siteName: "Nexus Audit",
      type: 'website' as 'website',
      images: previousImages,
    },
     twitter: {
      card: "summary_large_image" as "summary_large_image",
      title: "محلل رؤوس الأمان - اختبار مجاني لأمان موقعك",
      description: "اختبر رؤوس أمان موقعك فورًا وحسّن حمايتك ضد الهجمات.",
      images: previousImages.map(img => (typeof img === 'string' ? img : img.url)),
    },
  };

  const metadata = params.lang === 'ar' ? arMetadata : enMetadata;
  
  return {
    title: {
      default: metadata.title,
      template: '%s | NexusAudit'
    },
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: metadata.openGraph,
    twitter: metadata.twitter,
    alternates: {
      canonical: `/${params.lang}`,
      languages: {
        'en': '/en',
        'ar': '/ar',
        'x-default': '/en',
      },
    },
  };
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": params.lang === 'ar' ? "أداة تدقيق المواقع | نيكزس" : "Nexus Audit | Website Audit Tool",
    "url": `${siteUrl}/${params.lang}`,
    "description": params.lang === 'ar' ? "افحص موقعك لاكتشاف مشاكل الأمان، SEO، وجاهزيته للذكاء الاصطناعي. احصل على تقرير PDF مجاني فورًا دون تسجيل." : "Scan your website for security issues, SEO problems, and AI readiness. Get an instant, free PDF report with no registration required.",
    "applicationCategory": "Security, SEO & AI Tools",
    "operatingSystem": "Web",
    "browserRequirements": "Works on all modern browsers",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div dir={dir} className={fontClass}>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
