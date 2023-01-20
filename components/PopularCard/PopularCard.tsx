import React from "react";
import styles from "./PopularCard.module.css"
import { IAuthState } from "../../ts/states/auth_state";
import { IResult } from "../Search/SearchResultItem/SearchResultItem";
import Image from "next/image"

import { PlusIcon, PlayIcon, MinusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { useAppContext } from "../../context/state";
import { useRouter } from "next/router";
import Video from "../Thumbnail/Video/Video";
import BackdropImage from "../Thumbnail/BackdropImage/BackdropImage";
import PosterImage from "../Thumbnail/PosterImage/PosterImage";
import MediaTypeShow from "../Thumbnail/MediaType/Show";
import MediaTypePerson from "../Thumbnail/MediaType/Person";


import no_result from "../../assets/no_result.png"
import num_1 from "../../assets/num_1.png"
import num_2 from "../../assets/num_2.png"
import num_3 from "../../assets/num_3.png"
import num_4 from "../../assets/num_4.png"
import num_5 from "../../assets/num_5.png"
import num_6 from "../../assets/num_6.png"
import num_7 from "../../assets/num_7.png"
import num_8 from "../../assets/num_8.png"
import num_9 from "../../assets/num_9.png"
import num_10 from "../../assets/num_10.png"

// const no_result = require("../../assets/no_result.png")
// const num_1 = require("../../assets/num_1.png")
// const num_2 = require("../../assets/num_2.png")
// const num_3 = require("../../assets/num_3.png")
// const num_4 = require("../../assets/num_4.png")
// const num_5 = require("../../assets/num_5.png")
// const num_6 = require("../../assets/num_6.png")
// const num_7 = require("../../assets/num_7.png")
// const num_8 = require("../../assets/num_8.png")
// const num_9 = require("../../assets/num_9.png")
// const num_10 = require("../../assets/num_10.png")

import { removeDataBookmarks, setDataBookmarks } from "../../app/store/slices/bookmarks";
import { useAppDispatch } from "../../app/hooks";

const PopularCard:React.FC<{ 
    visibleItems: number,
    indexCount: number,
    user: IAuthState, 
    result:IResult,
    bookmarkData?:any[]|null
}> = ({ 
        visibleItems,
        indexCount,
        user, 
        result,
        bookmarkData = null
    }) => {
        
        const { 
            setVideoIsPlayed,
            videoIsPlayed,
            ctxOnEnterHandler,
            ctxOnLeaveHandler
        } = useAppContext();

        const [expand, setExpand] = useState(false);
        const [isHover, setIsHover] = useState(false);
        const [isBookmarked, setIsBookmarked] = useState(false);

        const router = useRouter();


        const dispatch = useAppDispatch();

        useEffect(() => {
            setIsBookmarked(bookmarkData?.findIndex((b) => `${b.id}` === `${result.id}`) !== -1)
        }, [bookmarkData])

        let number_image;

        switch(indexCount + 1) {
            case 1: number_image = num_1; break;
            case 2: number_image = num_2; break;
            case 3: number_image = num_3; break;
            case 4: number_image = num_4; break;
            case 5: number_image = num_5; break;
            case 6: number_image = num_6; break;
            case 7: number_image = num_7; break;
            case 8: number_image = num_8; break;
            case 9: number_image = num_9; break;
            case 10: number_image = num_10; break;
            default: number_image = num_1; break;
        }
        

    const borderSize = 0;

    if (videoIsPlayed) {
        if (typeof window !== 'undefined') {
            const mainComponent = document.getElementById("main_component");
            mainComponent!.style.scale = "110%";
            mainComponent!.style.opacity = "0";
            mainComponent!.style.transition = "all 1s";
            mainComponent!.style.overflow = "hidden";
        }
    }

    return (
        <div
            className={ styles.popularcard_container}
            id="thumbnail"
            data-testid="popular_card"
            >
                
                <div 
                    id={`expand_${result.id}`} 
                    className={`${ expand ? "flex opacity-100 z-[5000] mr-[10px]" : "flex opacity-0 z-[1000] scale-[80%]"} 
                    flex-col overflow-hidden absolute items-center justify-start w-[120%] h-auto bg-black shadow-xl rounded-md border-2 
                    duration-200 transition-all -mt-[50px] border-btnprimary ml-[12px] `}
                    onMouseLeave={(e:React.MouseEvent<HTMLElement>) => ctxOnLeaveHandler(e, () => {
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
                                <BackdropImage expand={expand} user={user} src={result.backdrop_path} media_type={ result.media_type }  /> 
                                : 
                                result.poster_path ? 
                                    <PosterImage expand={expand} user={user} src={result.poster_path}  media_type={ result.media_type } /> 
                                    : 
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
                            
                            {
                                user && user.accessToken &&
                                    <div className="flex items-center justify-center p-2 rounded-full border-2 border-white bg-gray-900 cursor-pointer
                                        hover:text-white hover:bg-btnhighlight hover:border-btnhighlight">
                                        <PlayIcon className="w-[20px] h-[20px]" onClick={ () => setVideoIsPlayed(true, result) } data-testid="play_button" />
                                    </div>
                            }

                            <div className="flex-1"></div>
                            {
                                user && user.accessToken && 
                                <div className="flex items-center justify-center p-2 rounded-full border-2 border-white bg-gray-900 cursor-pointer
                                    hover:text-btnhighlight hover:border-btnhighlight">
                                    {
                                        !isBookmarked ?                                
                                            <PlusIcon className="w-[20px] h-[20px]" onClick={() => 
                                                dispatch(setDataBookmarks({
                                                    id: result.id,
                                                    name: result.title || result.name || result.original_title || result.original_name,
                                                    backdrop_path: result.backdrop_path,
                                                    poster_path: result.poster_path,
                                                    media_type: result.media_type,
                                                    genre_ids: result.genre_ids,
                                                  })) 
                                                }
                                                data-testid="add_bookmark_button"
                                            />

                                        : 
                                            <CheckIcon className="w-[20px] h-[20px]" onClick={() => 
                                                dispatch(
                                                    removeDataBookmarks({ id: result.id })
                                                  )
                                                }
                                                data-testid="remove_bookmark_button"
                                            />
                                    }
                                </div>
                            }
                            
                            <div className="flex items-center justify-center p-2 rounded-full border-2 border-white bg-gray-900 cursor-pointer
                                hover:text-btnhighlight hover:border-btnhighlight">
                                <ChevronDownIcon 
                                    className="w-[20px] h-[20px]" 
                                    onClick={() => {
                                        router.push(`/${ result.media_type }/${ result.id}`)
                                    }} 
                                    data-testid="view_detail_button"
                                />
                            </div>
                        </div>               
                        {
                            result.media_type !== "person" ? <MediaTypeShow result={ result } /> : <MediaTypePerson result={ result } />
                        }          
                        <div className="w-full bg-gray-900 bg-opacity-70 flex-1"></div>               
                    </div>
                    
                </div>

                
                <div
                    id={`collapsed_${result.id}`}
                    data-testid={`collapsed_${result.id}`}
                    onMouseOver={ (e:React.MouseEvent<HTMLElement>) => ctxOnEnterHandler(e, () => {
                        setExpand(true)
                    })}
                    onMouseLeave={(e:React.MouseEvent<HTMLElement>) => ctxOnLeaveHandler(e, (timer:NodeJS.Timer) => {
                        if (timer) clearTimeout(timer)
                    })}  
                    className={`flex ${ expand && "scale-[120%] opacity-0" } flex-col items-center justify-start relative duration-200 transition-all 
                        border-${borderSize} overflow-hidden w-[100%] 
                        sm:border-red-500 
                        md:border-blue-500 
                        lg:border-green-500 
                        xl:border-purple-500
                        2xl:border-orange-500
                    `}
                >

                    {
                        result.poster_path ? 
                            <div className="flex items-center justify-center w-full h-[100%] relative border-0 border-green-500">
                                <div className={`image-container relative h-[100%] -mb-[0px] border-${borderSize} border-orange-500 z-[1103]
                                        ${
                                            visibleItems > 1 ?
                                                indexCount+1 !== 10 ? 
                                                    "w-[80%] left-[30px] "+
                                                    "sm:w-[80%] sm:left-[40px] "+
                                                    "md:w-[80%] md:left-[35px]"
                                                : 
                                                    "w-[80%] left-[10px] "+
                                                    ""
                                                
                                            :
                                                indexCount+1 !== 10 ? "w-[90%] left-[50px]" : "w-[90%] left-[20px]"
                                        }
                                    `}>
                                        
                                        <Image 
                                            src={number_image}
                                            layout="fill"
                                            priority={true}
                                            className={`z-[1001] !relative !h-[unset] object-cover`}
                                        />
                                        
                                </div>
                                <div className={`image-container relative h-[100%] w-[70%] border-0 border-btnprimary rounded-sm overflow-hidden 
                                    z-[1101] 
                                    ${
                                        visibleItems > 1 ?
                                            indexCount+1 !== 10 ? 
                                                "right-[20px] "+
                                                "sm:right-[40px] "+
                                                "md:right-[30px]" 
                                            : 
                                                "right-[20px] "+
                                                ""
                                        :
                                            indexCount+1 !== 10 ? "right-[50px]" : "right-[50px]"
                                    }   
                                `}>
                                    <Image 
                                        src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH}${result.poster_path}`}
                                        layout="fill"
                                        className={`object-contain cursor-pointer !relative !h-[unset]`}
                                    />
                                </div>
                            </div>
                            
                        :                                     
                            <div className="image-container relative w-full border-0" data-testid="backdrop_image_container">
                                <Image 
                                    src={ no_result } 
                                    layout="fill"
                                    priority={true}
                                    className={`object-contain cursor-pointer !relative !h-[unset] z-[1000]`}
                                />                    
                            </div>                                                  
                    }
                    
                </div>
                
        </div>   
    )
}

export default PopularCard;