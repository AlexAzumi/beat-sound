import { FC } from 'react';

import Panel from './components/Panel';

import './App.scss';

const App: FC = () => {
  return (
    <div className="d-flex flex-column h-100 px-0">
      <Panel />
    </div>
  );
};

export default App;
