interface ConnectionLineProps {
  angle: number;
  innerRadius: number;
  outerRadius: number;
}

const ConnectionLine = ({ angle, innerRadius, outerRadius }: ConnectionLineProps) => {
  const angleRad = (angle - 90) * (Math.PI / 180);
  
  // Calculate start and end points
  const startX = Math.cos(angleRad) * innerRadius;
  const startY = Math.sin(angleRad) * innerRadius;
  const endX = Math.cos(angleRad) * outerRadius;
  const endY = Math.sin(angleRad) * outerRadius;
  
  // Node position (middle of line)
  const nodeX = Math.cos(angleRad) * ((innerRadius + outerRadius) / 2);
  const nodeY = Math.sin(angleRad) * ((innerRadius + outerRadius) / 2);

  return (
    <g>
      {/* Connection line */}
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        className="stroke-platform-purple"
        strokeWidth="2"
        strokeDasharray="4 4"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="8"
          to="0"
          dur="1s"
          repeatCount="indefinite"
        />
      </line>
      
      {/* Connection node */}
      <circle
        cx={nodeX}
        cy={nodeY}
        r="6"
        className="fill-platform-purple-dark stroke-platform-purple"
        strokeWidth="2"
      />
      
      {/* Inner glow */}
      <circle
        cx={nodeX}
        cy={nodeY}
        r="3"
        className="fill-platform-purple-light"
      />
    </g>
  );
};

export default ConnectionLine;
