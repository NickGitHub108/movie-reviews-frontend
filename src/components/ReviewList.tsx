// Import the Review type definition
import type { Review } from "../types/Review";

// Component to display a list of reviews
// Receives an array of reviews as a prop
export default function ReviewList({ reviews }: { reviews: Review[] }) {
    // { reviews }: { reviews: Review[] }
    // ^^^^^^^^^ destructuring - extract "reviews" from props object
    //             ^^^^^^^^^^^^^^^^^^^^^^ type definition - reviews must be Review[]

    // EDGE CASE: No reviews
    // Check if array is empty
    if (reviews.length === 0) {
        // Early return with a message
        return <p style={{ color: '#666' }}>No reviews yet.</p>;
        // Inline style: {{ color: '#666' }}
        // Outer {} = JavaScript expression
        // Inner {} = style object
    }

    // RENDER: Display all reviews
    return (
        <div>
            {reviews.map((r, index) => (
                // .map() transforms each review into JSX
                // r = current review object
                // index = position in array (0, 1, 2, ...)
                // Similar to C#: for (int index = 0; index < reviews.Length; index++)

                <div key={index} className="review-card">
                    {/* key={index} - React needs unique keys for list items
                        Using index is OK here since reviews don't reorder */}

                    <div className="review-header">
                        {/* Header with critic name and rating */}

                        <span className="review-critic">{r.criticName}</span>
                        {/* Display the critic's name */}

                        <div className="review-rating">
                            {/* Rating display area */}

                            <span className="review-score">{r.rating}/5</span>
                            {/* Show rating as fraction: "4/5", "5/5", etc. */}

                            <span>{'🍅'.repeat(Math.min(r.rating, 5))}</span>
                            {/* Visual rating using tomato emojis
                                '🍅'.repeat(n) creates n tomatoes
                                Math.min(r.rating, 5) caps at 5 tomatoes max
                                Examples:
                                - rating=3 → 🍅🍅🍅
                                - rating=5 → 🍅🍅🍅🍅🍅
                                - rating=8 → 🍅🍅🍅🍅🍅 (capped at 5) */}
                        </div>
                    </div>

                    <p className="review-text">{r.reviewText || 'No comment provided.'}</p>
                    {/* Display review text or fallback message if null
                        || operator provides default value */}
                </div>
            ))}
        </div>
    );
}

// How this works:
// 1. Parent component passes reviews array: <ReviewList reviews={reviewsArray} />
// 2. If empty, shows "No reviews yet"
// 3. If has reviews, .map() creates a review card for each one
// 4. Each card shows: critic name, numeric rating, tomato icons, review text
