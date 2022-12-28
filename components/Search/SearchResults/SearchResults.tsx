import React, { useEffect, useState } from "react"
import axios from "axios";
import styles from "./SearchResults.module.css"

import { IFakeResponse, useBlackAdam, useLimitless, useLOTR, useStarTrek, useZeroResult } from "../../../model/fake_search";

import ResultCardLoading from "../SearchResultItem/ResultCardLoading/ResultCardLoading";

import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'

import SearchResultItem, { IResult } from "../SearchResultItem/SearchResultItem";
import { useAppSelector } from "../../../app/hooks";
import { IAuthState } from "../../../ts/states/auth_state";
import { selectAuth } from "../../../app/store/slices/auth";

interface ISearchResultProps {
    keyword: string;
}

export const fetcherInfinite = (baseUrl: string, url: string, page: number, keyword: string) => axios.get(
    `${baseUrl}${url}?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US&include_adult=false`+
    `&query=${keyword}`+
    `&page=${page}`)
.then((res) => {
    return res.data.results
})

const  SearchResults: React.FC<ISearchResultProps> = ({ keyword }) => {
    const [ pageNumber, setPageNumber ] = useState(1)
    const user = useAppSelector<IAuthState>(selectAuth);

    let search_results: IResult[];

    const { data } = useBlackAdam(keyword);

    // const PAGE_SIZE = 20;
    // const { data, error, size, setSize } = useSWRInfinite((index) => [
    //     `${process.env.NEXT_PUBLIC_TMDB_API_URL}`, 
    //     "search/multi", 
    //     index + 1, 
    //     keyword
    // ], fetcherInfinite)

    
    // search_results = data ? [].concat(...data) : [];
    // const isLoading = !data && !error;
    // const isError = error;
    // const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    // const isEmpty = data?.[0]?.length === 0;
    // const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    // const getMoreData = (size: number) => {
    //     setSize(size + 1)
    // }

    // if (isError) return  <div>Sorry an error occurred. Please try again...</div>


    return (
        <div  className="flex flex-col items-start justify-center w-full p-5 relative" data-testid="search_results_container">
            <ul 
                className="flex flex-wrap items-start justify-start border-0 mt-4 w-full relative" 
                data-testid="results_item_container" 
                id="results_item_container"
            >
                {
                    data.results && data.results.map((result:any, i:any) => {
                        return (
                            <SearchResultItem 
                                key={i} 
                                result={result} 
                            /> 
                        )                       
                    })
                }

                {/* {
                    isEmpty && <div className="mt-4">No Records Found</div>
                }
                {
                    search_results.map((result, i) => {
                        return (
                            <SearchResultItem 
                                key={i} 
                                result={result} 
                            />
                        )                       
                    })
                }
                {
                    isLoadingMore && <ResultCardLoading count={12}/>
                }

                {
                    !isReachingEnd &&
                    <button
                        className="flex w-full items-center justify-center text-lg p-2 mt-2 bg-btnprimary rounded-sm cursor-pointer hover:bg-btnhighlight"
                        disabled={ isLoadingMore || isReachingEnd }
                        onClick={ getMoreData.bind(this, size) }
                    >

                        Load More

                    </button>
                } */}
            </ul>
         
            
        </div> 
    )
}

export default SearchResults;