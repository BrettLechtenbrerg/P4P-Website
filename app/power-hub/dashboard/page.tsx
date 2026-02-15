'use client';

import Header from '@/components/power-hub/Header';
import Link from 'next/link';
import { FileText, Image, Sparkles, Settings, TrendingUp, Clock, ExternalLink } from 'lucide-react';

const stats = [
  { name: 'Total Pages', value: '5', icon: FileText, change: 'Active' },
  { name: 'Media Files', value: '0', icon: Image, change: 'Upload images' },
  { name: 'AI Assists', value: '0', icon: Sparkles, change: 'Try AI writing' },
];

const quickActions = [
  { name: 'Edit Pages', href: '/power-hub/dashboard/pages', icon: FileText, color: 'bg-blue-500' },
  { name: 'Upload Media', href: '/power-hub/dashboard/media', icon: Image, color: 'bg-purple-500' },
  { name: 'AI Assist', href: '/power-hub/dashboard/ai', icon: Sparkles, color: 'bg-green-500' },
  { name: 'Settings', href: '/power-hub/dashboard/settings', icon: Settings, color: 'bg-gray-500' },
];

export default function Dashboard() {
  return (
    <div>
      <Header title="Dashboard" subtitle="Welcome to your Power Hub" />

      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-xs text-[#EA580C] mt-2 flex items-center gap-1">
                      <TrendingUp size={12} />
                      {stat.change}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#EA580C]/10 rounded-xl flex items-center justify-center">
                    <Icon className="text-[#EA580C]" size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                href={action.href}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#EA580C] hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900">{action.name}</h3>
              </Link>
            );
          })}
        </div>

        {/* View Live Site */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Partners 4 Prevention Website</h2>
              <p className="text-gray-500 mt-1">View your live website</p>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#EA580C] text-white rounded-lg hover:bg-[#F97316] transition-colors"
            >
              <ExternalLink size={18} />
              View Live Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
