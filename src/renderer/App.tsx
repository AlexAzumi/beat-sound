import { FC, useCallback, useEffect, useRef, useState } from 'react';
import MediaSessionWrapper from '@mebtte/react-media-session';

import Appbar from './components/Appbar/AppBar';
import SongList from './components/SongList/SongList';
import Panel from './components/Panel/Panel';

import Database from '../main/interfaces/database';
import Song from '../main/interfaces/song';

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
    (id: string) => {
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
        document.title = `${selectedSong.name} - ${selectedSong.artist} | ${renderConfig.APP_NAME}`;

        navigator.mediaSession.metadata = new MediaMetadata({
          title: selectedSong.name,
          artist: selectedSong.artist,
          album: `Beat Saber's custom songs`,
        });
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
              item.name.toLocaleLowerCase().includes(query) ||
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
   * Sorts the songs by the selected column
   */
  const sortByColumn = useCallback(
    (columnName: string) => {
      const sortPromise = new Promise<Song[]>((resolve, reject) => {
        if (!songsToShow) {
          reject([]);
        } else {
          const sortedSongs = songsToShow.sort((a, b) => {
            if (columnName === 'title') {
              return a.name < b.name ? -1 : 1;
            } else {
              return a.artist < a.artist ? -1 : 1;
            }
          });

          resolve(sortedSongs);
        }
      });

      sortPromise
        .then((songs) => setSongsToShow([...songs]))
        .catch(console.warn);
    },
    [songsToShow]
  );

  // Initial config of the player
  useEffect(() => {
    const initialVolume =
      parseFloat(localStorage.getItem('volume') || '') || 0.5;

    player.volume = initialVolume;
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
    const sorteredSongsPromise = new Promise<Song[]>((resolve, reject) => {
      if (!database) {
        reject([]);
      } else {
        const sorteredSongs = database.songs.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });

        resolve(sorteredSongs);
      }
    });

    sorteredSongsPromise.then(setSongsToShow).catch(console.warn);
  }, [database]);

  if (!database) {
    return null;
  }

  return (
    <MediaSessionWrapper
      album={`Beat Saber's custom song`}
      artist={songData?.artist}
      artwork={[]} // TODO: Add proper album artwork to the Media Session API
      onPause={() => handlePlaySong(songId)}
      onPlay={() => handlePlaySong(songId)}
      title={songData?.name}
    >
      <div className="d-flex flex-column vh-100 px-0">
        <Appbar handleSearchSong={searchSong} />

        <SongList
          currentSongId={songId}
          handlePlaySong={handlePlaySong}
          handleSortByColumn={sortByColumn}
          isPlaying={isPlaying}
          songs={songsToShow}
        />

        <Panel
          currentSong={songData}
          currentTime={currentTime}
          handlePlaySong={handlePlaySong}
          isPlaying={isPlaying}
          onChangeVolume={changeVolume}
          onEndSeeking={goToSecond}
          volume={player.volume}
        />
      </div>
    </MediaSessionWrapper>
  );
};

export default App;
