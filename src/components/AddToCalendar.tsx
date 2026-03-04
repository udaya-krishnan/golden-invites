import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";

const AddToCalendar = () => {
  const handleClick = () => {
    const event = {
      text: "Nikah Ceremony - Ahmed & Fatima",
      dates: "20251220T170000/20251220T210000",
      details: "You are cordially invited to the Nikah ceremony of Ahmed & Fatima. May Allah bless this union.",
      location: "Grand Mosque Convention Center, 123 Islamic Center Drive",
    };
    const url = `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;
    window.open(url, "_blank");
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="inline-flex items-center gap-3 px-8 py-3 rounded-full border-2 border-primary/60 bg-secondary/30 backdrop-blur-sm font-display text-sm tracking-widest uppercase transition-all hover:border-primary hover:shadow-gold text-primary"
    >
      <CalendarPlus className="w-5 h-5" />
      Add to Calendar
    </motion.button>
  );
};

export default AddToCalendar;
