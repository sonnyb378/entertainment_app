
import useSWR from 'swr';
import { fetcher } from './fetcher';

// https://api.themoviedb.org/3/tv/1972?api_key=f6cd7c5b31666c3d69c28bbdc0bd7c4e&language=en-US

export const useTVDetail = (tv_id: string) => {
    
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}tv/${tv_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US`,
        fetcher)

    const { data: cast, error: castError } = useSWR(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}tv/${tv_id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US`,
        fetcher)

    const { data: recommendations, error: recommendationsError } = useSWR(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}tv/${tv_id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US&page=1`,
        fetcher)
        
    const casts = cast && { casts: { ...cast } }

    
    
    return {
        tv_detail: cast ? { ...data,  ...casts } : data,
        recommendations: recommendations && recommendations,
        isLoading: !error && !data,
        isError: error || castError || recommendationsError
    }
}