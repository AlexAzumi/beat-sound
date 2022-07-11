import Song from '../../main/interfaces/song';

/**
 * Returns a sorted list of songs by artist
 */
const useSortByArtist = () => {
  return (songs: Song[]) => {
    return new Promise<Song[]>((resolve) => {
      const sorteredSongs = songs.sort((a, b) => {
        if (a.artist < b.artist) {
          return -1;
        } else if (a.artist > b.artist) {
          return 1;
        } else {
          return 0;
        }
      });

      resolve(sorteredSongs);
    });
  };
};

export default useSortByArtist;
