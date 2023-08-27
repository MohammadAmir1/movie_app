import React, { useState, useEffect } from "react";
import SearchIcon from "./search.svg";
import "./App.css";
import MovieCard from "./MovieCard";

const API_URL = process.env.REACT_APP_API_KEY;
const App = () => {
  const [movies, setMovies] = useState([]);
const[searchTerm, setSearchTerm]=useState('');




console.log(movies,"movies")

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };


 const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed');
      searchMovies(searchTerm);
      setSearchTerm("")
    }
  };

  useEffect(() => {
    searchMovies("marvel");
  }, []);

  return (
    <div className="app">
      <h1>Nethub</h1>
      <div onKeyDown={handleKeyPress} className="search">
        <input
          placeholder="Search for  movies"
          value={searchTerm}
          onChange={(e) =>  setSearchTerm(e.target.value)}
        />
        {/* <img src={SearchIcon} alt="search" onClick={() =>{searchMovies(searchTerm);setSearchTerm('') } }/> */}
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
