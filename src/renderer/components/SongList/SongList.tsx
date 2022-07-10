import { FC, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';

import ListHeader from './components/ListHeader';
import SongElement from './components/SongElement';

import useFormatTime from '../../hooks/useFormatTime';

import Song from '../../../main/interfaces/song';

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
  /**
   * Handles the click on a column title
   * @param columnName - Name of the column
   */
  handleSortByColumn(columnName: string): void;
}

const SongList: FC<SongListProps> = ({
  currentSongId,
  handlePlaySong,
  handleSortByColumn,
  isPlaying,
  songs,
}) => {
  const formatTime = useFormatTime();

  return useMemo(
    () => (
      <Container
        className="d-flex flex-column overflow-auto flex-grow-1"
        fluid={true}
      >
        <ListHeader handleSortByColumn={handleSortByColumn} />

        {songs.length ? (
          songs.map((item) => {
            const isPlayingThisSong = currentSongId === item.id && isPlaying;

            return (
              <SongElement
                artist={item.artist}
                duration={formatTime(item.duration)}
                handlePlaySong={handlePlaySong}
                imageSrc={`file://${item.songPath}\\${item.coverFile}`}
                isPlayingThisSong={isPlayingThisSong}
                name={item.name}
                songId={item.id}
                key={item.id}
              />
            );
          })
        ) : (
          <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
            <FontAwesomeIcon className="mb-4" icon={faHeartCrack} size="6x" />
            <h2>No results</h2>
            <p className="mb-0 text-muted">Here's only emptyness</p>
          </div>
        )}
      </Container>
    ),
    [currentSongId, isPlaying, songs]
  );
};

export default SongList;
