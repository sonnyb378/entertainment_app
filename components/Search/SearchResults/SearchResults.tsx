import { useCallback, useEffect, useState } from "react"
import styles from "./SearchResults.module.css"

import { useRouter } from "next/router";

import { useBlackAdam, useLimitless, useLOTR, useStarTrek, useZeroResult } from "../../../model/fake_search";

import { useMultiSearch } from "../../../lib/hooks/useMultiSearch";

import SearchResultList from "../SearchResultList/SearchResultList";

import { IResult } from "../SearchResultItem/SearchResultItem";
import { current } from "@reduxjs/toolkit";

import ResultCardLoading from "../SearchResultItem/ResultCardLoading/ResultCardLoading";

const SearchResults: React.FC<{keyword: string}> = ({ keyword }) => {
    
    const [data, setData] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [showLoadMore, setShowLoadMore] = useState(false);

    // const { data, isLoading, isError } = useMultiSearch(decodeURI(keyword))
    
    // const { data, isLoading, isError } = fake_multisearch_limitless(decodeURI(keyword))
    // const { data, isLoading, isError } = fake_blackadam_search(decodeURI(keyword))

    useEffect(() => {
        setIsLoading(true)
        setShowLoadMore(false)
        
        // initial
        setTimeout(() => {
            const { data, currentPage, totalPages, isLoading, isError } = useStarTrek(decodeURI(keyword))   

            // TODO: save to redux
            setData(data.results)
            
            setCurrentPage(currentPage)
            setIsLoading(isLoading)
            setIsError(isError)
            setShowLoadMore(totalPages !== 0 && totalPages !== currentPage)
        }, 2000) 

    },[keyword])


    const getMoreData = (keyword:string, page:number) => {        
        setIsLoading(true)
        setTimeout(() => {
            const { data, currentPage, totalPages, isLoading, isError } = useStarTrek(decodeURI(keyword), page)
        
            if (data && data.hasOwnProperty("page")) {
                setData((prev:any) => [...prev, ...data.results])
                setCurrentPage(currentPage)
                setIsLoading(isLoading)
                setIsError(isError)
                setShowLoadMore(totalPages !== currentPage)
            }
        }, 2000)
        
        
    }

    // console.log("SearchResults data: ", isLoading);

    if (isError) return  <div>Error</div>

    return (
        <div className={styles.container} data-testid="search_results_container">
            <h2 className="text-[2rem]">Search Results: </h2>
            <h4 className="text-yellow-600 text-3xl">{ decodeURI(keyword) }</h4> 

            {
                isLoading && data.length <= 0 ? 
                    <ResultCardLoading count={12}/>
                : 
                    data && data.length > 0 ?         
                        <div className="flex flex-col items-start justify-center w-full">
                            <SearchResultList data={ data } isLoading={isLoading} /> 
                        </div>
                    : 
                        <div className="mt-4">No Records Found</div>

            }
            {
                showLoadMore && 
                    <button 
                        className="flex w-full items-center justify-center text-lg p-2 mt-2 bg-btnprimary rounded-sm cursor-pointer hover:bg-btnhighlight" 
                        onClick={ getMoreData.bind(this, keyword, currentPage + 1) }>
                            Load More
                    </button>
            }
            
        </div> 
    )
}

export default SearchResults;