
import styles from "./SearchResultItem.module.css"

import Image from "next/image";
import { tv_genres } from "../../../model/tv_genres"; 
import { movie_genres } from "../../../model/movie_genres";

import { TvIcon, FilmIcon, UserCircleIcon, BookmarkIcon } from "@heroicons/react/24/solid";

import BackdropImage from "./BackdropImage/BackdropImage";
import PosterImage from "./PosterImage/PosterImage";

import no_result from "../../../assets/no_result.png"

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
    vote_avergae: number;
    first_air_date: string;
    known_for: [IKnownFor]
}

const SearchResultItem: React.FC<{result: IResult}> = ({ result }) => {
    
    const genres_type = result.media_type === "movie" ? movie_genres : tv_genres;

    // console.log(result.backdrop_path, result.poster_path);

    return(
        <div className={ styles.container } data-testid="thumbnail">

            {/* <div className="relative w-full z-50 border-0" id="thumbnail_sub"> */}
                {
                    result.media_type !== "person" ? 
                        <div className="flex flex-col items-stretch justify-start relative border-0 w-full">
                            {
                              result.backdrop_path ? <BackdropImage src={result.backdrop_path} /> : 
                              result.poster_path ? <PosterImage src={result.poster_path} /> : 
                                <div className="image-container relative w-full" data-testid="backdrop_image_container">
                                    <Image 
                                        src={ no_result } 
                                        layout="fill"
                                        priority={true}
                                        className={`object-contain cursor-pointer !relative !h-[unset] z-[1000]`}
                                    />
                                </div>
                              
                            }

                            <div className="flex items-center w-full z-[1100] h-[50%] p-2 bg-gray-900 bg-opacity-70 border-0
                                    sm:h-[70px] sm:items-start">

                                <div className="flex flex-col items-start justify-center w-full mt-1">
                                    <h1 className="text-xs flex-1 text-md text-white w-full leading-none font-bold line-clamp-1">
                                        { result.name || result.title || result.original_name || result.original_title }
                                    </h1>
                                    <div className="flex flex-1 items-start justify-start mt-1
                                        text-[11px] mr-1 py-[3px] leading-1 text-slate-300 line-clamp-1
                                        sm:leading-0 sm:line-clamp-2
                                        ">
                                        {
                                            result.genre_ids.length > 0 ? result.genre_ids.map((genre_id) => {
                                                const genre = genres_type.find((g) => g.id === genre_id)
                                                return  genre?.name+" "
                                            })
                                            :
                                            "n/a"
                                        }
                                    </div>   
                                </div>                                        
                                <div className="hidden
                                    sm:flex">
                                    { 
                                        result.media_type === "movie" ?
                                        <FilmIcon className=" w-[18px] h-[18px]" /> : 
                                        <TvIcon className=" w-[18px] h-[18px]" />
                                    }
                                </div>                        
                            </div> 
                        </div>
                    : 
                    <div className="flex flex-col items-stretch justify-start relative border-0 w-full">
                        {
                        result.known_for[0].backdrop_path ? <BackdropImage src={result.known_for[0].backdrop_path} /> : 
                        result.known_for[0].poster_path ? <PosterImage src={result.known_for[0].poster_path} /> : 
                            <div className="image-container relative w-full" data-testid="backdrop_image_container">
                                <Image 
                                    src={ no_result } 
                                    layout="fill"
                                    priority={true}
                                    className={`object-contain cursor-pointer !relative !h-[unset] z-[1000]`}
                                />
                            </div>
                        
                        }

                        <div className="flex items-center w-full z-[1100] h-[50%] p-2 bg-gray-900 bg-opacity-70 border-0
                                sm:h-[70px] sm:items-start">

                            <div className="flex flex-col items-start justify-center w-full mt-1">
                                <h1 className="text-xs flex-1 text-md text-white w-full leading-none font-bold line-clamp-1">
                                    { result.name || result.title || result.original_name || result.original_title }
                                </h1>
                                <div className="flex flex-1 items-start justify-start mt-1
                                    text-[11px] mr-1 py-[3px] leading-1 text-slate-300 line-clamp-1
                                    sm:leading-0 sm:line-clamp-2
                                    ">
                                    {
                                        result.known_for[0].genre_ids.length > 0 ? result.known_for[0].genre_ids.map((genre_id) => {
                                            const genre = genres_type.find((g) => g.id === genre_id)
                                            return  genre?.name+" "
                                        })
                                        :
                                        "n/a"
                                    }
                                </div>   
                            </div>                                        
                            <div className="hidden
                                sm:flex">
                            <UserCircleIcon className=" w-[18px] h-[18px]" />
                            </div>                        
                        </div> 
                    </div>
                }             
                                         
            {/* </div> */}
            
        </div>
    )
}

export default SearchResultItem;