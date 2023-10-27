'use client';

import { useState } from 'react';
import { scaleUtc, scaleLinear, extent } from 'd3';
import AxisBottom from './axis-bottom';
import AxisLeft from './axis-left';
import Legend from './legend';
import Line from './line';
import DataPoints from './data-points';
import { LineItem } from '@/interfaces/ui.type';

interface MultiLineChartProps<T> {
  data: T[];
  xKey: string;
  lineItems?: LineItem[];
  showLegend?: boolean;
  chartKey?: string;
  width?: number;
  height?: number;
  margin?: number;
  scaleYMultiplier?: number;
}

const MultiLineChart = ({
  data,
  xKey,
  lineItems = [],
  showLegend = true,
  chartKey = '',
  width = 800,
  height = 400,
  margin = 20,
  scaleYMultiplier = 1.3,
}: MultiLineChartProps<Record<string, any>>) => {
  const scaleX = scaleUtc()
    .domain(extent(data, (d) => d[xKey]).map((value) => value ?? 0))
    .range([margin, width - margin]);

  const scaleY = scaleLinear()
    .domain([
      0,
      Math.max(
        ...data.map((d) =>
          Math.max(...lineItems.map((lineItem) => d[lineItem.key])),
        ),
      ) * scaleYMultiplier,
    ])
    .nice()
    .range([height - margin, margin]);

  const [activeLineItem, setActiveLineItem] = useState('');

  const handleMouseEnterLineItem = (key: string) => () =>
    setActiveLineItem(key);

  return (
    <svg
      className="u-min-h-[200px] u-overflow-visible"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
    >
      <AxisBottom scaleX={scaleX} transform={`translate(0, ${height})`} />

      <AxisLeft scaleY={scaleY} />

      {showLegend && (
        <Legend
          items={lineItems}
          activeItemKey={activeLineItem}
          x={margin}
          onMouseEnterItem={handleMouseEnterLineItem}
          onMouseLeaveItem={() => setActiveLineItem('')}
        />
      )}

      {lineItems.map((lineItem) => (
        <Line
          key={`line-${chartKey}-${lineItem.key}`}
          isActive={lineItem.key === activeLineItem}
          stroke={lineItem.color}
          data={data}
          xKey={xKey}
          yKey={lineItem.key}
          scaleX={scaleX}
          scaleY={scaleY}
          onMouseEnter={() => setActiveLineItem(lineItem.key)}
          onMouseLeave={() => setActiveLineItem('')}
        />
      ))}

      {lineItems.map((lineItem) => (
        <DataPoints
          key={`points-${chartKey}-${lineItem.key}`}
          isActive={lineItem.key === activeLineItem}
          data={data}
          xKey={xKey}
          yKey={lineItem.key}
          scaleX={scaleX}
          scaleY={scaleY}
          fill={lineItem.color}
          chartKey={chartKey}
          onMouseEnterPoint={handleMouseEnterLineItem}
          onMouseLeavePoint={() => setActiveLineItem('')}
        />
      ))}
    </svg>
  );
};

export default MultiLineChart;
