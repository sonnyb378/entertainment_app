
import useSWR from 'swr';
import { fetcher } from './fetcher';

export const useMovieDetail = (movie_id: string) => {
    
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/${movie_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US&append_to_response=recommendations,credits`,
        fetcher)
    
    
    return {
        movie_detail: data,
        isLoading: !error && !data,
        isError: error
    }
}