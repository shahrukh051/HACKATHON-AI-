interface RouteConvergeProps {
  width?: number;
  height?: number;
  /** x positions (0-1, fraction of width) of the fan-out endpoints */
  points: number[];
  /** x position (0-1) of the single convergence point */
  target?: number;
  /** draw from top (points) down to bottom (target) or reverse */
  direction?: 'down' | 'up';
  color?: string;
  highlightIndex?: number;
  highlightColor?: string;
}

export default function RouteConverge({
  width = 400,
  height = 120,
  points,
  target = 0.5,
  direction = 'down',
  color = 'var(--color-hairline)',
  highlightIndex,
  highlightColor = 'var(--color-signal)',
}: RouteConvergeProps) {
  const top = direction === 'down' ? 6 : height - 6;
  const bottom = direction === 'down' ? height - 6 : 6;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="route-line" preserveAspectRatio="none">
      {points.map((p, i) => {
        const x1 = p * width;
        const x2 = target * width;
        const midY = (top + bottom) / 2;
        const isHighlight = i === highlightIndex;
        return (
          <path
            key={i}
            d={`M ${x1} ${top} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${bottom}`}
            fill="none"
            stroke={isHighlight ? highlightColor : color}
            strokeWidth={isHighlight ? 2 : 1.25}
            opacity={isHighlight ? 1 : 0.5}
          />
        );
      })}
      {points.map((p, i) => (
        <circle
          key={`dot-${i}`}
          cx={p * width}
          cy={top}
          r={3}
          fill={i === highlightIndex ? highlightColor : color}
        />
      ))}
      <circle cx={target * width} cy={bottom} r={4} fill={highlightColor} className="animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
    </svg>
  );
}
