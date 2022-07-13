import { FC } from 'react';
interface SearchBarProps {
  /**
   * Handles the update of the text on the search input
   * @param query - Search query
   */
  handleSearchSong(query: string): void;
}

const SearchBar: FC<SearchBarProps> = ({ handleSearchSong }) => {
  return (
    <div className="search-box-container d-flex my-2 ms-auto me-2">
      <input
        className="search-box rounded-pill border-2 border-muted shadow px-4 py-1"
        onChange={(event) =>
          handleSearchSong(event.currentTarget.value.toLocaleLowerCase().trim())
        }
        placeholder="Search..."
        type="search"
      />
    </div>
  );
};

export default SearchBar;
