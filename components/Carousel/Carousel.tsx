import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { IAuthState } from "../../ts/states/auth_state";
import PopularCard from "../PopularCard/PopularCard";
import Thumbnail from "../Thumbnail/Thumbnail";
import styles from "./Carousel.module.css"


const Carousel: React.FC<{ 
    data:any[] | null, 
    user:IAuthState, 
    maxItems:number,
    bookmarkData?:any[] | null,
    baseWidth?:number,
    target:string,
    isThumbnail?: boolean,
    fetchHandler:()=>void
}> = ({
    data, 
    user, 
    maxItems = 18, 
    bookmarkData = null,
    baseWidth = 290,
    target,
    isThumbnail = true,
    fetchHandler
}) => {

    const THUMBNAIL_BASEWIDTH = baseWidth;
    const MAX_ITEMS = maxItems;

    const [visibleItem, setVisibleItem] = useState(6);
    const [translateWidth, setTranslateWidth] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [maxIndex, setMaxIndex] = useState(3)

    const isMounted = useRef(false)

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, [])

    const resize_ob = new ResizeObserver(function(entries) {
        let rect = entries[0].contentRect;  
        let width = rect.width;
        
        const track = document.getElementById(`${target}_track`)
        const carousel_ul = document.getElementById(`${target}_carousel_ul`)
        const li_thumbnail = document.querySelectorAll(`.${target}_carousel_li`) as NodeListOf<HTMLDivElement>

        const visibleThumbnail = Math.floor((width / THUMBNAIL_BASEWIDTH));
        let singleItemWidth = Math.floor(width / visibleThumbnail);
        const newTrackWidth = Math.floor((singleItemWidth * visibleThumbnail) - 100)

        if (track) {
          track.style.width = `${newTrackWidth}px`
        } 
        
        li_thumbnail.forEach((item) => {
            item.style.width = `${Math.floor(newTrackWidth / visibleThumbnail)}px`
        })

        if (carousel_ul) {
            if (currentIndex > 0) {
                const totalDisplayed = visibleThumbnail * (currentIndex + 1);
                let itemsRemaining = MAX_ITEMS - totalDisplayed

                if (itemsRemaining < 0) {
                    itemsRemaining = MAX_ITEMS - (visibleThumbnail * currentIndex)
                }

                singleItemWidth = Math.floor(newTrackWidth / visibleItem);
                const widthOffset = (singleItemWidth - 0) * visibleItem;

                if ((currentIndex + 1) === maxIndex && itemsRemaining) {
                    const additionalTrackWidth = Math.floor( singleItemWidth * Math.abs(itemsRemaining) )
                    carousel_ul.style.transform = `translateX(-${Math.floor(((currentIndex-1) * widthOffset) + (additionalTrackWidth ))}px)`;
                } else {
                    carousel_ul.style.transform = `translateX(-${Math.floor((currentIndex) * widthOffset)}px)`;
                }
            } else {
                carousel_ul.style.transform = `translateX(-${0}px)`;
            }
        }

        if (currentIndex >= maxIndex) {
            const newIndex = maxIndex - 1
            isMounted.current && setCurrentIndex(newIndex < 0 ? 0 : maxIndex - 1)
        }
       
        if (isMounted.current) {
            setVisibleItem(visibleThumbnail);
            setTranslateWidth(newTrackWidth)
            setMaxIndex(Math.ceil(MAX_ITEMS / visibleThumbnail))
        }

    });    

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const container = document.getElementById(`${target}_carousel`)
        if (container) {
            resize_ob.observe(container as Element);
        }
    }
    
    useEffect(() => {
        if (typeof window !== 'undefined' && typeof document !== "undefined") {
            const carousel = document.getElementById(`${target}_carousel`) as Element;
            const li_thumbnail = document.querySelectorAll(`.${target}_carousel_li`) as NodeListOf<HTMLDivElement>
            const track = document.getElementById(`${target}_track`)

            const visibleThumbnail = Math.floor((carousel?.clientWidth / THUMBNAIL_BASEWIDTH));
            const singleItemWidth = Math.floor(carousel?.clientWidth / visibleThumbnail);
            let newTrackWidth = Math.floor((singleItemWidth * visibleThumbnail) - 100)
            
            if (track) {
                track.style.width = `${newTrackWidth}px`
            }

            li_thumbnail.forEach((item) => {
                item.style.width = `${(newTrackWidth / visibleThumbnail) }px`
            })

            setVisibleItem(visibleThumbnail);
            setTranslateWidth(newTrackWidth)
            setMaxIndex(Math.ceil(MAX_ITEMS / visibleThumbnail))
        }    
    },[])

    const prevHandler = () => {
        if (currentIndex <= 0) return     
        setCurrentIndex(currentIndex - 1)
    }

    const nextHandler = () => {
        if (currentIndex+1 >= maxIndex) return
        setCurrentIndex(currentIndex + 1)
    }


    return(
        <div className="flex flex-col  border-0 w-full relative">
            <div id={`${target}_track`} className="hidden ml-[50px] border-2
                 sm:border-red-500 
                 md:border-blue-500 
                 lg:border-green-500 
                 xl:border-purple-500
                 2xl:border-orange-500
            "> { translateWidth }, max index: {maxIndex}, current index: {currentIndex}, singleItemWidth: { Math.floor(translateWidth / visibleItem) } , visible items: {visibleItem}, MAX_ITEMS: { MAX_ITEMS }</div>
              <div 
                id={`${target}_carousel`} 
                className={ styles.carousel }
                data-testid="carousel" 
              >
                
                    <div
                        onClick={prevHandler} 
                        className={ styles.prev_btn }>
                        <ChevronLeftIcon className="w-[30px] h-[30px] border-0 text-white" />
                    </div>
                    <div 
                        onClick={nextHandler}
                        className={ styles.next_btn }>
                        <ChevronRightIcon className="w-[30px] h-[30px] border-0 text-white" />
                    </div>
                    
                    <div id={`${target}_carousel_ul`} className={ styles.carousel_ul }>
                    <div
                        className="border-0 cursor-pointer h-[100%] w-[50px] p-[2px]"
                        id="filler_start"
                        data-testid="filler_start"
                    ></div>
                    {
                        
                        data && data.length > 0 && 

                            data.slice(0, (visibleItem * maxIndex) > MAX_ITEMS ? MAX_ITEMS : visibleItem * maxIndex).map((item:any, i:any) => {
                                return (
                                    <div  className={`flex items-start justify-center border-0 cursor-pointer h-[100%] w-[290px] p-[2px] ${target}_carousel_li`}
                                    key={i}
                                    >
                                        {
                                            isThumbnail ? 
                                                <Thumbnail user={user} result={item} bookmarkData={bookmarkData} fetchHandler={fetchHandler} />                            
                                            :
                                                <PopularCard visibleItems={visibleItem} indexCount={i} user={user} result={item} bookmarkData={bookmarkData} fetchHandler={fetchHandler} /> 
                                        }
                                    </div>
                                )
                                })
                        

                    }
                    <div
                        className="border-0 cursor-pointer h-[100%] w-[50px] p-[2px]"
                        id="filler_end"
                        data-testid="filler_end"
                    ></div>

                    </div>

              </div>
        </div>
    )
}

export default Carousel;