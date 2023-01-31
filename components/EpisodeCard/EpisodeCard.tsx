import React from "react";
import Image from "next/image"
import Info from "../Info/Info"

import { useAppContext } from "../../context/state"
import { PlayCircleIcon } from "@heroicons/react/24/solid"

import no_result from "../../assets/no_result.png"

export interface IEpisodeCard {
    data:any,
    screenWidth:number
}

const EpisodeCard:React.FC<IEpisodeCard> = ({ data, screenWidth }) => {
    const { setVideoIsPlayed } = useAppContext()
    return(
        <div className={`flex items-start justify-center p-2 rounded-md bg-[#40424A] my-2 border-4 border-[#40424A] relative
            ${ data.runtime && data.overview !== "" && "hover:cursor-pointer" }
            hover:border-4 hover:border-[#3F546E]
            `}
            data-testid="episode_card"
        >
            {
                screenWidth > 600 && data.runtime && data.overview !== "" &&
                <div 
                    id="episode_overlay" 
                    className="flex items-center justify-center absolute w-full h-[100%] bg-white top-0 left-0 rounded-[5px] opacity-0 bg-opacity-0 z-[1000]
                    hover:opacity-100 hover:bg-opacity-10">
                    <PlayCircleIcon 
                        onClick={ () => setVideoIsPlayed(true, {...data, season_number: data.season_number, media_type: "tv" } ) }
                        className="w-[80px] h-[80px] bg-btnprimary rounded-full p-0 m-0 drop-shadow-md" 
                        data-testid="play_button"
                    />
                </div>
            }
            

            <div className="image-container relative mr-[10px] w-[300px] h-[169px] border-0">
                {
                    <Image 
                        src={ data && data.still_path ?  `${ process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH }${data.still_path}` : no_result }
                        layout="responsive"
                        width={300}
                        height={169}  
                        alt=""
                        className="object-cover !position !h-[unset]"
                    />  
                }                
            </div>

            <div className="flex flex-col items-start justify-start w-full h-[169px]">
                <h1 className="text-lg text-[#61A5C3] leading-none">S.{data.season_number}-Ep. { data.episode_number} : { data.name } </h1>
                
                <div className={`flex flex-col items-start justify-center text-[12px] space-x-0 border-0 mt-[10px]
                    sm:flex-row sm:items-center sm:justify-start sm:space-x-2
                `}>
                    <span className="">Air Date: {data.air_date}</span>
                    
                    {
                        data.runtime &&
                        <div className={`flex flex-col items-start justify-center border-0 ${ screenWidth <= 500 ? "space-x-0" : "space-x-2" }
                            sm:flex-row sm:items-center sm:justify-start
                        `}>
                            <span className="hidden ml-[5px] mr-[5px] sm:flex">●</span>
                            <span>{ Math.floor(data.vote_average) } / 10</span>
                            <span className="hidden ml-[0px] mr-[0px] sm:flex">●</span>                    
                            <Info title="" valueFor="runtime" value={data.runtime} />
                        </div>
                    }
                    
                </div>
                <p className="hidden text-sm mt-[8px]
                    sm:line-clamp-3
                ">{ data.overview }</p>
            </div>
        </div>
    )
}

export default EpisodeCard;