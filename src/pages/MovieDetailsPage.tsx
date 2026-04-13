// React Hooks for state and side effects
import { useEffect, useState } from "react";
// useParams Hook - extracts URL parameters
// Example: URL is /movies/5 → useParams() returns { id: "5" }
import { useParams } from "react-router-dom";
// API functions to fetch movie data and reviews
import { getMovie, getReviews } from "../services/movieService.ts";
// Type definitions
import type { Movie } from "../types/Movie.ts";
import type { Review } from "../types/Review.ts";
// Component to display the list of reviews
import ReviewList from "../components/ReviewList.tsx";

// Component that shows detailed information about a single movie
export default function MovieDetailsPage() {

    // EXTRACT URL PARAMETER
    // useParams() gets the {id} from the URL pattern /movies/:id
    const { id } = useParams();
    // Destructuring - extracts "id" property from the object returned by useParams()
    // If URL is /movies/42, then id = "42" (as a string!)

    // Convert string ID to number (API expects number)
    const movieId = Number(id);
    // Number("42") → 42
    // Similar to C#: int.Parse(id) or Convert.ToInt32(id)

    // STATE: Store the current movie (starts as null)
    const [movie, setMovie] = useState<Movie | null>(null);
    // Movie | null = can be a Movie object OR null
    // Starts as null because we haven't loaded data yet

    // STATE: Store array of reviews (starts empty)
    const [reviews, setReviews] = useState<Review[]>([]);

    // SIDE EFFECT: Load data when component mounts or movieId changes
    useEffect(() => {
        // Fetch movie details and reviews in parallel
        getMovie(movieId).then(setMovie);
        // Gets single movie object → updates movie state

        getReviews(movieId).then(setReviews);
        // Gets array of reviews → updates reviews state

        // Both fetch simultaneously (don't wait for each other)

    }, [movieId]);
    // [movieId] = dependency array
    // Effect runs when component loads AND whenever movieId changes
    // If user navigates from /movies/1 to /movies/2, this re-runs

    // LOADING STATE
    // If movie is still null, show loading message
    if (!movie) return <div className="container"><p style={{ textAlign: 'center', marginTop: '3rem' }}>Loading...</p></div>;

    // RENDER: Display movie details
    return (
        <div className="container">
            <div className="movie-details-hero">
                <div className="movie-details-content">
                    <img 
                        src={movie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Poster'} 
                        className="movie-details-poster" 
                        alt={movie.title} 
                    />

                    <div className="movie-info">
                        <h1>{movie.title}</h1>

                        {movie.averageRating > 0 && (
                            <div className="average-rating">
                                <span className="rating-label">Average Rating:</span>
                                <span className="rating-score">{movie.averageRating.toFixed(1)}</span>
                                <span className="rating-outof">/ 5</span>
                            </div>
                        )}

                        <p>{movie.synopsis?.trim() || 'No synopsis available.'}</p>
                        <div className="movie-meta">
                            {/* Metadata section (release date, runtime, etc.) */}

                            <div>
                                <strong>Release Date</strong>
                                {/* Label */}
                                <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                                {/* Convert ISO date string to readable format
                                    new Date("2024-01-15") creates Date object
                                    .toLocaleDateString() formats as "1/15/2024" */}
                            </div>

                            <div>
                                <strong>Runtime</strong>
                                <span>{movie.runtime ? `${movie.runtime} min` : 'N/A'}</span>
                                {/* Ternary operator: condition ? ifTrue : ifFalse
                                    If runtime exists: show "120 min"
                                    If runtime is null: show "N/A"
                                    Template literal: `${movie.runtime} min` */}
                            </div>

                            <div>
                                <strong>Genre</strong>
                                <span>{movie.genre || 'N/A'}</span>
                                {/* Show genre or "N/A" if null */}
                            </div>

                            <div>
                                <strong>Rating</strong>
                                <span>{movie.rating || 'N/A'}</span>
                                {/* Show MPAA rating or "N/A" if null */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="reviews-section">
                {/* Section for critic reviews */}

                <h2>Critic Reviews</h2>
                {/* Section heading */}

                <ReviewList reviews={reviews} />
                {/* Pass reviews array to ReviewList component as a prop */}
            </div>
        </div>
    );
}

// Data Flow:
// 1. URL: /movies/5
// 2. useParams() extracts id="5"
// 3. Convert to movieId=5
// 4. useEffect runs → fetches movie and reviews
// 5. API returns data → setState functions update state
// 6. Component re-renders with actual data
// 7. User sees movie details and reviews
