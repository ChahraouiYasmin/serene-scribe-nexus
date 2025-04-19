
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock, CheckCheck, Link } from "lucide-react";

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
        "max-w-[80%] mb-4 group",
        isUser ? "ml-auto" : "mr-auto"
      )}
    >
      <div className={cn(
        "rounded-2xl px-4 py-3 shadow-sm backdrop-blur-sm relative group",
        isUser 
          ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white" 
          : "bg-white/80 text-purple-900 border border-purple-100"
      )}>
        <p className="leading-relaxed">{message}</p>
        {message.includes("http") && (
          <Link className={cn(
            "absolute -top-2 -right-2 h-4 w-4",
            isUser ? "text-white/70" : "text-purple-400"
          )} />
        )}
      </div>
      <div className={cn(
        "flex items-center gap-1 mt-1",
        isUser ? "justify-end" : "justify-start"
      )}>
        <Clock className={cn(
          "h-3 w-3",
          isUser ? "text-purple-300" : "text-purple-400"
        )} />
        <span className={cn(
          "text-xs",
          isUser ? "text-purple-300" : "text-purple-400"
        )}>
          {timestamp}
        </span>
        {isUser && (
          <CheckCheck className="h-3 w-3 text-purple-300 ml-1" />
        )}
      </div>
    </motion.div>
  );
};
