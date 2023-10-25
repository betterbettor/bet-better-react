interface DateInfoProps {
  startTime: Date;
  lastUpdated: Date;
}

const DateInfo = ({ startTime, lastUpdated }: DateInfoProps) => {
  const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'medium',
    timeStyle: 'short',
  };

  return (
    <p className="u-text-xs u-flex u-justify-between u-gap-3 u-flex-wrap">
      <span>
        Start Date: {startTime.toLocaleString(undefined, dateTimeFormatOptions)}
      </span>
      <span>
        Last updated:{' '}
        {lastUpdated.toLocaleString(undefined, dateTimeFormatOptions)}
      </span>
    </p>
  );
};

export default DateInfo;
