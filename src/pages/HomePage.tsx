// React Hooks - special functions that let you use React features
// useEffect = run code when component loads or when dependencies change
// useState = store data that can change over time (component state)
import { useEffect, useState } from "react";

// Import the API service function to fetch movies
import { getMovies } from "../services/movieService.ts";

// Import type definitions
import type { Movie } from "../types/Movie.ts";

// Import the MovieCard component to display each movie
import MovieCard from "../components/MovieCard.tsx";

// HomePage component - the main page users see when they visit "/"
export default function HomePage() {
    // Export default = can import like: import HomePage from './HomePage'

    // STATE: useState Hook
    // Creates a state variable to store the list of movies
    const [movies, setMovies] = useState<Movie[]>([]);
    // ^^^^^^  ^^^^^^^^^         ^^^^^^^^^^^^^^^^  ^^
    // current setter function   type: array of   initial value
    // value                     Movies            (empty array)

    // Think of it like this in C#:
    // private Movie[] movies = new Movie[0];
    // public void setMovies(Movie[] newMovies) {
    //     movies = newMovies;
    //     UpdateUI(); // React does this automatically!
    // }

    // SIDE EFFECT: useEffect Hook
    // Runs code when component mounts (loads for the first time)
    useEffect(() => {
        // Arrow function that runs when component loads

        // Call the API to fetch all movies
        getMovies().then(setMovies);
        // ^^^^^^^^^ returns Promise<Movie[]>
        // .then(setMovies) = when Promise resolves, call setMovies with the data
        // This is shorthand for: .then(data => setMovies(data))

        // Flow:
        // 1. getMovies() sends HTTP request to API
        // 2. API returns JSON array of movies
        // 3. .then() receives the array
        // 4. setMovies(array) updates state
        // 5. React re-renders component with new data

    }, []);
    // ^^ Dependency array - empty means "run once when component loads"
    // If you put [someVariable], it runs whenever someVariable changes
    // Similar to C#: public override void OnLoad() { ... }

    // RENDER: Return JSX to display
    return (
        <div className="container">
            {/* Container div for centering content */}

            <h1 className="page-title">Movies</h1>
            {/* Main heading */}

            <div className="movie-grid">
                {/* Grid container - CSS makes this a responsive grid */}

                {movies.map(movie => (
                    // .map() transforms each movie into a MovieCard component
                    // Similar to C#: foreach (var movie in movies) { ... }
                    // But instead of a loop, map() returns a new array of JSX elements

                    <MovieCard key={movie.id} movie={movie} />
                    // key={movie.id} - React needs unique keys for list items
                    // Helps React efficiently update the DOM when list changes
                    // movie={movie} - passes the movie object as a prop to MovieCard
                ))}
            </div>
        </div>
    );
}

// Component Lifecycle:
// 1. Component mounts (appears on screen)
// 2. Initial render with movies = []
// 3. useEffect runs → fetches data from API
// 4. API returns data → setMovies(data) is called
// 5. State updates → component re-renders
// 6. New render shows movies in grid
