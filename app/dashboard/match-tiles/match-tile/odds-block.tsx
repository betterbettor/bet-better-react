import Image from 'next/image';
import { BetValue, OddsValues } from '@/interfaces/odds.interface';
import Team from '@/interfaces/team.interface';

interface OddsBlockProps {
  betValue: BetValue;
  oddsValue: OddsValues[Lowercase<BetValue>];
  team?: Pick<Team, 'name' | 'logo'>;
}

const OddsBlock = ({ betValue, oddsValue, team }: OddsBlockProps) => {
  return (
    <div className="u-min-h-[40px] u-flex-1 u-flex u-justify-between u-items-center u-gap-1 sm:u-flex-col">
      <div className="u-w-11 u-text-sm u-font-bold sm:u-text-center">
        {betValue}
      </div>

      {team && (
        <div className="u-flex-1 u-flex u-gap-1 u-items-center sm:u-gap-2">
          <Image src={team.logo} alt={team.name} width={30} height={30} />
          <h2 className="u-flex-1 u-text-sm u-font-bold sm:u-text-xl">
            {team.name}
          </h2>
        </div>
      )}

      <div className="u-text-3xl u-text-end sm:u-text-4xl">{oddsValue}</div>
    </div>
  );
};

export default OddsBlock;
