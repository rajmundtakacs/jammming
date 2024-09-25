import React, {useState} from 'react';


function SearchBar({setResults}) {

    const [searchInput, setSearchInput] = useState('');

    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    

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
                return token;
            }
    
        } catch (error) {
            console.log(error);
        }
        
    }

    const fetchData = async (value) => {

        try {

            
            const response = await fetch(`https://api.spotify.com/v1/search?q=${value}&type=track`, {
                method: 'GET',
                headers: {Authorization: `bearer ${token}`}
              });

              if (response.ok) {
                const jsonResponse = await response.json();
                const filteredData = jsonResponse.tracks.items.map(data => {
                    return ({
                        id: data.id,
                        name: data.name,
                        artist: data.artists[0].name,
                        album: data.album.name,
                        uri: data.uri
                    })
                    
                })
                  
                  setResults(filteredData);
                  
               }
  
            } catch (error) {
                console.log(error)
            }
         }

/*
                try {

                    const response = await fetch('https://jsonplaceholder.typicode.com/users');
          
                      if (response.ok) {
                          const jsonResponse = await response.json();
                          const filteredData = jsonResponse.filter((data) => {
                              return (data && data.name && data.name.toLowerCase().includes(value));
                          });
                          
                          setResults(filteredData);
                          
                       }
          
                } catch (error) {
                      console.log(error)
                  }
              }
    
*/

    const handleChange = (value) => {
        setSearchInput(value);  
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getToken();
        fetchData(searchInput);
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)} >
                <input onChange={(e) => handleChange(e.target.value)} type="text" value={searchInput} placeholder='Type something...' />
                <input type="submit" value="Search" />
                <p>{token}</p>
                <p>{expire}</p>
            </form>
        </div>
    )
}


export default SearchBar;