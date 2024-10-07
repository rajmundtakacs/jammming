// Spotify Credentials
const CLIENT_ID = '19fd446429584459855d315edf7d84fc';
const REDIRECT_URI = 'http://localhost:3000/';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';

// Redirect user to Spotify for login
export const loginToSpotify = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-private user-read-email`;
};

// Get the access token from the URL
export const getAccessTokenFromUrl = () => {
    const hash = window.location.hash;
    if (hash) {
        const token = new URLSearchParams(hash.substring(1)).get('access_token');
        return token;
    }
    return null;
};

