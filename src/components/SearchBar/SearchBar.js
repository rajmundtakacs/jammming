import React, {useState} from 'react';

const mockData = [
    {
        name: 'name1',
        artist: 'artist1',
        album: 'album1',
        id: 1,
        uri: 'uri1'
      },
      {
        name: 'name2',
        artist: 'artist2',
        album: 'album2',
        id: 2,
        uri: 'uri2'
      }
]


function SearchBar({setResults, mockData}) {

    const [searchInput, setSearchInput] = useState('');

    const fetchData = async (value) => {

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