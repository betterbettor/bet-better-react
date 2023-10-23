import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface SearchBarProps {
  value: string;
  suggestions?: string[];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSuggestionClicked?: (suggestion: string) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
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

  const handleSuggestionClick = (suggestion: string) => () => {
    onSuggestionClicked && onSuggestionClicked(suggestion);
  };

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
          <div className="u-py-3 u-px-7 u-absolute u-top-full u-left-0 u-max-w-full u-max-h-96 u-bg-slate-950/70 u-rounded-xl u-overflow-auto">
            {!suggestions.length
              ? 'No matching team'
              : suggestions.map((suggestion) => (
                  <p
                    key={suggestion}
                    className="u-opacity-70 u-cursor-pointer hover:u-opacity-90"
                    onClick={handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </p>
                ))}
          </div>
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
