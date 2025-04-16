
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export const MessageBubble = ({ message, isUser, timestamp }: MessageBubbleProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "max-w-[80%] mb-4 animate-fade-in",
        isUser ? "ml-auto" : "mr-auto"
      )}
    >
      <div className={cn(
        "rounded-2xl px-4 py-2 shadow-sm transition-all duration-300",
        isUser 
          ? "bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800" 
          : "bg-white text-gray-700 border border-gray-100"
      )}>
        <p>{message}</p>
      </div>
      <span className="text-xs text-gray-500 mt-1 block text-right">
        {timestamp}
      </span>
    </motion.div>
  );
};
