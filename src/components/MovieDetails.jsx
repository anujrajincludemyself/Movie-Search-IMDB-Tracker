import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMovieDetails = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const data = await response.json();
      setMovie(data);
    } catch (error) {
      setErrorMessage("Error fetching movie details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-red-500">{errorMessage}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-white">Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <Link to="/" className="text-sm text-gray-400 hover:text-white mb-4 inline-block">
        ← Back to Movies
      </Link>

      <div className="flex flex-col md:flex-row gap-8 mt-4">
        {/* Poster */}
        <div className="w-full md:w-1/3">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "/no-movies.png"
            }
            alt={movie.title}
            className="rounded-xl w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {movie.title}
          </h1>

          {movie.tagline && (
            <p className="text-gray-400 italic mb-4">"{movie.tagline}"</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-4">
            <span>📅 {movie.release_date}</span>
            {movie.runtime && <span>⏱ {movie.runtime} min</span>}
            <span>⭐ {movie.vote_average?.toFixed(1)} ({movie.vote_count} votes)</span>
            <span>🌐 {movie.original_language?.toUpperCase()}</span>
          </div>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Genres:</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-2 py-1 bg-gray-800 rounded-full text-xs"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Overview */}
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Overview:</h3>
            <p className="text-gray-200 leading-relaxed">{movie.overview}</p>
          </div>

          {/* Production Companies */}
          {movie.production_companies && movie.production_companies.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-1">Production Companies:</h3>
              <ul className="list-disc list-inside text-gray-300 text-sm">
                {movie.production_companies.map((company) => (
                  <li key={company.id}>{company.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
