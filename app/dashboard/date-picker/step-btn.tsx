import { useCallback, useMemo } from 'react';
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
  const isDateOutOfBound = useCallback(
    (date: Date): boolean => {
      const dateInDay = new Date(date.toDateString()).getTime();
      const minDateTime = minDate.getTime();
      const maxDateTime = maxDate.getTime();

      return dateInDay < minDateTime || dateInDay > maxDateTime;
    },
    [maxDate, minDate],
  );

  const newDate = useMemo(() => {
    const diff = increment
      ? twentyFourHoursInMilliseconds
      : -twentyFourHoursInMilliseconds;
    return new Date(startDate.getTime() + diff);
  }, [increment, startDate]);

  const disabled = useMemo(
    () => isDateOutOfBound(newDate),
    [isDateOutOfBound, newDate],
  );

  return (
    <button onClick={() => onChange(new Date(newDate))} disabled={disabled}>
      <FontAwesomeIcon
        className={`${
          disabled ? 'u-text-green-100' : 'u-text-green-300'
        }  u-font-bold ${increment ? 'u--rotate-90' : 'u-rotate-90'}`}
        icon={faCaretDown}
        size="2xl"
      />
    </button>
  );
};

export default StepBtn;
