import { motion } from "framer-motion";

const OrnateDivider = () => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="ornate-divider my-8 mx-auto max-w-xs"
  >
    <span className="text-primary text-2xl">✦</span>
  </motion.div>
);

export default OrnateDivider;
