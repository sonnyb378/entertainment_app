import { IAuthState } from "../../ts/states/auth_state";
import { IResult } from "../Search/SearchResultItem/SearchResultItem";
import BackdropImage from "./BackdropImage/BackdropImage";
import PosterImage from "./PosterImage/PosterImage";
import Image from "next/image"
import no_result from "../../assets/no_result.png"
import MediaTypeShow from "./MediaType/Show";
import MediaTypePerson from "./MediaType/Person";

import { PlusIcon, PlayIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import { useAppContext } from "../../context/state";
import { useRouter } from "next/router";

const Thumbnail:React.FC<{ 
    user: IAuthState, 
    result:IResult,
    onMouseEnterHandler?:(e:React.MouseEvent<HTMLElement>, callback: ()=> void) => void, 
    onMouseLeaveHandler?:(e:React.MouseEvent<HTMLElement>, callback: (...args:any[])=> void) => void,
}> = ({ 
        user, 
        result,
        onMouseEnterHandler,
        onMouseLeaveHandler,
    }) => {
        
        const { setBookmark } = useAppContext();
        const [expand, setExpand] = useState(false);
        const [isHover, setIsHover] = useState(false);
        const router = useRouter();

        /*
            DEMO: Using context  > setBookmark, viewDetail
        */
    
    return (
        <div
            className="flex flex-col items-center justify-start w-full relative"
            id="thumbnail"
            data-testid="thumbnail"
            >
 
                <div id={`expand_${result.id}`} className={`${ expand ? "flex opacity-100 z-[3000]" : "flex opacity-0 z-[1000] scale-[100%]"} 
                    flex-col overflow-hidden absolute items-center justify-start w-[120%] h-[320px] bg-black shadow-xl rounded-md border-2 
                    duration-200 transition-all -mt-[50px] border-btnprimary`}
                    onMouseLeave={(e:React.MouseEvent<HTMLElement>) => onMouseLeaveHandler!(e, () => {
                        setExpand(false)
                    })}
                >
                    {
                        // expand ? <iframe width="w-full" height='169' src={`https://www.youtube-nocookie.com/embed/mkomfZHG5q4?autoplay=${expand ? 1: 0}&mute=1&enablejsapi=1`} 
                        //      title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                        expand ? <video autoPlay muted loop src="/train.mp4" className="relative z-[100] w-full h-auto rounded-lg" /> :
                            result.backdrop_path ? <BackdropImage user={user} src={result.backdrop_path} /> : 
                            result.poster_path ? <PosterImage user={user} src={result.poster_path} /> :                                     
                            <div className="image-container relative w-full border-0" data-testid="backdrop_image_container">
                                <Image 
                                    src={ no_result } 
                                    layout="fill"
                                    priority={ true }
                                    className={`object-contain cursor-pointer !relative !h-[unset] z-[1000]`}
                                />                        
                            </div>
                    }
                    <div className="flex flex-1 flex-col items-center justify-start w-full relative">
                        <div id="gradient" className="flex h-[10px] -top-[10px] absolute z-[1000] w-full items-center justify-start 
                            bg-gradient-to-t from-[#0a0f19] via-[#0a0f19] border-0"></div>
                        <div className="flex pt-2 pb-1 z-[1100] relative w-full items-center justify-start bg-gray-900 bg-opacity-70 space-x-2 px-[13px]">
                            
                            <div className="flex items-center justify-center p-2 rounded-full border-2 border-white bg-gray-900
                                hover:text-white hover:bg-btnhighlight hover:border-btnhighlight">
                                <PlayIcon className="w-[20px] h-[20px]" />
                            </div>
                            <div className="flex-1"></div>
                            <div className="flex items-center justify-center p-2 rounded-full border-2 border-white bg-gray-900
                                hover:text-btnhighlight hover:border-btnhighlight">
                                <PlusIcon className="w-[20px] h-[20px]" onClick={() => setBookmark(result.id, (id:any) => {
                                    console.log("bookmarked: ", id)
                                })}/>
                            </div>
                            <div className="flex items-center justify-center p-2 rounded-full border-2 border-white bg-gray-900
                                hover:text-btnhighlight hover:border-btnhighlight">
                                <ChevronDownIcon className="w-[20px] h-[20px]" onClick={() => {
                                    router.push(`/${ result.media_type }/${ result.id}`)
                                }} />
                            </div>
                        </div>               
                        {
                            result.media_type !== "person" ? <MediaTypeShow result={result} /> : <MediaTypePerson result={result} />
                        }          
                        <div className="w-full bg-gray-900 bg-opacity-70 flex-1"></div>               
                    </div>
                    
                </div>

                
                <div
                    id={`collapsed_${result.id}`}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseOver={ (e:React.MouseEvent<HTMLElement>) => onMouseEnterHandler!(e, () => {
                        setExpand(true)
                    })}
                    onMouseLeave={(e:React.MouseEvent<HTMLElement>) => onMouseLeaveHandler!(e, (timer:NodeJS.Timer) => {
                        if (timer) clearTimeout(timer)
                        setIsHover(false)
                    })}  
                    className={`flex ${ expand && "scale-[120%]" } flex-col items-center justify-start w-full relative duration-200 transition-all border-0`}>
                    <span className={`${isHover ? "flex" : "hidden"} z-[2000] items-center justify-center absolute top-2 left-2 px-2 text-[10px] bg-black`}>Keep hovering to autoplay</span>
                    {
                        result.backdrop_path ? <BackdropImage user={user} src={result.backdrop_path} /> : 
                        result.poster_path ? <PosterImage user={user} src={result.poster_path} /> :                                     
                        <div className="image-container relative w-full border-0" data-testid="backdrop_image_container">
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
                
        </div>   
    )
}

export default Thumbnail;