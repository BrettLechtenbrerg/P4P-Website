'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/power-hub/Header';
import { Sparkles, FileText, Zap, Copy, Check, Loader2, Key, Eye, EyeOff } from 'lucide-react';

const quickActions = [
  { name: 'Improve', prompt: 'Improve this content to be more engaging and professional' },
  { name: 'Shorten', prompt: 'Make this content more concise while keeping key points' },
  { name: 'Expand', prompt: 'Expand this content with more details and examples' },
  { name: 'Headlines', prompt: 'Generate 5 compelling headline options for this content' },
  { name: 'CTA', prompt: 'Create a strong call-to-action for this content' },
  { name: 'Professional', prompt: 'Rewrite this in a professional, formal tone' },
  { name: 'Casual', prompt: 'Rewrite this in a friendly, casual tone' },
  { name: 'Fix Grammar', prompt: 'Fix any grammar and spelling errors in this content' },
];

type AIProvider = 'claude' | 'openai';

export default function AIAssistPage() {
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // API Key state
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<AIProvider>('claude');
  const [showApiKey, setShowApiKey] = useState(false);
  const [keySaved, setKeySaved] = useState(false);

  // Load saved API key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('ai_api_key');
    const savedProvider = localStorage.getItem('ai_provider') as AIProvider;
    if (savedKey) {
      setApiKey(savedKey);
      setKeySaved(true);
    }
    if (savedProvider) {
      setProvider(savedProvider);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('ai_api_key', apiKey);
      localStorage.setItem('ai_provider', provider);
      setKeySaved(true);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('ai_api_key');
    localStorage.removeItem('ai_provider');
    setApiKey('');
    setKeySaved(false);
  };

  const handleGenerate = async (customPrompt?: string) => {
    if (!content.trim()) return;

    setLoading(true);
    setOutput('');

    const usedPrompt = customPrompt || prompt;

    // If no API key, show demo response
    if (!apiKey.trim()) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOutput(`[Demo Mode - No API Key]\n\nTo get real AI responses, add your API key above.\n\nYour prompt: "${usedPrompt}"\nYour content: "${content.substring(0, 100)}..."\n\n---\nAdd a Claude or OpenAI API key to enable real AI-powered content generation.`);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/power-hub/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          prompt: usedPrompt,
          apiKey,
          provider,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setOutput(`Error: ${data.error || 'Failed to generate content'}`);
      } else {
        setOutput(data.result);
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Failed to connect to AI service'}`);
    }

    setLoading(false);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const useAsInput = () => {
    setContent(output);
    setOutput('');
  };

  return (
    <div>
      <Header title="AI Assist" subtitle="Generate and improve your content with AI" />

      <div className="p-8">
        {/* API Key Section - Prominent at top */}
        <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Key size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">AI API Key</h2>
              <p className="text-sm text-gray-600">Enter your API key to enable AI-powered content generation</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Provider Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AI Provider</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setProvider('claude')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    provider === 'claude'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-400'
                  }`}
                >
                  🟣 Claude (Anthropic)
                </button>
                <button
                  onClick={() => setProvider('openai')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    provider === 'openai'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-green-400'
                  }`}
                >
                  🟢 ChatGPT (OpenAI)
                </button>
              </div>
            </div>

            {/* API Key Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {provider === 'claude' ? 'Anthropic API Key' : 'OpenAI API Key'}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => { setApiKey(e.target.value); setKeySaved(false); }}
                    placeholder={provider === 'claude' ? 'sk-ant-api...' : 'sk-...'}
                    className="w-full py-3 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-400"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {apiKey && !keySaved ? (
                  <button
                    onClick={saveApiKey}
                    className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                  >
                    Save
                  </button>
                ) : keySaved ? (
                  <button
                    onClick={clearApiKey}
                    className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div className="mt-4 flex items-center gap-2">
            {keySaved && apiKey ? (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">
                  {provider === 'claude' ? 'Claude' : 'ChatGPT'} API key saved and ready!
                </span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-yellow-700">
                  No API key - running in demo mode
                </span>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Input */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText size={20} />
                  Your Content
                </h2>
                {content && (
                  <span className="text-sm text-gray-500">{content.length} characters</span>
                )}
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste or type your content here..."
                className="w-full h-48 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21] resize-none text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Custom Prompt */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Custom Prompt</h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="What would you like AI to do with your content?"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F27A21]/20 focus:border-[#F27A21] text-gray-900 placeholder-gray-400"
                />
                <button
                  onClick={() => handleGenerate()}
                  disabled={loading || !content.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-[#F27A21] text-white rounded-lg hover:bg-[#F9A45A] transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                  Generate
                </button>
              </div>
            </div>

            {/* Output - Always visible */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">AI Output</h2>
                {output && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyOutput}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={useAsInput}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#F27A21]/10 text-[#F27A21] rounded-lg hover:bg-[#F27A21]/20"
                    >
                      Use as Input
                    </button>
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap text-gray-900 min-h-[100px]">
                {output || <span className="text-gray-400 italic">AI-generated content will appear here...</span>}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Zap size={20} className="text-[#F27A21]" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.name}
                    onClick={() => handleGenerate(action.prompt)}
                    disabled={loading || !content.trim()}
                    className="px-3 py-2 text-sm bg-gray-100 text-gray-900 hover:bg-[#F27A21] hover:text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {action.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Get API Keys */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Get an API Key</h3>
              <div className="space-y-3">
                <a
                  href="https://console.anthropic.com/settings/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 hover:underline"
                >
                  🟣 Get Claude API Key →
                </a>
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-green-600 hover:text-green-800 hover:underline"
                >
                  🟢 Get OpenAI API Key →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
