'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { FileJson, Clock, Edit3, Rocket, Loader2, Check, AlertCircle } from 'lucide-react';

interface ContentFile {
  filename: string;
  lastModified: string;
}

export default function ContentListPage() {
  const [contentFiles, setContentFiles] = useState<ContentFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [deploying, setDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [deployMessage, setDeployMessage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/power-hub/content');
      const data = await response.json();
      setContentFiles(data.files || []);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeploy = async () => {
    setDeploying(true);
    setDeployStatus('idle');
    setDeployMessage('');

    try {
      const response = await fetch('/api/power-hub/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commitMessage: 'Update content via Power Hub' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Deploy failed');
      }

      setDeployStatus('success');
      setDeployMessage(data.message || 'Deployed successfully!');
    } catch (error) {
      setDeployStatus('error');
      setDeployMessage(error instanceof Error ? error.message : 'Deploy failed');
    } finally {
      setDeploying(false);
    }
  };

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
      <Header title="Content" subtitle="Edit your website content" />

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
      {/* Deploy Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleDeploy}
          disabled={deploying}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 transition-all shadow-lg shadow-orange-500/20"
        >
          {deploying ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Deploying...
            </>
          ) : (
            <>
              <Rocket size={18} />
              Deploy Changes
            </>
          )}
        </button>
      </div>

      {/* Deploy Status */}
      {deployStatus === 'success' && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 mb-6">
          <Check size={20} />
          <span>{deployMessage}</span>
        </div>
      )}

      {deployStatus === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 mb-6">
          <AlertCircle size={20} />
          <span>{deployMessage}</span>
        </div>
      )}

      {/* Content Files */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileJson className="w-5 h-5 text-orange-500" />
            Content Files
          </h2>
          <p className="text-sm text-gray-500 mt-1">Click on a file to edit its content</p>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto" />
          </div>
        ) : contentFiles.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No content files found</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {contentFiles.map((file) => (
              <Link
                key={file.filename}
                href={`/power-hub/dashboard/content/${file.filename.replace('.json', '')}`}
                className="flex items-center justify-between p-5 hover:bg-orange-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                    <FileJson className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 capitalize">
                      {file.filename.replace('.json', '')} Page
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      Last edited: {formatTimeAgo(file.lastModified)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-orange-500">
                  <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Edit
                  </span>
                  <Edit3 className="w-5 h-5" />
                </div>
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
