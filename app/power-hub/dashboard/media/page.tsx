'use client';

import { useState, useRef, useCallback } from 'react';
import Header from '@/components/power-hub/Header';
import { Upload, Grid, List, Search, Trash2, Copy, Check, Loader2 } from 'lucide-react';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: string;
  uploaded: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList) => {
    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith('image/')) {
        continue;
      }

      const url = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const newFile: MediaFile = {
        id: Date.now().toString() + '-' + i,
        name: file.name,
        url,
        size: (file.size / 1024).toFixed(1) + ' KB',
        uploaded: 'Just now',
      };

      setMedia((prev) => [newFile, ...prev]);
    }

    setUploading(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const deleteFile = (id: string) => {
    setMedia((prev) => prev.filter((f) => f.id !== id));
  };

  const filteredMedia = media.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header title="Media Library" subtitle="Upload and manage your images" />

      <div className="p-8">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 bg-[#F27A21] text-white rounded-lg hover:bg-[#F9A45A] transition-colors disabled:opacity-50"
            >
              {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
              {uploading ? 'Uploading...' : 'Upload Files'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21] w-64"
              />
            </div>

            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-all cursor-pointer ${
            isDragging ? 'border-[#F27A21] bg-[#F27A21]/5' : 'border-gray-300 hover:border-[#F27A21]'
          }`}
        >
          <Upload size={40} className={`mx-auto mb-4 ${isDragging ? 'text-[#F27A21]' : 'text-gray-400'}`} />
          <p className="text-gray-600 font-medium">
            {isDragging ? 'Drop files here!' : 'Drag and drop files here'}
          </p>
          <p className="text-sm text-gray-400 mt-1">or click to browse</p>
        </div>

        {/* Empty State */}
        {filteredMedia.length === 0 && (
          <div className="text-center py-12">
            <Upload size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">
              {searchQuery ? 'No files match your search' : 'No files uploaded yet'}
            </p>
          </div>
        )}

        {/* Media Grid */}
        {viewMode === 'grid' && filteredMedia.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredMedia.map((file) => (
              <div key={file.id} className="bg-white rounded-xl border border-gray-200 p-2 group">
                <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 mb-2">
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => copyUrl(file.url)}
                      className="p-2 bg-white rounded-lg hover:bg-gray-100"
                    >
                      {copiedUrl === file.url ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    </button>
                    <button
                      onClick={() => deleteFile(file.id)}
                      className="p-2 bg-white rounded-lg hover:bg-red-100"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{file.size}</p>
              </div>
            ))}
          </div>
        )}

        {/* Media List */}
        {viewMode === 'list' && filteredMedia.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200">
            {filteredMedia.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <img src={file.url} alt={file.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.size} - {file.uploaded}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => copyUrl(file.url)} className="p-2 hover:bg-gray-100 rounded-lg">
                    {copiedUrl === file.url ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                  </button>
                  <button onClick={() => deleteFile(file.id)} className="p-2 hover:bg-red-100 rounded-lg">
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
