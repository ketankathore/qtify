import './SearchBar.css';

const SearchBar = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="searchBar" role="search" onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        className="searchInput"
        placeholder="search albums or songs"
        aria-label="Search albums or songs"
      />
      <button type="submit" className="searchButton" aria-label="Search">
        <span aria-hidden="true">⌕</span>
      </button>
    </form>
  );
};

export default SearchBar;
