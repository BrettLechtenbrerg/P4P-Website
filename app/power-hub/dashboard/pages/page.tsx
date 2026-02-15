'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/power-hub/Header';
import { FileText, Plus, Edit2, Eye, Clock, Check } from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  lastEdited: string;
}

const pages: Page[] = [
  { id: 'home', title: 'Home', slug: '/', status: 'published', lastEdited: '2 hours ago' },
  { id: 'about', title: 'About Us', slug: '/about', status: 'published', lastEdited: '1 day ago' },
  { id: 'team', title: 'Our Team', slug: '/team', status: 'published', lastEdited: '3 days ago' },
  { id: 'events', title: 'Events', slug: '/events', status: 'published', lastEdited: '1 week ago' },
  { id: 'contact', title: 'Contact', slug: '/contact', status: 'published', lastEdited: '2 weeks ago' },
];

export default function PagesPage() {
  const router = useRouter();

  return (
    <div>
      <Header title="Pages" subtitle="Manage your website pages" />

      <div className="p-8">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500">{pages.length} pages total</p>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#EA580C] text-white rounded-lg hover:bg-[#F97316] transition-colors">
            <Plus size={18} />
            New Page
          </button>
        </div>

        {/* Pages List */}
        <div className="bg-white rounded-xl border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Page</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">URL</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Last Edited</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr
                  key={page.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#EA580C]/10 rounded-lg flex items-center justify-center">
                        <FileText size={18} className="text-[#EA580C]" />
                      </div>
                      <span className="font-medium text-gray-900">{page.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{page.slug}</code>
                  </td>
                  <td className="py-4 px-6">
                    {page.status === 'published' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        <Check size={14} />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                        <Clock size={14} />
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">{page.lastEdited}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/power-hub/dashboard/pages/edit/${page.id}`)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} className="text-gray-600" />
                      </button>
                      <a
                        href={page.slug}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye size={16} className="text-gray-600" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
