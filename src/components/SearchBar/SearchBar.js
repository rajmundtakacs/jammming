import React, { useState, useEffect } from 'react';
import { getAccessTokenFromUrl } from '../../util/Spotify';

function SearchBar({ setResults }) {

    const [searchInput, setSearchInput] = useState('');
    const [accessToken, setAccessToken] = useState('');

    const fetchData = async (token, value) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${value}&type=track`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                const returnedData = jsonResponse.tracks.items.map((data) => ({
                    id: data.id,
                    name: data.name,
                    artist: data.artists[0].name,
                    album: data.album.name,
                    uri: data.uri,
                }));

                setResults(returnedData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (value) => {
        setSearchInput(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!accessToken) {
            console.log('No access token');
            return;
        }
        await fetchData(accessToken, searchInput);
    };

    useEffect(() => {
        const token = getAccessTokenFromUrl();
        if (token) {
            setAccessToken(token);
        }
    }, []);

    

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    onChange={(e) => handleChange(e.target.value)}
                    type="text"
                    value={searchInput}
                    placeholder="Type something..."
                />
                <input type="submit" value="Search" />
            </form>
        </div>
    );
}

export default SearchBar;
