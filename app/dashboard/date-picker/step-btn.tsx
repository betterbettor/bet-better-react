import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { twentyFourHoursInMilliseconds } from '@/app/utils/constants';

interface StepBtnProps {
  increment: boolean;
  startDate: Date;
  minDate: Date;
  maxDate: Date;
  onChange: (date: Date | null) => void;
}

const StepBtn = ({
  increment,
  startDate,
  minDate,
  maxDate,
  onChange,
}: StepBtnProps) => {
  const isDateOutOfBound = (date: Date): boolean => {
    const dateInDay = new Date(date.toDateString()).getTime();
    const minDateInDay = new Date(minDate.toDateString()).getTime();
    const maxDateInDay = new Date(maxDate.toDateString()).getTime();

    return dateInDay < minDateInDay || dateInDay > maxDateInDay;
  };

  const diff = increment
    ? twentyFourHoursInMilliseconds
    : -twentyFourHoursInMilliseconds;
  const newDate = new Date(startDate.getTime() + diff);
  const disabled = isDateOutOfBound(newDate);

  return (
    <button
      className="u-w-5 u-h-5"
      onClick={() => onChange(new Date(newDate))}
      disabled={disabled}
    >
      <FontAwesomeIcon
        className={`${
          disabled ? 'u-text-green-200' : 'u-text-green-600'
        }  u-font-bold ${increment ? 'u--rotate-90' : 'u-rotate-90'}`}
        icon={faCaretDown}
        size="2xl"
      />
    </button>
  );
};

export default StepBtn;
