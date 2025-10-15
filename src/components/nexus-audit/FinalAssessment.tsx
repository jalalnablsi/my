'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

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
      <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-4xl mx-auto">
        {t.summary_text}
      </p>
      <Button 
        onClick={onReset} 
        className="h-auto inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
      >
        {t.start_new_scan}
      </Button>
    </div>
  </div>
);

export default FinalAssessment;
