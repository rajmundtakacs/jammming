import React, { useState, useEffect, useCallback } from 'react';
import { loginToSpotify, getAccessTokenFromUrl } from '../../util/Spotify';

const Playlist = ({ playlist, removeFromPlaylist }) => {

    const [playlistName, setPlaylistName] = useState('');
    const [accessToken, setAccessToken] = useState(''); 
    const [userProfile, setUserProfile] = useState(null);

    const getUserProfile = useCallback(async () => {
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
    }, [accessToken]);

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
    }, [accessToken, getUserProfile]);


    const handleLogin = () => {
        loginToSpotify();
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
    <div className="w-full max-w-xl md:max-w-none mx-auto">
      {userProfile && (
        <div className="mb-4">
          <h3 className="text-2xl mb-2">Hey {userProfile.display_name}!</h3>
          <input
            className="
              text-lg border-0 rounded p-2 mb-3 w-full text-center text-black
            "
            value={playlistName}
            id="name"
            type="text"
            placeholder="Name your playlist..."
            onChange={(e) => setPlaylistName(e.target.value)}
          />
        </div>
      )}
  
      <div className="space-y-2">
        {playlist.map((track, i) => (
          <div
            key={i}
            className="
              flex items-center justify-between
              border-2 border-[#FFECEC]
              pl-2.5 w-full
            "
          >
            <p className="flex-grow truncate pr-2">
              {track.artist} - {track.name}
            </p>
            <button
                onClick={() => removeFromPlaylist(i)}
                className="
                    flex items-center justify-center
                    text-[30px] leading-none
                    w-[50px] h-[54px]
                    bg-[#CB80AB]
                    border-0
                    text-white
                    hover:brightness-110 active:brightness-95
                "
                aria-label="Remove from playlist"
                title="Remove"
            >
                &minus;
            </button>

          </div>
        ))}
      </div>
  
      {userProfile && (
        <button
          onClick={savePlaylist}
          className="
            inline-flex items-center justify-center
            whitespace-nowrap
            px-6 md:px-8 py-4
            text-lg md:text-lg
            bg-[#CB80AB] text-white rounded
            hover:brightness-110 active:brightness-95
            w-full sm:w-auto my-5
          "
        >
          Save to Spotify
        </button>
      )}
  
      {!accessToken && (
        <button
          onClick={handleLogin}
          className="
            inline-flex items-center justify-center
            whitespace-nowrap
            px-6 md:px-8 py-4
            text-base md:text-lg
            bg-[#CB80AB] text-white rounded
            hover:brightness-110 active:brightness-95
            w-full sm:w-auto my-5
          "
        >
          Log in to Spotify
        </button>
      )}
    </div>
  );  

}

export default Playlist;
