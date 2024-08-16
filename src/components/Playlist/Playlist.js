import React, {useState} from 'react';
import SearchResults from '../SearchResults/SearchResults';


const Playlist = ({results}) => {

    const [playlistName, setPlaylistName] = useState('First Playlist');
    const [playlist, setPlaylist] = useState(['track one', 'track two', 'track three']);

    return (
        <div>
            <input id ='name' type='text' placeholder='Name your playlist... ' onChange={(e) => setPlaylistName(e.target.value)} />
            <input type='submit' value='Save the playlist' />
            <div>{playlistName}</div>
        </div>
    )


}



export default Playlist;