import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ExpandableSectionProps {
  isExpanded: boolean;
  children: ReactNode;
  className?: string;
}

const ExpandableSection = ({
  isExpanded,
  children,
  className = '',
}: ExpandableSectionProps) => {
  return (
    <div
      className={twMerge(
        'u-h-full u-overflow-hidden u-transition-[max-height]',
        isExpanded ? 'u-max-h-screen' : 'u-max-h-0',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ExpandableSection;
