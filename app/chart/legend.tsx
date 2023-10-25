import { SVGProps } from 'react';
import { line } from 'd3';
import { LineItem } from '@/interfaces/ui.type';

interface LegendProps extends SVGProps<SVGSVGElement> {
  items: LineItem[];
  pathLength?: number;
  margin?: number;
  itemHeight?: number;
  pathProps?: SVGProps<SVGPathElement>;
  circleProps?: SVGProps<SVGCircleElement>;
}

const DEFAULT_PATH_PROPS: SVGProps<SVGPathElement> = { strokeWidth: 1.5 };
const DEFAULT_CIRCLE_PROPS: SVGProps<SVGCircleElement> = { r: 2.5 };

const Legend = ({
  items,
  pathLength = 20,
  margin = 20,
  itemHeight = 30,
  pathProps: {
    strokeWidth = DEFAULT_PATH_PROPS.strokeWidth,
    ...pathPropsRest
  } = DEFAULT_PATH_PROPS,
  circleProps: {
    r = DEFAULT_CIRCLE_PROPS.r,
    ...circlePropsRest
  } = DEFAULT_CIRCLE_PROPS,
  ...props
}: LegendProps) => {
  const getLineData = line(
    (d) => d[0],
    (d) => d[1],
  );

  return (
    <svg className="u-w-fit u-h-full" {...props}>
      {items.map((item, idx) => (
        <g
          key={item.key}
          fill={item.color}
          className="u-opacity-70 hover:u-opacity-90"
        >
          <path
            {...pathPropsRest}
            stroke={item.color}
            strokeWidth={strokeWidth}
            d={
              getLineData([
                [margin - pathLength / 2, margin + idx * itemHeight],
                [margin + pathLength / 2, margin + idx * itemHeight],
              ]) ?? undefined
            }
          />

          <circle
            className="u-opacity-70 hover:u-opacity-90"
            {...circlePropsRest}
            cx={margin}
            cy={margin + idx * itemHeight}
            r={r}
          />

          <text
            className="u-font-bold"
            x={margin + pathLength}
            y={margin + idx * itemHeight}
            alignmentBaseline="middle"
          >
            {item.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default Legend;
