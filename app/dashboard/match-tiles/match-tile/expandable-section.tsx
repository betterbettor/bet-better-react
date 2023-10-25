import { ReactNode } from 'react';

interface ExpandableSectionProps {
  isExpanded: boolean;
  children: ReactNode;
}

const ExpandableSection = ({
  isExpanded,
  children,
}: ExpandableSectionProps) => {
  return (
    <div
      className={`u-h-full u-overflow-hidden u-transition-[max-height] ${
        isExpanded ? 'u-max-h-screen' : 'u-max-h-0'
      }`}
    >
      {children}
    </div>
  );
};

export default ExpandableSection;
