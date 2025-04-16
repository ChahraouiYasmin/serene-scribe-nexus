
interface UrlPreviewProps {
  url: string;
  title?: string;
  description?: string;
}

export const UrlPreview = ({ url, title, description }: UrlPreviewProps) => {
  return (
    <div className="w-full max-w-2xl p-4 my-2 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <a href={url} target="_blank" rel="noopener noreferrer" className="no-underline">
        <h3 className="text-lg font-medium text-gray-800 mb-1">{title || url}</h3>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
        <span className="text-xs text-blue-500 mt-2 block">{url}</span>
      </a>
    </div>
  );
};
