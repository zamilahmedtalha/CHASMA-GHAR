import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Image as ImageIcon, Loader2, Video } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function AiDesigner() {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState('A futuristic pair of neon cyberpunk sunglasses resting on a sleek black marble table, cinematic lighting, 8k resolution, photorealistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);

    try {
      // @ts-ignore
      if (!await window.aistudio.hasSelectedApiKey()) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || '' });

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "1:1", imageSize: "1K" } },
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setGeneratedImage(`data:image/png;base64,${base64EncodeString}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) throw new Error("No image was returned by the model.");
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);

    try {
      // @ts-ignore
      if (!await window.aistudio.hasSelectedApiKey()) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || '' });

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        setGeneratedVideo(downloadLink);
      } else {
        throw new Error("No video was returned by the model.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate video. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-black min-h-screen pt-32 pb-20 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl tracking-tighter font-bold mb-6">
              AI Design Lab.
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Generate infinite variations of premium eyewear and fluid backgrounds using our advanced AI models.
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('image')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === 'image' ? 'bg-white text-black' : 'glass-panel text-zinc-400 hover:text-white'}`}
            >
              Nano Banana Pro (Images)
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === 'video' ? 'bg-white text-black' : 'glass-panel text-zinc-400 hover:text-white'}`}
            >
              Veo 3 (Video Backgrounds)
            </button>
          </div>

          <div className="glass-panel rounded-3xl p-8 mb-12">
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-widest">
                {activeTab === 'image' ? 'Describe your dream glasses' : 'Describe your fluid 3D background'}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors resize-none h-32"
                placeholder={activeTab === 'image' ? "e.g., A pair of sleek titanium aviators with rose gold lenses..." : "e.g., A 3D fluid metallic purple and pink liquid constantly moving, 8k resolution..."}
              />
              <button
                onClick={activeTab === 'image' ? handleGenerateImage : handleGenerateVideo}
                disabled={isGenerating}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2 font-bold text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    {activeTab === 'image' ? 'Generating Image...' : 'Generating Video (This may take a few minutes)...'}
                  </>
                ) : (
                  <>
                    {activeTab === 'image' ? <Sparkles size={24} /> : <Video size={24} />}
                    Generate {activeTab === 'image' ? 'Design' : 'Background'}
                  </>
                )}
              </button>
              {error && (
                <p className="text-red-400 text-sm text-center mt-2">{error}</p>
              )}
            </div>
          </div>

          <div className={`relative w-full max-w-3xl mx-auto glass-panel rounded-3xl overflow-hidden flex items-center justify-center ${activeTab === 'image' ? 'aspect-square' : 'aspect-video'}`}>
            {activeTab === 'image' && generatedImage && (
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={generatedImage}
                alt="Generated Glasses"
                className="w-full h-full object-cover"
              />
            )}
            {activeTab === 'video' && generatedVideo && (
              <motion.video
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={generatedVideo}
                autoPlay
                loop
                muted
                controls
                className="w-full h-full object-cover"
              />
            )}
            {((activeTab === 'image' && !generatedImage) || (activeTab === 'video' && !generatedVideo)) && (
              <div className="text-center text-zinc-600 flex flex-col items-center gap-4 p-12">
                {activeTab === 'image' ? <ImageIcon size={64} /> : <Video size={64} />}
                <p className="font-medium">Your generated {activeTab === 'image' ? 'design' : 'video'} will appear here</p>
                {activeTab === 'video' && (
                  <p className="text-sm max-w-md opacity-70">Note: Video generation with Veo 3 can take several minutes. Please be patient after clicking generate.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
