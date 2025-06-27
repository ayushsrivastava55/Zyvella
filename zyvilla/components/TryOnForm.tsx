'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { JobResult } from './JobResult';

export function TryOnForm() {
  const [imageUrl, setImageUrl] = useState('');
  const [personImage, setPersonImage] = useState('');
  const [prompt, setPrompt] = useState('');
  const [sizing, setSizing] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // File upload states
  const [jewelryFile, setJewelryFile] = useState<File | null>(null);
  const [personFile, setPersonFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Mode state
  const [mode, setMode] = useState<'prompt' | 'try-on'>('prompt');

  // Convert file to base64 data URL
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleJewelryFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setJewelryFile(file);
      setImageUrl(''); // Clear URL if file is selected
    }
  };

  const handlePersonFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPersonFile(file);
      setPersonImage(''); // Clear URL if file is selected
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setUploading(true);
    setError(null);
    setJobId(null);

    try {
      let finalImageUrl = imageUrl;
      let finalPersonImage = personImage;

      // Convert files to data URLs if files are selected
      if (jewelryFile) {
        finalImageUrl = await fileToDataUrl(jewelryFile);
      }

      if (personFile) {
        finalPersonImage = await fileToDataUrl(personFile);
      }

      // Validate that we have at least a jewelry image
      if (!finalImageUrl) {
        throw new Error('Please provide either a jewelry image file or URL.');
      }

      // Validate for try-on mode
      if (mode === 'try-on' && !finalPersonImage) {
        throw new Error('Please provide a person image for virtual try-on mode.');
      }

      setUploading(false);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          imageUrl: finalImageUrl, 
          personImage: finalPersonImage, 
          prompt, 
          sizing 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create generation job.');
      }

      const data = await response.json();
      setJobId(data.jobId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
      setUploading(false);
    }
  };

  const clearJewelryInput = () => {
    setJewelryFile(null);
    setImageUrl('');
  };

  const clearPersonInput = () => {
    setPersonFile(null);
    setPersonImage('');
  };

  const switchMode = (newMode: 'prompt' | 'try-on') => {
    setMode(newMode);
    // Clear person inputs when switching to prompt mode
    if (newMode === 'prompt') {
      clearPersonInput();
    }
    // Set default prompt when switching to try-on mode
    if (newMode === 'try-on' && !prompt) {
      setPrompt('Professional portrait wearing elegant jewelry');
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Mode Selector */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Generation Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => switchMode('prompt')}
            className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
              mode === 'prompt'
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center mb-3">
              <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                mode === 'prompt' ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                {mode === 'prompt' && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <h3 className="font-semibold text-gray-900">🎨 Prompt Mode</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Generate AI models wearing your jewelry. Perfect for marketing and product showcases.
            </p>
            <div className="mt-3 text-xs text-blue-600 font-medium">
              ✨ Creates new models • 🚀 Fast generation
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => switchMode('try-on')}
            className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
              mode === 'try-on'
                ? 'border-purple-500 bg-purple-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center mb-3">
              <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                mode === 'try-on' ? 'bg-purple-500' : 'bg-gray-300'
              }`}>
                {mode === 'try-on' && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <h3 className="font-semibold text-gray-900">👤 Virtual Try-On</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Place your exact jewelry on uploaded person photos. Perfect for personalized previews.
            </p>
            <div className="mt-3 text-xs text-purple-600 font-medium">
              💎 Exact placement • 🎯 Preserves person
            </div>
          </button>
        </div>
      </div>

      {/* Main Form */}
      <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <span className={mode === 'prompt' ? '🎨' : '👤'}>
              {mode === 'prompt' ? '🎨' : '👤'}
            </span>
            <span>
              {mode === 'prompt' ? 'Generate AI Model' : 'Virtual Try-On'}
            </span>
          </CardTitle>
          <CardDescription>
            {mode === 'prompt' 
              ? 'Upload your jewelry and describe the model you want to generate'
              : 'Upload both your jewelry and a person\'s photo for virtual try-on'
            }
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8">
            {/* Jewelry Image Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Label className="text-lg font-semibold text-gray-900">💎 Jewelry Image</Label>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Required</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* File Upload */}
                <div className="space-y-3">
                  <Label htmlFor="jewelryFile" className="text-sm font-medium text-gray-700 flex items-center">
                    📁 Upload File
                  </Label>
                  <div className="relative">
                    <Input 
                      id="jewelryFile" 
                      type="file" 
                      accept="image/*"
                      onChange={handleJewelryFileChange}
                      disabled={!!imageUrl}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  {jewelryFile && (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">✅</span>
                        <span className="text-sm font-medium text-green-700">{jewelryFile.name}</span>
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={clearJewelryInput}>
                        Remove
                      </Button>
                    </div>
                  )}
                </div>

                {/* URL Input */}
                <div className="space-y-3">
                  <Label htmlFor="imageUrl" className="text-sm font-medium text-gray-700 flex items-center">
                    🔗 Or provide URL
                  </Label>
                  <Input 
                    id="imageUrl" 
                    placeholder="https://example.com/jewelry.jpg" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)}
                    disabled={!!jewelryFile}
                    className="transition-all duration-200"
                  />
                  {imageUrl && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600">🔗</span>
                        <span className="text-sm font-medium text-blue-700">URL provided</span>
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={clearJewelryInput}>
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Person Image Section - Only show in try-on mode */}
            {mode === 'try-on' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label className="text-lg font-semibold text-gray-900">👤 Person Image</Label>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Required for Try-On</span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* File Upload */}
                  <div className="space-y-3">
                    <Label htmlFor="personFile" className="text-sm font-medium text-gray-700 flex items-center">
                      📁 Upload File
                    </Label>
                    <Input 
                      id="personFile" 
                      type="file" 
                      accept="image/*"
                      onChange={handlePersonFileChange}
                      disabled={!!personImage}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    />
                    {personFile && (
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span className="text-sm font-medium text-green-700">{personFile.name}</span>
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={clearPersonInput}>
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* URL Input */}
                  <div className="space-y-3">
                    <Label htmlFor="personImage" className="text-sm font-medium text-gray-700 flex items-center">
                      🔗 Or provide URL
                    </Label>
                    <Input 
                      id="personImage" 
                      placeholder="https://example.com/person.jpg" 
                      value={personImage} 
                      onChange={(e) => setPersonImage(e.target.value)}
                      disabled={!!personFile}
                    />
                    {personImage && (
                      <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-600">🔗</span>
                          <span className="text-sm font-medium text-blue-700">URL provided</span>
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={clearPersonInput}>
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Prompt Section */}
            <div className="space-y-3">
              <Label htmlFor="prompt" className="text-lg font-semibold text-gray-900 flex items-center">
                ✨ Description {mode === 'prompt' ? '(Required)' : '(Optional)'}
              </Label>
              <Textarea 
                id="prompt" 
                placeholder={mode === 'prompt' 
                  ? "e.g., An elegant Indian bride wearing this necklace on her wedding day, professional photography, studio lighting"
                  : "e.g., Professional portrait, elegant style, wedding photography"
                } 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="resize-none transition-all duration-200"
              />
              <p className="text-sm text-gray-500">
                {mode === 'prompt' 
                  ? 'Describe the person and scene you want to generate'
                  : 'Describe the style and mood for the final image'
                }
              </p>
            </div>

            {/* Sizing Section */}
            <div className="space-y-3">
              <Label htmlFor="sizing" className="text-lg font-semibold text-gray-900 flex items-center">
                📏 Sizing Information (Optional)
              </Label>
              <Input 
                id="sizing" 
                placeholder="e.g., Necklace length: 18 inches, Ring size: 7, Bracelet: Medium" 
                value={sizing} 
                onChange={(e) => setSizing(e.target.value)}
                className="transition-all duration-200"
              />
              <p className="text-sm text-gray-500">
                Help the AI understand the proper scale and fit of the jewelry
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 pt-6">
            <Button 
              type="submit" 
              disabled={isLoading || uploading || (!imageUrl && !jewelryFile) || (mode === 'prompt' && !prompt)}
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              {uploading ? (
                <span className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Images...</span>
                </span>
              ) : isLoading ? (
                <span className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Your Image...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <span>{mode === 'prompt' ? '🎨' : '👤'}</span>
                  <span>{mode === 'prompt' ? 'Generate AI Model' : 'Create Virtual Try-On'}</span>
                </span>
              )}
            </Button>
            
            {/* Status Messages */}
            {jobId && (
              <div className="w-full p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium flex items-center">
                  <span className="mr-2">✅</span>
                  Job created successfully! Processing your image...
                </p>
                <p className="text-green-600 text-sm mt-1">Job ID: {jobId}</p>
              </div>
            )}
            
            {error && (
              <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium flex items-center">
                  <span className="mr-2">❌</span>
                  Error: {error}
                </p>
              </div>
            )}
          </CardFooter>
        </form>
      </Card>
      
      {/* Results */}
      {jobId && <JobResult jobId={jobId} mode={mode === 'try-on' ? 'try-on' : mode} />}
    </div>
  );
} 