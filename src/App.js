import {useEffect, useState} from 'react';
import searchIcon from './search.svg';
import MovieCard from './MovieCard';
import './App.css';
// 7386ba60

const API_URL = "http://www.omdbapi.com?apikey=7386ba60";

const movie1 = {
    "Title": "The Dark Knight",
    "Year": "2008",
    "imdbID": "tt0468569",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg"
};


const App = () => {
    // changing values of using state
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies("The Dark Knight");
    },[]);

    return(
        <div className="app">
            <h1>Filmpire</h1>
            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={searchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
            ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;