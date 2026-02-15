'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { FileText, Plus, Edit2, Eye, Trash2, MoreVertical, Check, Clock } from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  lastEdited: string;
  author: string;
}

const mockPages: Page[] = [
  { id: 'home', title: 'Home', slug: '/', status: 'published', lastEdited: '2 hours ago', author: 'Admin' },
  { id: 'about', title: 'About Us', slug: '/about', status: 'published', lastEdited: '1 day ago', author: 'Admin' },
  { id: 'team', title: 'Our Team', slug: '/team', status: 'published', lastEdited: '3 days ago', author: 'Admin' },
  { id: 'get-involved', title: 'Get Involved', slug: '/get-involved', status: 'draft', lastEdited: '1 week ago', author: 'Admin' },
  { id: 'events', title: 'Events', slug: '/events', status: 'published', lastEdited: '2 weeks ago', author: 'Admin' },
];

export default function PagesPage() {
  const router = useRouter();
  const [pages] = useState<Page[]>(mockPages);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const handleEdit = (pageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/power-hub/dashboard/pages/edit/${pageId}`);
  };

  const handlePreview = (pageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`/power-hub/preview/${pageId}`, '_blank');
  };

  return (
    <div>
      <Header title="Pages" subtitle="Manage your website pages and content" />

      <div className="p-8">
        <div className="">
      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/power-hub/dashboard/pages/edit/new')}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            <Plus size={18} />
            New Page
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {pages.length} pages total
        </div>
      </div>

      {/* Pages List */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Page</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">URL</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Last Edited</th>
              <th className="text-right py-4 px-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr
                key={page.id}
                className={`border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer ${
                  selectedPage === page.id ? 'bg-orange-50' : ''
                }`}
                onClick={() => router.push(`/power-hub/dashboard/pages/edit/${page.id}`)}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <FileText size={18} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{page.title}</p>
                      <p className="text-sm text-gray-500">by {page.author}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">{page.slug}</code>
                </td>
                <td className="py-4 px-4">
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
                <td className="py-4 px-4 text-sm text-gray-500">{page.lastEdited}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => handleEdit(page.id, e)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} className="text-gray-600" />
                    </button>
                    <button
                      onClick={(e) => handlePreview(page.id, e)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Preview"
                    >
                      <Eye size={16} className="text-gray-600" />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical size={16} className="text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
      </div>
    </div>
  );
}
