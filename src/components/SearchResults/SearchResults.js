import React from 'react';
import Track from '../Track/Track';


const SearchResults = ({results, addToPlaylist, playlist}) => {

    return (

        <div className="w-full max-w-xl md:max-w-none mx-auto">
            <h3 className="text-[26px] text-center mb-4">Results</h3>
            {results.map((t) => {
                const isInPlaylist = playlist.some((p) => p.uri === t.uri);

                return (
                <Track
                    key={t.id ?? t.uri}
                    track={t}
                    addToPlaylist={addToPlaylist}
                    isInPlaylist={isInPlaylist}
                />
                );
            })}
        </div>
      );      

}

export default SearchResults;