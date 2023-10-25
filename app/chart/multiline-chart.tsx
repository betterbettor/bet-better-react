import { scaleUtc, scaleLinear, extent } from 'd3';
import AxisBottom from './axis-bottom';
import AxisLeft from './axis-left';
import Legend, { LegendItem } from './legend';
import Line from './line';
import DataPoints from './data-points';
import { OddsValues } from '@/interfaces/odds.interface';

interface MultiLineChartProps {
  data: OddsValues[];
  width?: number;
  height?: number;
  margin?: number;
}

const MultiLineChart = ({
  data,
  width = 800,
  height = 400,
  margin = 20,
}: MultiLineChartProps) => {
  const scaleX = scaleUtc()
    .domain(
      extent(data, ({ timestamp }) => timestamp).map((value) => value ?? 0),
    )
    .range([margin, width - margin]);

  const SCALE_Y_MULTIPLIER = 1.1;

  const scaleY = scaleLinear()
    .domain([
      0,
      Math.max(
        ...data.map(({ home, away, draw }) => Math.max(home, away, draw)),
      ) * SCALE_Y_MULTIPLIER,
    ])
    .nice()
    .range([height - margin, margin]);

  const legendItems: LegendItem[] = [
    { key: 'home', label: 'Home', color: 'green' },
    { key: 'away', label: 'Away', color: 'red' },
    { key: 'draw', label: 'Draw', color: 'gold' },
  ];

  return (
    <svg
      className="u-min-h-[200px] u-overflow-visible"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
    >
      <AxisBottom scaleX={scaleX} transform={`translate(0, ${height})`} />

      <AxisLeft scaleY={scaleY} />

      <Legend items={legendItems} x={margin} />

      <Line
        stroke="green"
        data={data}
        xKey="timestamp"
        yKey="home"
        scaleX={scaleX}
        scaleY={scaleY}
      />

      <Line
        stroke="red"
        data={data}
        xKey="timestamp"
        yKey="away"
        scaleX={scaleX}
        scaleY={scaleY}
      />

      <Line
        stroke="gold"
        data={data}
        xKey="timestamp"
        yKey="draw"
        scaleX={scaleX}
        scaleY={scaleY}
      />

      <DataPoints
        data={data}
        xKey="timestamp"
        yKey="home"
        scaleX={scaleX}
        scaleY={scaleY}
        fill="green"
      />

      <DataPoints
        data={data}
        xKey="timestamp"
        yKey="away"
        scaleX={scaleX}
        scaleY={scaleY}
        fill="red"
      />

      <DataPoints
        data={data}
        xKey="timestamp"
        yKey="draw"
        scaleX={scaleX}
        scaleY={scaleY}
        fill="gold"
      />
    </svg>
  );
};

export default MultiLineChart;
