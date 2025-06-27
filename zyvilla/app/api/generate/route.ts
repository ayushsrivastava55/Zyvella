import { NextResponse } from 'next/server';
import { imageGenerationQueue } from '@/lib/queue';

export async function POST(request: Request) {
  try {
    const { imageUrl, prompt, personImage, sizing } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const job = await imageGenerationQueue.add('generate-image', {
      imageUrl,
      prompt,
      personImage,
      sizing,
    });

    return NextResponse.json({ jobId: job.id });
  } catch (error) {
    console.error('Failed to create job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
} 