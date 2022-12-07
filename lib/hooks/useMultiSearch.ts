
import useSWR from 'swr';
import { fetcher } from './fetcher';

// https://api.themoviedb.org/3/search/multi?api_key=f6cd7c5b31666c3d69c28bbdc0bd7c4e&language=en-US&query=lord%20of%20the%20rings&page=1&include_adult=false

export const useMultiSearch = (keyword: string) => {
    
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}`+
        `&language=en-US&page=1&include_adult=false&query=${encodeURI(keyword)}`, 
        fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}