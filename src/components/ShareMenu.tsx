
import { WordPressPost } from "@/types/wordpress";
import { useRef, useEffect } from "react";
import { toast } from "sonner";

interface ShareMenuProps {
  post: WordPressPost;
  onClose: () => void;
}

const ShareMenu = ({ post, onClose }: ShareMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const shareOptions = [
    { name: "Copy Link", action: () => {
      navigator.clipboard.writeText(post.link);
      toast.success("Link copied to clipboard");
      onClose();
    }},
    { name: "WhatsApp", action: () => {
      window.open(`https://wa.me/?text=${encodeURIComponent(post.title.rendered + " " + post.link)}`, '_blank');
      onClose();
    }},
    { name: "Facebook", action: () => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(post.link)}`, '_blank');
      onClose();
    }},
    { name: "Twitter", action: () => {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(post.link)}&text=${encodeURIComponent(post.title.rendered)}`, '_blank');
      onClose();
    }}
  ];

  return (
    <div 
      className="absolute right-2 top-12 z-10 bg-white rounded-lg shadow-lg border border-gray-200"
      ref={menuRef}
    >
      <div className="p-2">
        <p className="text-sm font-medium px-3 py-2 border-b border-gray-100">Share via</p>
        <div className="mt-1">
          {shareOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareMenu;
