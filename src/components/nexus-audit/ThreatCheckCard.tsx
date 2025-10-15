'use client';

import React from 'react';
import { AlertTriangle, Lock } from 'lucide-react';
import type { ThreatCheck } from '@/lib/types';

interface ThreatCheckCardProps {
  threatData: ThreatCheck;
  t: { [key: string]: string };
}

const ThreatCheckCard: React.FC<ThreatCheckCardProps> = ({ threatData, t }) => {
  const status = threatData?.severity?.toLowerCase() || 'error';
  
  const config = {
    safe: {
      color: 'text-accent',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/30',
      icon: <Lock className="w-6 h-6 text-accent" />,
      title: t.safe
    },
    critical: {
      color: 'text-rose-400',
      bg: 'bg-rose-400/10',
      border: 'border-rose-400/30',
      icon: <AlertTriangle className="w-6 h-6 text-rose-400" />,
      title: t.critical
    },
    error: {
      color: 'text-slate-400',
      bg: 'bg-slate-400/10',
      border: 'border-slate-400/30',
      icon: <AlertTriangle className="w-6 h-6 text-slate-400" />,
      title: t.error
    }
  }[status] || {
    color: 'text-slate-400',
    bg: 'bg-slate-400/10',
    border: 'border-slate-400/30',
    icon: <AlertTriangle className="w-6 h-6 text-slate-400" />,
    title: t.error
  };

  let description;
  if (status === 'safe') {
    description = t.threat_safe_desc;
  } else if (status === 'critical') {
    description = t.threat_critical_desc;
  } else {
    description = threatData.message || t.threat_error_desc;
  }
  
  const threatList = threatData?.threats?.join(', ') || 'N/A';

  return (
    <div className={`bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border ${config.border} shadow-lg mb-12`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-full ${config.bg} flex-shrink-0`}>
          {config.icon}
        </div>
        <h3 className={`text-2xl font-bold ${config.color} font-headline`}>{t.threat_check_title}</h3>
      </div>
      <p className="text-gray-300 leading-relaxed text-lg mb-4">
        {description}
      </p>
      {status === 'critical' && (
        <p className="text-rose-300 text-sm mt-2 font-code">
          <span className="font-semibold">{(t.title.includes('NexusAudit:')) ? 'Detected Threat Types:' : 'أنواع التهديد المكتشفة:'}</span> {threatList}
        </p>
      )}
      {threatData?.disclaimer && (
        <p className="text-gray-500 text-xs mt-3">
          {threatData.disclaimer}
        </p>
      )}
    </div>
  );
};

export default ThreatCheckCard;
