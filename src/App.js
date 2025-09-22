import React, {useState} from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';


function App() {

  const [results, setResults] = useState([]);

  const [playlist, setPlaylist] = useState([]);



  const addToPlaylist = (track) => {
    setPlaylist([track, ...playlist])
  }

  const removeFromPlaylist = (index) => {
    setPlaylist(playlist.filter((track, i ) => i !== index))
  }


  return (
    <div className="min-h-svh text-center">
      <header className="p-6">
        <h1 className="text-6xl font-bold mb-6">jammming</h1>
        <SearchBar setResults={setResults} />
      </header>
  
      <main
        className="
          grid grid-cols-1 md:grid-cols-2
          gap-8 md:gap-10
          max-w-5xl mx-auto p-4
          justify-items-center md:justify-items-stretch
        "
      >
        <section className="w-full max-w-xl md:max-w-none md:w-full mx-auto">
          <SearchResults results={results} addToPlaylist={addToPlaylist} playlist={playlist} />
        </section>
  
        <section className="w-full max-w-xl md:max-w-none md:w-full">
          <Playlist
            playlist={playlist}
            removeFromPlaylist={removeFromPlaylist}
          />
        </section>
      </main>
    </div>
  );
  
}

export default App;
