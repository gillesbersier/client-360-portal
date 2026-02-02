import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Camera } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

interface CustomerHubProps {
  name: string;
  company: string;
  avatarUrl?: string; // Initial/default avatar
  onToggle?: () => void;
  isDraggable?: boolean;
}

const CustomerHub = ({ name, company, avatarUrl: initialAvatarUrl, onToggle, isDraggable }: CustomerHubProps) => {
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(initialAvatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Only allow file upload if NOT draggable (i.e. expanded)
    if (!isDraggable) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image too large", { description: "Please upload an image smaller than 5MB." });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Invalid file type", { description: "Please upload an image file." });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        toast.success("Avatar updated");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Outer glow ring - Increased size */}
      <div className="absolute w-56 h-56 rounded-full bg-platform-purple/20 animate-pulse pointer-events-none" />

      {/* Main circle with border - Increased size */}
      <div
        className="relative w-48 h-48 rounded-full bg-platform-purple-dark flex flex-col items-center justify-center shadow-lg shadow-platform-purple/30 z-10 cursor-pointer hover:bg-platform-purple-dark/90 transition-colors"
        onClick={onToggle}
      >

        {/* Avatar Container with Hover Effect */}
        <div
          className="relative group cursor-pointer mb-2"
          onClick={handleAvatarClick}
        >
          <Avatar className="w-24 h-24 border-2 border-platform-purple-light transition-transform duration-300 group-hover:scale-105 group-hover:border-white">
            <AvatarImage src={avatarPreview} alt={name} className="object-cover" />
            <AvatarFallback className="bg-platform-purple text-white">
              <User className="w-10 h-10" />
            </AvatarFallback>
          </Avatar>

          {/* Overlay Icon on Hover */}
          <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Camera className="w-8 h-8 text-white/90" />
          </div>
        </div>

        <span className="text-white text-lg font-bold text-center px-4 leading-tight">{name}</span>
        <span className="text-platform-purple-light text-sm text-center px-4 mt-1">{company}</span>
      </div>
    </div>
  );
};

export default CustomerHub;
