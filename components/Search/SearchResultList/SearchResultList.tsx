
import styles from "./SearchResultList.module.css"

import ResultCardLoading from "../SearchResultItem/ResultCardLoading/ResultCardLoading"
import SearchResultItem from "../SearchResultItem/SearchResultItem"
import { IResult } from "../SearchResultItem/SearchResultItem"

const SearchResultList: React.FC<{ data: any }> = ({ data }) => {

    // 1024 > 1535

    // console.log("SearchResultList: ", isLoading);

    return(
            data && 
            <section className={styles.resultlist_container} data-testid="search_results_container" id="search_results_container">
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