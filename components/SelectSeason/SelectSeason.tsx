import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import getStoredState from "redux-persist/es/getStoredState"


export interface ISelectSeason {
    data: any,
    onClickHandler: (season_number: string, callback:(seasonNumber:string)=>void) => void
}

const SelectSeason: React.FC<ISelectSeason> = ({ data, onClickHandler }) => {
    const initialSeasonName = data.seasons.find((season:any) => season.season_number === 1)?.name 
    const [ seasonName, setSeasonName] = useState(initialSeasonName)
    const [show, setShow] = useState(false)
    // console.log("season: ", season)

    return (
        <div className="flex flex-col items-start justify-start relative">                    
            <div className="items-start justify-start relative">
                <button className="flex items-center justify-start px-6 py-4 border-2 text-slate-200 border-btnprimary text-[18px] w-full
                hover:border-slate-400"
                    onClick={() => setShow(!show)}
                >
                    <span className="mr-[8px]">{  seasonName }</span>
                    <ChevronDownIcon className="w-[25px] h-[25px]" />
                </button>

                <div className={`${show ? "flex" : "hidden" } items-start justify-start pl-0 absolute z-[1200] w-full bg-gray-500 drop-shadow-md`}>
                    <ul className="w-full">
                        {
                        data && data.seasons && data.seasons.filter((season:any) => season.season_number > 0 && season.episode_count > 0 ).map((season:any, i:any) => {
                            return (
                            <li 
                                key={i} 
                                onClick={ () => onClickHandler(season.season_number, (seasonNumber:string) => {
                                    const season_name = data.seasons.find((season:any) => season.season_number === seasonNumber)?.name 
                                    setSeasonName(season_name)
                                    setShow(!show)
                                }) }
                                className="flex flex-col items-start justify-start w-full mb-[0px] pl-4 py-2
                                hover:cursor-pointer hover:text-white hover:bg-btnprimary"
                                >
                                <span className="text-[16px]">{ season.name } </span>
                                <div className="text-xs">{ season.episode_count } Episodes</div>
                            </li>
                            )
                        })
                        }
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default SelectSeason;
