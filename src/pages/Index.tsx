import RadialDashboard from "@/components/RadialDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Plateforme Clients{" "}
          <span className="text-primary">360°</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Vue unifiée de votre relation client
        </p>
      </div>

      {/* Radial Dashboard */}
      <RadialDashboard />
    </div>
  );
};

export default Index;
