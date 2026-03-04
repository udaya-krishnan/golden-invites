import { motion } from "framer-motion";
import lanternImg from "@/assets/lantern.png";

const lanterns = [
  { x: "5%", delay: 0, duration: 12, size: 60 },
  { x: "85%", delay: 2, duration: 15, size: 50 },
  { x: "15%", delay: 4, duration: 10, size: 40 },
  { x: "75%", delay: 1, duration: 14, size: 45 },
  { x: "50%", delay: 3, duration: 11, size: 35 },
  { x: "35%", delay: 5, duration: 13, size: 55 },
];

const FloatingLanterns = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {lanterns.map((lantern, i) => (
        <motion.div
          key={i}
          className="absolute opacity-30"
          style={{ left: lantern.x, bottom: "-100px" }}
          animate={{
            y: [0, -window.innerHeight - 200],
            x: [0, Math.sin(i) * 30, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: lantern.duration,
            delay: lantern.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <img
            src={lanternImg}
            alt=""
            style={{ width: lantern.size, height: "auto" }}
            className="drop-shadow-lg"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingLanterns;
