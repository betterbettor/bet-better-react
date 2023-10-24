import { SVGProps } from 'react';
import { line } from 'd3';
import { ChartDataProps } from '@/interfaces/ui.type';

interface LineProps<T> extends ChartDataProps<T>, SVGProps<SVGPathElement> {}

const Line = ({
  data,
  xKey,
  yKey,
  scaleX,
  scaleY,
  fill = 'none',
  strokeWidth = 1.5,
  ...props
}: LineProps<Record<string, any>>) => {
  const getLineData = line(
    (d: Record<string, any>) => scaleX(new Date(d[xKey])) ?? 0,
    (d: Record<string, any>) => scaleY(d[yKey]) ?? 0,
  );

  return (
    <path
      className="u-opacity-70 hover:u-opacity-90 hover:u-stroke-2"
      {...props}
      fill={fill}
      strokeWidth={strokeWidth}
      d={getLineData(data) ?? undefined}
    />
  );
};

export default Line;
