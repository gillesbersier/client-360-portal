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
  const moduleRadius = 240; // Slightly increased from 220 to give more breathing room
  const lineInnerRadius = 100; // Increased from 80 to match w-48 (192px/2 = 96px + border)
  const lineOuterRadius = 180; // Increased from 160
  const svgSize = 650; // Increased SVG size to avoid clipping
  const center = svgSize / 2;

  return (
    <div className="relative w-full max-w-[650px] aspect-square mx-auto">
      {/* SVG for connection lines */}
      <svg
        className="absolute inset-0 w-full h-full"
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
        {modules.map((module) => (
          <ModuleCard
            key={module.title}
            title={module.title}
            icon={module.icon}
            angle={module.angle}
            radius={moduleRadius}
          />
        ))}
      </div>

      {/* Central customer hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <CustomerHub
          name="Sarah J. Johnson"
          company="TechCorp Inc."
        />
      </div>
    </div>
  );
};

export default RadialDashboard;
