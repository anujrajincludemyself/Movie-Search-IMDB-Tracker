import React from 'react';

const Moviecard = ({ movie }) => {

  const { title, vote_average, poster_path, release_date, original_language } = movie;

  return (
    <div className="movie-card bg-[#1a1a1a] p-4 rounded-xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer">

      {/* Movie Poster */}
      <img 
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : `/no-movies.png`
        }
        alt={title}
        className="rounded-lg w-full h-[300px] object-cover"
      />

      {/* Title */}
      <h3 className="text-white font-semibold mt-3 line-clamp-2">{title}</h3>

      {/* Info Row */}
      <div className="content flex justify-between items-center mt-2">

        {/* Rating */}
        <div className="rating flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-lg">
          <img src="star.svg" alt="star icon" className="w-4 h-4" />
          <p className="text-yellow-400 font-medium">
            {vote_average ? vote_average.toFixed(1) : "N/A"}
          </p>
        </div>

        {/* Language */}
        <p className="text-gray-400 text-sm uppercase">{original_language}</p>

      </div>

      {/* Release Year */}
      <p className="text-gray-500 text-sm mt-1">
        {release_date ? release_date.slice(0, 4) : "Unknown"}
      </p>

    </div>
  );
};

export default Moviecard;
