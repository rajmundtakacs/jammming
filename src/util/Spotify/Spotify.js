import React from 'react';

function Spotify({setToken, setExpire}) {

    const getToken = async () => {

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                body: "grant_type=client_credentials&client_id=19fd446429584459855d315edf7d84fc&client_secret=34276136c4c64dffaf5e073c6e581416"
        });
    
            if (response.ok) {
                const jsonResponse = await response.json();
                setToken(jsonResponse.access_token);
                setExpire(jsonResponse.expires_in);
            }
    
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <div>
              <button onClick={getToken}>get token</button>
        </div>
    )
}

    
export default Spotify;