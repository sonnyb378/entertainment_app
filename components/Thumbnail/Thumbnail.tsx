import React from "react";
import BackdropImage from "./BackdropImage/BackdropImage";
import PosterImage from "./PosterImage/PosterImage";
import Image from "next/image"
import MediaTypeShow from "./MediaType/Show";
import MediaTypePerson from "./MediaType/Person";
import Video from "./Video/Video";

// import { IAuthState } from "../../ts/states/auth_state";
import { IResult } from "../Search/SearchResultItem/SearchResultItem";
import { PlusIcon, PlayIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/state";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../app/hooks";
import { removeDataBookmarks, setDataBookmarks } from "../../app/store/slices/bookmarks";

import no_result from "../../assets/no_result.png"
import { User } from "firebase/auth";

// const no_result = require("../../assets/no_result.png")

const Thumbnail:React.FC<{ 
    user: User | null | undefined, 
    result:IResult,
    bookmarkData?:any[]|null
}> = ({ 
        user, 
        result,
        bookmarkData = null
    }) => {
        
        const { 
            setVideoIsPlayed,
            ctxOnEnterHandler: onEnterHandler,
            ctxOnLeaveHandler: onLeaveHandler
        } = useAppContext();

       
        const [expand, setExpand] = useState(false);
        const [isHover, setIsHover] = useState(false);
        const [isBookmarked, setIsBookmarked] = useState(false);

        const router = useRouter();

        const dispatch = useAppDispatch();

        useEffect(() => {
            setIsBookmarked(bookmarkData?.findIndex((b) => `${b.id}` === `${result.id}`) !== -1)
        }, [bookmarkData, result.id])

        // console.log("thumbnail: ", result)
        
    return (
        <div
            className="flex flex-col items-center justify-start w-full relative"
            id="thumbnail"
            data-testid="thumbnail"
        >
                
            <div 
                id={`expand_${result.id}`} 
                className={`${ expand ? "flex opacity-100 z-[3000]" : "flex opacity-0 z-[1152] scale-[80%]"} 
                flex-col overflow-hidden absolute items-center justify-start w-[120%] h-auto bg-black shadow-xl rounded-md border-2
                duration-200 transition-all -mt-[50px] border-btnprimary`}
                onMouseLeave={(e:React.MouseEvent<HTMLElement>) => onLeaveHandler!(e, () => {
                    setExpand(false)
                })}
                data-testid={`expand_${result.id}`} 
            >
                {
                    // expand ? <iframe width="w-full" height='169' src={`https://www.youtube-nocookie.com/embed/mkomfZHG5q4?autoplay=${expand ? 1: 0}&mute=1&enablejsapi=1`} 
                    //      title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>

                    result.media_type !== "person" &&
                        expand ? <Video 
                            result={result} 
                            expand={expand} 
                            user={user} 
                            src="/train.mp4" 
                            isBookmarked={isBookmarked}
                        />
                    :
                        result.backdrop_path ? 
                            <BackdropImage expand={expand} user={user} src={result.backdrop_path} media_type={result.media_type}  /> 
                            : 
                            result.poster_path ? 
                                <PosterImage expand={expand} user={user} src={result.poster_path}  media_type={result.media_type} /> 
                                : 
                                <div className="image-container relative w-full border-0" data-testid="backdrop_image_container">
                                    <Image 
                                        src={ no_result } 
                                        layout="fill"
                                        priority={ true }
                                        alt=""
                                        className={`object-contain cursor-pointer !relative !h-[unset] z-[1000]`}
                                    />                        
                                </div>
                    
                    
                }
                <div className="flex flex-1 flex-col items-center justify-start w-full relative">
                    <div id="gradient" className="flex h-[10px] -top-[10px] absolute z-[1000] w-full items-center justify-start 
                        bg-gradient-to-t from-[#0a0f19] via-[#0a0f19] border-0"></div>
                    <div className="flex pt-2 pb-1 z-[1100] relative w-full items-center justify-start bg-gray-900 bg-opacity-70 space-x-2 px-[13px]">
                        
                        {
                            result.media_type !== "person" && user && user &&
                            <div className="flex items-center justify-center p-2 rounded-full border-2 border-white bg-gray-900 cursor-pointer
                                hover:text-white hover:bg-btnhighlight hover:border-btnhighlight">
                                <PlayIcon className="w-[20px] h-[20px]" onClick={ () => setVideoIsPlayed(true, result) } data-testid="play_button" />
                            </div>
                        }
                        

                        <div className="flex-1"></div>
                        {
                            user && user && result.media_type !== "person" &&  
                            <div className="flex items-center justify-center p-2 rounded-full border-2 border-white bg-gray-900 cursor-pointer
                                hover:text-btnhighlight hover:border-btnhighlight">
                                {
                                    !isBookmarked ?                                                                     
                                        <PlusIcon className="w-[20px] h-[20px]" onClick={() => {
                                                dispatch(setDataBookmarks({
                                                    id: result.id,
                                                    name: result.title || result.name || result.original_title || result.original_name,
                                                    backdrop_path: result.backdrop_path,
                                                    poster_path: result.poster_path,
                                                    media_type: result.media_type,
                                                    genre_ids: result.genre_ids,
                                                })) 
                                            }                                            
                                            }
                                            data-testid="add_bookmark_button"
                                        />
                                    : 
                                        <CheckIcon className="w-[20px] h-[20px]" onClick={() => 
                                                {
                                                    setExpand(false)
                                                    dispatch(
                                                        removeDataBookmarks({ id: result.id })
                                                    )
                                                }
                                            }
                                            data-testid="remove_bookmark_button"
                                        />
                                }
                            </div>
                        }
                        
                        <div className="flex items-center justify-center p-2 rounded-full border-2 border-white bg-gray-900 cursor-pointer
                            hover:text-btnhighlight hover:border-btnhighlight">
                            <ChevronDownIcon className="w-[20px] h-[20px]" onClick={() => {
                                    router.push(`/${ result.media_type }/${ result.id}`)
                                    // console.log(`redirect to: /${ result.media_type }/${ result.id}`)
                                }} 
                                data-testid="view_detail_button"
                            />
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
                onMouseOver={ (e:React.MouseEvent<HTMLElement>) => onEnterHandler!(e, () => {
                    setExpand(true)
                })}
                onMouseLeave={(e:React.MouseEvent<HTMLElement>) => onLeaveHandler!(e, (timer:NodeJS.Timer) => {
                    if (timer) clearTimeout(timer)
                    setIsHover(false)
                })}  
                className={`flex ${ expand && "scale-[120%]" } flex-col items-start justify-start z-[2000] w-full relative duration-200 transition-all border-0  rounded-md overflow-hidden`}
                data-testid={`collapsed_${result.id}`}
            >
                <span className={`${isHover ? "flex" : "hidden"} z-[2000] items-center justify-center absolute top-2 left-2 px-2 text-[10px] bg-black`}>
                    Keep hovering to autoplay
                </span>
                {
                    result.backdrop_path ? <BackdropImage expand={expand} user={user} src={result.backdrop_path} media_type={result.media_type} /> : 
                    result.poster_path ? <PosterImage expand={expand} user={user} src={result.poster_path} media_type={result.media_type} /> :                                     
                    <div className="image-container relative w-full border-0" data-testid="backdrop_image_container">
                        <Image 
                            src={ no_result } 
                            layout="fill"
                            alt="No Result"
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