import React, {useState} from 'react';
import Track from '../Track/Track';


const Tracklist = ({results, addToPlaylist}) => {

    return (
        <div>
            {
                results.map((result, id) => {
                    return <Track result={result} key={id} addToPlaylist={addToPlaylist} />
                })
            }
            
        </div>
    )
    

}

export default Tracklist;