import { ReactNode } from 'react';

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
      className={`u-h-full u-overflow-hidden u-transition-[max-height] ${
        isExpanded ? 'u-max-h-screen' : 'u-max-h-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default ExpandableSection;
