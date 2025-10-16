'use client';

import React from 'react';
import Script from 'next/script';

interface AdPlacementProps {
  shouldDisplay: boolean;
}

const AdPlacement: React.FC<AdPlacementProps> = ({ shouldDisplay }) => {
  if (!shouldDisplay) {
    return null;
  }

  const adScriptSrc = "//pl27855348.effectivegatecpm.com/310b3ae09cc0f1a0bf6cddf16a8d49b5/invoke.js";
  const adContainerId = "container-310b3ae09cc0f1a0bf6cddf16a8d49b5";

  return (
    <>
      <div className="my-10 p-6 bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-primary/50 text-center mx-auto max-w-4xl shadow-2xl">
        <div id={adContainerId} className="min-h-[100px] flex items-center justify-center bg-gray-800 rounded-lg">
          {/* Ad content will be injected here by the script */}
        </div>
      </div>
      <Script
        id="ad-script"
        strategy="afterInteractive"
        async={true}
        data-cfasync="false"
        src={adScriptSrc}
      />
    </>
  );
};

export default AdPlacement;
