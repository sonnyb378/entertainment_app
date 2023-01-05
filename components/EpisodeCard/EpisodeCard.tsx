import styles from "./EpisodeCard.module.css"
import Image from "next/image"
import { PlayCircleIcon } from "@heroicons/react/24/solid"
import Info from "../Info/Info"

export interface IEpisodeCard {
    data:any
}

const EpisodeCard:React.FC<IEpisodeCard> = ({ data }) => {
    return(
        <div className="flex items-start justify-center p-2 rounded-md bg-[#40424A] my-2 border-4 border-[#40424A] relative
        hover:cursor-pointer
        hover:border-4 hover:border-[#3F546E]
        ">
            <div id="episode_overlay" className="flex items-center justify-center absolute w-full h-[100%] bg-white top-0 left-0 rounded-[5px] opacity-0 bg-opacity-0 z-[1000]
                hover:opacity-100 hover:bg-opacity-10">
                <PlayCircleIcon className="w-[80px] h-[80px] bg-btnprimary rounded-full p-0 m-0" />
            </div>

            <div className="image-container relative flex mr-[10px] w-[300px] h-[169px] border-0">
                <Image 
                    src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH}${data.still_path}`}
                    layout="responsive"
                    priority={true}  
                    width={300}
                    height={169}  
                    className="object-cover !position !h-[unset]"
                />
            </div>
            <div className="flex flex-col items-start justify-center w-full">
                <h1 className="text-lg text-[#61A5C3]">S.{data.season_number}-Ep. { data.episode_number} : { data.name } </h1>
                <div className="flex items-center justify-start text-[12px] space-x-2">
                    <span>Air Date: {data.air_date}</span>
                    <span className="ml-[5px] mr-[5px]">●</span>
                    <span>{ Math.floor(data.vote_average) } / 10</span>
                    <span className="ml-[0px] mr-[0px]">●</span>                    
                    <Info title="" valueFor="runtime" value={data.runtime} />
                </div>
                <p className="text-sm mt-[8px] line-clamp-3">{ data.overview }</p>
            </div>
        </div>
    )
}

export default EpisodeCard;