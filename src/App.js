import React, { useState } from "react";
import { useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";

// The URL of the Site we want to fetch
const API_URL = "http://www.omdbapi.com?apikey=ce11022a";

const App = () => {

    const [movies, setMovies] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    
    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    };

    useEffect(()=> {
        searchMovies('');
    },[]);
    
    return (
       <div className="app">
            <h1>Smart-Flix</h1>
            <div className="search">
                <input 
                    placeholder="Search for Movies" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress = { 
                        event => {
                            if (event.key === 'Enter') {
                                searchMovies(searchTerm) 
                            }
                        }
                    }
                />
                <img 
                    src={SearchIcon} 
                    alt="Search"
                    onClick={() => searchMovies(searchTerm)} 
                />
            </div>

            {
                movies?.length > 0 
                ? (
                    <div className="container">
                        {movies.map((movie) => (<MovieCard movie={movie}/>))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                )
            }
       </div>
    );
}

export default App;