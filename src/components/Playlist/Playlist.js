import React, {useState} from 'react';


const Playlist = ({playlist, removeFromPlaylist}) => {

    const [playlistName, setPlaylistName] = useState('');
    

    return (
        <div>
            <input value={playlistName} id ='name' type='text' placeholder='Name your playlist... ' onChange={(e) => setPlaylistName(e.target.value)} />
            <div>{playlist.map((track, i) => <div key={i}>{track.artist} - {track.name}<button onClick={(event) => removeFromPlaylist(i)} >Remove</button></div>)}</div>
            <button>get user profile</button>
            <button>Save to Spotify</button>
        </div>
    )

}



export default Playlist;