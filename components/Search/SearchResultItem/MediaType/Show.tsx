import styles from "./Show.module.css"
import { FilmIcon, TvIcon } from "@heroicons/react/24/solid";

import { tv_genres } from "../../../../model/tv_genres";
import { movie_genres } from "../../../../model/movie_genres";
import { IResult } from "../SearchResultItem";

const MediaTypeShow: React.FC<{ result: IResult}> = ({ result}) => {
    const genres_type = result.media_type === "movie" ? movie_genres : tv_genres;
    return(
        <div className={ styles.media_type_show_container}>

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
    )
}


export default MediaTypeShow;

