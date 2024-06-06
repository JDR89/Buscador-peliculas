
import { useCallback, useEffect, useState } from 'react';
import './App.css';

import { Movies} from './components/Movies';
import { useMovies } from './hooks/useMovies.jsx';
import { useSearch } from './hooks/useSearch';
import debounce from 'just-debounce-it';



function App() {
  const [sort, setSort] = useState(false)
 
 const{search,setSearch,error}=useSearch()
 const{movies, getMovies,loading}=useMovies({search,sort})

const deboucedGetMovies = useCallback( debounce(search=>{
  getMovies({search})
},500),[])


  const onChange=({target})=>{
    const{value}=target
    const newValue = value

    setSearch(newValue)

    deboucedGetMovies(newValue)

  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(search.length < 3)return
    
    getMovies({search})
  }

  const handleSort =()=>{
    setSort(!sort)
  }

 

  
  
  return (
    <div className="page">
      <header>
        <form className="form" onSubmit={handleSubmit}>
          <input
          name='search'
          type="text"
          value={search}
          onChange={onChange}
          placeholder="Search..." />
          <button  type="submit">Buscar</button>
          <input onChange={handleSort} type="checkbox" />
        </form>
      </header>
      <div>{error}</div>
      <main>
        {
          loading ? <h2>Cargando...</h2> : <Movies movies={movies}/>
        }
        
        
      </main>
    </div>
  );
}

export default App;
