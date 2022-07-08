import { FC, useCallback, useEffect, useRef, useState } from 'react';

import SongList from './components/SongList';
import Panel from './components/Panel';

import Database from '../main/interfaces/database';

import CONFIG from './render.config';

import './App.scss';

const player = new Audio();

const App: FC = () => {
  const [database, setDatabase] = useState<Database>();
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [songId, setSongId] = useState('');
  // References
  const oldId = useRef('');
  // Song information
  const songData = database?.songs.find((item) => item.id === songId);

  // Get the database from the main process
  window.electron.ipcRenderer.once('app-database', (data) => {
    setDatabase(data as Database);
  });

  /**
   * Plays the selected song
   */
  const playSong = useCallback(
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
        setIsPlaying(true);

        oldId.current = songId;

        // Update app title
        document.title = `${selectedSong.name} - ${selectedSong.artist} | ${CONFIG.APP_NAME}`;
      }
    }
  }, [songId]);

  // Initial config of the player
  useEffect(() => {
    const initialVolume =
      parseFloat(localStorage.getItem('volume') || '') || 0.5;

    player.volume = initialVolume;
  }, []);

  if (!database) {
    return null;
  }

  return (
    <div className="d-flex flex-column vh-100 px-0">
      <SongList
        currentSongId={songId}
        isPlaying={isPlaying}
        onPlaySong={playSong}
        songs={database.songs}
      />

      <Panel
        currentSong={songData}
        isPlaying={isPlaying}
        onChangeVolume={changeVolume}
        volume={player.volume}
      />
    </div>
  );
};

export default App;
