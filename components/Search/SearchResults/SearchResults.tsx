import { useCallback, useEffect } from "react"
import styles from "./SearchResults.module.css"

import { debounce } from "../../../lib/debounce";
import { useRouter } from "next/router";

import { fake_multi_search_data } from "../../../model/fake_search";

const SearchResults: React.FC = () => {
    const router = useRouter();

    let query_string : string = ""

    const query = router.asPath.split("?")

    // TODO: check if q= has value
    console.log("search results page: ", router.pathname, router.asPath, query)


    const db = useCallback(debounce((e) => {
        const kw = e.target as HTMLInputElement;
        
        console.log("send request: ", kw.value.trim())
        // const response = await sendRequest(
        //     EMethodTypes.GET, 
        //     `search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US&page=1&include_adult=false&query=${encodeURI(keyword.value.trim())}`, 
        // ).then((data) => data)
        // .catch((error) => { 
        //     //console.log("error: ", error)
        // })


    }, 1200), [])


    
    
    return (
        <div className={styles.container} data-testid="search_results_container">
            <h2 className="text-[2rem]">Search Results: </h2>
            <div>results here</div> 
        </div> 
    )
}

export default SearchResults;