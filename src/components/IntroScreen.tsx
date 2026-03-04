import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import arabesquePattern from "@/assets/arabesque-pattern.jpg";

interface IntroScreenProps {
  onOpen: () => void;
}

const Sparkle = ({ x, y }: { x: number; y: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-primary"
    style={{ left: x, top: y }}
    initial={{ opacity: 1, scale: 0 }}
    animate={{
      opacity: [1, 0],
      scale: [0, 1.5],
      y: [0, -60],
      x: [0, (Math.random() - 0.5) * 80],
    }}
    transition={{ duration: 1, ease: "easeOut" }}
  />
);

const IntroScreen = ({ onOpen }: IntroScreenProps) => {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isExiting, setIsExiting] = useState(false);

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Add sparkles
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 40,
    }));
    setSparkles((prev) => [...prev, ...newSparkles]);
    setTimeout(() => setSparkles((prev) => prev.filter((s) => !newSparkles.includes(s))), 1200);

    setIsExiting(true);
    setTimeout(onOpen, 800);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(180deg, hsl(152 69% 3%) 0%, hsl(152 50% 8%) 50%, hsl(152 69% 3%) 100%)`,
          }}
        >
          {/* Background pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url(${arabesquePattern})`,
              backgroundSize: "400px",
              backgroundRepeat: "repeat",
            }}
          />

          {/* Crescent Moon */}
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative mb-8"
          >
            <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-lg">
              <defs>
                <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(43 72% 53%)" />
                  <stop offset="100%" stopColor="hsl(43 80% 70%)" />
                </linearGradient>
              </defs>
              <motion.path
                d="M60 10 C35 10 15 30 15 60 C15 90 35 110 60 110 C45 95 40 75 45 55 C50 35 55 20 60 10Z"
                fill="url(#moonGrad)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ boxShadow: ["0 0 20px hsl(43 72% 53% / 0.3)", "0 0 60px hsl(43 72% 53% / 0.5)", "0 0 20px hsl(43 72% 53% / 0.3)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Bismillah */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-arabic text-5xl md:text-7xl text-gold-gradient mb-4 text-center px-4"
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="font-body text-lg text-muted-foreground mb-12 text-center px-4"
          >
            In the name of Allah, the Most Gracious, the Most Merciful
          </motion.p>

          {/* Tap to Open Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            onClick={handleTap}
            className="relative px-10 py-4 rounded-full border-2 border-primary/60 font-display text-lg tracking-widest uppercase transition-all hover:border-primary hover:shadow-gold bg-secondary/30 backdrop-blur-sm text-primary"
          >
            <span className="shimmer-gold absolute inset-0 rounded-full" />
            <span className="relative z-10">Tap to Open Invitation</span>
          </motion.button>

          {/* Sparkles */}
          {sparkles.map((sparkle) => (
            <Sparkle key={sparkle.id} x={sparkle.x} y={sparkle.y} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
