
import styles from "./SearchResultItem.module.css"

import Image from "next/image";
import { tv_genres } from "../../../model/tv_genres"; 
import { movie_genres } from "../../../model/movie_genres";

import { TvIcon, FilmIcon, UserCircleIcon, BookmarkIcon } from "@heroicons/react/24/solid";

import BackdropImage from "./BackdropImage/BackdropImage";
import PosterImage from "./PosterImage/PosterImage";

import no_result from "../../../assets/no_result.png"

import MediaTypePerson from "./MediaType/Person"
import MediaTypeShow from "./MediaType/Show"

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
    
    return(
        <div className={ styles.container } data-testid="thumbnail">
            {                
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
                    {
                        result.media_type !== "person" ? <MediaTypeShow result={result} /> : <MediaTypePerson result={result} />
                    }
                </div>
                
            }                                                   
        </div>
    )
}

export default SearchResultItem;