import React from 'react';
import Track from '../Track/Track';


const SearchResults = ({results, addToPlaylist}) => {

    return (
        <div>
            {
                results.map((track, id) => {
                    return <Track track={track} key={id} addToPlaylist={addToPlaylist} />
                })
            }
        </div>
    )

}

export default SearchResults;