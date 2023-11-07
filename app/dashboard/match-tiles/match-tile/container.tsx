import { ReactNode } from 'react';

interface MatchTileContainerProps {
  children?: ReactNode;
}

const MatchTileContainer = ({ children }: MatchTileContainerProps) => {
  return (
    <div className="u-p-3 u-bg-green-100 u-rounded-xl u-border u-text-slate-900 u-shadow sm:u-px-5">
      {children}
    </div>
  );
};

export default MatchTileContainer;
