import { useCallback, useEffect, useState } from "react"
import styles from "./SearchResults.module.css"

import { useRouter } from "next/router";

import { fake_blackadam_search, fake_multisearch_limitless } from "../../../model/fake_search";

import { useMultiSearch } from "../../../lib/hooks/useMultiSearch";

const SearchResults: React.FC<{keyword: string}> = ({ keyword }) => {
    // const { data, isLoading, isError } = useMultiSearch(decodeURI(keyword))

    // const { data, isLoading, isError } = fake_blackadam_search(decodeURI(keyword))
    const { data, isLoading, isError } = fake_multisearch_limitless(decodeURI(keyword))

    if (isLoading) return <div>Loading...</div>
    if (isError) return  <div>Error</div>

    
    return (
        <div className={styles.container} data-testid="search_results_container">
            <h2 className="text-[2rem]">Search Results: </h2>
            <div>{ decodeURI(keyword) }</div> 
            {
                data && <div className="grid grid-cols-1 gap-2 mt-4 items-start justify-start w-full
                sm:grid sm:grid-cols-2
                lg:grid lg:grid-cols-3
                xl:grid xl:grid-cols-5
                ">
                    {
                        data.results.map((result) => {
                            return (
                                <div key={result.id } className="flex flex-col items-start justify-start borderh-[250px] rounded-md overflow-hidden">
                                    <div className="w-full h-[150px] bg-gray-500">image</div>
                                    <div className="p-2">
                                        <h1>{ result.title || result.name }</h1>
                                        <p className="text-white text-sm mt-2">{ result.overview }</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }

        </div> 
    )
}

export default SearchResults;