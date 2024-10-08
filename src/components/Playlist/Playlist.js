import React, { useState, useEffect } from 'react';
import { loginToSpotify, getAccessTokenFromUrl } from '../../util/Spotify';

const Playlist = ({ playlist, removeFromPlaylist }) => {

    const [playlistName, setPlaylistName] = useState('');
    const [accessToken, setAccessToken] = useState(''); 
    const [userProfile, setUserProfile] = useState(null);


    useEffect(() => {
        const token = getAccessTokenFromUrl();
        if (token) {
            setAccessToken(token);
        } 
    }, []);

    useEffect(() => {
        if (accessToken) {
            getUserProfile();
        }
    }, [accessToken]);

    const handleLogin = () => {
        loginToSpotify();
    };

    const getUserProfile = async () => {

        if (!accessToken) {
            console.log('No access token available');
            return;
        }

        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUserProfile(data);
            } else {
                console.log('Failed to fetch user profile');
            }
        } catch (error) {
            console.log(error);
        }
    };


    const savePlaylist = async () => {

        if (!userProfile || !playlistName) {
            console.log('User profile or playlist data is missing.');
            return;
        }

        try {

            //Creating the playlist
            const createPlaylist = await fetch(`https://api.spotify.com/v1/users/${userProfile.id}/playlists`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "name": playlistName,
                    "description": "New playlist description",
                    "public": false
                })
            });
        
            if (!createPlaylist.ok) {
                console.log('Failed to create playlist');
                return;
            }

            const playlistData = await createPlaylist.json();

            // Reaching track uris on the playlist array
            const trackUris = playlist.map(track => track.uri);

            //Saving tracks to the playlist
            const saveTracks = await fetch(`https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        "uris": trackUris,
                        "position": 0
                    })
                });

                if (saveTracks.ok) {
                    console.log('Tracks added successfully to the playlist');
                    alert('Playlist saved to your profile!');
                } else {
                    console.log('Failed to create playlist');
                }
    
    } catch (error) {
        console.log(error);
    }
}
    
    
    return (
        <div>
            {userProfile && (
                    <h3>Hey {userProfile.display_name} !</h3>
            )} 
            <input
                value={playlistName}
                id="name"
                type="text"
                placeholder="Name your playlist..."
                onChange={(e) => setPlaylistName(e.target.value)}
            />
            <div>
                {playlist.map((track, i) => (
                    <div key={i}>
                        {track.artist} - {track.name}
                        <button onClick={() => removeFromPlaylist(i)}>Remove</button>
                    </div>
                ))}
            </div>
            {userProfile && (
                <button onClick={savePlaylist}>Save to Spotify</button>
            )}

            {!accessToken && (
                <button onClick={handleLogin}>Log in to Spotify</button>
            )}

            
             
            
        </div>
    );

}

export default Playlist;
