import React, {useState} from 'react';


const SearchResults = ({result}) => {

    return (
        <div onClick={(e) => alert(`You've clicked ${result.name}`)}>{result.name}</div>
    )
    

}

export default SearchResults;
