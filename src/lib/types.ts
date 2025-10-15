export type Lang = 'en' | 'ar';

export interface Translations {
  [key: string]: { [key: string]: string };
}

export interface CheckItem {
  key: string;
  title: string;
  status: 'passed' | 'failed';
  severity?: 'critical' | 'high' | 'medium' | 'low' | 'info' | 'error';
  desc: string;
  fix: string;
}

export interface DomainInfo {
  ip: string;
  creation_date: string;
  expiration_date: string;
  registrar: string;
}

export interface SecurityReport {
  url: string;
  score: number;
  grade: string;
  security_checks: CheckItem[];
  domain_info: DomainInfo;
}

export interface SeoReport {
  seo_score: number;
  grade: string;
  checks: CheckItem[];
}

export interface GeoReport {
  ai_score: number;
  grade: string;
  summary: string;
}

export interface ThreatCheck {
  severity: 'safe' | 'critical' | 'error';
  message: string;
  threats?: string[];
  disclaimer?: string;
}

export interface ScanResults {
  security: SecurityReport;
  seo: SeoReport;
  geo: GeoReport;
  threat_check: ThreatCheck;
}
