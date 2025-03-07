'use client';

import { useSite } from '@/context/SiteContext';
import { Shield } from 'lucide-react';

const PrivacyPage = () => {
  const siteData = useSite();
  const lastUpdated = 'March 7, 2025';

  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'Personal identification information (Name, email address, phone number, etc.)',
        'Shipping information (Addresses, package details, tracking numbers)',
        'Payment information (processed through secure third-party providers)',
        'Device and browser information for service optimization',
        'Location data for delivery and tracking purposes'
      ]
    },
    {
      title: 'How We Use Your Information',
      content: [
        'To process and deliver your shipments',
        'To provide real-time tracking updates',
        'To communicate about your shipments and services',
        'To improve our services and user experience',
        'To ensure the security of our services',
        'To comply with legal obligations'
      ]
    },
    {
      title: 'Information Sharing',
      content: [
        'With delivery partners to fulfill shipments',
        'With payment processors for transactions',
        'With law enforcement when required by law',
        'With third-party service providers under strict confidentiality agreements'
      ]
    },
    {
      title: 'Data Security',
      content: [
        'Implementation of industry-standard security measures',
        'Regular security audits and updates',
        'Encryption of sensitive data',
        'Strict access controls and authentication',
        'Regular staff training on data protection'
      ]
    },
    {
      title: 'Your Rights',
      content: [
        'Access your personal information',
        'Correct inaccurate data',
        'Request deletion of your data',
        'Opt-out of marketing communications',
        'Data portability rights'
      ]
    },
    {
      title: 'Cookies and Tracking',
      content: [
        'Essential cookies for site functionality',
        'Analytics cookies to improve services',
        'Preference cookies to remember your settings',
        'Third-party cookies for enhanced features'
      ]
    },
    {
      title: 'Children\'s Privacy',
      content: [
        'Our services are not intended for children under 13',
        'We do not knowingly collect data from children',
        'Parents can request removal of children\'s data'
      ]
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 text-white/90 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4 text-white">
              Privacy Policy
            </h1>
            <p className="text-lg text-white/90">
              How {siteData.siteName} protects and handles your information
            </p>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-text-secondary">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto prose">
            <p className="text-text-secondary text-lg">
              This Privacy Policy describes how {siteData.siteName} ("we," "our," or "us") collects, uses, and shares your personal information when you use our shipping and logistics services. We are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-text-primary">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-text-primary">
              Questions About Our Privacy Policy?
            </h2>
            <p className="text-text-secondary mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <a
              href={`mailto:${siteData.email}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
            >
              Contact Privacy Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPage;
