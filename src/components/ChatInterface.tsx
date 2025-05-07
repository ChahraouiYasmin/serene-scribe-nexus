
import { useState, useRef } from "react";
import { Send, Link, X, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageBubble } from "./MessageBubble";
import { UrlPreview } from "./UrlPreview";
import { motion } from "framer-motion";
import { UrlInputModal } from "./UrlInputModal";
import { useToast } from "@/hooks/use-toast";

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{
    id: number;
    text: string;
    isUser: boolean;
    timestamp: string;
  }>>([{
    id: 0,
    text: "Hello! Paste a URL or send a PDF and ask a question. I'll help you analyze it!",
    isUser: false,
    timestamp: "Just now"
  }]);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const newMessage = {
      id: messages.length,
      text: message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleUrlSubmit = (url: string) => {
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (urlRegex.test(url)) {
      const urlMessage = {
        id: messages.length,
        text: `Analyzing: ${url}`,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const responseMessage = {
        id: messages.length + 1,
        text: "Thank you for providing the URL. If you have any questions about it, feel free to ask!",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages([...messages, urlMessage, responseMessage]);

      toast({
        title: "URL Analysis Started",
        description: `Analyzing content from ${new URL(url).hostname}`
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const fileName = file.name;
      
      const fileMessage = {
        id: messages.length,
        text: `Uploaded: ${fileName}`,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const responseMessage = {
        id: messages.length + 1,
        text: "Thank you for providing the PDF. If you have any questions about it, feel free to ask!",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      
      setMessages([...messages, fileMessage, responseMessage]);
      
      toast({
        title: "PDF Upload Successful",
        description: `Analyzing content from ${fileName}`
      });
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else if (file) {
      toast({
        title: "Invalid File Format",
        description: "Please upload a PDF file.",
        variant: "destructive"
      });
    }
  };

  const newChat = () => {
    window.location.reload();
  };

  const handlePdfButtonClick = () => {
    fileInputRef.current?.click();
  };

  return <div className="flex flex-col h-full bg-gradient-to-b from-purple-50/50 to-purple-100/30">
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-fuchsia-50 relative">
        <div className="absolute top-4 right-4">
          
        </div>
        
        {messages.map(msg => <MessageBubble key={msg.id} message={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />)}
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 border-t border-purple-100 backdrop-blur-sm bg-purple-50">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Button type="button" variant="outline" size="icon" className="shrink-0 border-purple-200 hover:bg-purple-50" onClick={() => setIsUrlModalOpen(true)}>
            <Link className="h-4 w-4 text-purple-500" />
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            className="shrink-0 border-purple-200 hover:bg-purple-50" 
            onClick={handlePdfButtonClick}
          >
            <FileText className="h-4 w-4 text-purple-500" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="application/pdf"
            className="hidden"
          />
          <Input value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message or paste a URL..." className="flex-1 border-purple-200 focus:border-purple-300 bg-white/80" />
          <Button type="submit" className="shrink-0 bg-purple-500 hover:bg-purple-600">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <UrlInputModal isOpen={isUrlModalOpen} onClose={() => setIsUrlModalOpen(false)} onSubmit={handleUrlSubmit} />
    </div>;
};
