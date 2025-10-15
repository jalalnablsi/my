'use client';

import React, { useEffect } from 'react';

interface AdPlacementProps {
  shouldDisplay: boolean;
}

const AdPlacement: React.FC<AdPlacementProps> = ({ shouldDisplay }) => {
  useEffect(() => {
    if (!shouldDisplay) return;

    // This is a simplified ad loader.
    // In a real-world scenario, you would use a more robust solution
    // like Google AdSense or other ad network providers.
    const loadAd = () => {
      const containerId = "container-310b3ae09cc0f1a0bf6cddf16a8d49b5";
      const container = document.getElementById(containerId);
      
      // Check if the ad has already been loaded to avoid re-injecting the script
      if (container && container.getAttribute('data-ad-loaded') !== 'true') {
        container.innerHTML = ''; // Clear previous content
        
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = "//pl27855348.effectivegatecpm.com/310b3ae09cc0f1a0bf6cddf16a8d49b5/invoke.js";
        
        document.body.appendChild(script);
        container.setAttribute('data-ad-loaded', 'true');
      }
    };

    // Delay loading to ensure the component is mounted and to improve perceived performance
    const timer = setTimeout(loadAd, 100); 
    
    return () => {
      clearTimeout(timer);
      const script = document.querySelector('script[src*="effectivegatecpm.com"]');
      if (script) {
          // It's tricky to "unload" a script. For this case, we'll just leave it
          // but prevent re-injection via the data attribute.
      }
    };
  }, [shouldDisplay]);

  if (!shouldDisplay) {
    return null;
  }

  return (
    <div className="my-10 p-6 bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-primary/50 text-center mx-auto max-w-4xl shadow-2xl">
      <div id="container-310b3ae09cc0f1a0bf6cddf16a8d49b5" className="min-h-[100px] flex items-center justify-center bg-gray-800 rounded-lg">
        {/* Ad content will be injected here by the script */}
      </div>
    </div>
  );
};

export default AdPlacement;
