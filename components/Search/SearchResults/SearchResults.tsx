import { useCallback, useEffect, useState } from "react"
import styles from "./SearchResults.module.css"

import { useRouter } from "next/router";

import { fake_blackadam_search, fake_multisearch_limitless, fake_lotr_search } from "../../../model/fake_search";

import { useMultiSearch } from "../../../lib/hooks/useMultiSearch";

import SearchResultList from "../SearchResultList/SearchResultList";
import Image from "next/image";

const SearchResults: React.FC<{keyword: string}> = ({ keyword }) => {
    // const { data, isLoading, isError } = useMultiSearch(decodeURI(keyword))
    
    // const { data, isLoading, isError } = fake_multisearch_limitless(decodeURI(keyword))
    const { data, isLoading, isError } = fake_lotr_search(decodeURI(keyword))
    // const { data, isLoading, isError } = fake_blackadam_search(decodeURI(keyword))

    // if (isLoading) return <div>Loading...</div>
    if (isError) return  <div>Error</div>


    return (
        <div className={styles.container} data-testid="search_results_container">
            <h2 className="text-[2rem]">Search Results: </h2>
            <h4 className="text-yellow-600 text-3xl">{ decodeURI(keyword) }</h4> 

            {
                isLoading && <div>Loading...</div>
            }
            {
                !isLoading && data ? <SearchResultList data={ data }/> : <div>No Records Found</div>

            }

        </div> 
    )
}

export default SearchResults;