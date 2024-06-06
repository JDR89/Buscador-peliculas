export const searchMovies = async ({ search }) => {

  if (search === "") return null;

  try {
    const resp = await fetch(
      `http://www.omdbapi.com/?i=tt3896198&apikey=cc85553a&s=${search}`
    );
    const data = await resp.json();

    const movies = data.Search;

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
    
  } catch (error) {
    throw new Error("error al obtener las peliculas");
  }
};
