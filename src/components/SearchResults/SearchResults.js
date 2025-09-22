import React from 'react';
import Track from '../Track/Track';


const SearchResults = ({results, addToPlaylist}) => {

    return (

        <div className="w-full max-w-xl md:max-w-none mx-auto">
            <h3 className="text-[26px] text-center mb-4">Results</h3>
            {results.map(t => (
                <Track key={t.id ?? t.uri} track={t} addToPlaylist={addToPlaylist} />
            ))}
        </div>

      );      

}

export default SearchResults;