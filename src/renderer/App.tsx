import { FC, useCallback, useEffect, useRef, useState } from 'react';
import MediaSessionWrapper from '@mebtte/react-media-session';

import Appbar from './components/Appbar/AppBar';
import SongList from './components/SongList/SongList';
import Panel from './components/Panel/Panel';

import Database from '../main/interfaces/database';
import Song from '../main/interfaces/song';

import useSortByTitle from './hooks/useSortByTitle';
import useGetNextSong from './hooks/useGetNextSong';

import renderConfig from './render.config';

import './App.scss';

const player = new Audio();

const App: FC = () => {
  const [database, setDatabase] = useState<Database>();
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [songId, setSongId] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [songsToShow, setSongsToShow] = useState<Song[]>([]);
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [isRepeatActive, setIsRepeatActive] = useState(false);
  // Custom hooks
  const sortByTitle = useSortByTitle();
  const getNextSong = useGetNextSong(database?.songs);
  // References
  const oldId = useRef('');
  // Song information
  const songData = database?.songs.find((item) => item.id === songId);

  // Get the database from the main process
  window.electron.ipcRenderer.once('app-database', (data) => {
    setDatabase(data as Database);
  });

  /**
   * Handles the event of playing/pausing a song
   */
  const handlePlaySong = useCallback(
    (id: string, playAgain?: boolean) => {
      if (playAgain) {
        player.currentTime = 0;
        setCurrentTime(0);

        return;
      }

      // Check if the selected song is the same
      if (oldId.current === id) {
        if (!isPlaying) {
          player.play();

          setIsPlaying(true);
        } else {
          player.pause();

          setIsPlaying(false);
        }
      } else {
        setSongId(id);
      }
    },
    [database, isPlaying]
  );

  /**
   * Changes the volume of the player
   */
  const changeVolume = useCallback((value: number) => {
    player.volume = value;
    // Update on local storage
    localStorage.setItem('volume', value.toString());
  }, []);

  /**
   * Changes the current time to the inputed value by the user using the progress bar
   * @param time - New time in seconds
   */
  const goToSecond = useCallback((time: number) => {
    player.currentTime = time;
    // Update state
    setCurrentTime(time);
  }, []);

  // Updates the selected song
  useEffect(() => {
    if (!songId) {
      return;
    }

    if (songId !== oldId.current) {
      const selectedSong = database?.songs.find((item) => item.id === songId);

      if (selectedSong) {
        const songPath = `file://${selectedSong.songPath}\\${selectedSong.audioFile}`;

        player.pause();

        player.src = songPath;
        player.load();
        player.play();

        // Update player state
        setIsPlaying(true);
        setCurrentTime(0);

        oldId.current = songId;

        // Update app title
        document.title = `${selectedSong.title} - ${selectedSong.artist} | ${renderConfig.APP_NAME}`;
      }
    }
  }, [songId]);

  /**
   * Updates the search query
   * @param query - Search query
   */
  const searchSong = useCallback(
    (query: string) => {
      const searchPromise = new Promise<Song[]>((resolve, reject) => {
        if (!database) {
          reject([]);
        } else {
          const filteredItems = database.songs.filter(
            (item) =>
              item.title.toLocaleLowerCase().includes(query) ||
              item.artist.toLocaleLowerCase().includes(query)
          );

          resolve(filteredItems);
        }
      });

      searchPromise.then(setSongsToShow).catch(console.warn);
    },
    [database]
  );

  /**
   * Plays the next song in playlist
   * @param playedFromList - Set to `true` if the song has been selected from the song list
   */
  const playNextSong = useCallback(
    (id?: string) => {
      if (!database) {
        return;
      }

      const nextSongId = getNextSong(
        id || songId,
        isShuffleActive,
        isRepeatActive,
        !!id
      );

      if (nextSongId) {
        handlePlaySong(nextSongId);
      } else {
        setIsPlaying(false);
      }
    },
    [database, songId, isShuffleActive, isRepeatActive]
  );

  /**
   * Plays the previous song in playlist
   */
  const playPreviousSong = useCallback(() => {
    if (!database) {
      return;
    }

    if (currentTime > 3) {
      handlePlaySong(songId, true);
    } else {
      const previusSongId = getNextSong(
        songId,
        isShuffleActive,
        isRepeatActive,
        false,
        true
      );

      if (previusSongId) {
        handlePlaySong(previusSongId, songId === previusSongId);
      } else {
        setIsPlaying(false);
      }
    }
  }, [database, songId, currentTime, isShuffleActive, isRepeatActive]);

  // Initial config of the player
  useEffect(() => {
    const initialVolume =
      parseFloat(localStorage.getItem('volume') || '') || 0.5;
    const shuffleActive: boolean = JSON.parse(
      localStorage.getItem('isShuffleActive') || 'false'
    );
    const repeatActive: boolean = JSON.parse(
      localStorage.getItem('isRepeatActive') || 'false'
    );

    player.volume = initialVolume;
    setIsShuffleActive(shuffleActive);
    setIsRepeatActive(repeatActive);
  }, []);

  // Create progress bar interval (1 second tick)
  useEffect(() => {
    const timeUpdate = setInterval(() => {
      if (!isPlaying) {
        return;
      }

      const playerTime = Math.round(player.currentTime);

      if (playerTime !== currentTime) {
        setCurrentTime(playerTime);
      }
    }, 1000);

    return () => {
      clearInterval(timeUpdate);
    };
  }, [isPlaying]);

  // Start with sortered songs
  useEffect(() => {
    if (database) {
      sortByTitle(database.songs).then(setSongsToShow);
    }
  }, [database]);

  // Player events
  useEffect(() => {
    player.addEventListener('ended', () => playNextSong());

    return () => {
      player.removeEventListener('ended', () => playNextSong());
    };
  }, [database, songId, isShuffleActive, isRepeatActive]);

  // Update `isShuffleActive` flag in `localStorage`
  useEffect(() => {
    localStorage.setItem('isShuffleActive', JSON.stringify(isShuffleActive));
  }, [isShuffleActive]);

  // Update `isRepeatActive` flag in `localStorage`
  useEffect(() => {
    localStorage.setItem('isRepeatActive', JSON.stringify(isRepeatActive));
  }, [isRepeatActive]);

  if (!database) {
    return null;
  }

  return (
    <MediaSessionWrapper
      album={`Beat Saber's custom song`}
      artist={songData?.artist}
      artwork={[]} // TODO: Add proper album artwork to the Media Session API
      onNextTrack={() => playNextSong()}
      onPause={() => handlePlaySong(songId)}
      onPlay={() => handlePlaySong(songId)}
      onPreviousTrack={() => playPreviousSong()}
      title={songData?.title}
    >
      <div className="d-flex flex-column vh-100 px-0">
        <Appbar handleSearchSong={searchSong} />

        <SongList
          currentSongId={songId}
          handlePlaySong={playNextSong}
          isPlaying={isPlaying}
          songs={songsToShow}
        />

        <Panel
          currentSong={songData}
          currentTime={currentTime}
          handleClickBackwardStep={playPreviousSong}
          handleClickForwardStep={() => playNextSong()}
          handleClickRepeat={() => setIsRepeatActive(!isRepeatActive)}
          handleClickShuffle={() => setIsShuffleActive(!isShuffleActive)}
          handlePlaySong={handlePlaySong}
          isPlaying={isPlaying}
          isRepeatActive={isRepeatActive}
          isShuffleActive={isShuffleActive}
          onChangeVolume={changeVolume}
          onEndSeeking={goToSecond}
          volume={player.volume}
        />
      </div>
    </MediaSessionWrapper>
  );
};

export default App;
