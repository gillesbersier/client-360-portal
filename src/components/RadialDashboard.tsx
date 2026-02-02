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
import { useState } from "react";

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

  const moduleRadius = 240; // Slightly increased from 220 to give more breathing room
  const lineInnerRadius = 100; // Increased from 80 to match w-48 (192px/2 = 96px + border)
  const lineOuterRadius = 180; // Increased from 160
  const svgSize = 650; // Increased SVG size to avoid clipping
  const center = svgSize / 2;

  const handleModuleClick = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveModule(activeModule === title ? null : title);
  };

  const handleBackgroundClick = () => {
    setActiveModule(null);
  };

  return (
    <div
      className="relative w-full max-w-[650px] aspect-square mx-auto"
      onClick={handleBackgroundClick}
    >
      {/* SVG for connection lines */}
      <svg
        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${activeModule ? 'opacity-20' : 'opacity-100'}`}
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
              radius={moduleRadius}
              isActive={isActive}
              isDimmed={isDimmed}
              onClick={(e) => handleModuleClick(module.title, e)}
            />
          );
        })}
      </div>

      {/* Central customer hub */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeModule ? 'opacity-20' : 'opacity-100'}`}>
        <CustomerHub
          name="Sarah J. Johnson"
          company="TechCorp Inc."
        />
      </div>
    </div>
  );
};

export default RadialDashboard;
