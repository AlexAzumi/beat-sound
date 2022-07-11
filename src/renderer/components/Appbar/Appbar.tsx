import { FC, useCallback, useMemo, useState } from 'react';
import About from './components/About';

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
  const [showAboutModal, setShowAboutModal] = useState(false);

  /**
   * Shows or hides the about modal
   * @param about - If set to `true`, the modal will be shown
   */
  const handleShowModal = useCallback((show: boolean) => {
    setShowAboutModal(show);
  }, []);

  return useMemo(
    () => (
      <>
        {/* About modal */}
        <About
          showModal={showAboutModal}
          onHide={() => handleShowModal(false)}
        />
        {/* App bar content */}
        <div className="d-flex bg-dark text-white">
          <Menu showAboutModal={() => handleShowModal(true)} />

          <SearchBar handleSearchSong={handleSearchSong} />
        </div>
      </>
    ),
    [showAboutModal]
  );
};

export default Appbar;
