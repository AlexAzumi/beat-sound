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
    <div className="d-flex my-2 ms-auto me-2">
      <input
        className="rounded-0 border-1 border-primary shadow px-3 py-1"
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
