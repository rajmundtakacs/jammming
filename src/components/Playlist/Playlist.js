import React, {useState} from 'react';


const Playlist = ({playlist, removeFromPlaylist, onSave}) => {

    const [playlistName, setPlaylistName] = useState('');

    return (
        <div>
            <input value={playlistName} id ='name' type='text' placeholder='Name your playlist... ' onChange={(e) => setPlaylistName(e.target.value)} />
            <div>{playlist.map((track, i) => <div>{track.name}<button onClick={(event) => removeFromPlaylist(i)} >Remove</button></div>)}</div>
            <button onClick={onSave} >Save to Spotify</button>
        </div>
    )


}



export default Playlist;