import React, {useState} from 'react';
import SearchResults from '../SearchResults/SearchResults';


const Tracklist = ({results}) => {

    return (
        <div>
            {
                results.map((result, id) => {
                    return <SearchResults result={result} key={id} />
                })
            }
            
        </div>
    )
    

}

export default Tracklist;