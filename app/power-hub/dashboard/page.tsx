'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { FileJson, Rocket, ExternalLink, Clock, Edit3, FileText, Image, Sparkles } from 'lucide-react';

interface ContentFile {
  filename: string;
  lastModified: string;
}

export default function PowerHubDashboardPage() {
  const [contentFiles, setContentFiles] = useState<ContentFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/power-hub/content')
      .then((res) => res.json())
      .then((data) => {
        setContentFiles(data.files || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' min ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
    return date.toLocaleDateString();
  };

  return (
    <div>
      <Header title="Dashboard" subtitle="Welcome to your Power Hub" />

      <div className="p-8">
        <div className="">
        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link
          href="/power-hub/dashboard/pages"
          className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
            <FileText className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-gray-900">Edit Pages</h3>
          <p className="text-sm text-gray-500 mt-1">Visual page editor with sections</p>
        </Link>

        <Link
          href="/power-hub/dashboard/content"
          className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
            <Edit3 className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-gray-900">Edit JSON Content</h3>
          <p className="text-sm text-gray-500 mt-1">Direct content file editing</p>
        </Link>

        <Link
          href="/power-hub/dashboard/ai"
          className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-500 transition-colors">
            <Sparkles className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-gray-900">AI Assist</h3>
          <p className="text-sm text-gray-500 mt-1">Generate and improve content</p>
        </Link>

        <Link
          href="/power-hub/dashboard/media"
          className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-4 group-hover:bg-pink-500 transition-colors">
            <Image className="w-6 h-6 text-pink-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-gray-900">Media Library</h3>
          <p className="text-sm text-gray-500 mt-1">Upload and manage images</p>
        </Link>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-4 group-hover:bg-cyan-500 transition-colors">
            <ExternalLink className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-gray-900">View Live Site</h3>
          <p className="text-sm text-gray-500 mt-1">See your website as visitors see it</p>
        </a>

        <Link
          href="/power-hub/dashboard/content?deploy=true"
          className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
            <Rocket className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-gray-900">Deploy Changes</h3>
          <p className="text-sm text-gray-500 mt-1">Publish your updates to the live site</p>
        </Link>
      </div>

      {/* Content Files */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileJson className="w-5 h-5 text-orange-500" />
            Content Files
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : contentFiles.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No content files found</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {contentFiles.map((file) => (
              <Link
                key={file.filename}
                href={`/power-hub/dashboard/content/${file.filename.replace('.json', '')}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <FileJson className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {file.filename.replace('.json', '')}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(file.lastModified)}
                    </p>
                  </div>
                </div>
                <Edit3 className="w-5 h-5 text-gray-400" />
              </Link>
            ))}
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
  );
}
