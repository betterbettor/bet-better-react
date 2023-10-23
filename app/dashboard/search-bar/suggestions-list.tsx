interface SuggestionsListProps {
  suggestions: string[];
  onSuggestionClicked: (suggestion: string) => () => void;
}

const SuggestionsList = ({
  suggestions,
  onSuggestionClicked,
}: SuggestionsListProps) => {
  return (
    <div className="u-py-3 u-px-7 u-absolute u-top-full u-left-0 u-max-w-full u-max-h-96 u-bg-slate-950/70 u-rounded-xl u-overflow-auto">
      {!suggestions.length
        ? 'No matching team'
        : suggestions.map((suggestion) => (
            <p
              key={suggestion}
              className="u-opacity-70 u-cursor-pointer hover:u-opacity-90"
              onClick={onSuggestionClicked(suggestion)}
            >
              {suggestion}
            </p>
          ))}
    </div>
  );
};

export default SuggestionsList;
