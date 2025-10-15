'use client';

import React from 'react';
import { Loader, Scan, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ScanFormProps {
  url: string;
  setUrl: (url: string) => void;
  handleScan: () => void;
  isScanning: boolean;
  error: string;
  t: { [key: string]: string };
}

const ScanForm: React.FC<ScanFormProps> = ({ url, setUrl, handleScan, isScanning, error, t }) => {
  const dir = t.title.includes('NexusAudit:') ? 'ltr' : 'rtl';
  
  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t.input_placeholder}
          className={`flex-1 px-6 py-4 h-auto rounded-xl bg-gray-800/50 border-gray-700 text-gray-100 placeholder-gray-500 focus:ring-primary focus:border-transparent text-lg transition-all duration-300 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
          onKeyPress={(e) => e.key === 'Enter' && handleScan()}
          aria-label="Website URL"
        />
        <Button
          onClick={handleScan}
          disabled={isScanning}
          className="px-8 py-4 h-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 disabled:from-gray-700 disabled:via-gray-700 disabled:to-gray-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl flex-shrink-0"
        >
          {isScanning ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              {t.analyzing}
            </>
          ) : (
            <>
              <Scan className="w-5 h-5" />
              {t.scan_security}
            </>
          )}
        </Button>
      </div>
      {error && (
        <div className="mt-4 p-3 bg-rose-900/30 border border-rose-700/50 rounded-lg text-rose-300 text-center text-sm flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default ScanForm;
