'use client';

import { useState, useEffect, use } from 'react';
import { PageContent, PageSection, sampleHomePage } from '@/types/content';
import { Rocket, Shield, Users, ArrowRight, X } from 'lucide-react';

// Icon mapping for features
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  rocket: Rocket,
  shield: Shield,
  users: Users,
  star: Rocket, // fallback
};

export default function PreviewPage({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = use(params);
  const [page, setPage] = useState<PageContent | null>(null);

  useEffect(() => {
    // Try to load from localStorage first
    const saved = localStorage.getItem(`p4p_page_${pageId}`);
    if (saved) {
      setPage(JSON.parse(saved));
    } else if (pageId === 'home') {
      setPage(sampleHomePage);
    } else {
      setPage({
        id: pageId,
        title: pageId.charAt(0).toUpperCase() + pageId.slice(1).replace(/-/g, ' '),
        slug: `/${pageId}`,
        status: 'draft',
        lastEdited: new Date().toISOString(),
        author: 'Admin',
        sections: []
      });
    }
  }, [pageId]);

  const renderSection = (section: PageSection, index: number) => {
    switch (section.type) {
      case 'hero':
        return (
          <section
            key={index}
            className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white py-24 px-8"
          >
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">{section.headline}</h1>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">{section.subheadline}</p>
              <a
                href={section.buttonLink}
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {section.buttonText}
                <ArrowRight size={20} />
              </a>
            </div>
          </section>
        );

      case 'text':
        return (
          <section key={index} className="py-16 px-8 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{section.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          </section>
        );

      case 'features':
        return (
          <section key={index} className="py-16 px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-orange-600 font-medium mb-2">{section.subtitle}</p>
                <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {section.features.map((feature, i) => {
                  const Icon = iconMap[feature.icon] || Rocket;
                  return (
                    <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                      <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                        <Icon size={28} className="text-orange-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );

      case 'cta':
        return (
          <section
            key={index}
            className="py-16 px-8"
            style={{ backgroundColor: section.backgroundColor }}
          >
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">{section.headline}</h2>
              <p className="text-xl text-white/80 mb-8">{section.subheadline}</p>
              <a
                href={section.buttonLink}
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {section.buttonText}
                <ArrowRight size={20} />
              </a>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Preview Banner */}
      <div className="bg-yellow-400 text-yellow-900 px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-4">
        <span>Preview Mode - This is how your page will look when published</span>
        <button
          onClick={() => window.close()}
          className="hover:bg-yellow-500 p-1 rounded transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Page Content */}
      {page.sections.length === 0 ? (
        <div className="flex items-center justify-center min-h-[80vh] text-gray-400">
          <div className="text-center">
            <p className="text-xl mb-2">No sections yet</p>
            <p>Add sections in the editor to see them here</p>
          </div>
        </div>
      ) : (
        page.sections.map((section, index) => renderSection(section, index))
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60">&copy; 2026 Partners 4 Prevention. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
