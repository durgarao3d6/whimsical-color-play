import { useState, useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, Bot, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const FloatingChat = () => {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
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
        >
          <Button
            className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg bg-secondary hover:bg-secondary/90"
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
              {isTyping && (
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
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="border-t p-4 bg-white">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon"
                className="bg-secondary hover:bg-secondary/90"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FloatingChat;