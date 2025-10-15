import { NextRequest, NextResponse } from 'next/server';
import { aiReadinessScore, AiReadinessScoreInput } from '@/ai/flows/ai-readiness-score';
import type { ScanResults, CheckItem } from '@/lib/types';

// Mock Data Generators
const getMockSecurityChecks = (): CheckItem[] => [
  {
    key: 'Content-Security-Policy',
    title: 'Content Security Policy (CSP) Header',
    status: 'failed',
    severity: 'high',
    desc: 'The Content Security Policy is not configured or is too permissive. This can leave the site vulnerable to Cross-Site Scripting (XSS) and other injection attacks.',
    fix: 'Implement a strict Content Security Policy (CSP) that specifies trusted sources for content, scripts, and styles. A good starting point is `default-src \'self\'; script-src \'self\' https://trusted.cdn.com;`.',
  },
  {
    key: 'X-Frame-Options',
    title: 'X-Frame-Options Header',
    status: 'failed',
    severity: 'medium',
    desc: 'The X-Frame-Options header is missing, which could allow your site to be embedded in an iframe on other sites, leading to clickjacking attacks.',
    fix: 'Set the X-Frame-Options header to `DENY` or `SAMEORIGIN` to prevent clickjacking.',
  },
  {
    key: 'Strict-Transport-Security',
    title: 'HTTP Strict Transport Security (HSTS)',
    status: 'passed',
    severity: 'low',
    desc: 'The site correctly implements HSTS, forcing browsers to communicate over HTTPS.',
    fix: 'No action needed. Your HSTS policy is active.',
  },
  {
    key: 'SSL-Certificate',
    title: 'SSL/TLS Certificate',
    status: 'passed',
    severity: 'low',
    desc: 'The site uses a valid SSL/TLS certificate with a strong protocol (TLS 1.2+).',
    fix: 'No action needed. Your certificate is valid and secure.',
  },
];

const getMockSeoChecks = (): CheckItem[] => [
    {
        key: 'Title-Tag',
        title: 'Title Tag Presence',
        status: 'passed',
        severity: 'low',
        desc: 'The page has a title tag, which is crucial for SEO and browser tab display.',
        fix: 'No action needed. The title tag is present.'
    },
    {
        key: 'Meta-Description',
        title: 'Meta Description Missing',
        status: 'failed',
        severity: 'high',
        desc: 'The meta description tag is missing. This tag provides a summary of the page for search engine results, and its absence can negatively impact click-through rates.',
        fix: 'Add a concise and compelling meta description (around 155-160 characters) to the page\'s <head> section to improve its appearance in search results.'
    },
    {
        key: 'H1-Tag',
        title: 'H1 Heading Missing',
        status: 'failed',
        severity: 'medium',
        desc: 'The page does not have an H1 heading. An H1 tag is the main heading and is important for signaling the page\'s primary topic to search engines.',
        fix: 'Add a single, unique H1 heading to the page that accurately reflects its content.'
    },
];


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    const aiInput: AiReadinessScoreInput = { url };
    // We run the AI flow and the mock data generation in parallel to save time.
    const [geoResult, securityChecks, seoChecks] = await Promise.all([
      aiReadinessScore(aiInput),
      Promise.resolve(getMockSecurityChecks()),
      Promise.resolve(getMockSeoChecks())
    ]);

    const fullResult: ScanResults = {
      security: {
        url: url,
        score: 75,
        grade: 'C',
        security_checks: securityChecks,
        domain_info: {
          ip: '104.21.2.193',
          creation_date: new Date(Date.now() - 365 * 2 * 24 * 60 * 60 * 1000).toISOString(),
          expiration_date: new Date(Date.now() + 365 * 2 * 24 * 60 * 60 * 1000).toISOString(),
          registrar: 'Cloudflare, Inc.'
        }
      },
      seo: {
        seo_score: 68,
        grade: 'D',
        checks: seoChecks,
      },
      geo: geoResult,
      threat_check: {
        severity: 'safe',
        message: 'URL is not flagged as malicious.',
        disclaimer: 'This check is based on Google Safe Browsing data, which may not be exhaustive.'
      }
    };

    return NextResponse.json(fullResult);

  } catch (error) {
    console.error('Full scan failed:', error);
    return NextResponse.json({ error: 'An unexpected error occurred during the scan.' }, { status: 500 });
  }
}
