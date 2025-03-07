'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface SiteData {
  siteName: string;
  address: string;
  phone: string;
  email: string;
}

const defaultSiteData: SiteData = {
  siteName: 'Courier Services',
  address: '123 Shipping Lane, Logistics City',
  phone: '+1 (234) 567-890',
  email: 'info@courier.com'
};

const SiteContext = createContext<SiteData>(defaultSiteData);

export const useSite = () => useContext(SiteContext);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await fetch('/api/site');
        if (!response.ok) throw new Error('Failed to fetch site data');
        const data = await response.json();
        
        // Only update if we have valid data
        if (data.site && Object.keys(data.site).length > 0) {
          setSiteData({
            siteName: data.site.siteName || defaultSiteData.siteName,
            address: data.site.address || defaultSiteData.address,
            phone: data.site.phone || defaultSiteData.phone,
            email: data.site.email || defaultSiteData.email
          });
        }
      } catch (error) {
        console.error('Error fetching site data:', error);
        // Keep using default data if fetch fails
      }
    };

    fetchSiteData();
  }, []);

  return (
    <SiteContext.Provider value={siteData}>
      {children}
    </SiteContext.Provider>
  );
}
