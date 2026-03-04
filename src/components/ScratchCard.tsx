import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScratchCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  // Track scratch amount simply
  const scratchCount = useRef(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Gold gradient background
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#B8860B");
    gradient.addColorStop(0.5, "#FFD700");
    gradient.addColorStop(1, "#B8860B");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Scratch text
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.font = "bold 16px serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ Scratch to Reveal ✦", rect.width / 2, rect.height / 2);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2); // Bigger brush size
    ctx.fill();

    scratchCount.current += 1;

    // Reveal faster (after ~60 scratches)
    if (scratchCount.current > 60) {
      setIsRevealed(true);
    }
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching) return;

    const clientX =
      "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : e.clientY;

    scratch(clientX, clientY);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-72 h-36 md:w-80 md:h-40 mx-auto rounded-xl overflow-hidden border-2 border-primary/40 shadow-lg"
    >
      {/* Content underneath */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary">
        <p className="text-sm text-muted-foreground mb-1">
          The Nikah Date
        </p>
        <p className="text-2xl md:text-3xl text-primary font-bold">
          December 20, 2025
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Saturday • 5:00 PM
        </p>
      </div>

      {/* Scratch Layer */}
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