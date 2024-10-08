import React from 'react';
import styles from './Track.module.css';


const Track = ({track, addToPlaylist}) => {

    return (
        <div className={styles.trackbox} >
            <p>{track.artist} //// {track.name}</p>
            <input className={styles.addbutton} type='button' value='+' onClick={(event) => addToPlaylist(track)} />
        </div>
       
    ) 

}


export default Track;