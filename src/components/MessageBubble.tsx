
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export const MessageBubble = ({ message, isUser, timestamp }: MessageBubbleProps) => {
  return (
    <div className={cn(
      "max-w-[80%] mb-4 animate-fade-in",
      isUser ? "ml-auto" : "mr-auto"
    )}>
      <div className={cn(
        "rounded-2xl px-4 py-2 shadow-sm",
        isUser ? "bg-gradient-to-r from-blue-50 to-blue-100" : "bg-white"
      )}>
        <p className="text-gray-800">{message}</p>
      </div>
      <span className="text-xs text-gray-500 mt-1 block">
        {timestamp}
      </span>
    </div>
  );
};
