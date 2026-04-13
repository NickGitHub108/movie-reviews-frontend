// React Router components for client-side navigation
// BrowserRouter = enables routing (watches URL and shows correct page)
// Routes = container for all route definitions
// Route = defines a single route (URL pattern → Component)
// Link = creates clickable links that navigate without page reload
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Import page components
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

// Main App component - the root of your entire application
export default function App() {
    // This component wraps your whole app and sets up routing

    return (
        <BrowserRouter>
            {/* BrowserRouter enables client-side routing
                Without this, clicking links would cause full page reloads
                With this, React just changes what component is shown */}

            <header className="rt-header">
                {/* Header appears on EVERY page
                    Placed outside <Routes> so it's always visible */}

                <div className="container">
                    {/* Container for centering and max-width */}

                    <Link to="/" className="rt-logo">
                        {/* Link component for navigation
                            to="/" means clicking this goes to homepage
                            Doesn't reload page - just changes URL and component */}

                        <img 
                            src="https://www.rottentomatoes.com/assets/pizza-pie/images/rottentomatoes_logo_40.336d6fe66ff.png" 
                            alt="Rotten Tomatoes"
                            className="rt-logo-img"
                        />
                        {/* Official Rotten Tomatoes logo image */}
                    </Link>
                </div>
            </header>

            <Routes>
                {/* Routes container - holds all route definitions
                    React Router looks at current URL and shows matching Route */}

                <Route path="/" element={<HomePage />} />
                {/* Route 1: Homepage
                    path="/" means this matches the root URL
                    element={<HomePage />} means show HomePage component
                    Example: http://localhost:5175/ → shows HomePage */}

                <Route path="/movies/:id" element={<MovieDetailsPage />} />
                {/* Route 2: Movie Details
                    path="/movies/:id" is a dynamic route
                    :id is a URL parameter (placeholder)
                    Matches: /movies/1, /movies/42, /movies/999
                    element={<MovieDetailsPage />} shows MovieDetailsPage
                    MovieDetailsPage can access :id via useParams() hook
                    Example: http://localhost:5175/movies/5 → shows details for movie 5 */}
            </Routes>
        </BrowserRouter>
    );
}

// How Routing Works:
// 1. User visits http://localhost:5175/
//    → BrowserRouter sees URL = "/"
//    → Matches <Route path="/" />
//    → Renders <HomePage />
//
// 2. User clicks "View Details" on movie with id=3
//    → Link changes URL to /movies/3
//    → BrowserRouter sees URL = "/movies/3"
//    → Matches <Route path="/movies/:id" />
//    → Renders <MovieDetailsPage /> with id=3
//
// 3. User clicks logo
//    → Link changes URL to /
//    → Back to HomePage
//
// All without page reloads! (Single Page Application)
