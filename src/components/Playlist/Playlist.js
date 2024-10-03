import React, {useState} from 'react';


const Playlist = ({playlist, removeFromPlaylist}) => {

    const [playlistName, setPlaylistName] = useState('');
    const [userProfile, setUserProfile] = useState('');

    const clientId = '19fd446429584459855d315edf7d84fc';
    const clientSecret = '34276136c4c64dffaf5e073c6e581416';
    const redirectUri = 'http://localhost:3000/callback';

    //const [trackURIs, setTrackURIs] = useState([]);
    //setTrackURIs(playlist.map((track) =>  <li>{track.uri}</li>));

    const getAuthCode = () => {
        const scope = 'user-read-private user-read-email'; // Add scopes based on what data you want to access
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

        // Redirect the user to Spotify's authorization page
        window.location.href = authUrl;
    };

    const getToken = async (authCode) => {

       try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: authCode,
                    redirect_uri: redirectUri
                })
        });
    
            if (response.ok) {
                const jsonResponse = await response.json();

                localStorage.setItem('spotifyAccessToken', jsonResponse.access_token);
                localStorage.setItem('spotifyRefreshToken', jsonResponse.refresh_token);

                return jsonResponse.access_token;

            } else {
                console.error("Failed to retrieve access token");
            }
    
        } catch (error) {
            console.log(error);
        }
        
    }



    const getUserProfile = async (token) => {

        try {

            const response = await fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: {Authorization: `Bearer ${token}`}
              });
    
            if (response.ok) {
                const jsonResponse = await response.json();

                setUserProfile(jsonResponse.display_name);

            }
    
        } catch (error) {
            console.log(error);
        }
    }

    const getAuthCodeFromURL = () => {
        const query = new URLSearchParams(window.location.search);
        return query.get('code'); // Get the 'code' parameter from the URL
    };
    

    const handleGetUserProfile = async () => {
        
        const savedToken = localStorage.getItem('spotifyAccessToken');
        let token;

        if (!savedToken) {
            const authCode = getAuthCodeFromURL(); // Extract authorization code from URL

            if (authCode) {
                token = await getToken(authCode); // Exchange the authorization code for an access token
            } else {
                getAuthCode(); // Redirect user to Spotify to get authorization code
                return;
            }
        } else {
            token = savedToken;
        }

        if (token) {
            await getUserProfile(token);
        }
    }


    return (
        <div>
            <input value={playlistName} id ='name' type='text' placeholder='Name your playlist... ' onChange={(e) => setPlaylistName(e.target.value)} />
            <div>{playlist.map((track, i) => <div key={i}>{track.artist} - {track.name}<button onClick={(event) => removeFromPlaylist(i)} >Remove</button></div>)}</div>
            <button onClick={handleGetUserProfile}>get user profile</button>
            <button>Save to Spotify</button>
            
            <p>{userProfile}</p>
        </div>
    )

}



export default Playlist;