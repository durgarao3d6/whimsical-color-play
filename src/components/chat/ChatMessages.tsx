import { Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TypingIndicator from "./TypingIndicator";

interface Message {
  text: string;
  sender: "user" | "bot";
}

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatMessages = ({ messages, isTyping }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-start gap-2 max-w-[80%]">
              {message.sender === "bot" && (
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-secondary" />
                </div>
              )}
              <div
                className={`rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-secondary text-white"
                    : "bg-white shadow-sm"
                }`}
              >
                {message.text}
              </div>
              {message.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {isTyping && <TypingIndicator />}
      </AnimatePresence>
    </div>
  );
};

export default ChatMessages;