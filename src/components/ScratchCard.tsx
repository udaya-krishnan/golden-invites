import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScratchCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const scratchedRef = useRef(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Gold textured surface
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#B8860B");
    gradient.addColorStop(0.3, "#DAA520");
    gradient.addColorStop(0.5, "#FFD700");
    gradient.addColorStop(0.7, "#DAA520");
    gradient.addColorStop(1, "#B8860B");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Text on scratch surface
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.font = "bold 14px 'Playfair Display', serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ Scratch to Reveal ✦", rect.width / 2, rect.height / 2 + 5);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    scratchedRef.current = transparent / (imageData.data.length / 4);

    if (scratchedRef.current > 0.6) {
      setIsRevealed(true);
    }
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    scratch(clientX, clientY);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-72 h-36 md:w-80 md:h-40 mx-auto rounded-xl overflow-hidden border-2 border-primary/40 shadow-gold"
    >
      {/* Reveal content underneath */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary">
        <p className="font-arabic text-sm text-muted-foreground mb-1">The Nikah Date</p>
        <p className="font-display text-2xl md:text-3xl text-primary">December 20, 2025</p>
        <p className="font-body text-sm text-muted-foreground mt-1">Saturday • 5:00 PM</p>
      </div>

      {/* Scratch canvas */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.canvas
            ref={canvasRef}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full cursor-pointer touch-none"
            onMouseDown={() => setIsScratching(true)}
            onMouseMove={handleMove}
            onMouseUp={() => setIsScratching(false)}
            onMouseLeave={() => setIsScratching(false)}
            onTouchStart={() => setIsScratching(true)}
            onTouchMove={handleMove}
            onTouchEnd={() => setIsScratching(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ScratchCard;
