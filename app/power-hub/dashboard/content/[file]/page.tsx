'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import {
  ArrowLeft,
  Save,
  Loader2,
  Check,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Rocket
} from 'lucide-react';

// Recursive JSON editor component
function JsonEditor({
  data,
  path = [],
  onChange,
  level = 0,
}: {
  data: unknown;
  path: (string | number)[];
  onChange: (path: (string | number)[], value: unknown) => void;
  level?: number;
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  if (data === null || data === undefined) {
    return (
      <input
        type="text"
        value=""
        placeholder="null"
        onChange={(e) => onChange(path, e.target.value || null)}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-full focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
      />
    );
  }

  if (typeof data === 'string') {
    if (data.length > 100 || data.includes('\n')) {
      return (
        <textarea
          value={data}
          onChange={(e) => onChange(path, e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-full min-h-[80px] resize-y focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          rows={3}
        />
      );
    }
    return (
      <input
        type="text"
        value={data}
        onChange={(e) => onChange(path, e.target.value)}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-full focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
      />
    );
  }

  if (typeof data === 'number') {
    return (
      <input
        type="text"
        value={data}
        onChange={(e) => onChange(path, e.target.value)}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-32 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
      />
    );
  }

  if (typeof data === 'boolean') {
    return (
      <button
        onClick={() => onChange(path, !data)}
        className={`px-3 py-2 rounded-lg text-sm font-medium ${
          data
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {data ? 'true' : 'false'}
      </button>
    );
  }

  if (Array.isArray(data)) {
    const key = path.join('.');
    const isCollapsed = collapsed[key];

    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setCollapsed({ ...collapsed, [key]: !isCollapsed })}
          className="w-full flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-left text-sm font-medium"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
          Array ({data.length} items)
        </button>
        {!isCollapsed && (
          <div className="p-3 space-y-3 bg-white">
            {data.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-xs font-mono text-gray-400 pt-2">[{index}]</span>
                <div className="flex-1">
                  <JsonEditor
                    data={item}
                    path={[...path, index]}
                    onChange={onChange}
                    level={level + 1}
                  />
                </div>
                <button
                  onClick={() => {
                    const newArray = [...data];
                    newArray.splice(index, 1);
                    onChange(path, newArray);
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newItem = typeof data[0] === 'object' ? { ...data[0] } : '';
                onChange(path, [...data, newItem]);
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-lg w-full"
            >
              <Plus size={14} />
              Add Item
            </button>
          </div>
        )}
      </div>
    );
  }

  if (typeof data === 'object') {
    const entries = Object.entries(data as Record<string, unknown>);
    const key = path.join('.');
    const isCollapsed = collapsed[key];

    return (
      <div className={`border border-gray-200 rounded-lg overflow-hidden ${level > 0 ? 'bg-white' : ''}`}>
        {level > 0 && (
          <button
            onClick={() => setCollapsed({ ...collapsed, [key]: !isCollapsed })}
            className="w-full flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-left text-sm font-medium"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
            Object ({entries.length} fields)
          </button>
        )}
        {(!isCollapsed || level === 0) && (
          <div className={level > 0 ? 'p-3' : ''}>
            {entries.map(([entryKey, value]) => (
              <div
                key={entryKey}
                className={`${level === 0 ? 'p-4 border-b border-gray-100 last:border-0' : 'mb-3 last:mb-0'}`}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {entryKey.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}
                </label>
                <JsonEditor
                  data={value}
                  path={[...path, entryKey]}
                  onChange={onChange}
                  level={level + 1}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return <span className="text-gray-400">Unknown type</span>;
}

export default function EditContentPage({
  params,
}: {
  params: Promise<{ file: string }>;
}) {
  const { file } = use(params);
  const router = useRouter();
  const filename = `${file}.json`;

  const [content, setContent] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [file]);

  const fetchContent = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/power-hub/content?file=${filename}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch content');
      }

      setContent(data.content);
      setHasChanges(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (path: (string | number)[], value: unknown) => {
    if (!content) return;

    const newContent = JSON.parse(JSON.stringify(content));
    let current = newContent;

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }

    current[path[path.length - 1]] = value;
    setContent(newContent);
    setHasChanges(true);
    setSaved(false);
  };

  const handleSave = async () => {
    if (!content) return;

    setSaving(true);
    setError('');

    try {
      const response = await fetch('/api/power-hub/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save');
      }

      setSaved(true);
      setHasChanges(false);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDeploy = async () => {
    setDeploying(true);
    setError('');

    try {
      const response = await fetch('/api/power-hub/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commitMessage: `Update ${file} content` }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Deploy failed');
      }

      setDeployed(true);
      setTimeout(() => setDeployed(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deploy failed');
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div>
      <Header title={`Edit ${file}`} subtitle="Edit content for this page" />

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push('/power-hub/dashboard/content')}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Content
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              saved
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50'
            }`}
          >
            {saving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : saved ? (
              <Check size={18} />
            ) : (
              <Save size={18} />
            )}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
          </button>

          <button
            onClick={handleDeploy}
            disabled={deploying || hasChanges}
            title={hasChanges ? 'Save changes first' : 'Deploy to live site'}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-medium transition-all ${
              deployed
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 disabled:opacity-50'
            } shadow-lg shadow-orange-500/20`}
          >
            {deploying ? (
              <Loader2 size={18} className="animate-spin" />
            ) : deployed ? (
              <Check size={18} />
            ) : (
              <Rocket size={18} />
            )}
            {deploying ? 'Deploying...' : deployed ? 'Deployed!' : 'Deploy'}
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 mb-6">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {hasChanges && !saved && (
        <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 mb-6">
          <AlertCircle size={20} />
          <span>You have unsaved changes</span>
        </div>
      )}

      {deployed && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 mb-6">
          <Check size={20} />
          <span>Changes deployed successfully! Your live site will update shortly.</span>
        </div>
      )}

      {/* Content Editor */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-orange-500" />
        </div>
      ) : content ? (
        <div className="bg-white rounded-2xl border border-gray-200">
          <JsonEditor data={content} path={[]} onChange={handleChange} />
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          Content not found
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
