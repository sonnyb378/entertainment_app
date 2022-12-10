import { Key, useCallback, useEffect, useState } from "react"
import styles from "./SearchResultList.module.css"

import SearchResultItem from "../SearchResultItem/SearchResultItem"
import { IResult } from "../SearchResultItem/SearchResultItem"

const SearchResultList: React.FC<{ data: any}> = ({ data }) => {

    console.log("pagination: search result list: ", data);
    return(
        
            data && 
            <section className={styles.container} data-testid="search_results_container">
                {
                    data.results.map((result: IResult) => {
                        return (
                            <SearchResultItem key={result.id} result={result} />
                        )
                    })
                }
            </section>
        
    )
}

export default SearchResultList;