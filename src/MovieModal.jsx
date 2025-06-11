import { useEffect, useState } from 'react';

function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${
          import.meta.env.VITE_API_KEY
        }&append_to_response=videos`
      );
      const data = await res.json();
      setDetails(data);
    };

    fetchDetails();
  }, [movie]);

  if (!details) return null;

  const trailer = details.videos?.results.find(
    (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
  );

 return (
  <div className="modal-overlay">
    <div className="modal-content" style={{ overflowY: 'auto', maxHeight: '90vh' }}>
      <button className="close-btn" onClick={onClose}>✖</button>

      <h2>{details.title || movie.title}</h2>

      {detakvutlknndnjbuthdcrackdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/w780${details.backdrop_path}`}
          alt={details.title}
          style={{ width: '100%', borderRadius: '10px', margin: '1rem 0' }}
        />
      )}

      <p><strong>Release Date:</strong> {details.release_date || 'N/A'}</p>
      <p><strong>Overview:</strong> {details.overview || 'No overview available.'}</p>
      <p>
        <strong>Genres:</strong>{' '}
        {details.genres?.length
          ? details.genres.map((g) => g.name).join(', ')
          : 'N/A'}
      </p>
      <p><strong>Runtime:</strong> {details.runtime ? `${details.runtime} minutes` : 'N/A'}</p>

      {trailer ? (
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="YouTube trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
      <p style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '1rem' }}>
        Trailer not available.
        </p>
      )}


      
    </div>
  </div>
);

}

export default MovieModal;