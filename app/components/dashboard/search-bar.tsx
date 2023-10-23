import { ChangeEvent, FormEvent, useState } from 'react';

interface SearchBarProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const SearchBar = ({ onChange, onSubmit }: SearchBarProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <form className="u-py-5 u-flex" onSubmit={onSubmit}>
      <div className="u-relative u-flex-1">
        <input
          type="text"
          className="u-py-3 u-px-7 u-w-full u-bg-green-300 u-text-slate-900 u-rounded-l-full"
          placeholder="Search for a team"
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
          onChange={onChange}
        />

        {showSuggestions && (
          <div className="u-py-3 u-px-7 u-absolute u-top-full u-left-0 u-bg-slate-950/70 u-rounded-xl">
            Auto suggestions
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
