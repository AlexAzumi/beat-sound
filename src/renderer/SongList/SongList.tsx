import { FC, useCallback } from 'react';
import { Container } from 'react-bootstrap';

import ListHeader from './components/ListHeader';
import SongElement from './components/SongElement';

import Song from '../../main/interfaces/song';

interface SongListProps {
  /**
   * Unique id of the current song
   */
  currentSongId: string;
  /**
   * Array of all available songs
   */
  songs: Song[];
  /**
   * Set to `true` is there is a song currently playing
   */
  isPlaying: boolean;
  /**
   * Handles the play/pause event
   * @param id - Unique id of the song
   */
  handlePlaySong(id: string): void;
}

const SongList: FC<SongListProps> = ({
  currentSongId,
  isPlaying,
  handlePlaySong,
  songs,
}) => {
  /**
   * Formats the duration in seconds to `mm:ss`
   * @param duration - Song duration in seconds
   */
  const getFormatedDuration = useCallback((duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration - minutes * 60);

    return `${minutes}:${seconds}`;
  }, []);

  return (
    <Container className="overflow-auto" fluid={true}>
      <ListHeader />

      {songs.map((item) => {
        const isPlayingThisSong = currentSongId === item.id && isPlaying;

        return (
          <SongElement
            artist={item.artist}
            duration={getFormatedDuration(item.duration)}
            handlePlaySong={handlePlaySong}
            imageSrc={`file://${item.songPath}\\${item.coverFile}`}
            isPlayingThisSong={isPlayingThisSong}
            name={item.name}
            songId={item.id}
          />
        );
      })}
    </Container>
  );
};

export default SongList;
