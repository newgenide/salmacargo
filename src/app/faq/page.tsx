'use client';

import { useState } from 'react';
import { Search, Mail } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

const faqCategories = [
  {
    title: 'Shipping & Delivery',
    questions: [
      {
        q: 'How can I track my shipment?',
        a: 'You can easily track your shipment by entering your tracking number in the tracking form on our homepage or navigation bar. Our real-time tracking system provides detailed updates about your package\'s location and estimated delivery time.'
      },
      {
        q: 'What are your delivery timeframes?',
        a: 'Our delivery timeframes vary based on the service you choose. Standard delivery typically takes 3-5 business days, Express shipping delivers within 1-2 business days, and International shipping times vary by destination.'
      },
      {
        q: 'Do you offer international shipping?',
        a: 'Yes, we offer comprehensive international shipping services to over 150 countries worldwide. Our international service includes customs clearance assistance, door-to-door delivery, and full tracking capabilities.'
      }
    ]
  },
  {
    title: 'Packaging & Restrictions',
    questions: [
      {
        q: 'What items are prohibited for shipping?',
        a: 'Prohibited items include dangerous goods, hazardous materials, illegal substances, and certain perishables. For a complete list of restricted items, please contact our customer service or refer to our shipping guidelines.'
      },
      {
        q: 'How should I package my items?',
        a: 'Use appropriate packaging materials based on item type. For fragile items, use bubble wrap and sturdy boxes. All items should be securely packed with no movement inside the package. Remove old labels and secure all openings.'
      },
      {
        q: 'What are the size and weight limits?',
        a: 'Size and weight limits vary by service type. Standard shipping accepts packages up to 70lbs and 108" in length. For larger items, please contact us for special handling options.'
      }
    ]
  },
  {
    title: 'Pricing & Payment',
    questions: [
      {
        q: 'How is shipping cost calculated?',
        a: 'Shipping costs are calculated based on package weight, dimensions, destination, and selected service level. Use our online calculator for instant quotes.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards, PayPal, and bank transfers. Corporate accounts may qualify for invoice payment terms.'
      },
      {
        q: 'Do you offer shipping insurance?',
        a: 'Yes, we offer shipping insurance for all packages. Basic coverage is included, and additional coverage can be purchased based on declared value.'
      }
    ]
  },
  {
    title: 'Account & Support',
    questions: [
      {
        q: 'How do I create a business account?',
        a: 'Visit our business solutions page to create a corporate account. You\'ll need to provide business details and shipping volume estimates.'
      },
      {
        q: 'What customer support options are available?',
        a: 'We offer 24/7 customer support through phone, email, and live chat. Our dedicated team is always ready to assist you.'
      },
      {
        q: 'Can I schedule a pickup?',
        a: 'Yes, you can schedule pickups through your online account or by contacting our customer service. Regular pickup services are available for business accounts.'
      }
    ]
  }
];

const FaqPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const siteData = useSite();

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90 mb-12">
              Find answers to common questions about our shipping services and processes
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {filteredCategories.map((category) => (
              <div key={category.title} className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  {category.title}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                    >
                      <button
                        onClick={() => setActiveCategory(
                          activeCategory === `${category.title}-${index}`
                            ? null
                            : `${category.title}-${index}`
                        )}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg font-medium text-text-primary pr-8">
                          {item.q}
                        </h3>
                      </button>
                      {activeCategory === `${category.title}-${index}` && (
                        <div className="px-6 pb-4">
                          <p className="text-text-secondary">{item.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-text-primary">
            Still Have Questions?
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
          <a
            href={`mailto:${siteData.email}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-light transition-colors font-medium"
          >
            <Mail className="w-5 h-5" />
            Contact Support
          </a>
        </div>
      </section>
    </main>
  );
};

export default FaqPage;
