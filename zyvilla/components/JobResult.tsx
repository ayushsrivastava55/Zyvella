'use client';

import React, { useEffect, useState, useRef } from 'react';

interface JobResultProps {
  jobId: string;
  mode?: 'prompt' | 'tryon';
}

interface JobStatus {
  jobId: string;
  state: 'completed' | 'failed' | 'active' | 'waiting' | 'delayed';
  result?: {
    imageUrl: string;
  };
}

export function JobResult({ jobId, mode = 'prompt' }: JobResultProps) {
  const [status, setStatus] = useState<JobStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!jobId) return;

    // Clear any existing intervals
    if (pollingRef.current) clearTimeout(pollingRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    
    // Start progress simulation
    progressRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 1000);

    const pollStatus = async () => {
      try {
        console.log(`Polling status for job ${jobId}...`);
        const response = await fetch(`/api/status/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job status.');
        }
        const data: JobStatus = await response.json();
        setStatus(data);

        if (data.state === 'completed') {
          setProgress(100);
          if (progressRef.current) clearInterval(progressRef.current);
          console.log(`Job ${jobId} completed! Stopping polling.`);
          return; // Stop polling
        }
        
        if (data.state === 'failed') {
          if (progressRef.current) clearInterval(progressRef.current);
          console.log(`Job ${jobId} failed! Stopping polling.`);
          return; // Stop polling
        }

        // Continue polling only if job is still in progress
        if (data.state === 'active' || data.state === 'waiting' || data.state === 'delayed') {
          pollingRef.current = setTimeout(pollStatus, 2000);
        }
      } catch (err: any) {
        setError(err.message);
        if (progressRef.current) clearInterval(progressRef.current);
        console.error(`Polling error for job ${jobId}:`, err);
        return; // Stop polling on error
      }
    };

    pollStatus();

    return () => {
      if (pollingRef.current) {
        clearTimeout(pollingRef.current);
        console.log(`Cleanup: Stopped polling for job ${jobId}`);
      }
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    };
  }, [jobId]);

  if (!jobId) return null;

  const getStatusColor = (state: string) => {
    switch (state) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      case 'active': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'waiting': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'delayed': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (state: string) => {
    switch (state) {
      case 'completed': return '✅';
      case 'failed': return '❌';
      case 'active': return '⚡';
      case 'waiting': return '⏳';
      case 'delayed': return '⏸️';
      default: return '🔄';
    }
  };

  const getStatusMessage = (state: string) => {
    switch (state) {
      case 'completed': return 'Generation completed successfully!';
      case 'failed': return 'Generation failed. Please try again.';
      case 'active': return 'AI is generating your image...';
      case 'waiting': return 'Job is queued and waiting to start...';
      case 'delayed': return 'Job is delayed, please wait...';
      default: return 'Processing...';
    }
  };

  const downloadImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `zyvilla-${mode}-${jobId}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open image in new tab
      window.open(imageUrl, '_blank');
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div className="w-full bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <span className="mr-2">{mode === 'prompt' ? '🎨' : '👤'}</span>
              {mode === 'prompt' ? 'AI Model Generation' : 'Virtual Try-On'}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Job ID: {jobId}</p>
          </div>
          {status && (
            <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(status.state)}`}>
              <span className="mr-1">{getStatusIcon(status.state)}</span>
              {status.state.charAt(0).toUpperCase() + status.state.slice(1)}
            </div>
          )}
        </div>
      </div>

      {/* Progress Section */}
      {status && status.state !== 'completed' && status.state !== 'failed' && (
        <div className="p-6 border-b border-gray-200/50">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              {getStatusMessage(status.state)}
            </p>
            {status.state === 'active' && (
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Estimated time: 30-60 seconds</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Section */}
      {error && (
        <div className="p-6 border-b border-gray-200/50">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium flex items-center">
              <span className="mr-2">❌</span>
              Error: {error}
            </p>
          </div>
        </div>
      )}

      {/* Success Result */}
      {status?.state === 'completed' && status.result?.imageUrl && (
        <div className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                🎉 Your image is ready!
              </h4>
              <p className="text-sm text-gray-600">
                {mode === 'prompt' 
                  ? 'AI has generated a beautiful model wearing your jewelry'
                  : 'Virtual try-on completed with your exact jewelry placement'
                }
              </p>
            </div>
            
            {/* Image Display */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-lg bg-gray-50">
                {!imageLoaded && !imageError && (
                  <div className="absolute inset-0 flex items-center justify-center min-h-[300px]">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-gray-500 text-sm">Loading image...</p>
                    </div>
                  </div>
                )}

                {imageError && (
                  <div className="absolute inset-0 flex items-center justify-center min-h-[300px]">
                    <div className="text-center p-8">
                      <div className="text-4xl mb-4">🖼️</div>
                      <p className="text-gray-600 font-medium mb-2">Image failed to load</p>
                      <button
                        onClick={() => window.open(status.result!.imageUrl, '_blank')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                      >
                        Open in New Tab
                      </button>
                    </div>
                  </div>
                )}

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={status.result.imageUrl} 
                  alt={mode === 'prompt' ? 'AI generated model with jewelry' : 'Virtual try-on result'} 
                  className={`w-full h-auto transition-all duration-300 ${
                    imageLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
                
                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              
              {/* Download Button Overlay */}
              {imageLoaded && (
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => downloadImage(status.result!.imageUrl)}
                    className="px-3 py-2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-lg shadow-lg hover:bg-white transition-all duration-200 text-sm font-medium"
                  >
                    💾 Download
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => downloadImage(status.result!.imageUrl)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>💾</span>
                <span>Download Image</span>
              </button>
              
              <button
                onClick={() => window.open(status.result!.imageUrl, '_blank')}
                className="px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>🔗</span>
                <span>Open Original</span>
              </button>
              
              <button
                onClick={() => {
                  if (navigator.share && status.result?.imageUrl) {
                    navigator.share({
                      title: 'My Virtual Try-On Result',
                      text: `Check out my ${mode === 'prompt' ? 'AI-generated model' : 'virtual try-on'} from Zyvilla!`,
                      url: status.result.imageUrl,
                    });
                  } else {
                    navigator.clipboard.writeText(status.result?.imageUrl || '');
                  }
                }}
                className="px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>📤</span>
                <span>Share</span>
              </button>
            </div>

            {/* Tips */}
            {imageLoaded && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <h5 className="font-semibold text-green-900 mb-2 flex items-center">
                  <span className="mr-2">💡</span>
                  Pro Tips
                </h5>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Save this image for your jewelry collection</li>
                  <li>• Share on social media to showcase your jewelry</li>
                  <li>• Use for e-commerce product listings</li>
                  <li>• Try different prompts for varied styles</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Failed State */}
      {status?.state === 'failed' && (
        <div className="p-6">
          <div className="text-center space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium flex items-center justify-center">
                <span className="mr-2">❌</span>
                Generation failed
              </p>
              <p className="text-red-600 text-sm mt-2">
                Something went wrong during processing. Please try again with different images or prompts.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h5 className="font-semibold text-yellow-900 mb-2">Troubleshooting Tips:</h5>
              <ul className="text-sm text-yellow-800 space-y-1 text-left">
                <li>• Ensure images are clear and well-lit</li>
                <li>• Try different image formats (JPG, PNG)</li>
                <li>• Check that jewelry is clearly visible</li>
                <li>• Use simpler, more descriptive prompts</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 