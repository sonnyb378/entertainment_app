
// https://api.themoviedb.org/3/search/multi?api_key=f6cd7c5b31666c3d69c28bbdc0bd7c4e&language=en-US&query=lord%20of%20the%20rings&page=1&include_adult=false


import { EMethodTypes } from "./method_types"

export const sendRequest = async (method: EMethodTypes, url: string, param?: {}, ) => {
    const response = await fetch(process.env.NEXT_PUBLIC_TMDB_API_URL+url, {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)

    })
    return await response.json();
}