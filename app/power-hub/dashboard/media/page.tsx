'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import { Upload, Grid, List, Search, Trash2, Download, X, Check, Copy, Loader2 } from 'lucide-react';

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size: string;
  sizeBytes: number;
  uploaded: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return Math.floor(seconds / 60) + ' minutes ago';
  if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
  if (seconds < 604800) return Math.floor(seconds / 86400) + ' days ago';
  return date.toLocaleDateString();
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load media from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('p4p_power_hub_media');
    if (saved) {
      setMedia(JSON.parse(saved));
    }
  }, []);

  // Save media to localStorage whenever it changes
  useEffect(() => {
    if (media.length > 0) {
      localStorage.setItem('p4p_power_hub_media', JSON.stringify(media));
    }
  }, [media]);

  const handleFiles = useCallback(async (files: FileList) => {
    setUploading(true);
    const newFiles: MediaFile[] = [];
    const progressNames: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image. Only images are allowed.`);
        continue;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum size is 10MB.`);
        continue;
      }

      progressNames.push(file.name);
      setUploadProgress([...progressNames]);

      try {
        // Try to upload to Vercel Blob API
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/power-hub/upload', {
          method: 'POST',
          body: formData,
        });

        let url: string;

        if (response.ok) {
          const data = await response.json();
          url = data.url;
        } else {
          // Fallback: Convert to data URL for local preview
          url = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
        }

        const newFile: MediaFile = {
          id: Date.now().toString() + '-' + i,
          name: file.name,
          type: 'image',
          url,
          size: formatFileSize(file.size),
          sizeBytes: file.size,
          uploaded: new Date().toISOString(),
        };

        newFiles.push(newFile);
      } catch (error) {
        console.error('Upload error:', error);

        // Fallback to data URL
        const url = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        const newFile: MediaFile = {
          id: Date.now().toString() + '-' + i,
          name: file.name,
          type: 'image',
          url,
          size: formatFileSize(file.size),
          sizeBytes: file.size,
          uploaded: new Date().toISOString(),
        };

        newFiles.push(newFile);
      }
    }

    setMedia((prev) => [...newFiles, ...prev]);
    setUploading(false);
    setUploadProgress([]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    setMedia((prev) => prev.filter((f) => !selectedFiles.includes(f.id)));
    setSelectedFiles([]);
    const remaining = media.filter((f) => !selectedFiles.includes(f.id));
    localStorage.setItem('p4p_power_hub_media', JSON.stringify(remaining));
  };

  const deleteFile = (id: string) => {
    setMedia((prev) => prev.filter((f) => f.id !== id));
    const remaining = media.filter((f) => f.id !== id);
    localStorage.setItem('p4p_power_hub_media', JSON.stringify(remaining));
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const filteredMedia = media.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header title="Media Library" subtitle="Upload and manage your images and files" />

      <div className="p-8">
        <div className="">
      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 transition-all"
            disabled={uploading}
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
          {selectedFiles.length > 0 && (
            <button
              onClick={deleteSelected}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <Trash2 size={18} />
              Delete ({selectedFiles.length})
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 w-64"
            />
          </div>

          {/* View toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {uploadProgress.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-700 font-medium mb-2">Uploading files...</p>
          {uploadProgress.map((name, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-blue-600">
              <Loader2 size={14} className="animate-spin" />
              {name}
            </div>
          ))}
        </div>
      )}

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-orange-500 bg-orange-50'
            : 'border-gray-300 hover:border-orange-500 hover:bg-orange-50/50'
        }`}
      >
        <Upload size={40} className={`mx-auto mb-4 ${isDragging ? 'text-orange-500' : 'text-gray-400'}`} />
        <p className="text-gray-600 font-medium">
          {isDragging ? 'Drop files here!' : 'Drag and drop files here'}
        </p>
        <p className="text-sm text-gray-400 mt-1">or click to browse • Max 10MB per file</p>
      </div>

      {/* Empty State */}
      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <Upload size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">
            {searchQuery ? 'No files match your search' : 'No files uploaded yet'}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {searchQuery ? 'Try a different search term' : 'Upload some images to get started'}
          </p>
        </div>
      )}

      {/* Media Grid */}
      {viewMode === 'grid' && filteredMedia.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredMedia.map((file) => (
            <div
              key={file.id}
              className={`bg-white rounded-xl border border-gray-200 p-2 cursor-pointer transition-all group ${
                selectedFiles.includes(file.id)
                  ? 'ring-2 ring-orange-500 bg-orange-50'
                  : 'hover:shadow-lg'
              }`}
            >
              <div
                onClick={() => toggleSelect(file.id)}
                className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 mb-2"
              >
                <Image
                  src={file.url}
                  alt={file.name}
                  fill
                  className="object-cover"
                  unoptimized={file.url.startsWith('data:')}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyUrl(file.url);
                    }}
                    className="p-2 bg-white rounded-lg hover:bg-gray-100"
                    title="Copy URL"
                  >
                    {copiedUrl === file.url ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFile(file.id);
                    }}
                    className="p-2 bg-white rounded-lg hover:bg-red-100"
                    title="Delete"
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
        <div className="bg-white rounded-2xl border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">File</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Size</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Uploaded</th>
                <th className="text-right py-4 px-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedia.map((file) => (
                <tr
                  key={file.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={file.url}
                          alt={file.name}
                          fill
                          className="object-cover"
                          unoptimized={file.url.startsWith('data:')}
                        />
                      </div>
                      <span className="font-medium">{file.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-500">{file.size}</td>
                  <td className="py-4 px-4 text-gray-500">{formatTimeAgo(file.uploaded)}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => copyUrl(file.url)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Copy URL"
                      >
                        {copiedUrl === file.url ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <Copy size={16} className="text-gray-600" />
                        )}
                      </button>
                      <a
                        href={file.url}
                        download={file.name}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download size={16} className="text-gray-600" />
                      </a>
                      <button
                        onClick={() => deleteFile(file.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats */}
      {media.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500">
          {media.length} file{media.length !== 1 ? 's' : ''} •{' '}
          {formatFileSize(media.reduce((acc, f) => acc + f.sizeBytes, 0))} total
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
