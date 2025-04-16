
import { useState } from "react";
import { Send, Link, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageBubble } from "./MessageBubble";
import { UrlPreview } from "./UrlPreview";

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{
    id: number;
    text: string;
    isUser: boolean;
    timestamp: string;
  }>>([
    {
      id: 0,
      text: "Hello! Share a URL and I'll help you analyze it.",
      isUser: false,
      timestamp: "Just now"
    }
  ]);
  
  const [urlPreview, setUrlPreview] = useState<{
    url: string;
    title?: string;
    description?: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length,
      text: message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleUrlPaste = (url: string) => {
    // Basic URL validation
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (urlRegex.test(url)) {
      setUrlPreview({
        url,
        title: new URL(url).hostname,
        description: "Click to analyze this URL"
      });
    }
  };

  const clearUrlPreview = () => {
    setUrlPreview(null);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-50/50 to-purple-50/50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id}
            message={msg.text} 
            isUser={msg.isUser} 
            timestamp={msg.timestamp} 
          />
        ))}
        
        {urlPreview && (
          <div className="flex items-center gap-2">
            <UrlPreview 
              url={urlPreview.url}
              title={urlPreview.title}
              description={urlPreview.description}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={clearUrlPreview}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white/50 backdrop-blur-sm">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="shrink-0"
            onClick={() => {
              const url = prompt("Enter URL to analyze:");
              if (url) handleUrlPaste(url);
            }}
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
