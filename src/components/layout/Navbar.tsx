'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, Mail, Search, ChevronDown, MapPin } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const siteData = useSite();

  const handleTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) {
      window.location.href = `/tracking/${trackingNumber}`;
    }
  };

  return (
    <nav className="w-full bg-background">
      {/* Top Header */}
      <div className="hidden md:block bg-primary/5">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <a href={`mailto:${siteData.email}`} className="flex items-center text-text-primary hover:text-primary transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                {siteData.email}
              </a>
              <a href={`tel:${siteData.phone}`} className="flex items-center text-text-primary hover:text-primary transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                {siteData.phone}
              </a>
              <div className="flex items-center text-text-primary">
                <MapPin className="h-4 w-4 mr-2" />
                {siteData.address}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  className="appearance-none bg-white text-text-primary pr-8 pl-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onChange={(e) => {
                    const lang = e.target.value;
                    if (window.google?.translate) {
                      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
                      if (select) {
                        select.value = lang;
                        select.dispatchEvent(new Event('change'));
                      }
                    }
                  }}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-primary" />
              </div>
              <button
                onClick={() => setIsTrackingOpen(!isTrackingOpen)}
                className="bg-primary text-white px-4 py-1 rounded-md hover:bg-primary-light transition-colors"
              >
                Track Shipment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold text-primary">
            {siteData.siteName}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-text-primary hover:text-primary transition-colors">Home</Link>
            <Link href="/about" className="text-text-primary hover:text-primary transition-colors">About</Link>
            <Link href="/faq" className="text-text-primary hover:text-primary transition-colors">FAQ</Link>
            <Link href="/contact" className="text-text-primary hover:text-primary transition-colors">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-text-primary hover:text-primary transition-colors">Home</Link>
              <Link href="/about" className="text-text-primary hover:text-primary transition-colors">About</Link>
              <Link href="/faq" className="text-text-primary hover:text-primary transition-colors">FAQ</Link>
              <Link href="/contact" className="text-text-primary hover:text-primary transition-colors">Contact</Link>
              <div className="pt-4 border-t space-y-2">
                <a href={`mailto:${siteData.email}`} className="flex items-center text-text-primary hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 mr-2" />
                  {siteData.email}
                </a>
                <a href={`tel:${siteData.phone}`} className="flex items-center text-text-primary hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 mr-2" />
                  {siteData.phone}
                </a>
                <div className="flex items-center text-text-primary">
                  <MapPin className="h-4 w-4 mr-2" />
                  {siteData.address}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tracking Modal */}
      {isTrackingOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-text-primary">Track Your Shipment</h2>
              <button onClick={() => setIsTrackingOpen(false)} className="text-text-primary">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleTracking}>
              <input
                type="text"
                placeholder="Enter tracking number"
                className="w-full p-2 border rounded-md mb-4 text-text-primary placeholder:text-text-secondary/70"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-light transition-colors font-medium"
              >
                Track
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
