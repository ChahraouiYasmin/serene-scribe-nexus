
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, Sparkles, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface UrlInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
}

export const UrlInputModal = ({ isOpen, onClose, onSubmit }: UrlInputModalProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
      setUrl("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-gradient-to-br from-purple-50 via-purple-100/30 to-white border-purple-100 p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 rounded-full p-2">
                <Globe className="h-5 w-5 text-purple-500" />
              </div>
              <h2 className="text-lg font-semibold text-purple-900">Add URL to Analyze</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-purple-400 hover:text-purple-600 hover:bg-purple-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to analyze..."
                className="pr-10 border-purple-200 focus:border-purple-300 bg-white/80"
              />
              <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex justify-end"
            >
              <Button 
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
              >
                Analyze URL
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
