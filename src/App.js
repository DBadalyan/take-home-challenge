import { useEffect, useState } from 'react';
import './App.css';
import Instructions from './Instructions';
import SearchInput from './search-input/SearchInput';
import SelectedOutput from './SelectedOutput';
import Trigger from './Trigger';
import { isEscKeyEvent, isOpenSearchKeyEvent } from './utils/keys.util';

function App() {
  const [selected, setSelected] = useState();
  const [displaySearchInput, setDisplaySearchInput] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  function handleTrigger() {
    setDisplaySearchInput(!displaySearchInput);
  }

  function handleKeyDown(e) {
    
    if (isOpenSearchKeyEvent(e)) {
      e.preventDefault();
      handleTrigger();
    } else if (isEscKeyEvent(e)) {
      setDisplaySearchInput(false);
    }
  }

  return (
    <div className="App">
      <Instructions />
      <div className="Implementation">
        <Trigger onTrigger={handleTrigger} />

        {displaySearchInput && <SearchInput onSelect={setSelected} />}

        <SelectedOutput selected={JSON.stringify(selected, null, '\t')}/>
      </div>
    </div>
  );
}

export default App;
