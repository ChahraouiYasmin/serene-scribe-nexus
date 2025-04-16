
import { useState } from "react";
import { Send, Link } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageBubble } from "./MessageBubble";
import { UrlPreview } from "./UrlPreview";

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-50/50 to-purple-50/50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <MessageBubble 
          message="Hello! Share a URL and I'll help you analyze it." 
          isUser={false} 
          timestamp="Just now" 
        />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white/50 backdrop-blur-sm">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            <Link className="h-4 w-4" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message or paste a URL..."
            className="flex-1"
          />
          <Button type="submit" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};
