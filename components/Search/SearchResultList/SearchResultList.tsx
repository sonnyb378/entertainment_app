
import styles from "./SearchResultList.module.css"

import ResultCardLoading from "../SearchResultItem/ResultCardLoading/ResultCardLoading"
import SearchResultItem from "../SearchResultItem/SearchResultItem"
import { IResult } from "../SearchResultItem/SearchResultItem"

const SearchResultList: React.FC<{ data: any, isLoading: boolean }> = ({ data, isLoading }) => {

    // 1024 > 1535
    
    return(
            data && 
            <section className={styles.container} data-testid="search_results_container" id="search_results_container">
                {
                    data.map((result: IResult) => {
                        return (
                            <SearchResultItem key={result.id} result={result} />
                        )
                    })
                }
                {
                    isLoading && <ResultCardLoading count={12} />
                }
            </section>        
    )
}

export default SearchResultList;