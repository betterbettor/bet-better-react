import React, { createElement, forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDisplay from './custom-display';
import { sevenDaysInMilliseconds } from '@/app/utils/constants';

interface DatePickerProps {
  startDate: Date;
  onChange: (date: Date | null) => void;
}

const DatePicker = ({ startDate, onChange }: DatePickerProps) => {
  const now = new Date();

  const minDate = new Date(now.getTime() - sevenDaysInMilliseconds);
  const maxDate = new Date(now.getTime() + 2 * sevenDaysInMilliseconds);

  const CustomInput = (
    { value, onClick }: React.HTMLProps<HTMLButtonElement>,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <CustomDisplay
        date={new Date(value as string)}
        onClick={onClick}
        ref={ref}
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
      minDate={new Date(minDate)}
      maxDate={new Date(maxDate)}
      selected={startDate}
      onChange={onChange}
      customInput={createElement(forwardRef(CustomInput))}
    />
  );
};

export default DatePicker;
