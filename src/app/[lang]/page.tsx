'use client';

import React, { useState, type FC } from 'react';
import { getTranslations } from '@/lib/translations';
import type { Lang, ScanResults } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/nexus-audit/Header';
import ScanForm from '@/components/nexus-audit/ScanForm';
import LoadingState from '@/components/nexus-audit/LoadingState';
import ResultsDashboard from '@/components/nexus-audit/ResultsDashboard';
import { usePathname } from 'next/navigation';

interface PageProps {
  params: { lang: Lang };
}

const NexusAuditPage: FC<PageProps> = ({ params: { lang } }) => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResults | null>(null);
  const [error, setError] = useState('');
  
  const { toast } = useToast();
  const t = getTranslations(lang);
  const pathname = usePathname();

  const validateUrl = (url: string) => {
    if (!/^(http|https):\/\/[^ "]+$/.test(url)) {
      return false;
    }
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleScan = async () => {
    setError('');
    setScanResults(null);

    if (!url.trim()) {
      setError(t.enter_url);
      return;
    }
    if (!validateUrl(url)) {
      setError(t.invalid_url);
      return;
    }

    setIsScanning(true);
    try {
      const response = await fetch(`/api/v1/full-scan-json?url=${encodeURIComponent(url)}&lang=${lang}`);
      const results = await response.json();
      
      if (!response.ok) {
        throw new Error(results.message || t.scan_failed);
      }
      
      setScanResults(results);
    } catch (err: any) {
      console.error(err);
      setError(err.message || t.scan_failed);
      toast({
        variant: "destructive",
        title: "Scan Failed",
        description: err.message || t.scan_failed,
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleReset = () => {
    setUrl('');
    setScanResults(null);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Do not render this page if we are on the about page
  if (pathname.includes('/about')) return null;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <Header lang={lang} t={t} />

        <div className="max-w-4xl mx-auto mb-16">
          <ScanForm 
            url={url} 
            setUrl={setUrl} 
            handleScan={handleScan} 
            isScanning={isScanning} 
            error={error} 
            t={t}
          />
        </div>

        {isScanning && <LoadingState t={t} />}

        {scanResults && !isScanning && (
          <ResultsDashboard 
            results={scanResults} 
            t={t} 
            lang={lang}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default NexusAuditPage;
