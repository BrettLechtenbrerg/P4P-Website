'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import SectionEditor from '@/components/editors/SectionEditor';
import { PageContent, PageSection, sampleHomePage } from '@/types/content';
import {
  ArrowLeft,
  Save,
  Eye,
  Rocket,
  Plus,
  Layout,
  Type,
  Star,
  Megaphone,
  Check
} from 'lucide-react';

const sectionTypes = [
  { type: 'hero', label: 'Hero Section', icon: Layout },
  { type: 'text', label: 'Text Section', icon: Type },
  { type: 'features', label: 'Features', icon: Star },
  { type: 'cta', label: 'Call to Action', icon: Megaphone },
];

export default function EditPage({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = use(params);
  const router = useRouter();

  const [page, setPage] = useState<PageContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);

  useEffect(() => {
    // Load page data
    if (pageId === 'home') {
      setPage(sampleHomePage);
    } else {
      // Create empty page for other IDs
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

  const handleSave = async (publish = false) => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (page) {
      const updatedPage = {
        ...page,
        status: publish ? 'published' : page.status,
        lastEdited: new Date().toISOString()
      };
      setPage(updatedPage as PageContent);

      // Save to localStorage
      localStorage.setItem(`p4p_page_${pageId}`, JSON.stringify(updatedPage));
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSection = (index: number, section: PageSection) => {
    if (!page) return;
    const newSections = [...page.sections];
    newSections[index] = section;
    setPage({ ...page, sections: newSections });
  };

  const deleteSection = (index: number) => {
    if (!page) return;
    const newSections = page.sections.filter((_, i) => i !== index);
    setPage({ ...page, sections: newSections });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (!page) return;
    const newSections = [...page.sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setPage({ ...page, sections: newSections });
  };

  const addSection = (type: string) => {
    if (!page) return;

    let newSection: PageSection;

    switch (type) {
      case 'hero':
        newSection = {
          type: 'hero',
          headline: 'Your Headline Here',
          subheadline: 'Add a compelling subheadline',
          buttonText: 'Get Started',
          buttonLink: '/contact',
          backgroundImage: { url: '', alt: '' }
        };
        break;
      case 'text':
        newSection = {
          type: 'text',
          title: 'Section Title',
          content: 'Add your content here...'
        };
        break;
      case 'features':
        newSection = {
          type: 'features',
          title: 'Our Features',
          subtitle: 'What makes us different',
          features: [
            { icon: 'star', title: 'Feature 1', description: 'Description here' },
            { icon: 'star', title: 'Feature 2', description: 'Description here' },
            { icon: 'star', title: 'Feature 3', description: 'Description here' }
          ]
        };
        break;
      case 'cta':
        newSection = {
          type: 'cta',
          headline: 'Ready to Get Started?',
          subheadline: 'Contact us today',
          buttonText: 'Contact Us',
          buttonLink: '/contact',
          backgroundColor: '#EA580C'
        };
        break;
      default:
        return;
    }

    setPage({ ...page, sections: [...page.sections, newSection] });
    setShowAddSection(false);
  };

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/power-hub/dashboard/pages')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Editing: {page.title}</h1>
              <p className="text-sm text-gray-500">
                {page.status === 'published' ? (
                  <span className="text-green-600">Published</span>
                ) : (
                  <span className="text-yellow-600">Draft</span>
                )}
                {' · '}Last saved: {new Date(page.lastEdited).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open(`/power-hub/preview/${pageId}`, '_blank')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye size={18} />
              Preview
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {saved ? <Check size={18} className="text-green-600" /> : <Save size={18} />}
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Draft'}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 transition-all"
            >
              <Rocket size={18} />
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Page Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Page Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
              <input
                type="text"
                value={page.title}
                onChange={(e) => setPage({ ...page, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug</label>
              <input
                type="text"
                value={page.slug}
                onChange={(e) => setPage({ ...page, slug: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Page Sections</h2>

          {page.sections.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <Layout size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">No sections yet. Add your first section to get started.</p>
              <button
                onClick={() => setShowAddSection(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all"
              >
                <Plus size={18} />
                Add Section
              </button>
            </div>
          ) : (
            <>
              {page.sections.map((section, index) => (
                <SectionEditor
                  key={index}
                  section={section}
                  index={index}
                  onUpdate={updateSection}
                  onDelete={deleteSection}
                  onMoveUp={() => moveSection(index, 'up')}
                  onMoveDown={() => moveSection(index, 'down')}
                  isFirst={index === 0}
                  isLast={index === page.sections.length - 1}
                />
              ))}
            </>
          )}
        </div>

        {/* Add Section Button */}
        {page.sections.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowAddSection(!showAddSection)}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add New Section
            </button>

            {/* Add Section Dropdown */}
            {showAddSection && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-10">
                <p className="text-sm font-medium text-gray-500 mb-3">Choose a section type:</p>
                <div className="grid grid-cols-2 gap-3">
                  {sectionTypes.map((sectionType) => {
                    const Icon = sectionType.icon;
                    return (
                      <button
                        key={sectionType.type}
                        onClick={() => addSection(sectionType.type)}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all text-left"
                      >
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Icon size={18} className="text-orange-600" />
                        </div>
                        <span className="font-medium">{sectionType.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
