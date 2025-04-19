
import { useState } from "react";
import { Search, Clock, MessageCircle, MessageSquareHeart, Star, Bookmark, Archive, Settings, Moon, Filter } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-80 border-r border-purple-100 bg-white/70 backdrop-blur-sm p-4 flex flex-col h-full shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquareHeart className="h-7 w-7 text-purple-500" />
          <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Chat History</h2>
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400 group-hover:text-purple-600 transition-colors" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search conversations..."
            className="pl-10 border-purple-100 focus:border-purple-200 bg-white/50 hover:bg-white/70 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 px-2 mb-4">
        <Filter className="h-4 w-4 text-purple-400" />
        <span className="text-sm font-medium text-purple-600">Filters</span>
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
              "p-4 rounded-lg cursor-pointer transition-all",
              "hover:bg-purple-50/50 group",
              "border border-purple-100/50 shadow-sm hover:shadow-md"
            )}
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-purple-400 group-hover:text-purple-500" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-purple-900 mb-1 flex items-center gap-2">
                  Chat Session {i}
                  {i === 1 && <Star className="h-3 w-3 text-yellow-400" />}
                </h3>
                <p className="text-xs text-purple-600 truncate">
                  Last message from this conversation...
                </p>
              </div>
              <div className="flex gap-2">
                <Bookmark className="h-4 w-4 text-purple-300 hover:text-purple-500 transition-colors" />
                <Archive className="h-4 w-4 text-purple-300 hover:text-purple-500 transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-purple-100">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-purple-600 hover:text-purple-700 cursor-pointer">
            <Settings className="h-4 w-4" />
            <span className="text-sm">Settings</span>
          </div>
          <div className="flex items-center gap-2 text-purple-600 hover:text-purple-700 cursor-pointer">
            <Moon className="h-4 w-4" />
            <span className="text-sm">Theme</span>
          </div>
        </div>
      </div>
    </div>
  );
};
