import Image from 'next/image';
import { BetValue, OddsValues } from '@/interfaces/odds.interface';

interface OddsBlockProps {
  betValue: BetValue;
  oddsValue: OddsValues[Lowercase<BetValue>];
  team?: { name: string; logo: string };
}

const OddsBlock = ({ betValue, oddsValue, team }: OddsBlockProps) => {
  return (
    <div className="u-flex-1 u-flex u-flex-col u-justify-between u-gap-3">
      <div className="u-text-sm u-text-center u-font-bold">{betValue}</div>

      {team && (
        <div className="u-flex u-items-center u-gap-3">
          <Image src={team.logo} alt={team.name} width={30} height={30} />
          <h2 className="u-text-lg u-font-bold">{team.name}</h2>
        </div>
      )}

      <div className="u-text-3xl u-text-center">{oddsValue}</div>
    </div>
  );
};

export default OddsBlock;
