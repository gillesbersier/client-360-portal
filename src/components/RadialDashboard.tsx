import {
  TrendingUp,
  ShoppingCart,
  ClipboardList,
  Package,
  FileText,
  CreditCard,
  HeadphonesIcon,
  UserCircle
} from "lucide-react";
import CustomerHub from "./CustomerHub";
import ModuleCard from "./ModuleCard";
import ConnectionLine from "./ConnectionLine";
import { useState, useEffect } from "react";

const modules = [
  { title: "Leads / Opportunités", icon: TrendingUp, angle: 0 },
  { title: "E-commerce", icon: ShoppingCart, angle: 45 },
  { title: "Commandes", icon: ClipboardList, angle: 90 },
  { title: "Fulfillment", icon: Package, angle: 135 },
  { title: "Factures", icon: FileText, angle: 180 },
  { title: "Paiements", icon: CreditCard, angle: 225 },
  { title: "Services & Support", icon: HeadphonesIcon, angle: 270 },
  { title: "Infos Client", icon: UserCircle, angle: 315 },
];

const RadialDashboard = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const moduleRadius = 240;
  const lineInnerRadius = 100;
  const lineOuterRadius = 180;
  const svgSize = 650;
  const center = svgSize / 2;

  const handleModuleClick = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveModule(activeModule === title ? null : title);
  };

  const handleBackgroundClick = () => {
    if (activeModule) {
      setActiveModule(null);
    }
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
    setActiveModule(null); // Reset active state when toggling
  };

  /* Drag & Drop State */
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.MouseEvent) => {
    // Only drag if collapsed (modules hidden)
    if (!isExpanded) {
      setIsDragging(true);
    }
  };

  // We need useEffect for window listeners to handle smooth drag outside the element
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="relative w-full max-w-[650px] aspect-square mx-auto cursor-default"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out' // Smooth reset if needed, instant drag
      }}
      onClick={handleBackgroundClick}
    >
      {/* SVG for connection lines - Only visible when expanded */}
      <svg
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isExpanded ? (activeModule ? 'opacity-20' : 'opacity-100') : 'opacity-0'}`}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        style={{ overflow: 'visible' }}
      >
        <g transform={`translate(${center}, ${center})`}>
          {modules.map((module) => (
            <ConnectionLine
              key={module.title}
              angle={module.angle}
              innerRadius={lineInnerRadius}
              outerRadius={lineOuterRadius}
            />
          ))}
        </g>
      </svg>

      {/* Module cards */}
      <div className="absolute inset-0">
        {modules.map((module) => {
          const isActive = activeModule === module.title;
          const isDimmed = activeModule !== null && !isActive;

          return (
            <ModuleCard
              key={module.title}
              title={module.title}
              icon={module.icon}
              angle={module.angle}
              // Pass 0 radius when collapsed so they move to center
              radius={isExpanded ? moduleRadius : 0}
              isActive={isActive}
              isDimmed={isDimmed}
              // Hide and disable pointer events when collapsed
              style={{
                opacity: isExpanded ? (isDimmed ? 0.2 : 1) : 0,
                pointerEvents: isExpanded ? 'auto' : 'none',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onClick={(e) => handleModuleClick(module.title, e)}
            />
          );
        })}
      </div>

      {/* Central customer hub */}
      {/* If collapsed (!isExpanded), this becomes the drag handle */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeModule ? 'opacity-20' : 'opacity-100'}`}
        onMouseDown={!isExpanded ? handleDragStart : undefined}
      >
        <CustomerHub
          name="Sarah J. Johnson"
          company="TechCorp Inc."
          onToggle={toggleExpansion}
          isDraggable={!isExpanded}
        />
      </div>
    </div>
  );
};

export default RadialDashboard;
