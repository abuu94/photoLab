const SearchBar = () => {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search for a school..."
          aria-label="Search for a school"
        />
      </div>

      <button className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;