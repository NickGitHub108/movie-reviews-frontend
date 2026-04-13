// TypeScript Interface - defines the structure/shape of a Movie object
// Similar to C# interface or class definition
// This ensures type safety - TypeScript will error if you try to use a Movie incorrectly

export interface Movie {
    // "export" makes this available to other files via import
    // "interface" defines a type contract - what properties a Movie must have

    id: number;
    // Must be a number (integer)
    // No ? means this is REQUIRED - cannot be null/undefined

    title: string;
    // Must be a string (text)
    // REQUIRED field

    synopsis: string | null;
    // Can be string OR null (the | means "or")
    // ? after property name would also make it optional
    // Similar to C#: public string? Synopsis { get; set; }

    runtime: number | null;
    // Can be number OR null
    // Stores movie length in minutes

    releaseDate: string;
    // Stored as string because JSON doesn't have a Date type
    // C# sends DateTime as JSON string like "2024-01-15T00:00:00"
    // REQUIRED field

    posterUrl: string | null;
    // URL to movie poster image
    // Can be null if no poster available

    rating: string | null;
    // MPAA rating like "PG", "PG-13", "R", "NC-17"
    // Can be null if not rated

    genre: string | null;
    // Movie genre like "Action", "Comedy", "Drama"
    // Can be null if not categorized

    averageRating: number;
    // Average critic rating (0-5 scale)
    // Example: 4.2 out of 5
    // 0 if no reviews yet
}

// This interface corresponds to the C# Movie model in your API
// TypeScript: Movie.ts ↔ C#: Movie.cs
// When API returns JSON, TypeScript treats it as this type