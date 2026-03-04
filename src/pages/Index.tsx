import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroScreen from "@/components/IntroScreen";
import InvitationMain from "@/components/InvitationMain";
import MusicToggle from "@/components/MusicToggle";

const Index = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <MusicToggle shouldPlay={isOpened} />
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <IntroScreen key="intro" onOpen={() => setIsOpened(true)} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <InvitationMain />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
