import React from 'react';


const Track = ({track, addToPlaylist}) => {

    return (
        <div className="flex items-center justify-between border-2 border-[#FFECEC] pl-2.5 my-2.5 w-full">
  <p className="flex-grow truncate pr-2">{track.artist} - {track.name}</p>
  <input
    type="button"
    value="+"
    onClick={() => addToPlaylist(track)}
    className="flex-shrink-0 w-[50px] h-[50px] text-[30px] bg-[#CB80AB] text-white rounded cursor-pointer hover:brightness-110 active:brightness-95"
  />
</div>



      );
      

}


export default Track;