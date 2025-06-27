import Image from "next/image";
import { TryOnForm } from '@/components/TryOnForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">💎</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Zyvilla
                </h1>
              </div>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              AI-Powered Virtual Jewelry Try-On
            </p>
            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
              Experience the future of jewelry shopping. Upload your jewelry and see how it looks on you or generate stunning marketing images with AI.
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                ✨ Exact Jewelry Placement
              </span>
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                🎨 AI-Generated Models
              </span>
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                ⚡ 30-60 Second Processing
              </span>
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                📱 Professional Quality
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Form */}
          <div className="order-2 lg:order-1">
            <TryOnForm />
          </div>
          
          {/* Right Column - Info & Examples */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* How It Works */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Upload Your Jewelry</h3>
                    <p className="text-gray-600 text-sm">Upload a clear image of your jewelry piece or provide a URL</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Choose Your Mode</h3>
                    <p className="text-gray-600 text-sm">
                      <strong>Prompt Mode:</strong> Describe the person you want<br/>
                      <strong>Try-On Mode:</strong> Upload a person's photo
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Get Your Result</h3>
                    <p className="text-gray-600 text-sm">Our AI generates a photorealistic image in 30-60 seconds</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Perfect For</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-2xl mb-2">🛍️</div>
                  <h3 className="font-semibold text-gray-900 text-sm">E-commerce</h3>
                  <p className="text-gray-600 text-xs">Product listings</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="text-2xl mb-2">📸</div>
                  <h3 className="font-semibold text-gray-900 text-sm">Marketing</h3>
                  <p className="text-gray-600 text-xs">Social media content</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="text-2xl mb-2">👥</div>
                  <h3 className="font-semibold text-gray-900 text-sm">Personal</h3>
                  <p className="text-gray-600 text-xs">Try before buying</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <div className="text-2xl mb-2">💼</div>
                  <h3 className="font-semibold text-gray-900 text-sm">Business</h3>
                  <p className="text-gray-600 text-xs">Catalog creation</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/50">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Pro Tips for Best Results
              </h3>
              <ul className="text-sm text-amber-800 space-y-2">
                <li>• Use high-resolution images with good lighting</li>
                <li>• Jewelry should be clearly visible and well-focused</li>
                <li>• For person images, face forward with minimal accessories</li>
                <li>• Add descriptive prompts for more accurate results</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
