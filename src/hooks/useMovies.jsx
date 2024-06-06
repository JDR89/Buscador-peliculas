import {  useCallback, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/movies";


export const useMovies = ({ search,sort }) => {
  const repeatSearch = useRef(search)

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const getMovies = useCallback( async ({search}) => {

    if(repeatSearch.current === search) return
    
    try {
      setLoading(true)
      repeatSearch.current = search
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }

    
  },[]);

  const sortedMovies = useMemo(() => {
  
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

    

  return { movies: sortedMovies, getMovies, loading };
};
