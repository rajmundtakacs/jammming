// Spotify Credentials
const CLIENT_ID = '19fd446429584459855d315edf7d84fc';
const REDIRECT_URI = 'http://localhost:3000/';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

// Key for local storage
const TOKEN_KEY = 'spotify_access_token';
const EXPIRY_KEY = 'spotify_token_expiry';

// Redirecting user to Spotify for login
export const loginToSpotify = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
};

// Getting the access token and expiry from the URL
export const getAccessTokenFromUrl = () => {
    const hash = window.location.hash;
    if (hash) {
        const token = new URLSearchParams(hash.substring(1)).get('access_token');
        const expiry = new URLSearchParams(hash.substring(1)).get('expires_in');

        // Storing token and expiry in local storage
        if (token && expiry) {
            const expiryTime = new Date().getTime() + parseInt(expiry) * 1000; // ms
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(EXPIRY_KEY, expiryTime);
        }

        return token;
    }
    return null;
};

// Checking if the token is expired
const isTokenExpired = () => {
    const expiryTime = localStorage.getItem(EXPIRY_KEY);
    return expiryTime ? new Date().getTime() > expiryTime : true;
};


export const getAccessToken = () => {
    
    if (isTokenExpired()) {
        
        console.log("Token expired");
        
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(EXPIRY_KEY);
        
        return null;
    }
    return localStorage.getItem(TOKEN_KEY);
};


