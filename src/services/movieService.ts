// Service file - contains functions to communicate with the backend API
// Separates API logic from UI components (separation of concerns)

// Import type definitions - TypeScript uses these to check our API responses
import type { Movie } from "../types/Movie.ts";
import type { Review } from "../types/Review.ts";

// Constant - stores the base URL for all API calls
// Similar to C#: private const string API_URL = "...";
const API_URL = "https://localhost:7195/api";

// Function to fetch all movies from the API
// async = this function performs asynchronous operations (takes time)
// Promise<Movie[]> = return type - "will eventually return an array of Movies"
export async function getMovies(): Promise<Movie[]> {
    // Export so other files can import and use this function

    // fetch() is the browser's built-in HTTP client
    // Makes a GET request to https://localhost:7195/api/movies
    // Similar to C#: await httpClient.GetAsync("...")
    const res = await fetch(`${API_URL}/movies`);
    // await pauses execution until fetch completes
    // res = Response object containing status, headers, body, etc.

    // .json() parses the response body from JSON string to JavaScript objects
    // Returns a Promise, so we await it
    // TypeScript automatically types this as Movie[] based on function return type
    return res.json();
    // Similar to C#: return JsonConvert.DeserializeObject<List<Movie>>(jsonString);
}

// Function to fetch a single movie by ID
// Takes a number parameter and returns a Promise of a single Movie object
export async function getMovie(id: number): Promise<Movie> {
    // id: number = type annotation - id parameter must be a number

    // Template literal (backticks) allows embedding variables
    // ${id} inserts the id value into the string
    // Example: if id=1, creates "https://localhost:7195/api/movies/1"
    const res = await fetch(`${API_URL}/movies/${id}`);
    // Makes GET request to /api/movies/{id}

    return res.json();
    // Converts JSON response to Movie object
}

// Function to fetch reviews for a specific movie
// Takes movieId (number) and returns array of Review objects
export async function getReviews(movieId: number): Promise<Review[]> {
    // movieId: number = parameter type annotation
    // Promise<Review[]> = will return array of reviews

    // Fetches from /api/movies/{movieId}/reviews
    // Example: /api/movies/1/reviews gets all reviews for movie with id=1
    const res = await fetch(`${API_URL}/movies/${movieId}/reviews`);

    return res.json();
    // Parses JSON array into Review[] array
}

// How this works:
// 1. Component calls: getMovies()
// 2. Service sends HTTP GET to: https://localhost:7195/api/movies
// 3. C# API queries database and returns JSON: [{"id":1,"title":"The Matrix",...}]
// 4. .json() converts JSON string to JavaScript objects
// 5. TypeScript treats result as Movie[] (type-safe!)
// 6. Component receives data and updates UI