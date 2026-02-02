import { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  title: string;
  icon: LucideIcon;
  angle: number;
  radius: number;
}

const ModuleCard = ({ title, icon: Icon, angle, radius }: ModuleCardProps) => {
  // Calculate position based on angle
  const angleRad = (angle - 90) * (Math.PI / 180);
  const x = Math.cos(angleRad) * radius;
  const y = Math.sin(angleRad) * radius;

  return (
    <div
      className="absolute flex flex-col items-center justify-center w-28 h-20 bg-platform-purple rounded-xl shadow-lg shadow-platform-purple/30 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-platform-purple/50 hover:bg-platform-purple-light z-20"
      style={{
        transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
        left: '50%',
        top: '50%',
      }}
    >
      <Icon className="w-6 h-6 text-white mb-1" />
      <span className="text-white text-xs font-medium text-center px-2 leading-tight">{title}</span>
    </div>
  );
};

export default ModuleCard;
