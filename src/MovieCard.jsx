function MovieCard({ title, posterPath, voteAverage, onClick }) {
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={posterUrl} alt={title} />
      <p className="movie-title">{title}</p>
      <p>⭐ {voteAverage}</p>
    </div>
  );
}

export default MovieCard;