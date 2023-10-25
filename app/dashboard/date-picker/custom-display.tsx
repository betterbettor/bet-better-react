import { twentyFourHoursInMilliseconds } from '@/app/utils/constants';
import StepBtn from './step-btn';

interface CustomDisplayProps {
  date: Date;
  ref: React.Ref<HTMLButtonElement>;
  startDate: Date;
  minDate: Date;
  maxDate: Date;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onChange: (date: Date | null) => void;
}

const CustomDisplay = ({
  date,
  ref,
  startDate,
  minDate,
  maxDate,
  onClick,
  onChange,
}: CustomDisplayProps) => {
  const now = new Date();

  const getReadableDate = (date: Date): string | null => {
    const nowInDay = new Date(now.toDateString()).getTime();
    const dateInDay = new Date(date.toDateString()).getTime();
    switch (dateInDay) {
      case nowInDay:
        return 'Today';
      case nowInDay + twentyFourHoursInMilliseconds:
        return 'Tomorrow';
      case nowInDay - twentyFourHoursInMilliseconds:
        return 'Yesterday';
      default:
        return null;
    }
  };

  const getFormattedDate = (date: Date): string => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return formatter.format(date);
  };

  const readableDate = getReadableDate(date);
  const formattedDate = getFormattedDate(date);

  return (
    <div className="u-flex u-justify-between u-items-center u-text-yellow-300 u-text-center u-rounded-lg u-w-48 md:u-w-96">
      <StepBtn
        increment={false}
        startDate={startDate}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChange}
      />
      <button className="custom-input" onClick={onClick} ref={ref}>
        {readableDate === null
          ? formattedDate
          : `${readableDate}, ${formattedDate}`}
      </button>
      <StepBtn
        increment={true}
        startDate={startDate}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomDisplay;