// APPLICATION ENTRY POINT
// This is the first TypeScript file that runs
// It sets up and starts the React application

// Import React's StrictMode component
// StrictMode helps find bugs by:
// - Detecting unsafe lifecycle methods
// - Warning about legacy APIs
// - Detecting unexpected side effects
// Only runs in development, no effect in production
import { StrictMode } from 'react'

// Import createRoot function from React 18+ API
// createRoot is the modern way to mount React apps
// Replaces the old ReactDOM.render() method
import { createRoot } from 'react-dom/client'

// Import global CSS styles
// This CSS applies to entire app
import './index.css'

// Import the main App component
// This is the root component of your application
import App from './App.tsx'

// ============================================================
// MOUNT REACT APP TO DOM
// ============================================================

createRoot(document.getElementById('root')!)
  // createRoot() creates a React root for the given DOM element
  // document.getElementById('root') finds <div id="root"> in index.html
  // ! is TypeScript's non-null assertion operator
  //   Tells TypeScript "trust me, this element exists"
  //   Without !, TypeScript errors because getElementById can return null

.render(
  // .render() method tells React what to display

  <StrictMode>
    {/* StrictMode wrapper enables additional checks in development
        - Detects side effects in render phase
        - Warns about deprecated APIs
        - Helps you write better React code */}

    <App />
    {/* Your main App component
        Everything in your app is inside <App />
        App.tsx contains the router and header */}
  </StrictMode>,
)

// ============================================================
// WHAT HAPPENS WHEN THIS RUNS:
// ============================================================
// 1. Browser loads index.html
// 2. Browser loads this file (main.tsx)
// 3. Vite compiles TypeScript → JavaScript
// 4. This code executes:
//    a. Finds <div id="root"> in HTML
//    b. Creates React root attached to that div
//    c. Renders <App /> component inside StrictMode
//    d. App.tsx renders header and router
//    e. Router shows HomePage or MovieDetailsPage
//    f. Those components render your UI
// 5. User sees: Rotten Tomatoes header + movie grid
//
// React then watches for changes:
// - State updates → re-render components
// - URL changes → router shows different page
// - Props change → re-render child components
