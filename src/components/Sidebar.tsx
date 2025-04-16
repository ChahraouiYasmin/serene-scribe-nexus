
import { useState } from "react";
import { Search, Clock } from "lucide-react";
import { Input } from "./ui/input";

export const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-80 border-r bg-white/70 backdrop-blur-sm p-4 flex flex-col h-full">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search conversations..."
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2">
        <div className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Conversations
        </div>
        {/* Conversation history items will go here */}
      </div>
    </div>
  );
};
