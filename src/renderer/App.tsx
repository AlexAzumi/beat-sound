import { FC, useCallback, useEffect, useRef, useState } from 'react';

import SongList from './components/SongList';
import Panel from './components/Panel';

import Database from '../main/interfaces/database';
import Song from '../main/interfaces/song';

import './App.scss';

const player = new Audio();

const App: FC = () => {
  const [database, setDatabase] = useState<Database>();
  const [playerState, setPlayerState] = useState<{
    id: string;
    songData: Song | null;
    playing: boolean;
  }>({
    id: '',
    songData: null,
    playing: false,
  });

  const oldId = useRef('');

  /**
   * Plays the selected song
   */
  const playSong = useCallback(
    (id: string) => {
      setPlayerState({
        ...playerState,
        id,
        playing: false,
      });
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
    if (playerState.playing) {
      player.play();
    } else {
      player.pause();
    }

    if (playerState.id !== oldId.current) {
      const selectedSong = database?.songs.find(
        (item) => item.id === playerState.id
      );

      if (selectedSong) {
        const songPath = `file://${selectedSong.songPath}\\${selectedSong.audioFile}`;

        player.pause();
        player.src = songPath;
        player.load();
        player.play();
        setPlayerState({
          ...playerState,
          songData: selectedSong,
          playing: true,
        });
        oldId.current = playerState.id;
      }
    }
  }, [playerState]);

  if (!database) {
    return null;
  }

  return (
    <div className="d-flex flex-column vh-100 px-0">
      <SongList songs={database.songs} onPlaySong={playSong} />

      <Panel currentSong={playerState.songData} onChangeVolume={changeVolume} />
    </div>
  );
};

export default App;
