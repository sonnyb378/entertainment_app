
import useSWR from 'swr';
import { fetcher } from './fetcher';


// https://api.themoviedb.org/3/movie/top_rated?api_key=f6cd7c5b31666c3d69c28bbdc0bd7c4e&language=en-US&page=1

export const useMoviesTopRated = () => {
    
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US&page=1`,
        fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}