'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { CheckItem } from '@/lib/types';
import IssueItem from './IssueItem';
import { Button } from '@/components/ui/button';

interface AnalysisSectionProps {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  borderColor: string;
  checks: CheckItem[];
  t: { [key: string]: string };
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ title, icon: Icon, iconColor, borderColor, checks, t }) => {
  const [showPassed, setShowPassed] = useState(false);

  const { failed, passed } = useMemo(() => {
    if (!checks) return { failed: [], passed: [] };
    const failed = checks.filter(check => check.status === 'failed' || ['critical', 'high', 'medium', 'error'].includes(check.severity?.toLowerCase() || ''));
    const passed = checks.filter(check => check.status === 'passed');
    return { failed, passed };
  }, [checks]);

  return (
    <div className="mt-12">
      <h2 className={`text-3xl font-bold text-gray-100 mb-6 border-b ${borderColor} pb-3 flex items-center gap-3 font-headline`}>
        <Icon className={`w-7 h-7 ${iconColor}`}/> {title}
      </h2>
      
      {failed.length > 0 && (
        <>
          <h3 className="text-xl font-semibold text-rose-400 mb-4">{t.failed_checks} ({failed.length})</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {failed.map((issue, index) => (
              <IssueItem key={`fail-${issue.key}-${index}`} issue={issue} t={t} />
            ))}
          </div>
        </>
      )}

      {passed.length > 0 && (
        <div className="mt-8">
          <Button
            variant="link"
            onClick={() => setShowPassed(!showPassed)}
            className="flex items-center gap-2 text-accent hover:text-green-300 font-semibold transition-colors duration-200 p-0"
          >
            {showPassed ? t.hide_passed : t.view_passed} ({passed.length})
            {showPassed ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </Button>
          {showPassed && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 animate-in fade-in-0 duration-500">
              {passed.map((issue, index) => (
                <IssueItem key={`pass-${issue.key}-${index}`} issue={issue} t={t} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalysisSection;
