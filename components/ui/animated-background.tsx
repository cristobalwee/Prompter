"use client";

import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Function to draw the background with specks
    const drawBackground = () => {
      // Clear canvas and set background
      ctx.fillStyle = '#1D1D1D';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Generate random specks
      const speckCount = Math.floor((canvas.width * canvas.height) / 1000); // Adjust density as needed
      
      for (let i = 0; i < speckCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        // Random brightness for specks (light gray to white)
        const brightness = Math.random() * 0.7 + 0.3; // 0.3 to 1.0
        const color = `rgb(${Math.floor(255 * brightness)}, ${Math.floor(255 * brightness)}, ${Math.floor(255 * brightness)})`;
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1); // 1x1 pixel specks
      }
    };

    // Set canvas size to match the full document height
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight
      );
      // Redraw the background after resizing
      drawBackground();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: '#1D1D1D' }}
      />
    </div>
  );
}