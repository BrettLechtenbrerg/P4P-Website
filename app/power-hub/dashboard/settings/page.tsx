'use client';

import { useState } from 'react';
import Header from '@/components/power-hub/Header';
import { Save, Globe, Palette, Bell, Shield, Key } from 'lucide-react';

export default function SettingsPage() {
  const [siteName, setSiteName] = useState('Partners 4 Prevention');
  const [siteUrl, setSiteUrl] = useState('https://p4p-website.vercel.app');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  return (
    <div>
      <Header title="Settings" subtitle="Configure your Power Hub settings" />

      <div className="p-8">
        <div className="space-y-6">
          {/* Site Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#F27A21]/10 rounded-lg flex items-center justify-center">
                <Globe size={20} className="text-[#F27A21]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Site Settings</h2>
                <p className="text-sm text-gray-500">Basic configuration for your website</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site URL
                </label>
                <input
                  type="url"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#F27A21]/10 rounded-lg flex items-center justify-center">
                <Palette size={20} className="text-[#F27A21]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
                <p className="text-sm text-gray-500">Customize the look and feel</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    defaultValue="#F27A21"
                    className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    defaultValue="#F27A21"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#F27A21]/10 rounded-lg flex items-center justify-center">
                <Bell size={20} className="text-[#F27A21]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-500">Manage your notification preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                <span className="font-medium">Email notifications for published changes</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#F27A21]" />
              </label>
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                <span className="font-medium">Weekly activity summary</span>
                <input type="checkbox" className="w-5 h-5 accent-[#F27A21]" />
              </label>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#F27A21]/10 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-[#F27A21]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Security</h2>
                <p className="text-sm text-gray-500">Manage access and security settings</p>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-[#F27A21] hover:text-white rounded-lg transition-all">
              <Key size={18} />
              Change Password
            </button>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-[#F27A21] text-white rounded-lg hover:bg-[#F9A45A] transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
