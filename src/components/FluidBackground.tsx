import { useEffect, useRef } from 'react';

// Using the exact configuration provided by the user
const config = {
  colors: [
    { color: '#130437', enabled: true },
    { color: '#B34BD0', enabled: true },
    { color: '#210751', enabled: true },
    { color: '#3511A5', enabled: true },
    { color: '#8F3E8D', enabled: false },
    { color: '#FF9A9E', enabled: false },
  ],
  speed: 4,
  horizontalPressure: 7,
  verticalPressure: 3,
  waveFrequencyX: 0,
  waveFrequencyY: 0,
  waveAmplitude: 0,
  shadows: 4,
  highlights: 0,
  colorBrightness: 1.95,
  colorSaturation: 2,
  wireframe: false,
  colorBlending: 9,
  backgroundColor: '#003FFF',
  backgroundAlpha: 1,
  grainScale: 6,
  grainSparsity: 0,
  grainIntensity: 0.125,
  grainSpeed: 0,
  resolution: 1.15,
  yOffset: 16,
  yOffsetWaveMultiplier: 4.5,
  yOffsetColorMultiplier: 4.8,
  yOffsetFlowMultiplier: 5.2,
  flowDistortionA: 0.4,
  flowDistortionB: 10,
  flowScale: 3.3,
  flowEase: 0.37,
  flowEnabled: true,
  mouseDistortionStrength: 0.15,
  mouseDistortionRadius: 0.4,
  mouseDecayRate: 0.96,
  mouseDarken: 0.24,
  enableProceduralTexture: false,
  textureVoidLikelihood: 0.06,
  textureVoidWidthMin: 10,
  textureVoidWidthMax: 500,
  textureBandDensity: 0.8,
  textureColorBlending: 0.06,
  textureSeed: 333,
  textureEase: 0.38,
  proceduralBackgroundColor: '#003FFF',
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
};

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Active colors from config
    const activeColors = config.colors.filter(c => c.enabled).map(c => c.color);

    // Helper to convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    const colorRgb = activeColors.map(hexToRgb);
    const bgRgb = hexToRgb(config.backgroundColor);

    // A simplified 2D canvas approximation of the WebGL fluid shader
    // Since we don't have the full WebGL shader source, we simulate the fluid blobs and grain
    const render = () => {
      time += config.speed * 0.005;

      // Fill background
      ctx.fillStyle = `rgba(${bgRgb.r}, ${bgRgb.g}, ${bgRgb.b}, ${config.backgroundAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw fluid blobs
      ctx.globalCompositeOperation = 'source-over';
      
      const drawBlob = (x: number, y: number, radius: number, colorIdx: number, tOffset: number) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const c = colorRgb[colorIdx % colorRgb.length];
        gradient.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${0.8 * config.colorBrightness})`);
        gradient.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      const w = canvas.width;
      const h = canvas.height;
      const baseRadius = Math.max(w, h) * 0.6;

      // Simulate fluid distortion and flow
      const flowX = Math.sin(time * config.flowEase) * config.flowDistortionA * w;
      const flowY = Math.cos(time * config.flowEase) * config.flowDistortionB * h * 0.1;

      drawBlob(
        w * 0.2 + Math.sin(time + 0) * w * 0.3 + flowX,
        h * 0.2 + Math.cos(time + 1) * h * 0.3 + flowY,
        baseRadius * 1.2,
        0,
        time
      );

      drawBlob(
        w * 0.8 + Math.sin(time + 2) * w * 0.3 - flowX,
        h * 0.8 + Math.cos(time + 3) * h * 0.3 - flowY,
        baseRadius * 1.4,
        1,
        time
      );

      drawBlob(
        w * 0.5 + Math.sin(time + 4) * w * 0.4 + flowX * 0.5,
        h * 0.5 + Math.cos(time + 5) * h * 0.4 + flowY * 0.5,
        baseRadius * 1.1,
        2,
        time
      );

      drawBlob(
        w * 0.1 + Math.sin(time + 6) * w * 0.2 - flowX * 0.8,
        h * 0.9 + Math.cos(time + 7) * h * 0.2 + flowY * 0.8,
        baseRadius * 1.3,
        3,
        time
      );

      ctx.globalCompositeOperation = 'source-over';

      // Apply grain
      if (config.grainIntensity > 0) {
        // We use a CSS filter for grain instead of canvas pixel manipulation for performance
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#003FFF]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: `saturate(${config.colorSaturation}) blur(${10 - config.colorBlending}px)` }}
      />
      {/* SVG Noise Filter for Grain */}
      <div 
        className="absolute inset-0 opacity-[0.125] mix-blend-overlay pointer-events-none"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          transform: `scale(${config.grainScale / 2})`
        }}
      />
    </div>
  );
}
