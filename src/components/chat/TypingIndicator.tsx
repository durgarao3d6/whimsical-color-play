import { Bot } from "lucide-react";
import { motion } from "framer-motion";

const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2"
    >
      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
        <Bot className="h-4 w-4 text-secondary" />
      </div>
      <div className="bg-white rounded-lg p-3 shadow-sm">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-secondary/40 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
          <span className="w-2 h-2 bg-secondary/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          <span className="w-2 h-2 bg-secondary/40 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;