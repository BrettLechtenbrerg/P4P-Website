'use client';

import { useState } from 'react';
import { PageSection } from '@/types/content';
import {
  Type,
  Image as ImageIcon,
  Layout,
  Star,
  Megaphone,
  ChevronDown,
  ChevronUp,
  Trash2,
  GripVertical,
} from 'lucide-react';

interface SectionEditorProps {
  section: PageSection;
  index: number;
  onUpdate: (index: number, section: PageSection) => void;
  onDelete: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
}

const sectionIcons: Record<string, typeof Type> = {
  hero: Layout,
  text: Type,
  'image-text': ImageIcon,
  features: Star,
  cta: Megaphone,
  testimonials: Star,
};

const sectionLabels: Record<string, string> = {
  hero: 'Hero Section',
  text: 'Text Section',
  'image-text': 'Image & Text',
  features: 'Features',
  cta: 'Call to Action',
  testimonials: 'Testimonials',
};

export default function SectionEditor({
  section,
  index,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: SectionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const Icon = sectionIcons[section.type] || Type;

  const updateField = (field: string, value: string) => {
    onUpdate(index, { ...section, [field]: value } as PageSection);
  };

  const renderFields = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
              <input
                type="text"
                value={section.headline}
                onChange={(e) => updateField('headline', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
              <textarea
                value={section.subheadline}
                onChange={(e) => updateField('subheadline', e.target.value)}
                rows={2}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21] resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <input
                  type="text"
                  value={section.buttonText}
                  onChange={(e) => updateField('buttonText', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                <input
                  type="text"
                  value={section.buttonLink}
                  onChange={(e) => updateField('buttonLink', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <ImageIcon size={24} className="text-gray-400" />
                </div>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  Change Image
                </button>
              </div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={section.content}
                onChange={(e) => updateField('content', e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21] resize-none"
              />
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={section.subtitle}
                onChange={(e) => updateField('subtitle', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Features</label>
              <div className="space-y-3">
                {section.features.map((feature, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-3">
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => {
                        const newFeatures = [...section.features];
                        newFeatures[i] = { ...feature, title: e.target.value };
                        onUpdate(index, { ...section, features: newFeatures });
                      }}
                      placeholder="Feature title"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20"
                    />
                    <textarea
                      value={feature.description}
                      onChange={(e) => {
                        const newFeatures = [...section.features];
                        newFeatures[i] = { ...feature, description: e.target.value };
                        onUpdate(index, { ...section, features: newFeatures });
                      }}
                      placeholder="Feature description"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
              <input
                type="text"
                value={section.headline}
                onChange={(e) => updateField('headline', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
              <input
                type="text"
                value={section.subheadline}
                onChange={(e) => updateField('subheadline', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <input
                  type="text"
                  value={section.buttonText}
                  onChange={(e) => updateField('buttonText', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                <input
                  type="text"
                  value={section.buttonLink}
                  onChange={(e) => updateField('buttonLink', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21]"
                />
              </div>
            </div>
          </div>
        );

      default:
        return <p className="text-gray-500">Editor not available for this section type.</p>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button className="cursor-grab text-gray-400 hover:text-gray-600">
            <GripVertical size={20} />
          </button>
          <div className="w-10 h-10 bg-[#F27A21]/10 rounded-lg flex items-center justify-center">
            <Icon size={18} className="text-[#F27A21]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{sectionLabels[section.type]}</h3>
            <p className="text-xs text-gray-500">Section {index + 1}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onMoveUp(index)}
            disabled={isFirst}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronUp size={18} />
          </button>
          <button
            onClick={() => onMoveDown(index)}
            disabled={isLast}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronDown size={18} />
          </button>
          <button
            onClick={() => onDelete(index)}
            className="p-2 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Section Content */}
      {isExpanded && (
        <div className="pt-4">
          {renderFields()}
        </div>
      )}
    </div>
  );
}
