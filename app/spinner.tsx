import { twMerge } from 'tailwind-merge';

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className = '' }: SpinnerProps) => {
  return (
    <div
      className={twMerge(
        'u-w-6 u-h-6 u-border-2 u-border-yellow-400/50 u-border-t-yellow-400/90 u-rounded-full u-animate-spin',
        className,
      )}
    />
  );
};

export default Spinner;
