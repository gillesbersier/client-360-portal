import { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  title: string;
  icon: LucideIcon;
  angle: number;
  radius: number;
  isActive?: boolean;
  isDimmed?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const ModuleCard = ({ title, icon: Icon, angle, radius, isActive, isDimmed, onClick }: ModuleCardProps) => {
  // Calculate position based on angle
  const angleRad = (angle - 90) * (Math.PI / 180);
  const x = Math.cos(angleRad) * radius;
  const y = Math.sin(angleRad) * radius;

  return (
    <div
      onClick={onClick}
      className={`absolute flex flex-col items-center justify-center w-28 h-20 rounded-xl shadow-lg cursor-pointer transition-all duration-300 z-20
        ${isActive
          ? 'scale-125 bg-platform-purple-light shadow-xl shadow-platform-purple/50 z-30'
          : 'bg-platform-purple shadow-platform-purple/30 hover:scale-110 hover:shadow-xl hover:shadow-platform-purple/50 hover:bg-platform-purple-light'}
        ${isDimmed ? 'opacity-20 scale-90 pointer-events-none' : 'opacity-100'}
      `}
      style={{
        transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
        left: '50%',
        top: '50%',
      }}
    >
      <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-platform-purple-dark' : 'text-white'}`} />
      <span className={`text-xs font-medium text-center px-2 leading-tight ${isActive ? 'text-platform-purple-dark font-bold' : 'text-white'}`}>
        {title}
      </span>
    </div>
  );
};

export default ModuleCard;
