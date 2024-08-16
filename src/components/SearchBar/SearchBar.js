import React, {useState} from 'react';

function SearchBar({setResults}) {

    const [searchInput, setSearchInput] = useState('');

    const fetchData = (value) => {
        fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json()).then(json => {
            const filteredData = json.filter((data) => {
                return (
                     value &&
                     data && 
                     data.name && 
                     data.name.toLowerCase().includes(value)
                     );
            });
            setResults(filteredData);
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