import { AxisBottomProps } from '@/app/chart/axis-bottom';
import { AxisLeftProps } from '@/app/chart/axis-left';

export type ExpandedMap = Map<number, boolean>;

export type ExpandedMapStates = {
  ALL_EXPANDED: ExpandedMap;
  ALL_COLLAPSED: ExpandedMap;
};

export interface ChartDataProps<T> {
  data: T[];
  xKey: keyof T;
  yKey: keyof T;
  scaleX: AxisBottomProps['scaleX'];
  scaleY: AxisLeftProps['scaleY'];
}
