import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { prompt, content, action } = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured. Add ANTHROPIC_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    // Build the system prompt based on action
    let systemPrompt = `You are a helpful AI assistant for a content management system. You help users improve, edit, and create website content. Be concise and practical. Output only the improved content without explanations unless asked.`;

    let userPrompt = prompt;

    // Handle specific actions
    switch (action) {
      case 'improve':
        systemPrompt = `You are an expert copywriter. Improve the following content to be more engaging, compelling, and professional. Keep the same general meaning but make it better. Output only the improved text, nothing else.`;
        userPrompt = content;
        break;

      case 'shorten':
        systemPrompt = `You are an expert editor. Shorten the following content while keeping its key message. Make it concise and punchy. Output only the shortened text, nothing else.`;
        userPrompt = content;
        break;

      case 'expand':
        systemPrompt = `You are an expert copywriter. Expand the following content with more detail, examples, or supporting points. Make it richer and more informative. Output only the expanded text, nothing else.`;
        userPrompt = content;
        break;

      case 'headline':
        systemPrompt = `You are an expert headline writer. Create 5 compelling headline variations for the following content or topic. Make them attention-grabbing and action-oriented. Format as a numbered list.`;
        userPrompt = content || prompt;
        break;

      case 'cta':
        systemPrompt = `You are a conversion optimization expert. Create 5 compelling call-to-action button text options for the following context. Keep them short (2-5 words), action-oriented, and persuasive. Format as a numbered list.`;
        userPrompt = content || prompt;
        break;

      case 'seo':
        systemPrompt = `You are an SEO expert. Rewrite the following content to be more SEO-friendly while keeping it natural and readable. Include relevant keywords naturally. Output only the improved text, nothing else.`;
        userPrompt = content;
        break;

      case 'tone-professional':
        systemPrompt = `You are an expert editor. Rewrite the following content in a more professional, business-appropriate tone. Output only the rewritten text, nothing else.`;
        userPrompt = content;
        break;

      case 'tone-casual':
        systemPrompt = `You are an expert editor. Rewrite the following content in a more casual, friendly, conversational tone. Output only the rewritten text, nothing else.`;
        userPrompt = content;
        break;

      case 'fix-grammar':
        systemPrompt = `You are a professional proofreader. Fix any grammar, spelling, or punctuation errors in the following content. Output only the corrected text, nothing else.`;
        userPrompt = content;
        break;

      default:
        // Custom prompt - use as-is
        if (content) {
          userPrompt = `${prompt}\n\nContent to work with:\n${content}`;
        }
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    });

    // Extract text from response
    const responseText = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    return NextResponse.json({
      result: responseText,
      usage: {
        input_tokens: message.usage.input_tokens,
        output_tokens: message.usage.output_tokens,
      },
    });
  } catch (error) {
    console.error('AI API error:', error);

    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `API Error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    );
  }
}
