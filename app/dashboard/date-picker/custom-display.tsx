import { twentyFourHoursInMilliseconds } from '@/app/utils/constants';
import StepBtn from './step-btn';

interface CustomDisplayProps {
  date: Date;
  pickerRef: React.Ref<HTMLButtonElement>;
  startDate: Date;
  minDate: Date;
  maxDate: Date;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onChange: (date: Date | null) => void;
}

const CustomDisplay = ({
  date,
  pickerRef,
  startDate,
  minDate,
  maxDate,
  onClick,
  onChange,
}: CustomDisplayProps) => {
  const now = new Date();

  const getReadableDate = (date: Date): string => {
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
        return '';
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
    <div className="u-flex u-justify-between u-items-center u-gap-3 u-text-yellow-400 u-text-center u-rounded-lg">
      <StepBtn
        increment={false}
        startDate={startDate}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChange}
      />

      <button ref={pickerRef} className="custom-input" onClick={onClick}>
        {!readableDate ? formattedDate : `${readableDate}, ${formattedDate}`}
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
