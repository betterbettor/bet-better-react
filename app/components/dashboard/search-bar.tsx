import { ChangeEvent, FormEvent } from 'react';

interface SearchBarProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const SearchBar = ({ onChange, onSubmit }: SearchBarProps) => {
  return (
    <form className="u-py-5 u-flex" onSubmit={onSubmit}>
      <input
        type="text"
        className="u-py-3 u-px-7 u-flex-1 u-bg-green-300 u-text-slate-900 u-rounded-l-full"
        placeholder="Search for a team"
        onChange={onChange}
      />

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
