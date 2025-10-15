'use client';

import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  lang: Lang;
  t: { [key: string]: string };
}

const Header: React.FC<HeaderProps> = ({ lang, t }) => {
  const pathname = usePathname();

  return (
    <div className="text-center mb-16" id="top">
      <div className="flex justify-between items-center max-w-7xl mx-auto mb-6">
        <Link href={`/${lang}`} passHref className="flex items-center gap-4 group">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-3 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Shield className="w-8 h-8 text-white" />
          </div>
           <span className="text-2xl font-bold text-gray-200 hidden sm:block group-hover:text-white transition-colors">NexusAudit</span>
        </Link>
        
        <div className="flex items-center gap-2 border border-gray-700 rounded-lg p-1 bg-gray-800/50">
          <Link href={pathname.replace(lang, 'en')} passHref>
            <button className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${lang === 'en' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:bg-gray-700'}`}>
              English
            </button>
          </Link>
          <Link href={pathname.replace(lang, 'ar')} passHref>
            <button className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${lang === 'ar' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:bg-gray-700'}`}>
              العربية
            </button>
          </Link>
        </div>
      </div>
      
      <nav className="flex justify-center gap-6 mb-8">
        <Link href={`/${lang}`} className={`text-lg font-medium transition-colors duration-200 ${pathname === `/${lang}` ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
          {t.scan_security}
        </Link>
        <Link href={`/${lang}/about`} className={`text-lg font-medium transition-colors duration-200 ${pathname === `/${lang}/about` ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
          {t.about_nav}
        </Link>
      </nav>

      <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-4 font-headline">
        {t.title}
      </h1>
      <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
        {t.slogan}
      </p>
    </div>
  );
};

export default Header;
