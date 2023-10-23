import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import SuggestionsList from './suggestions-list';

interface SearchBarProps {
  value: string;
  suggestions: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSuggestionClicked: (suggestion: string) => () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const SearchBar = ({
  value = '',
  suggestions = [],
  onChange,
  onSuggestionClicked,
  onSubmit,
}: SearchBarProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleBlur = () => {
    if (!!timer) clearTimeout(timer);

    const newTimer = setTimeout(() => setShowSuggestions(false), 300);
    setTimer(newTimer);
  };

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form className="u-py-5 u-flex" onSubmit={onSubmit}>
      <div className="u-relative u-flex-1">
        <input
          type="text"
          className="u-py-3 u-px-7 u-w-full u-bg-green-300 u-text-slate-900 u-rounded-l-full"
          placeholder="Search for a team"
          value={value}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleBlur}
          onChange={onChange}
        />

        {showSuggestions && (
          <SuggestionsList
            suggestions={suggestions}
            onSuggestionClicked={onSuggestionClicked}
          />
        )}
      </div>

      <button
        className="u-py-3 u-px-7 u-bg-green-900 u-rounded-r-full"
        type="submit"
      >
        Q
      </button>
    </form>
  );
};

export default SearchBar;
