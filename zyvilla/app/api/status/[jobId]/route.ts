import { NextResponse } from 'next/server';
import { imageGenerationQueue } from '@/lib/queue';

export async function GET(request: Request) {
  try {
    // Extract jobId from URL path
    const jobId = request.url.split('/').pop();

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const job = await imageGenerationQueue.getJob(jobId);

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const state = await job.getState();
    const result = job.returnvalue;

    // Map BullMQ states to our expected states
    let status: 'queued' | 'processing' | 'completed' | 'failed';
    switch (state) {
      case 'waiting':
      case 'delayed':
        status = 'queued';
        break;
      case 'active':
        status = 'processing';
        break;
      case 'completed':
        status = 'completed';
        break;
      case 'failed':
        status = 'failed';
        break;
      default:
        status = 'queued';
    }

    // Format the response to match JobResult expectations
    const response: { status: typeof status; result?: string; error?: string } = { status };

    if (status === 'completed' && result?.imageUrl) {
      response.result = result.imageUrl;
    } else if (status === 'failed') {
      response.error = job.failedReason || 'Job failed';
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to get job status:', error);
    return NextResponse.json({ error: 'Failed to get job status' }, { status: 500 });
  }
} 