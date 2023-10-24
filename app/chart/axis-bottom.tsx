import { SVGProps, useEffect, useRef } from 'react';
import { axisBottom, select, AxisScale, NumberValue } from 'd3';

export interface AxisBottomProps extends SVGProps<SVGGElement> {
  scaleX: AxisScale<Date | NumberValue>;
}

const AxisBottom = ({ scaleX, ...props }: AxisBottomProps) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scaleX));
    }
  }, [scaleX]);

  return <g ref={ref} {...props} />;
};

export default AxisBottom;
