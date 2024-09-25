import React, {useState} from 'react';



function SearchBar({setResults, token}) {

    const [searchInput, setSearchInput] = useState('');

    const fetchData = async (value) => {


          /* const response = await fetch(`https://api.spotify.com/v1/search?q=${value}&type=track`, {
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
                    
                }) */

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
    


    const handleChange = (value) => {
        setSearchInput(value);  
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(searchInput);
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