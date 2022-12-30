import React, { useState,useEffect } from 'react';
import './App.css';
import searchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?apikey=a70a4b56';
const App = () =>{
    const [movies,setmovies]=useState([]);
    const [searchTerm,setsearchTerm] = useState('');
    const searchMovies = async(title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setmovies(data.Search);
    }
    
    useEffect(()=>{
        searchMovies(searchTerm);
    },[searchTerm])
    return(
        <div className='app'>
        <h1>MovieDatabase </h1>

        <div className='search'>
            <input
            placeholder='Search for Movies'
            value={searchTerm}
            onChange={(e)=>{
                setsearchTerm(e.target.value);
               
            }}
            />
            <img
            src={searchIcon}
            alt="search"
            onClick={()=> searchMovies(searchTerm)}
            />
        </div>

        {
            movies?.length > 0
            ?(
                <div className='container'>
               {
                movies.map((movie)=>(
                    <MovieCard movie={movie}/>
                ))
               }
                </div>
            ):
            (
                <div className='empty'>
                    <h2>No Movie Found</h2>
                </div>
            )
        }
      
        </div>
    )
}

export default App;