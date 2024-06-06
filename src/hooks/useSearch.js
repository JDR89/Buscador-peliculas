import { useEffect, useRef, useState } from "react"


export const useSearch = () => {
  const [search, setSearch] = useState("")
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

    useEffect(() => {
        if(isFirstInput.current){
            isFirstInput.current = search === ""
            return
        }
        
        if(search === ""){
          setError("No se puede buscar una pelicula vacia")
          return
        }
    
        if(search.length < 3){
          setError("Debe haber al menos 3 caracteres")
          return
        }
    
        setError(null)
      }, [search])

      return{
        search,
        error,
        setSearch,
      }
      
}
