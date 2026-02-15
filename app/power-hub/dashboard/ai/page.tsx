'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import {
  Sparkles,
  Send,
  Copy,
  Check,
  Wand2,
  FileText,
  Minimize2,
  Maximize2,
  Type,
  Target,
  Search,
  Briefcase,
  MessageCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface QuickAction {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  action: string;
  requiresContent: boolean;
}

const quickActions: QuickAction[] = [
  {
    id: 'improve',
    icon: Wand2,
    title: 'Improve Content',
    description: 'Make it more engaging & compelling',
    action: 'improve',
    requiresContent: true,
  },
  {
    id: 'shorten',
    icon: Minimize2,
    title: 'Shorten',
    description: 'Make it concise & punchy',
    action: 'shorten',
    requiresContent: true,
  },
  {
    id: 'expand',
    icon: Maximize2,
    title: 'Expand',
    description: 'Add more detail & depth',
    action: 'expand',
    requiresContent: true,
  },
  {
    id: 'headline',
    icon: Type,
    title: 'Generate Headlines',
    description: '5 attention-grabbing options',
    action: 'headline',
    requiresContent: false,
  },
  {
    id: 'cta',
    icon: Target,
    title: 'CTA Buttons',
    description: '5 compelling call-to-action texts',
    action: 'cta',
    requiresContent: false,
  },
  {
    id: 'seo',
    icon: Search,
    title: 'SEO Optimize',
    description: 'Make it search-engine friendly',
    action: 'seo',
    requiresContent: true,
  },
  {
    id: 'professional',
    icon: Briefcase,
    title: 'Professional Tone',
    description: 'Business-appropriate language',
    action: 'tone-professional',
    requiresContent: true,
  },
  {
    id: 'casual',
    icon: MessageCircle,
    title: 'Casual Tone',
    description: 'Friendly & conversational',
    action: 'tone-casual',
    requiresContent: true,
  },
  {
    id: 'grammar',
    icon: FileText,
    title: 'Fix Grammar',
    description: 'Correct spelling & punctuation',
    action: 'fix-grammar',
    requiresContent: true,
  },
];

export default function AIAssistPage() {
  const [content, setContent] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const callAI = async (action: string, prompt?: string) => {
    if (action !== 'headline' && action !== 'cta' && !content.trim()) {
      setError('Please enter some content first');
      return;
    }

    setLoading(true);
    setError('');
    setActiveAction(action);

    try {
      const response = await fetch('/api/power-hub/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          content: content.trim(),
          prompt: prompt || customPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      setOutput(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };

  const handleCustomSubmit = async () => {
    if (!customPrompt.trim() && !content.trim()) {
      setError('Please enter a prompt or some content');
      return;
    }
    await callAI('custom', customPrompt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const useOutput = () => {
    setContent(output);
    setOutput('');
  };

  return (
    <div>
      <Header title="AI Assist" subtitle="Powered by Claude AI - Generate and improve your content" />

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Input */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText size={20} />
                Your Content
              </h2>
              {content && (
                <span className="text-sm text-gray-500">
                  {content.length} characters
                </span>
              )}
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste or type your content here... (headlines, paragraphs, descriptions, etc.)"
              className="w-full h-48 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none text-base"
            />
          </div>

          {/* Custom Prompt */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles size={20} />
              Custom Request
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="E.g., 'Write a tagline for our coalition' or 'Make this sound more exciting'"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
              />
              <button
                onClick={handleCustomSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 transition-all"
              >
                {loading && activeAction === 'custom' ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                Generate
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* Output */}
          {output && (
            <div className="bg-white rounded-2xl border-2 border-orange-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Sparkles size={20} className="text-orange-500" />
                  AI Result
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={useOutput}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors text-orange-700"
                    title="Use this as input for further editing"
                  >
                    <Wand2 size={14} />
                    Use as Input
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={16} className="text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 whitespace-pre-wrap text-gray-800 leading-relaxed">
                {output}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                const isActive = loading && activeAction === action.action;
                const isDisabled = loading || (action.requiresContent && !content.trim());

                return (
                  <button
                    key={action.id}
                    onClick={() => callAI(action.action)}
                    disabled={isDisabled}
                    className={`w-full flex items-center gap-3 p-3 text-left rounded-lg transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : isDisabled
                        ? 'opacity-50 cursor-not-allowed bg-gray-50'
                        : 'hover:bg-orange-50'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-white/20' : 'bg-orange-100'
                      }`}
                    >
                      {isActive ? (
                        <Loader2 size={18} className="animate-spin text-white" />
                      ) : (
                        <Icon size={18} className={isActive ? 'text-white' : 'text-orange-600'} />
                      )}
                    </div>
                    <div>
                      <p className={`font-medium ${isActive ? 'text-white' : 'text-gray-900'}`}>
                        {action.title}
                      </p>
                      <p className={`text-xs ${isActive ? 'text-white/70' : 'text-gray-500'}`}>
                        {action.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
            <Sparkles size={24} className="mb-3" />
            <h3 className="font-semibold mb-2">Pro Tips</h3>
            <ul className="text-sm text-white/80 space-y-2">
              <li>• Paste existing content to improve it</li>
              <li>• Use "Generate Headlines" without content for new ideas</li>
              <li>• Chain actions: Improve → Shorten → SEO</li>
              <li>• Click "Use as Input" to keep refining</li>
            </ul>
          </div>

          {/* API Status */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-2 text-sm">API Status</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">Claude AI Connected</span>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}
