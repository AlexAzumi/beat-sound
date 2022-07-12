import { useEffect, useRef } from 'react';

import Song from '../../main/interfaces/song';

const useGetNextSong = (songs: Song[] = []) => {
  const remainingSongsIds = useRef<string[]>([]);

  useEffect(() => {
    if (songs) {
      remainingSongsIds.current = songs.map((item) => item.id);
    }
  }, [songs]);

  /**
   * Returns the next song data
   * @param lastSongId - Unique id of the last song played
   * @param isShuffleActive - If set to `true`, a random song will be played
   * @param isRepeatActive - If set to `true`, when the song list will be repeated when played all songs
   */
  return (
    lastSongId: string,
    isShuffleActive: boolean,
    isRepeatActive: boolean
  ) => {
    const currentIndex = songs.findIndex((item) => item.id === lastSongId);

    // The song was not found
    if (currentIndex === -1) {
      return null;
    }

    if (!isShuffleActive && currentIndex + 1 < songs.length) {
      return songs[currentIndex + 1].id;
    } else if (isShuffleActive && remainingSongsIds.current.length > 0) {
      // Remove played song from the "remaining songs ids" array
      remainingSongsIds.current.filter((item) => item !== lastSongId);
      // Select a random song to play
      const randomIndex = Math.floor(
        Math.random() * remainingSongsIds.current.length
      );

      return remainingSongsIds.current[randomIndex];
    }

    // Re-initiate the remaining songs ids array
    if (remainingSongsIds.current.length === 0) {
      remainingSongsIds.current = songs.map((item) => item.id);
    }

    if (isRepeatActive && !isShuffleActive) {
      return songs[0].id;
    } else if (isRepeatActive && isShuffleActive) {
      const randomIndex = Math.floor(
        Math.random() * remainingSongsIds.current.length
      );

      return remainingSongsIds.current[randomIndex];
    }

    return null;
  };
};

export default useGetNextSong;
