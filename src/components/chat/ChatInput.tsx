import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ChatInput = ({ value, onChange, onSubmit }: ChatInputProps) => {
  return (
    <form onSubmit={onSubmit} className="border-t p-4 bg-white">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button 
          type="submit" 
          size="icon"
          className="bg-secondary hover:bg-secondary/90"
          disabled={!value.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;