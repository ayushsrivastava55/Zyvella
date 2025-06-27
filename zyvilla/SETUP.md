# Virtual Try-On Application Setup

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Docker** (for Redis)
3. **API Key** from FAL.ai

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory with:

```env
# FAL AI API Key - Get from: https://fal.ai/dashboard
FAL_KEY=your_fal_api_key_here

# Redis Configuration (optional)
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 3. Start Redis

```bash
docker run -d --name redis-server -p 6379:6379 redis:alpine
```

### 4. Run Everything at Once

```bash
./run-everything.sh
```

Or manually:

```bash
# Terminal 1: Start Next.js
npm run dev

# Terminal 2: Start Worker
npm run worker:dev
```

### 5. Test the Application

1. Open http://localhost:3000
2. **Upload a jewelry image** OR provide a URL
3. Optionally upload a person image OR provide a URL
4. Add a custom prompt (optional)
5. Add sizing information (optional)
6. Click "Generate Try-On"
7. Wait for processing (30-60 seconds)

## Features

### 🖼️ **File Upload Support**

- Upload jewelry images directly from your device
- Upload person images for more accurate results
- Supports common image formats (JPEG, PNG, WebP, etc.)
- Alternative URL input for web-hosted images

### 🎨 **AI-Powered Processing**

- **Exact Jewelry Reference**: Uses your exact jewelry image for generation
- **FLUX Kontext Pro**: For prompt-based generation with jewelry reference
- **Kling Kolors Virtual Try-On**: For placing exact jewelry on person images
- **Background removal**: Using FAL.ai's advanced algorithms
- Professional photography styling and high-quality results

### ⚡ **Real-time Processing**

- Job queue system with BullMQ
- Live status updates
- Background processing for better performance
- Error handling and retry mechanisms

## How It Works

### Two Processing Modes:

#### 1. **Prompt-Based Generation** (No person image)

- **Input**: Jewelry image + Text prompt (e.g., "An elegant Indian bride wearing this necklace")
- **Process**: FLUX Kontext Pro uses your exact jewelry image as reference → Generates person wearing that specific jewelry
- **Result**: AI-generated person wearing your exact jewelry piece

#### 2. **Virtual Try-On** (Person + jewelry images)

- **Input**: Person's photo + Jewelry image
- **Process**:
  - Remove background from person's image using FAL.ai
  - Use Kling Kolors Virtual Try-On to place exact jewelry on the person
- **Result**: Your person wearing the specific jewelry from your image

### Queue System

- BullMQ manages job processing with Redis
- Real-time status updates via polling
- Professional error handling and logging

## Troubleshooting

### API Errors

- Verify your FAL.ai API key in `.env`
- Check FAL.ai account credits and limits
- Ensure API key has proper permissions

### File Upload Issues

- Ensure images are in supported formats (JPEG, PNG, WebP)
- Check file size limits (recommended < 10MB)
- Try using URL input as alternative

### Redis Errors

- Ensure Docker is running
- Check if Redis container is active: `docker ps`
- Restart Redis: `docker restart redis-server`

### Worker Not Processing

- Check if Redis is running
- Verify environment variables are loaded
- Check worker logs for specific errors

## File Structure

```
├── app/
│   ├── api/
│   │   ├── generate/route.ts     # Job creation endpoint
│   │   └── status/[jobId]/route.ts # Job status endpoint
│   ├── page.tsx                  # Main page
│   └── layout.tsx                # App layout
├── components/
│   ├── TryOnForm.tsx            # Upload form with file support
│   └── JobResult.tsx            # Results display
├── workers/
│   └── image-generator.ts       # Background worker
├── lib/
│   └── queue.ts                 # BullMQ configuration
├── run-everything.sh            # Start all services
└── SETUP.md                     # This file
```

## Development

- **Frontend**: Next.js 14 with App Router, ShadCN UI components
- **Queue**: BullMQ with Redis for job management
- **Image Processing**:
  - FAL.ai FLUX Kontext Pro for prompt-based generation with jewelry reference
  - FAL.ai Kling Kolors for virtual try-on with exact jewelry placement
  - FAL.ai RemBG for background removal
- **File Handling**: Base64 data URLs for uploaded images
- **Styling**: Tailwind CSS with modern UI components

## Production Considerations

- Set up proper file storage (AWS S3, Cloudinary) for production
- Implement rate limiting and user authentication
- Add image compression and optimization
- Monitor API usage and costs
- Set up proper error logging and monitoring
