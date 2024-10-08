import React from 'react';


const Track = ({track, addToPlaylist}) => {

    return (
        <div>
            <div>
                {track.artist} - 
                {track.name}  - 
                {track.preview_url && (
                    <audio controls>
                        <source src={track.preview_url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                )}
                <input type='button' value='Add +' onClick={(event) => addToPlaylist(track)} />
            </div>
        </div>
       
    ) 

}


export default Track;