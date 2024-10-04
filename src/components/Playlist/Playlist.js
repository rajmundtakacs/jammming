import React, {useState} from 'react';


const Playlist = ({playlist, removeFromPlaylist}) => {

    const [playlistName, setPlaylistName] = useState('');

    const clientId = '19fd446429584459855d315edf7d84fc';
    const clientSecret = '34276136c4c64dffaf5e073c6e581416';
    const redirectUri = 'http://localhost:3000/callback';

    //const [trackURIs, setTrackURIs] = useState([]);
    //setTrackURIs(playlist.map((track) =>  <li>{track.uri}</li>));

 

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