import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL='https://api.themoviedb.org/3';
const NOW_PLAYING_ENDPOINT=`${API_BASE_URL}/movie/now_playing`;
const SEARCH_ENDPOINT =`${API_BASE_URL}/search/movie`;



function MovieList({ searchQuery, mode, sortOption, view}) {
  const [favorites, setFavorites]= useState(new Set());
  const [watched, setWatched]=useState(new Set());
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error , setError]=useState(null);

  const toggleFavorite= (id) => {
    setFavorites((prev) =>{
      console.log(prev);
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    })
  }

  const toggleWatched= (id) => {
    setWatched((prev) =>{
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    })
  }

  // 🔁 This runs every time the mode, query, or page changes
  useEffect(() => {
    const fetchMovies = async () => {
      let url="";
      if (mode === 'search') {
        url = `${SEARCH_ENDPOINT}?api_key=${API_KEY}&query=${searchQuery}&page=${page}`;
      } else {
        url = `${NOW_PLAYING_ENDPOINT}?api_key=${API_KEY}&language=en-US&page=${page}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();

        // ✅ If page is 1, it's a new search — replace the list
        if (page === 1) {
          setMovies(data.results);
        } else {
          // ✅ If page > 1, append new results
          setMovies(prev => [...prev, ...data.results]);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Oops! Something went wrong. Please try again. ');
      }
    };

    fetchMovies();
  }, [searchQuery, mode, page]);

  // 🔘 Loads next page
  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const sortedMovies=[...movies].sort((a,b)=>{
    if(sortOption ==="title"){
      return a.title.localeCompare(b.title);
    }else if(sortOption==="release"){
      return new Date(b.release_date)-new Date(a.release_date);
    }else if (sortOption ==="rating"){
      return b.vote_average - a.vote_average;
    }
    return 0;
  });

  const filteredMovies = sortedMovies.filter((movie) => {
    if (view === 'favorites') return favorites.has(movie.id);
    if (view === 'watched') return watched.has(movie.id);
    return true; // for 'home' or any default view
  });

  return (
    <>
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            voteAverage={movie.vote_average}
            onClick={() => setSelectedMovie(movie)}
            isFavorited={favorites.has(movie.id)}
            isWatched={watched.has(movie.id)}
            toggleFavorite={() => toggleFavorite(movie.id)}
            toggleWatched={() => toggleWatched(movie.id)}
          />
        ))}
      </div>

      {/* ⬇️ Load More button appears only if movies were fetched */}
      {movies.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={loadMore} className="load-more-btn">
            Load More
          </button>
        </div>
      )}

      {/* 🪟 Movie modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default MovieList;
