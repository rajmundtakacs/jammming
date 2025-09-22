import React from 'react';

const Track = ({ track, addToPlaylist, isInPlaylist }) => {
  return (
    <div className="flex items-center justify-between border-2 border-[#FFECEC] pl-2.5 my-2.5 w-full">
      <p className="flex-grow truncate pr-2">
        {track.artist} - {track.name}
      </p>

      {isInPlaylist ? (
        <span
          className="
            flex items-center justify-center
            w-[50px] h-[50px]
            text-[24px] leading-none
            bg-[#94c973] text-[#624E88]
          "
        >
          ✓
        </span>
      ) : (
        <button
          onClick={() => addToPlaylist(track)}
          className="
            flex items-center justify-center
            w-[50px] h-[50px]
            text-[30px] leading-none
            bg-[#CB80AB] text-white rounded
            hover:brightness-110 active:brightness-95
          "
        >
          +
        </button>
      )}
    </div>
  );
};

export default Track;
