import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { commitMessage } = await request.json();
    const message = commitMessage || 'Update content via Site Portal';
    const cwd = process.cwd();

    const steps: { step: string; success: boolean; output?: string; error?: string }[] = [];

    // Step 1: Check git status
    try {
      const { stdout: statusOutput } = await execAsync('git status --porcelain content/', { cwd });

      if (!statusOutput.trim()) {
        return NextResponse.json({
          success: true,
          message: 'No changes to deploy',
          steps: [{ step: 'Check changes', success: true, output: 'No changes detected' }],
        });
      }

      steps.push({
        step: 'Check changes',
        success: true,
        output: `Changes detected:\n${statusOutput.trim()}`,
      });
    } catch (error) {
      steps.push({
        step: 'Check changes',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return NextResponse.json({ success: false, steps }, { status: 500 });
    }

    // Step 2: Stage content changes
    try {
      await execAsync('git add content/', { cwd });
      steps.push({ step: 'Stage changes', success: true, output: 'Changes staged' });
    } catch (error) {
      steps.push({
        step: 'Stage changes',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return NextResponse.json({ success: false, steps }, { status: 500 });
    }

    // Step 3: Commit changes
    try {
      const { stdout: commitOutput } = await execAsync(
        `git commit -m "${message}\n\n🚀 Deployed via Site Portal"`,
        { cwd }
      );
      steps.push({ step: 'Commit changes', success: true, output: commitOutput.trim() });
    } catch (error) {
      if (error instanceof Error && error.message.includes('nothing to commit')) {
        steps.push({ step: 'Commit changes', success: true, output: 'No new changes to commit' });
      } else {
        steps.push({
          step: 'Commit changes',
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        return NextResponse.json({ success: false, steps }, { status: 500 });
      }
    }

    // Step 4: Push to GitHub
    try {
      await execAsync('git push origin main', { cwd });
      steps.push({ step: 'Push to GitHub', success: true, output: 'Pushed to GitHub' });
    } catch (error) {
      steps.push({
        step: 'Push to GitHub',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return NextResponse.json({ success: false, steps }, { status: 500 });
    }

    // Step 5: Vercel auto-deploys
    steps.push({
      step: 'Deploy to Vercel',
      success: true,
      output: 'Vercel will auto-deploy from GitHub push',
    });

    return NextResponse.json({
      success: true,
      message: 'Deployed successfully! Site will update in approximately 5 minutes.',
      steps,
    });
  } catch (error) {
    console.error('Deploy error:', error);
    return NextResponse.json(
      { error: 'Failed to deploy', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
