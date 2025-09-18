// Spotify Credentials
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const SCOPES = process.env.REACT_APP_SCOPES;
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';

// Redirecting user to Spotify for login
export const loginToSpotify = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
};

// Getting the access token and expiry from the URL
export const getAccessTokenFromUrl = () => {
    const hash = window.location.hash;
    if (hash) {
        const token = new URLSearchParams(hash.substring(1)).get('access_token');
        return token;
    }
    return null;
};



