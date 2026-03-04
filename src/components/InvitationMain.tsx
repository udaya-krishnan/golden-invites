import { motion } from "framer-motion";
import { MapPin, Clock, Heart } from "lucide-react";
import mosqueBg from "@/assets/mosque-bg.jpg";
import CountdownTimer from "./CountdownTimer";
import ScratchCard from "./ScratchCard";
import AddToCalendar from "./AddToCalendar";
import OrnateDivider from "./OrnateDiv";
import FloatingLanterns from "./FloatingLanterns";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.8, ease: "easeOut" as const },
};

const InvitationMain = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingLanterns />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${mosqueBg})` }}
        />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-lg mx-auto">
          <motion.p {...fadeUp} className="font-arabic text-lg md:text-xl text-muted-foreground mb-2">
            بِسْمِ اللَّهِ
          </motion.p>

          <motion.p
            {...fadeUp}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-body text-sm md:text-base text-muted-foreground tracking-widest uppercase mb-8"
          >
            Together with the blessings of Allah
          </motion.p>

          <motion.p
            {...fadeUp}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-body text-sm text-muted-foreground tracking-wider mb-6"
          >
            Request the honour of your presence at the Nikah ceremony of
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ delay: 0.4, duration: 1 }}
            className="font-display text-5xl md:text-7xl text-gold-gradient mb-2 leading-tight"
          >
            Ahmed
          </motion.h1>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center gap-4 my-4"
          >
            <div className="h-px w-16 bg-primary/40" />
            <Heart className="w-5 h-5 text-primary glow-pulse" />
            <div className="h-px w-16 bg-primary/40" />
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ delay: 0.6, duration: 1 }}
            className="font-display text-5xl md:text-7xl text-gold-gradient mb-8 leading-tight"
          >
            Fatima
          </motion.h1>

          <OrnateDivider />

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-body text-sm md:text-base">Saturday, December 20, 2025 • 5:00 PM</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-body text-sm md:text-base">Grand Mosque Convention Center</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="relative z-10 py-16 px-6 text-center">
        <motion.h2
          {...fadeUp}
          className="font-display text-2xl md:text-3xl text-primary mb-2"
        >
          Counting Down To Our Day
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.1 }}
          className="font-body text-muted-foreground mb-10 text-sm"
        >
          In Sha Allah
        </motion.p>
        <CountdownTimer />
      </section>

      <OrnateDivider />

      {/* Scratch Card Section */}
      <section className="relative z-10 py-16 px-6 text-center">
        <motion.h2
          {...fadeUp}
          className="font-display text-2xl md:text-3xl text-primary mb-2"
        >
          Reveal the Nikah Date
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.1 }}
          className="font-body text-muted-foreground mb-10 text-sm"
        >
          Scratch the golden card below
        </motion.p>
        <ScratchCard />

        <div className="mt-10">
          <AddToCalendar />
        </div>
      </section>

      <OrnateDivider />

      {/* Photo Gallery Placeholder */}
      <section className="relative z-10 py-16 px-6 text-center">
        <motion.h2
          {...fadeUp}
          className="font-display text-2xl md:text-3xl text-primary mb-2"
        >
          Gallery
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.1 }}
          className="font-body text-muted-foreground mb-10 text-sm"
        >
          Moments to cherish forever
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square rounded-lg border border-primary/20 bg-secondary/30 flex items-center justify-center"
            >
              <span className="text-muted-foreground/40 font-arabic text-3xl">✦</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="relative z-10 py-16 px-6 text-center">
        <motion.div {...fadeUp}>
          <p className="font-arabic text-2xl text-primary mb-4">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
          </p>
          <p className="font-body text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            "And among His signs is that He created for you mates from among yourselves,
            that you may dwell in tranquility with them, and He has put love and mercy between your hearts."
          </p>
          <p className="font-body text-xs text-muted-foreground/60 mt-2">— Surah Ar-Rum 30:21</p>
        </motion.div>

        <OrnateDivider />

        <motion.p
          {...fadeUp}
          className="font-display text-lg text-primary"
        >
          #AhmedAndFatima
        </motion.p>
        <motion.p
          {...fadeUp}
          className="font-body text-xs text-muted-foreground mt-4"
        >
          We look forward to celebrating with you
        </motion.p>
      </section>
    </div>
  );
};

export default InvitationMain;
