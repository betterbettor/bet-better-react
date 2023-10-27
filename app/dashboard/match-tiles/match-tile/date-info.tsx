import { dateTimeFormatOptions } from '@/app/utils/constants';

interface DateInfoProps {
  startTime: Date;
  lastUpdated: Date;
  className?: string;
}

const DateInfo = ({
  startTime,
  lastUpdated,
  className = '',
}: DateInfoProps) => {
  return (
    <p
      className={`u-text-xs u-flex u-justify-between u-gap-1 u-flex-wrap ${className}`}
    >
      <span>
        <span className="u-font-bold">Start Date:</span>{' '}
        <span>
          {startTime.toLocaleString(undefined, dateTimeFormatOptions)}
        </span>
      </span>

      <span>
        <span className="u-font-bold">Last updated:</span>{' '}
        <span>
          {lastUpdated.toLocaleString(undefined, dateTimeFormatOptions)}
        </span>
      </span>
    </p>
  );
};

export default DateInfo;
