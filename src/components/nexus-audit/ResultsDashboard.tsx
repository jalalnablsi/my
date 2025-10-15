'use client';

import React, { useMemo, FC } from 'react';
import { FileText } from 'lucide-react';
import type { ScanResults, Lang } from '@/lib/types';
import DomainInfoCard from './DomainInfoCard';
import ScoreCard from './ScoreCard';
import ThreatCheckCard from './ThreatCheckCard';
import GeoInsightsCard from './GeoInsightsCard';
import AnalysisSection from './AnalysisSection';
import FinalAssessment from './FinalAssessment';
import { Shield, Globe, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdPlacement from './AdPlacement';

interface ResultsDashboardProps {
  results: ScanResults;
  t: { [key: string]: string };
  lang: Lang;
  onReset: () => void;
}

const ResultsDashboard: FC<ResultsDashboardProps> = ({ results, t, lang, onReset }) => {

  const handleDownload = () => {
    if (results.security.url) {
      const directLink = 'https://www.effectivegatecpm.com/uja5avpyp?key=1a4afa76ba9b633047f56be212dddb26';
      const downloadLink = `/api/v1/download-report?url=${encodeURIComponent(results.security.url)}&lang=${lang}`;
      
      window.open(directLink, '_blank', 'noopener,noreferrer');
      
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = downloadLink;
        a.download = `NexusAudit_Report_for_${new URL(results.security.url).hostname}.txt`;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, 50); 
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      <DomainInfoCard domainInfo={results.security.domain_info} t={t} targetUrl={results.security.url} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <ScoreCard 
          title={t.security_score} 
          score={results.security.score} 
          grade={results.security.grade}
          icon={Shield} 
          colorClass="text-amber-400"
        />
        <ScoreCard 
          title={t.seo_score} 
          score={results.seo.seo_score} 
          grade={results.seo.grade}
          icon={Globe} 
          colorClass="text-accent"
        />
        <ScoreCard 
          title={t.ai_readiness_score} 
          score={results.geo.ai_score} 
          grade={results.geo.grade}
          icon={Cpu} 
          colorClass="text-indigo-400"
        />
      </div>
      
      <div className="flex justify-center mb-12">
        <Button
          onClick={handleDownload}
          className="h-auto gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl text-lg"
        >
          <FileText className="w-6 h-6" />
          {t.download_report}
        </Button>
      </div>
      
      <ThreatCheckCard threatData={results.threat_check} t={t} />

      <GeoInsightsCard geoReport={results.geo} t={t} />

      <AdPlacement shouldDisplay={!!results} />

      <AnalysisSection
        title={t.security_analysis}
        icon={Shield}
        iconColor="text-amber-400"
        borderColor="border-amber-700/50"
        checks={results.security.security_checks}
        t={t}
      />
      
      <AnalysisSection
        title={t.seo_analysis}
        icon={Globe}
        iconColor="text-accent"
        borderColor="border-emerald-700/50"
        checks={results.seo.checks}
        t={t}
      />

      <FinalAssessment onReset={onReset} t={t} />
    </div>
  );
};

export default ResultsDashboard;
