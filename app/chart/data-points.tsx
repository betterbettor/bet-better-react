import { SVGProps } from 'react';
import { ChartDataProps } from '@/interfaces/ui.type';

interface DataPointsProps<T>
  extends ChartDataProps<T>,
    SVGProps<SVGCircleElement> {}

const DataPoints = ({
  data,
  xKey,
  yKey,
  scaleX,
  scaleY,
  r = 2.5,
  ...props
}: DataPointsProps<Record<string, any>>) => {
  return (
    <g>
      {data.map((d) => (
        <circle
          key={d[xKey]}
          className="u-opacity-70 hover:u-opacity-90"
          cx={scaleX(d[xKey])}
          cy={scaleY(d[yKey])}
          r={r}
          {...props}
        />
      ))}
    </g>
  );
};

export default DataPoints;
