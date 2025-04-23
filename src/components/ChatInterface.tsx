import { useState } from "react";
import { Send, Link, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageBubble } from "./MessageBubble";
import { UrlPreview } from "./UrlPreview";
import { motion } from "framer-motion";
import { UrlInputModal } from "./UrlInputModal";
import { useToast } from "@/hooks/use-toast";

// Backend call for URL + question
const askBackend = async (url: string, question: string): Promise<string> => {
  try {
    const response = await fetch("http://127.0.0.1:5000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, question }),
    });

    const data = await response.json();
    return data.answer || "❌ No answer received.";
  } catch (err) {
    console.error("Backend error:", err);
    return "❌ Could not reach the backend. Please try again.";
  }
};

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{
    id: number;
    text: string;
    isUser: boolean;
    timestamp: string;
  }>>([{
    id: 0,
    text: "👋 Hello! Paste a URL and ask a question. I’ll help you analyze it!",
    isUser: false,
    timestamp: "Just now"
  }]);

  const [urlPreview, setUrlPreview] = useState<{
    url: string;
    title?: string;
    description?: string;
  } | null>(null);

  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage = {
      id: messages.length,
      text: trimmed,
      isUser: true,
      timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    if (currentUrl) {
      const botReply = await askBackend(currentUrl, trimmed);
      const botMessage = {
        id: messages.length + 1,
        text: botReply,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } else {
      const botMessage = {
        id: messages.length + 1,
        text: "❌ Please enter a URL using the 🔗 button before asking a question.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const handleUrlPaste = (url: string) => {
    const urlRegex = /^https?:\/\/[^\s]+$/;
    if (urlRegex.test(url)) {
      setCurrentUrl(url);
      setUrlPreview({
        url,
        title: new URL(url).hostname,
        description: "Click to analyze this URL",
      });

      const urlMessage = {
        id: messages.length + 1,
        text: `🔗 URL pasted: ${url}`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      const acknowledgmentMessage = {
        id: messages.length + 2,
        text: "✅ Thank you for providing the URL. If you have any questions about it, feel free to ask!",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, urlMessage, acknowledgmentMessage]);

      toast({
        title: "URL Analysis Started",
        description: `Analyzing content from ${new URL(url).hostname}`
      });
    }
  };

  const clearUrlPreview = () => {
    setCurrentUrl(null);
    setUrlPreview(null);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-50/50 to-purple-100/30">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.text}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
          />
        ))}

        {urlPreview && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2"
          >
            <UrlPreview
              url={urlPreview.url}
              title={urlPreview.title}
              description={urlPreview.description}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={clearUrlPreview}
              className="text-purple-400 hover:text-purple-600 hover:bg-purple-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 border-t border-purple-100 bg-white/50 backdrop-blur-sm"
      >
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="shrink-0 border-purple-200 hover:bg-purple-50"
            onClick={() => {
              const url = prompt("Paste a URL to analyze:");
              if (url) handleUrlPaste(url);
            }}
          >
            <Link className="h-4 w-4 text-purple-500" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              currentUrl
                ? "Ask a question about the URL..."
                : "Paste a URL first using the 🔗 icon"
            }
            className="flex-1 border-purple-200 focus:border-purple-300 bg-white/80"
          />
          <Button
            type="submit"
            className="shrink-0 bg-purple-500 hover:bg-purple-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <UrlInputModal
        isOpen={isUrlModalOpen}
        onClose={() => setIsUrlModalOpen(false)}
        onSubmit={handleUrlPaste}
      />
    </div>
  );
};
