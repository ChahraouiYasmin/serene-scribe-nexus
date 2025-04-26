
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
        "max-w-[80%] mb-4",
        isUser ? "ml-auto" : "mr-auto"
      )}
    >
      <div className={cn(
        "rounded-2xl px-4 py-2 shadow-sm backdrop-blur-sm",
        isUser 
          ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white" 
          : "bg-white/80 text-purple-900 border border-purple-100"
      )}>
        <p className="leading-relaxed">{message}</p>
      </div>
      <span className="text-xs text-purple-400 mt-1 block text-right">
        {timestamp}
      </span>
    </motion.div>
  );
};
