'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface SiteData {
  siteName: string;
  address: string;
  phone: string;
  email: string;
}

interface SiteContextType {
  siteData: SiteData;
  isLoading: boolean;
}

const defaultSiteData: SiteData = {
  siteName: 'Courier Services',
  address: '123 Shipping Lane, Logistics City',
  phone: '',
  email: 'info@courier.com'
};

const defaultContext: SiteContextType = {
  siteData: defaultSiteData,
  isLoading: true
};

const SiteContext = createContext(defaultContext);

export const useSite = () => useContext(SiteContext);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchSiteData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-gray-500">Loading please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <SiteContext.Provider value={{ siteData, isLoading }}>
      {children}
    </SiteContext.Provider>
  );
}
