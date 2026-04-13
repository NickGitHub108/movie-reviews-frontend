// TypeScript Interface for Review objects
// Defines what properties a review must have

export interface Review {
    // Export so other files can import and use this type

    rating: number;
    // Numeric rating (e.g., 1-10)
    // REQUIRED - every review must have a rating

    reviewText: string | null;
    // The actual review content written by the critic
    // Can be null if critic only provided a rating without text
    // | null means "or null" - similar to string? in C#

    criticName: string;
    // Name or email of the person who wrote the review
    // REQUIRED field - must always have a value
}

// This corresponds to the MovieReview object returned by your C# API
// The API joins Reviews table with AspNetUsers table to get the critic's email