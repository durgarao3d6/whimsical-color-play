import { useState, useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageCircle, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import ChatMessages from "./chat/ChatMessages";
import ChatInput from "./chat/ChatInput";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const FloatingChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! How can I help you today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { text: inputValue, sender: "user" }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        text: "Thanks for your message! I'll get back to you soon.", 
        sender: "bot" 
      }]);
      toast({
        title: "New message",
        description: "You have received a new message",
        duration: 3000,
      });
    }, 1500);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Button
            className="h-14 w-14 rounded-full shadow-lg bg-secondary hover:bg-secondary/90"
            size="icon"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
        </motion.div>
      </SheetTrigger>
      <SheetContent side="right" className="w-[90vw] sm:w-[400px] p-0">
        <div className="flex flex-col h-full bg-primary/5">
          <div className="p-4 border-b bg-white">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Bot className="h-5 w-5 text-secondary" />
              Chat Support
            </h2>
          </div>
          
          <ChatMessages messages={messages} isTyping={isTyping} />
          <div ref={messagesEndRef} />
          
          <ChatInput 
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSendMessage}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FloatingChat;