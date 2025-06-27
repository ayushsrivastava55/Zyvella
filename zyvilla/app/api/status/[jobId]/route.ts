import { NextResponse } from 'next/server';
import { imageGenerationQueue } from '@/lib/queue';
import { URL } from 'url';

export async function GET(request: Request) {
  try {
    // Workaround: Manually parse the jobId from the request URL
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const jobId = pathSegments.pop() || '';

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required and could not be parsed from URL' }, { status: 400 });
    }

    const job = await imageGenerationQueue.getJob(jobId);

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const state = await job.getState();
    const result = job.returnvalue;

    return NextResponse.json({ jobId, state, result });
  } catch (error) {
    console.error('Failed to get job status:', error);
    return NextResponse.json({ error: 'Failed to get job status' }, { status: 500 });
  }
} 