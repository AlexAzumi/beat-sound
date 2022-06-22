import { FC, useState } from 'react';

import SongList from './components/SongList';
import Panel from './components/Panel';

import Database from '../main/interfaces/database';

import './App.scss';

const App: FC = () => {
  const [database, setDatabase] = useState<Database>();

  // Get the database from the main process
  window.electron.ipcRenderer.once('app-database', (data) => {
    setDatabase(data as Database);
  });

  if (!database) {
    return null;
  }

  return (
    <div className="d-flex flex-column vh-100 px-0">
      <SongList songs={database.songs} />

      <Panel />
    </div>
  );
};

export default App;
