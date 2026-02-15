'use client';

import { useState } from 'react';
import Header from '@/components/power-hub/Header';
import { Sparkles, FileText, Zap, Copy, Check, Loader2 } from 'lucide-react';

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

export default function AIAssistPage() {
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (customPrompt?: string) => {
    if (!content.trim()) return;

    setLoading(true);
    setOutput('');

    // Simulate AI response (in production, this would call an API)
    await new Promise(resolve => setTimeout(resolve, 1500));

    const usedPrompt = customPrompt || prompt;
    setOutput(`[AI Generated Response]\n\nBased on your request to "${usedPrompt}":\n\n${content}\n\n---\nNote: Connect to Claude API for real AI-powered content generation.`);
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

            {/* Output */}
            {output && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">AI Output</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyOutput}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
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
                </div>
                <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">{output}</div>
              </div>
            )}
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
                    className="px-3 py-2 text-sm bg-gray-100 hover:bg-[#F27A21] hover:text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {action.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-[#F27A21]/5 rounded-xl p-6">
              <h3 className="font-semibold text-[#F27A21] mb-3">Pro Tips</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>- Be specific with your prompts</li>
                <li>- Use Quick Actions for common tasks</li>
                <li>- Refine outputs with "Use as Input"</li>
                <li>- Add ANTHROPIC_API_KEY to enable real AI</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
