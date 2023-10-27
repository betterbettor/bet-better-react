import { SVGProps } from 'react';
import { line } from 'd3';
import { ChartDataProps } from '@/interfaces/ui.type';

interface LineProps<T> extends ChartDataProps<T>, SVGProps<SVGPathElement> {
  isActive?: boolean;
}

const Line = ({
  data,
  xKey,
  yKey,
  scaleX,
  scaleY,
  fill = 'none',
  strokeWidth = 1.5,
  isActive = false,
  ...props
}: LineProps<Record<string, any>>) => {
  const getLineData = line(
    (d: Record<string, any>) => scaleX(new Date(d[xKey])) ?? 0,
    (d: Record<string, any>) => scaleY(d[yKey]) ?? 0,
  );

  return (
    <path
      className={`hover:u-opacity-90 hover:u-stroke-2 ${
        isActive ? 'u-opacity-90 u-stroke-2' : 'u-opacity-70'
      }`}
      {...props}
      fill={fill}
      strokeWidth={strokeWidth}
      d={getLineData(data) ?? undefined}
    />
  );
};

export default Line;
