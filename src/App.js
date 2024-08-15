import React, {useState} from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import Tracklist from './components/Tracklist/Tracklist';

function App() {

const [results, setResults] = useState([])

  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar setResults={setResults} />
      <Tracklist results={results} />
      <button>Save to Spotify</button>
      
    </div>
  );
}

export default App;
