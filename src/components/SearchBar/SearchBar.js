import React, {useState} from 'react';

function SearchBar({setResults}) {

    const [searchInput, setSearchInput] = useState('');

    const fetchData = (value) => {
        fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json()).then(json => {
            const results = json.filter((user) => {
                return (
                     value &&
                     user && 
                     user.name && 
                     user.name.toLowerCase().includes(value)
                     );
            });
            setResults(results);
        });
    }

    const handleChange = (value) => {
        setSearchInput(value);
        fetchData(value);
    }

    return (
        <div>
            <form>
                <input onChange={(e) => handleChange(e.target.value)} type="text" value={searchInput} placeholder='Type something...' />
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}



export default SearchBar;