'use client';

import React from 'react';
import { Loader, Globe } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LoadingStateProps {
  t: { [key: string]: string };
}

const LoadingState: React.FC<LoadingStateProps> = ({ t }) => (
  <div className="max-w-5xl mx-auto">
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl p-16 border border-gray-700/50 shadow-2xl text-center">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <Loader className="w-20 h-20 text-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Globe className="w-12 h-12 text-indigo-400 opacity-70" />
          </div>
        </div>
      </div>
      <h3 className="text-3xl font-bold text-gray-100 mb-4 font-headline">
        {t.analyzing}
      </h3>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
        {t.slogan}
      </p>
      <div className="mt-8 w-full max-w-md mx-auto">
        <Progress value={50} className="w-full h-2 animate-pulse" />
      </div>
    </div>
  </div>
);

export default LoadingState;
