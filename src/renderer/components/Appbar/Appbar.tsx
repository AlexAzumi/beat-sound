import { FC } from 'react';

import Menu from './components/Menu';
import SearchBar from './components/SearchBar';

interface AppbarProps {
  /**
   * Handles the update of the text on the search input
   * @param query - Search query
   */
  handleSearchSong(query: string): void;
}

const Appbar: FC<AppbarProps> = ({ handleSearchSong }) => {
  return (
    <div className="d-flex bg-dark text-white">
      <Menu />

      <SearchBar handleSearchSong={handleSearchSong} />
    </div>
  );
};

export default Appbar;
