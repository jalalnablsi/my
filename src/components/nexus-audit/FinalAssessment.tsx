'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface FinalAssessmentProps {
  onReset: () => void;
  t: { [key: string]: string };
}

const FinalAssessment: React.FC<FinalAssessmentProps> = ({ onReset, t }) => (
  <div className="mt-16 bg-gradient-to-r from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-600/40 shadow-2xl">
    <div className="text-center">
      <h3 className="text-3xl font-bold text-gray-100 mb-6 font-headline">
        {t.summary_title}
      </h3>
      <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-4xl mx-auto">
        {t.summary_text}
      </p>
      <Button 
        onClick={onReset} 
        className="h-auto inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
      >
        <RefreshCw className="w-5 h-5"/>
        {t.start_new_scan}
      </Button>
    </div>
  </div>
);

export default FinalAssessment;
