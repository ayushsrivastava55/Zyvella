# Virtual Try-On Application Demo

## Overview

This application generates photorealistic images of people wearing jewelry using two powerful AI approaches:

1. **Prompt-Based Generation**: Generate AI models wearing your exact jewelry using FLUX Kontext Pro
2. **Virtual Try-On**: Place your exact jewelry on uploaded person images using OmniGen-v2

## 🎯 Two Processing Modes

### Mode 1: Prompt-Based Generation with Exact Jewelry Reference

**Best for**: Creating marketing images, catalog shots, or when you don't have a specific person image

**How it works**:

- Upload/provide your jewelry image
- Add a descriptive prompt (e.g., "An elegant Indian bride wearing this necklace on her wedding day")
- **FLUX Kontext Pro** uses your exact jewelry as reference and generates a person wearing it
- **Processing time**: 20-30 seconds
- **Cost**: ~$0.04 per generation

**Perfect for**:

- Marketing campaigns
- Product catalogs
- Social media content
- When you need multiple different models wearing the same jewelry

### Mode 2: Virtual Try-On with Exact Jewelry Placement

**Best for**: When you have both a person's photo AND a jewelry image, and want to see that exact jewelry on that exact person

**How it works**:

- Upload your person's image
- Upload your jewelry image
- Add an optional prompt (e.g., "elegant portrait", "wedding photo style")
- **Bria Product Shot** places your exact jewelry on the person while maintaining the integrity of both
- Processing time: 20-40 seconds

**Key Benefits**:

- ✅ **Preserves exact jewelry**: Your uploaded jewelry appears exactly as-is
- ✅ **Preserves person**: The person's appearance, pose, and features remain unchanged
- ✅ **Professional placement**: AI automatically finds the best position for the jewelry
- ✅ **Commercial safe**: Trained on licensed data for risk-free commercial use
- ✅ **eCommerce optimized**: Specifically designed for product placement scenarios

**Perfect for**:

- Product catalogs and eCommerce
- Customer "try before you buy" experiences
- Social media marketing with real models
- Professional jewelry photography
- Custom jewelry consultations

## 🔧 Key Technical Improvements

### Exact Jewelry Preservation

- **OmniGen-v2** is specifically designed for virtual try-on tasks
- Preserves the exact jewelry from your uploaded image
- No color changes or modifications to the jewelry design
- Natural placement and realistic lighting adjustments

### Smart Processing Pipeline

1. **Jewelry Type Detection**: Automatically identifies necklaces, rings, earrings, etc.
2. **Enhanced Descriptions**: Creates detailed prompts based on jewelry characteristics
3. **Multi-Modal Processing**: Combines text prompts with image references
4. **Quality Optimization**: Professional photography-style results

## 📋 Usage Examples

### Example 1: Prompt-Based Marketing Shot

```
Input: Necklace image + "A sophisticated businesswoman wearing this necklace in a modern office"
Output: Professional model in business attire wearing your exact necklace
```

### Example 2: Personal Try-On

```
Input: Your photo + Necklace image + "Elegant evening look"
Output: You wearing the necklace with evening styling
```

### Example 3: Cultural Context

```
Input: Jewelry image + "Traditional Indian bride on her wedding day"
Output: Bride in traditional attire wearing your jewelry
```

## ✨ Best Practices

### For Jewelry Images:

- **High resolution** (1024px+ recommended)
- **Clear background** or clean product shots
- **Good lighting** that shows jewelry details
- **Multiple angles** if you have them (upload the best one)

### For Person Images:

- **Clear, well-lit photos**
- **Facing forward** works best
- **Minimal existing jewelry** for cleaner results
- **High resolution** for best quality

### For Prompts:

- **Be specific** about the setting and style
- **Include context** like "wedding day", "business meeting", "casual outing"
- **Mention lighting** preferences like "natural light", "studio lighting"
- **Add style cues** like "elegant", "modern", "traditional"

## 🚀 Getting Started

1. **Start the application**:

   ```bash
   ./run-everything.sh
   ```

2. **Open your browser** to `http://localhost:3000`

3. **Choose your mode**:

   - **Prompt-based**: Upload jewelry + enter prompt
   - **Virtual try-on**: Upload both person and jewelry images

4. **Wait for processing** (20-60 seconds depending on mode)

5. **Download your result** and iterate if needed

## 🎨 Creative Tips

- **Experiment with different prompts** for varied styles
- **Try different lighting descriptions** for mood changes
- **Mix jewelry types** in prompts for complete looks
- **Use cultural contexts** for authentic styling
- **Add seasonal elements** like "summer wedding" or "winter gala"

## 🔍 Troubleshooting

### If results aren't as expected:

1. **Check image quality** - ensure high resolution and clear details
2. **Refine your prompt** - be more specific about desired outcome
3. **Try different angles** - some jewelry photographs work better than others
4. **Adjust context** - different settings may work better for your jewelry style

### For virtual try-on specifically:

- **Ensure person's face is clearly visible**
- **Avoid heavily shadowed photos**
- **Remove existing jewelry** from person's photo if possible
- **Use frontal or slight angle poses** for best results

The application combines cutting-edge AI with practical jewelry business needs, making it easy to create professional-quality images for any purpose.
