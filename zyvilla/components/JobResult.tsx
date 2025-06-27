'use client';

import React, { useEffect, useState, useRef } from 'react';

type Mode = 'prompt' | 'try-on';

interface JobResultProps {
  jobId: string;
  mode: Mode;
}

interface JobStatus {
  status: 'queued' | 'processing' | 'completed' | 'failed';
  result?: string;
  error?: string;
}

export function JobResult({ jobId, mode }: JobResultProps) {
  const [status, setStatus] = useState<JobStatus>({ status: 'queued' });
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // Progress simulation
  useEffect(() => {
    if (status.status === 'processing') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 3;
        });
      }, 1000);
      progressRef.current = interval;
      return () => {
        if (progressRef.current) clearInterval(progressRef.current);
      };
    } else if (status.status === 'completed') {
      setProgress(100);
    }
  }, [status.status]);

  // Status polling
  useEffect(() => {
    const pollStatus = async () => {
      try {
        const response = await fetch(`/api/status/${jobId}`);
        const data: JobStatus = await response.json();
        
        console.log('Polling status:', data.status);
        setStatus(data);
        
        if (data.status === 'completed' || data.status === 'failed') {
          console.log('Job finished, stopping polling');
          if (pollingRef.current) {
            clearTimeout(pollingRef.current);
            pollingRef.current = null;
          }
          if (progressRef.current) {
            clearInterval(progressRef.current);
            progressRef.current = null;
          }
        } else {
          pollingRef.current = setTimeout(pollStatus, 2000);
        }
      } catch (error) {
        console.error('Failed to fetch status:', error);
        setStatus({ status: 'failed', error: 'Failed to fetch status' });
      }
    };

    console.log('Starting polling for job:', jobId);
    pollStatus();

    return () => {
      console.log('Cleanup: stopping polling');
      if (pollingRef.current) {
        clearTimeout(pollingRef.current);
        pollingRef.current = null;
      }
      if (progressRef.current) {
        clearInterval(progressRef.current);
        progressRef.current = null;
      }
    };
  }, [jobId]);

  const downloadImage = async () => {
    if (!status.result) return;
    
    try {
      const response = await fetch(status.result);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `zyvilla-${mode}-${jobId}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const shareImage = async () => {
    if (!status.result || !navigator.share) return;
    
    try {
      await navigator.share({
        title: 'Zyvilla AI Generated Image',
        text: `Check out this AI-generated jewelry image from Zyvilla!`,
        url: status.result
      });
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const getStatusIcon = () => {
    switch (status.status) {
      case 'queued':
        return <div className="w-4 h-4 rounded-full bg-yellow-400 animate-pulse"></div>;
      case 'processing':
        return <div className="w-4 h-4 rounded-full bg-blue-400 animate-spin border-2 border-blue-400 border-t-transparent"></div>;
      case 'completed':
        return <div className="w-4 h-4 rounded-full bg-green-400"></div>;
      case 'failed':
        return <div className="w-4 h-4 rounded-full bg-red-400"></div>;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status.status) {
      case 'queued':
        return 'Queued for processing...';
      case 'processing':
        return `Processing your ${mode === 'prompt' ? 'AI model generation' : 'virtual try-on'}...`;
      case 'completed':
        return 'Generation complete!';
      case 'failed':
        return 'Generation failed';
      default:
        return 'Unknown status';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 space-y-6">
      {/* Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <h3 className="font-semibold text-gray-900">{getStatusText()}</h3>
            <p className="text-sm text-gray-600">Job ID: {jobId}</p>
          </div>
        </div>
        {status.status === 'processing' && (
          <div className="text-right">
            <div className="text-sm font-medium text-blue-600">{Math.round(progress)}%</div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {(status.status === 'processing' || status.status === 'queued') && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 text-center">
            {status.status === 'queued' 
              ? 'Waiting in queue...' 
              : 'This usually takes 30-60 seconds'
            }
          </p>
        </div>
      )}

      {/* Result Image */}
      {status.status === 'completed' && status.result && (
        <div className="space-y-4">
          <div className="relative group">
            {/* Debug info */}
            <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
              <p><strong>Debug:</strong> Image URL: {status.result}</p>
            </div>
            <img
              src={status.result}
              alt={`Generated ${mode} result`}
              className="w-full rounded-xl shadow-lg transition-transform group-hover:scale-[1.02]"
              onError={(e) => {
                console.error('Image failed to load:', e);
                setImageError(true);
              }}
              onLoad={() => {
                console.log('Image loaded successfully');
                setImageError(false);
              }}
              crossOrigin="anonymous"
            />
            {imageError && (
              <div className="absolute inset-0 bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-2">🖼️</div>
                  <p className="text-sm text-gray-600">Image failed to load</p>
                  <a 
                    href={status.result} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xs underline mt-1 block"
                  >
                    Open in new tab
                  </a>
                </div>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={downloadImage}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                downloadSuccess
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {downloadSuccess ? '✓ Downloaded!' : '📥 Download'}
            </button>
            
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={shareImage}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                📤 Share
              </button>
            )}
            
            <a
              href={status.result}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              🔗 Open
            </a>
          </div>
        </div>
      )}

      {/* Error State */}
      {status.status === 'failed' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="text-red-500 text-lg">⚠️</div>
            <div>
              <h4 className="font-semibold text-red-800">Generation Failed</h4>
              <p className="text-red-700 text-sm mt-1">
                {status.error || 'An error occurred during processing. Please try again.'}
              </p>
              <div className="mt-3">
                <h5 className="font-medium text-red-800 text-sm">Troubleshooting Tips:</h5>
                <ul className="text-red-700 text-xs mt-1 space-y-1">
                  <li>• Make sure your jewelry image is clear and well-lit</li>
                  <li>• Ensure {mode === 'try-on' ? 'the person\'s face is clearly visible' : 'your prompt is descriptive'}</li>
                  <li>• Try using a different image or adjusting your description</li>
                  <li>• Check your internet connection and try again</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 