let accessToken;

const Spotify = () => {
    getAccessToken() {
        if (accessToken) return accessToken;
        const tokenInUrl = window.location.href.match(/access_token=())
    }
}

export default Spotify;