import React, { useEffect, useState } from 'react'
import './App.css'
import Search from "./components/Search";
import Spinner from './components/Spinner';  
import Moviecard from "./components/Moviecard";
import { useDebounce } from 'react-use';
import Navbar from "./components/Navbar";  // <-- ADDED



const API_BASE_URL = "https://api.themoviedb.org/3"; 

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

const App = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query 
        ? `${API_BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      setMovieList(data.results);

    } catch (error) {
      setErrorMessage("Error fetching movies. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // debounce fetchMovies execution, not the value
  useDebounce(
    () => {
      fetchMovies(searchTerm);
    },
    500,
    [searchTerm]
  );

  // Load default movies once on mount
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <Navbar /> {/* <-- ADDED */}

      <div className='pattern' />

      {/* spacing so navbar doesn't overlap */}
      <div className="wrapper pt-[80px]">

        <header>
          <img src="./hero.png" alt="hero banner" />
          <h1>
            Find <span className='text-gradient'>movies</span> you will enjoy
          </h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <section className="all-movies">
          <h2 className='mt-[40px] mb-[40px]'>All Movies</h2>

          {isLoading ? (
            <Spinner />  
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {movieList.map((movie) => (
                <Moviecard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
