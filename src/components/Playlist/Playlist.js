import React, { useState, useEffect } from 'react';
import { loginToSpotify, getAccessTokenFromUrl } from '../../util/Spotify';

const Playlist = ({ playlist, removeFromPlaylist }) => {
    const [playlistName, setPlaylistName] = useState(''); // State for playlist name
    const [accessToken, setAccessToken] = useState('');   // State for access token
    const [userProfile, setUserProfile] = useState(null); // State for user profile

    const getUserProfile = async () => {
        if (!accessToken) {
            console.log('No access token available');
            return;
        }

        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
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

    useEffect(() => {
        const token = getAccessTokenFromUrl();
        if (token) {
            setAccessToken(token);
        } 
    }, []); 

    
    // Handle manual login with button click
    const handleLogin = () => {
        loginToSpotify();
    };

    return (
        <div>
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

            {!accessToken && (
                <button onClick={handleLogin}>Log in to Spotify</button>
            )}

            <button onClick={getUserProfile}>Get User Profile</button>
            {userProfile && (
                <div>
                    <h3>{userProfile.display_name}'s Profile</h3>
                    <p>Email: {userProfile.email}</p>
                    <p>Country: {userProfile.country}</p>
                </div>
            )}
        </div>
    );
};

export default Playlist;
