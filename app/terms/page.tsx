'use client';

import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import termsContent from '@/content/terms.json';

export default function TermsPage() {
  const { header, effectiveDate, sections } = termsContent;

  return (
    <>
      <PageHeader
        badge={header.badge}
        title={header.title}
        description={header.description}
        breadcrumbs={[
          { label: 'Terms & Conditions' },
        ]}
      />

      <section className="relative py-16 overflow-hidden">
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeIn direction="up">
            <div className="glass-card p-8 md:p-12">
              <p className="text-white/60 text-sm mb-8">
                <strong>Effective Date:</strong> {effectiveDate}
              </p>

              <div className="prose prose-invert max-w-none space-y-8">
                {sections.map((section, index) => (
                  <section key={index}>
                    <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>

                    {section.content && (
                      <p className="text-white/70 leading-relaxed mb-4">{section.content}</p>
                    )}

                    {section.items && (
                      <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    )}

                    {section.contactInfo && (
                      <div className="mt-4 p-4 bg-white/5 rounded-xl">
                        <p className="text-white font-semibold">{section.contactInfo.name}</p>
                        <p className="text-white/70">Email: {section.contactInfo.email}</p>
                        <p className="text-white/70">Website: {section.contactInfo.website}</p>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
