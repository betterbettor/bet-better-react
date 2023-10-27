import { SVGProps } from 'react';
import { ChartDataProps } from '@/interfaces/ui.type';

interface DataPointsProps<T>
  extends ChartDataProps<T>,
    SVGProps<SVGCircleElement> {
  isActive?: boolean;
  chartKey?: string;
  onMouseEnterPoint: (key: string, index: number) => () => void;
  onMouseLeavePoint: () => void;
}

const DataPoints = ({
  data,
  xKey,
  yKey,
  scaleX,
  scaleY,
  r = 2.5,
  isActive = false,
  chartKey = '',
  onMouseEnterPoint,
  onMouseLeavePoint,
  ...props
}: DataPointsProps<Record<string, any>>) => {
  return (
    <g>
      {data.map((d, idx) => (
        <circle
          key={`point-${chartKey}-${yKey}-${d[xKey]}`}
          className={`hover:u-opacity-90 ${
            isActive ? 'u-opacity-90' : 'u-opacity-70'
          }`}
          cx={scaleX(d[xKey])}
          cy={scaleY(d[yKey])}
          r={r}
          onMouseEnter={onMouseEnterPoint(yKey, idx)}
          onMouseLeave={onMouseLeavePoint}
          {...props}
        />
      ))}
    </g>
  );
};

export default DataPoints;
