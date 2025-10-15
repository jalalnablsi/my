'use client';

import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Zap, Shield } from 'lucide-react';
import type { CheckItem } from '@/lib/types';

interface IssueItemProps {
  issue: CheckItem;
  t: { [key: string]: string };
}

const getSeverityConfig = (severity: string, t: { [key: string]: string }) => {
  const s = severity?.toLowerCase() || 'low';
  const configs = {
    critical: { color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/30', icon: <AlertTriangle className="w-5 h-5 text-rose-400" />, title: t.critical },
    high: { color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30', icon: <AlertTriangle className="w-5 h-5 text-orange-400" />, title: t.high },
    medium: { color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30', icon: <Zap className="w-5 h-5 text-amber-400" />, title: t.medium },
    low: { color: 'text-slate-400', bg: 'bg-slate-400/10', border: 'border-slate-400/30', icon: <CheckCircle className="w-5 h-5 text-slate-400" />, title: t.low },
    info: { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30', icon: <CheckCircle className="w-5 h-5 text-blue-400" />, title: t.info },
    error: { color: 'text-slate-400', bg: 'bg-slate-400/10', border: 'border-slate-400/30', icon: <XCircle className="w-5 h-5 text-slate-400" />, title: t.error },
    passed: { color: 'text-accent', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30', icon: <CheckCircle className="w-5 h-5 text-accent" />, title: t.passed_header_title },
  };
  // @ts-ignore
  return configs[s] || configs.low;
};

const IssueItem: React.FC<IssueItemProps> = ({ issue, t }) => {
  const isPassed = issue.status === 'passed';
  const severity = issue.severity?.toLowerCase() || 'medium';
  const config = getSeverityConfig(isPassed ? 'passed' : severity, t);

  return (
    <div className={`rounded-xl p-5 border shadow-md transition-all duration-300 ${config.bg} ${config.border} hover:shadow-lg`}>
      <div className="flex items-start gap-4 mb-3">
        <div className="flex-shrink-0 mt-1">
          {config.icon}
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-bold ${isPassed ? 'text-gray-200' : 'text-gray-100'} leading-snug`}>
            {issue.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs font-medium ${config.color}`}>
              {config.title} {isPassed ? '' : t.risk}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mt-2 font-code text-sm">
        <div className={`rounded-lg p-3 border ${config.border}`}>
          <p className="text-gray-400 text-sm mb-1 font-medium font-body">{t.description}</p>
          <p className={`${isPassed ? 'text-green-200' : 'text-gray-200'} leading-relaxed`}>{issue.desc}</p>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 flex-shrink-0 mt-1 text-primary" />
          <div className="text-gray-300 leading-relaxed">
            <span className="font-medium text-gray-200 font-body">{t.recommended_fix} </span>
            <span className="text-purple-300">{issue.fix}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueItem;
