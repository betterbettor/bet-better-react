import { SVGProps, useCallback } from 'react';
import { line } from 'd3';
import { LineItem } from '@/interfaces/ui.type';
import { dateTimeFormatOptions, numberFormatOptions } from '../utils/constants';

interface LegendProps extends SVGProps<SVGSVGElement> {
  items: LineItem[];
  activeItemKey?: string;
  activeDataPoint?: Record<string, number | Date> | null;
  pathLength?: number;
  margin?: number;
  itemHeight?: number;
  pathProps?: SVGProps<SVGPathElement>;
  circleProps?: SVGProps<SVGCircleElement>;
  onMouseEnterItem: (key: string) => () => void;
  onMouseLeaveItem: () => void;
}

const DEFAULT_PATH_PROPS: SVGProps<SVGPathElement> = { strokeWidth: 1.5 };
const DEFAULT_CIRCLE_PROPS: SVGProps<SVGCircleElement> = { r: 2.5 };

const Legend = ({
  items,
  activeItemKey = '',
  activeDataPoint = null,
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
  onMouseEnterItem,
  onMouseLeaveItem,
  ...props
}: LegendProps) => {
  const getLineData = line(
    (d) => d[0],
    (d) => d[1],
  );

  const getValueString = useCallback((value: number | Date) => {
    const formatOption =
      value instanceof Date ? dateTimeFormatOptions : numberFormatOptions;
    return value.toLocaleString(undefined, formatOption);
  }, []);

  return (
    <svg className="u-w-fit u-h-full" {...props}>
      {items.map((item, idx) => (
        <g
          key={`legend-${item.key}`}
          fill={item.color}
          className={`u-font-bold hover:u-opacity-90 ${
            activeItemKey === item.key ? 'u-opacity-90' : 'u-opacity-70'
          }`}
          onMouseEnter={onMouseEnterItem(item.key)}
          onMouseLeave={onMouseLeaveItem}
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
            x={margin + pathLength}
            y={margin + idx * itemHeight}
            alignmentBaseline="middle"
          >
            {item.label}
          </text>

          {!!activeDataPoint && (
            <text
              x={margin + pathLength + 90}
              y={margin + idx * itemHeight}
              alignmentBaseline="middle"
              textAnchor="end"
            >
              {getValueString(activeDataPoint[item.key])}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
};

export default Legend;
