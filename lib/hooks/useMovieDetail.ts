
import useSWR from 'swr';
import { fetcher } from './fetcher';

export const useMovieDetail = (movie_id: string) => {
    
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/${movie_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US`,
        fetcher)
    
    const { data: cast, error: castError } = useSWR(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/${movie_id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US`,
        fetcher)

    const { data: recommendations, error: recommendationsError } = useSWR(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/${movie_id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US&page=1`,
        fetcher)
        
    const casts = cast && { casts: { ...cast } }
    // const recommendation = recommendations && { recommendations: recommendations }
    
    return {
        data: cast ? { ...data,  ...casts } : data,
        recommendations: recommendations && recommendations,
        isLoading: !error && !data,
        isError: error || castError || recommendationsError
    }
}