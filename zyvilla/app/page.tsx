import React from 'react';
import { TryOnForm } from '@/components/TryOnForm';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200/50 bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">💎</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Zyvilla
              </h1>
            </div>
            <div className="text-sm text-gray-600">
              AI-Powered Virtual Jewelry Try-On
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Form */}
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Transform Your
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Jewelry Vision
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience the future of jewelry marketing with AI-powered virtual try-ons and stunning model photography.
              </p>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  ⚡ Exact Jewelry Placement
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  🤖 AI-Generated Models
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  📸 Professional Quality
                </span>
                <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                  ⚡ Lightning Fast
                </span>
              </div>
            </div>

            {/* Form */}
            <TryOnForm />
          </div>

          {/* Right Column - Information */}
          <div className="space-y-8">
            {/* How It Works */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🔄</span>
                How It Works
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Upload Your Jewelry</h4>
                    <p className="text-gray-600 text-sm">Upload a clear image of your jewelry piece</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Choose Your Mode</h4>
                    <p className="text-gray-600 text-sm">Generate AI models or try on your own photo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Get Professional Results</h4>
                    <p className="text-gray-600 text-sm">Download high-quality images ready for marketing</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Perfect For */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🎯</span>
                Perfect For
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">🛍️</div>
                  <h4 className="font-semibold text-gray-900 text-sm">E-commerce</h4>
                  <p className="text-gray-600 text-xs">Product listings</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <h4 className="font-semibold text-gray-900 text-sm">Marketing</h4>
                  <p className="text-gray-600 text-xs">Social media</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">👤</div>
                  <h4 className="font-semibold text-gray-900 text-sm">Personal</h4>
                  <p className="text-gray-600 text-xs">Try before buy</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">💼</div>
                  <h4 className="font-semibold text-gray-900 text-sm">Business</h4>
                  <p className="text-gray-600 text-xs">Catalogs</p>
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200/50 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">💡</span>
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Use well-lit, clear jewelry photos for best results
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Describe the style you want in detail
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  For virtual try-on, ensure the person&apos;s face is clearly visible
          </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Generation typically takes 30-60 seconds
          </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
