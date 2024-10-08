import React from 'react';
import Track from '../Track/Track';
import styles from './SearchResults.module.css';


const SearchResults = ({results, addToPlaylist}) => {

    return (

        <div className={styles.resultsbox} >
            <h3>Results</h3>
            {
                results.map((track, id) => {
                    return <Track track={track} key={id} addToPlaylist={addToPlaylist} />
                })
            }
        </div>
    )

}

export default SearchResults;