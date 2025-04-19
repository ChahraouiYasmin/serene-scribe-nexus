
import { Globe, ExternalLink, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

interface UrlPreviewProps {
  url: string;
  title?: string;
  description?: string;
}

export const UrlPreview = ({ url, title, description }: UrlPreviewProps) => {
  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full max-w-2xl p-4 rounded-lg bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-sm border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center gap-4 no-underline"
      >
        <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-full p-3 group-hover:scale-105 transition-transform">
          <Globe className="h-6 w-6 text-purple-500" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <LinkIcon className="h-3 w-3 text-purple-400" />
            <h3 className="text-lg font-medium text-purple-900 flex items-center gap-2">
              {title || new URL(url).hostname}
              <ExternalLink className="h-4 w-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
          </div>
          {description && (
            <p className="text-purple-600 text-sm leading-relaxed">{description}</p>
          )}
          <span className="text-xs text-purple-500 mt-2 block opacity-70">{url}</span>
        </div>
      </a>
    </motion.div>
  );
};
