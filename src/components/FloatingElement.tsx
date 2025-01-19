import { motion } from "framer-motion";

interface FloatingElementProps {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

const FloatingElement = ({ delay = 0, className = "", children }: FloatingElementProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay,
        duration: 0.5,
        y: {
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;