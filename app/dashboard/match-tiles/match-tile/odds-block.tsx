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

      <div className="u-grid u-grid-cols-[1fr_auto_1fr]">
        <div className="u-flex u-items-center u-gap-3 u-justify-center">
          {team && (
            <Image src={team.logo} alt={team.name} width={70} height={70} />
          )}
        </div>
        <div className="u-text-center u-flex u-flex-col u-justify-between">
          {team && <h2 className="u-text-lg u-font-bold">{team.name}</h2>}

          <div
            className={`u-w-fit u-text-3xl u-text-center u-rounded-xl u-mx-auto u-px-2 hover:u-bg-green-200 hover:u-drop-shadow`}
          >
            {oddsValue}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OddsBlock;
