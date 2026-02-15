'use client';

import Header from '@/components/Header';
import { ExternalLink, Github, Globe, Info } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div>
      <Header title="Settings" subtitle="Site information and configuration" />

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
      {/* Site Info */}
      <div className="bg-white rounded-2xl border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Info className="w-5 h-5 text-orange-500" />
            Site Information
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Site Name</p>
              <p className="text-sm text-gray-500">Partners 4 Prevention</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Live URL</p>
              <p className="text-sm text-gray-500">p4p-website.vercel.app</p>
            </div>
            <a
              href="https://p4p-website.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <ExternalLink size={16} />
              Visit
            </a>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">GitHub Repository</p>
              <p className="text-sm text-gray-500">BrettLechtenbrerg/P4P-Website</p>
            </div>
            <a
              href="https://github.com/BrettLechtenbrerg/P4P-Website"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Github size={16} />
              View
            </a>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-orange-500" />
            Quick Links
          </h2>
        </div>
        <div className="p-6 grid sm:grid-cols-2 gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-orange-50 rounded-xl transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
              <Globe className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Homepage</p>
              <p className="text-sm text-gray-500">View the main page</p>
            </div>
          </a>
          <a
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-orange-50 rounded-xl transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
              <Globe className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="font-medium text-gray-900">About Page</p>
              <p className="text-sm text-gray-500">View the about page</p>
            </div>
          </a>
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-orange-50 rounded-xl transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
              <Globe className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Contact Page</p>
              <p className="text-sm text-gray-500">View the contact page</p>
            </div>
          </a>
          <a
            href="/team"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-orange-50 rounded-xl transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
              <Globe className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Team Page</p>
              <p className="text-sm text-gray-500">View the team page</p>
            </div>
          </a>
        </div>
      </div>

      {/* Power Hub Info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Power Hub v2.0</p>
        <p className="mt-1">Full feature parity with TSAI Power Hub</p>
      </div>
        </div>
      </div>
    </div>
  );
}
