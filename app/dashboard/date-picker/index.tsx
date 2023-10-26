import { HTMLProps, Ref, createElement, forwardRef, useCallback } from 'react';
import ReactDatePicker from 'react-datepicker';
import CustomDisplay from './custom-display';
import { sevenDaysInMilliseconds } from '@/app/utils/constants';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  startDate: Date;
  onChange: (date: Date | null) => void;
}

const DatePicker = ({ startDate, onChange }: DatePickerProps) => {
  const now = new Date();
  const getDayFromDateInMilliseconds = useCallback(
    (dateInMilliseconds: number) => {
      return new Date(new Date(dateInMilliseconds).toDateString());
    },
    [],
  );

  const minDate = getDayFromDateInMilliseconds(
    now.getTime() - sevenDaysInMilliseconds,
  );
  const maxDate = getDayFromDateInMilliseconds(
    now.getTime() + 2 * sevenDaysInMilliseconds,
  );

  const CustomInput = (
    { value, onClick }: HTMLProps<HTMLButtonElement>,
    ref: Ref<HTMLButtonElement>,
  ) => {
    return (
      <CustomDisplay
        date={new Date(value as string)}
        onClick={onClick}
        pickerRef={ref}
        startDate={startDate}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChange}
      />
    );
  };

  return (
    <ReactDatePicker
      className="u-bg-green-50 u-text-black u-text-center u-rounded-lg u-w-[460px]"
      closeOnScroll={true}
      minDate={minDate}
      maxDate={maxDate}
      selected={startDate}
      onChange={onChange}
      customInput={createElement(forwardRef(CustomInput))}
    />
  );
};

export default DatePicker;
