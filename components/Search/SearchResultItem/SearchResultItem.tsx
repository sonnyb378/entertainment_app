
import styles from "./SearchResultItem.module.css"

import { IAuthState } from "../../../ts/states/auth_state";
import { useAppSelector } from "../../../app/hooks";
import { selectAuth } from "../../../app/store/slices/auth";
import Thumbnail from "../../Thumbnail/Thumbnail";
import React from "react";

interface IKnownFor {
    id: number,
    media_type: string;
    title:string;
    genre_ids: number[],
    original_language:string;
    original_title: string;
    overview: string;
    backdrop_path:string;
    poster_path:string;
    release_date: string;
}

export interface IResult {
    id:number;
    media_type: string;
    title: string;
    genre_ids: number[]
    original_language:string;
    original_title: string;
    overview: string;
    name: string;
    backdrop_path:string;
    poster_path:string;
    release_date: string;
    original_name: string
    vote_average: number;
    first_air_date: string;
    popularity: number;
    known_for: [IKnownFor]
}


const SearchResultItem: React.FC<{ 
    result: IResult,
    bookmarkData:any[]|null,
    fetchHandler: () => void
}> = ({ 
        result,
        bookmarkData,
        fetchHandler
    }) => {
    const user = useAppSelector<IAuthState>(selectAuth);

    return(
        <li className="flex flex-col items-center justify-center cursor-pointer relative transition-all duration-100 p-0.5 border-0 w-6/12
            sm:w-6/12 sm:border-red-500
            md:w-4/12 md:border-blue-500
            lg:w-3/12 lg:border-green-500
            xl:w-3/12 xl:border-purple-500
            2xl:w-2/12 2xl:border-orange-500"
            id={`thumbnail_container`}
            data-testid="thumbnail_container"            
        >
            <Thumbnail 
                user={user} result={result} bookmarkData={bookmarkData} fetchHandler={fetchHandler}
            />                                                 
        </li>
    )
}

export default SearchResultItem;