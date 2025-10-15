'use client';

import React from 'react';
import { Cpu } from 'lucide-react';
import type { GeoReport } from '@/lib/types';

interface GeoInsightsCardProps {
  geoReport: GeoReport;
  t: { [key: string]: string };
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-accent';
  if (score >= 80) return 'text-amber-400';
  if (score >= 60) return 'text-orange-400';
  return 'text-rose-400';
};

const GeoInsightsCard: React.FC<GeoInsightsCardProps> = ({ geoReport, t }) => (
  <div className="mt-12 mb-12">
    <h2 className="text-3xl font-bold text-gray-100 mb-6 border-b border-indigo-700/50 pb-3 flex items-center gap-3 font-headline">
      <Cpu className="w-7 h-7 text-indigo-400"/> {t.geo_insights}
    </h2>
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-indigo-700/50 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-100 mb-3">{t.geo_summary_title} (<span className={getScoreColor(geoReport.ai_score)}>{geoReport.grade}</span>)</h3>
      <p className="text-gray-300 leading-relaxed text-lg">
        {geoReport.summary}
      </p>
    </div>
  </div>
);

export default GeoInsightsCard;
