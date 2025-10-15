'use client';

import React from 'react';
import { Server, Calendar, HardHat } from 'lucide-react';
import type { DomainInfo } from '@/lib/types';

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  dir: 'ltr' | 'rtl';
}

const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value, color, dir }) => (
  <div className="flex items-start space-x-3 rtl:space-x-reverse" dir="ltr">
    <div className={`p-2 rounded-full ${color} bg-gray-700/50 flex-shrink-0`}>
      <Icon className="w-5 h-5" />
    </div>
    <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
      <p className="text-sm font-medium text-gray-400">{label}</p>
      <p className={`text-lg font-semibold text-gray-200 break-words ${color} font-code`}>{value}</p>
    </div>
  </div>
);

interface DomainInfoCardProps {
  domainInfo: DomainInfo;
  t: { [key: string]: string };
  targetUrl: string;
}

const DomainInfoCard: React.FC<DomainInfoCardProps> = ({ domainInfo, t, targetUrl }) => {
  const dir = t.title.includes('NexusAudit:') ? 'ltr' : 'rtl';
  
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(dir === 'rtl' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 border border-gray-700 shadow-xl mb-10 transform translate-y-[-20px] max-w-7xl mx-auto">
      <h3 className="text-xl font-bold text-gray-200 mb-4 text-center font-headline">{t.target_url}: <span className="text-primary font-code break-all text-lg">{targetUrl}</span></h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        <InfoItem icon={Server} label={t.domain_ip} value={domainInfo?.ip || 'N/A'} color="text-indigo-400" dir={dir} />
        <InfoItem icon={Calendar} label={t.domain_age} value={formatDate(domainInfo?.creation_date) || 'N/A'} color="text-accent" dir={dir} />
        <InfoItem icon={Calendar} label={t.expiration_date} value={formatDate(domainInfo?.expiration_date) || 'N/A'} color="text-rose-400" dir={dir} />
        <InfoItem icon={HardHat} label={t.registrar} value={domainInfo?.registrar || 'N/A'} color="text-amber-400" dir={dir} />
      </div>
    </div>
  );
};

export default DomainInfoCard;
