import axios from "axios";

export const fetcher = (url: string) => axios.get(url).then(res => res.data)

export const fetcherInfinite = (baseUrl: string, url: string, page: number, keyword: string) => axios.get(
    `${baseUrl}${url}?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US&include_adult=false`+
    `&query=${keyword}`+
    `&page=${page}`)
.then((res) => {
    return res.data.results
})

