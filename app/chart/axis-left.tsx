import { useEffect, useRef } from 'react';
import { axisLeft, select, AxisScale, NumberValue } from 'd3';

export interface AxisLeftProps {
  scaleY: AxisScale<NumberValue>;
}

const AxisLeft = ({ scaleY }: AxisLeftProps) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scaleY));
    }
  }, [scaleY]);

  return <g ref={ref} />;
};

export default AxisLeft;
