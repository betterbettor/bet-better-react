interface DateInfoProps {
  startTime: number;
  lastUpdated: number;
}

const DateInfo = ({ startTime, lastUpdated }: DateInfoProps) => {
  const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'medium',
    timeStyle: 'short',
  };

  return (
    <p className="u-text-xs u-flex u-justify-between">
      <span>
        Start Date:{' '}
        {new Date(startTime).toLocaleString(undefined, dateTimeFormatOptions)}
      </span>
      <span>
        Last updated:{' '}
        {new Date(lastUpdated).toLocaleString(undefined, dateTimeFormatOptions)}
      </span>
    </p>
  );
};

export default DateInfo;
