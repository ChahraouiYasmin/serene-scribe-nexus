
import { useState } from "react";
import { Search, Clock, MessageCircle, MessageSquareHeart, PlusCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-80 border-r border-purple-100 bg-white/70 backdrop-blur-sm p-4 flex flex-col h-full">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MessageSquareHeart className="h-6 w-6 text-purple-500" />
            <h2 className="text-lg font-semibold text-purple-900">Chat History</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-purple-200 hover:bg-purple-50 text-purple-600"
            onClick={() => window.location.reload()} // Simple reload for now to start fresh chat
          >
            <PlusCircle className="h-4 w-4" />
            New Chat
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search conversations..."
            className="pl-10 border-purple-100 focus:border-purple-200 bg-white/50"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3">
        <div className="text-sm font-medium text-purple-600 mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Conversations
        </div>
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-3 rounded-lg cursor-pointer transition-all",
              "hover:bg-purple-50/50 group",
              "border border-purple-100/50"
            )}
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 text-purple-400 group-hover:text-purple-500" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-purple-900 mb-1">
                  Chat Session {i}
                </h3>
                <p className="text-xs text-purple-600 truncate">
                  Last message from this conversation...
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
