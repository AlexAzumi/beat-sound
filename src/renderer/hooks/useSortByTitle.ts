import Song from '../../main/interfaces/song';

/**
 * Returns a sorted list of songs by name
 */
const useSortByTitle = () => {
  return (songs: Song[]) => {
    return new Promise<Song[]>((resolve) => {
      const sorteredSongs = songs.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });

      resolve(sorteredSongs);
    });
  };
};

export default useSortByTitle;
