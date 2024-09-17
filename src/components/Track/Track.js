import React, {useState} from 'react';







const Track = ({result, addToPlaylist}) => {


    return (
        <div>
            <div>{result.name} <input type='button' value='Add +' onClick={(event) => addToPlaylist(result)} /></div>
        </div>
       
    )
    

}





export default Track;