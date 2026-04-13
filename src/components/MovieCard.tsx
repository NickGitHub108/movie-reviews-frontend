// Import the Movie type definition so TypeScript knows what a Movie object looks like
import type { Movie } from "../types/Movie.ts";
// Import Link component from react-router-dom for navigation between pages
import { Link } from "react-router-dom";

// Export this component so other files can import and use it
// "default" means you can import it like: import MovieCard from './MovieCard'
export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div className="card mb-4">
            <div className="card-poster-wrapper">
                <img 
                    src={movie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Poster'} 
                    className="card-img-top" 
                    alt={movie.title} 
                />

                {movie.rating && (
                    <div className="card-rating-badge">
                        {movie.rating}
                    </div>
                )}

                {movie.averageRating > 0 && (
                    <div className="card-score-badge">
                        <span className="score-label">Avg Rating:</span>
                        <span className="score-number">{movie.averageRating.toFixed(1)}</span>
                    </div>
                )}
            </div>

            <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>

                {movie.genre && (
                    <p className="card-genre">{movie.genre}</p>
                )}

                <p className="card-text">
                    {movie.synopsis?.trim() || 'No synopsis available'}
                </p>

                <Link to={`/movies/${movie.id}`} className="btn btn-primary">
                    View Details
                </Link>
            </div>
        </div>
    );
}


