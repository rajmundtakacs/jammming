import React, {useState} from 'react';


function SearchBar({setResults}) {

    const [searchInput, setSearchInput] = useState('');

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

                return jsonResponse.access_token;

            }
    
        } catch (error) {
            console.log(error);
        }
        
    } 

    const fetchData = async (token, value) => {

        try {
            
            const response = await fetch(`https://api.spotify.com/v1/search?q=${value}&type=track`, {
                method: 'GET',
                headers: {Authorization: `Bearer ${token}`}
              });

              if (response.ok) {
                const jsonResponse = await response.json();
                const returnedData = jsonResponse.tracks.items.map(data => {
                    return ({
                        id: data.id,
                        name: data.name,
                        artist: data.artists[0].name,
                        album: data.album.name,
                        uri: data.uri
                    })
                    
                })
                  
                  setResults(returnedData);
                  
               }
  
            } catch (error) {
                console.log(error)
            }
         }

         

    const handleChange = (value) => {
        setSearchInput(value); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = await getToken();

        if (token) {
            await fetchData(token, searchInput);
        }
    } 


    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)} >
                <input onChange={(e) => handleChange(e.target.value)} type="text" value={searchInput} placeholder='Type something...' />
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}


export default SearchBar;