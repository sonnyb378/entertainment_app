import React, { useEffect, useState } from "react"
import useSWRInfinite from 'swr/infinite'
import SearchResultItem, { IResult } from "../SearchResultItem/SearchResultItem";
import dynamic from "next/dynamic";
import Spinner from "../../Spinner/Spinner";

const ResultCardLoading = dynamic(() => import("../SearchResultItem/ResultCardLoading/ResultCardLoading"), {
    loading: () => <Spinner />
  })

import { useAppSelector } from "../../../app/hooks";
import { IBookmarkData, selectBookmarkData } from "../../../app/store/slices/bookmarks";
import { fetcherInfinite } from "../../../lib/hooks/fetcher";

// import { IFakeResponse, useBlackAdam, useLimitless, useLOTR, useStarTrek, useZeroResult } from "../../../model/fake_search";

interface ISearchResultProps {
    keyword: string;
}

const  SearchResults: React.FC<ISearchResultProps> = ({ keyword }) => {
    const bookmarks = useAppSelector<IBookmarkData>(selectBookmarkData);
    const [screenWidth, setScreenWidth] = useState(360)

    let search_results: IResult[];

    // const { data } = useBlackAdam(keyword);
    // search_results = data ? [].concat(...data.results as any) : [];
    // const isError = false;

    const resizeHandler = () => {
        setScreenWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener("resize", resizeHandler)
        return () => window.removeEventListener("resize", resizeHandler);
    },[])

    useEffect(() => {
        setScreenWidth(window.innerWidth)
    },[])


    const PAGE_SIZE = 20;
    const { data, error, size, setSize } = useSWRInfinite((index) => [
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}`, 
        "search/multi", 
        index + 1, 
        keyword
    ], fetcherInfinite)

    search_results = data ? [].concat(...data) : [];
    const isLoading = !data && !error;
    const isError = error;
    const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    const getMoreData = (size: number) => {
        setSize(size + 1)
    }

    // const new_result = search_results.filter((data) => data.media_type !== "person" && data.backdrop_path !== null)
    // console.log("new_result: ", new_result)

    if (isError) return  <div>Sorry an error occurred. Please try again...</div>

    return (
        <div  className={`flex flex-col items-start justify-center w-full relative ${ screenWidth <= 500 ? "p-0":"p-5"} `} data-testid="search_results_container" >
            {
                isEmpty && <div className="mt-4">No Records Found</div>
            }
            {
                search_results &&
            
                <ul 
                    className="flex flex-wrap items-start justify-start border-0 mt-4 w-full relative" 
                    data-testid="results_item_container" 
                    id="results_item_container"
                >
                    
                    {
                        search_results.map((result, i) => {
                            return (
                                <SearchResultItem 
                                    key={i} 
                                    result={result}
                                    bookmarkData={[...bookmarks.data]}
                                    screenWidth={screenWidth}
                                />
                            )                       
                        })
                    }
               
                </ul>
            }
            {
                isLoadingMore && <ResultCardLoading count={12} />         
            }
            {
                !isReachingEnd &&
                <button
                    className="flex w-full items-center justify-center text-lg p-2 mt-2 bg-btnprimary rounded-sm cursor-pointer hover:bg-btnhighlight"
                    disabled={ isLoadingMore || isReachingEnd }
                    onClick={ getMoreData.bind(this, size) }
                    data-testid="loadmore_button"
                >
                    Load More
                </button>
            }
        </div> 
    )
}

export default SearchResults;