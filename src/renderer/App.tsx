import { FC, useCallback, useEffect, useRef, useState } from 'react';

import SongList from './components/SongList';
import Panel from './components/Panel';

import Database from '../main/interfaces/database';

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

  /**
   * Plays the selected song
   */
  const playSong = useCallback(
    (id: string) => {
      setSongId(id);
      setIsPlaying(true);
    },
    [database]
  );

  /**
   * Changes the volume of the player
   */
  const changeVolume = useCallback((value: number) => {
    player.volume = value;
  }, []);

  // Get the database from the main process
  window.electron.ipcRenderer.once('app-database', (data) => {
    setDatabase(data as Database);
  });

  useEffect(() => {
    if (!songId) {
      return;
    }

    if (!isPlaying) {
      player.play();
    } else {
      player.pause();
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
      }
    }
  }, [songId]);

  // Initial config of the player
  useEffect(() => {
    player.volume = 0.5;
  }, []);

  if (!database) {
    return null;
  }

  return (
    <div className="d-flex flex-column vh-100 px-0">
      <SongList songs={database.songs} onPlaySong={playSong} />

      <Panel currentSong={songData} onChangeVolume={changeVolume} />
    </div>
  );
};

export default App;
