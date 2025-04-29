export type Media = {
    genre_ids: number[];    
    genre: string;
    id: number;
    popularity: number;
    poster_path: string;
    vote_count?: number;
    title?: string;
    name?: string;
    overview?: string;
    vote_average?: number;
    release_date?: string;
    budget?: number;
    tagline?: string;
    runtime?: number;
    original_language?: string;
    revenue?: number
    status?: string;
    media_type?: "movie" | "tv",
    number_of_seasons?: number;
    number_of_episodes?: number;
    last_air_date?: string;
    created_by:{
        name: string;
        id: number;
        credit_id: string;
        gender: number;
        profile_path: string;
    }
}