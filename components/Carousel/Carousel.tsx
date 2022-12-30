import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { IAuthState } from "../../ts/states/auth_state";
import Thumbnail from "../Thumbnail/Thumbnail";
import styles from "./Carousel.module.css"


const Carousel: React.FC<{ data:any[], user:IAuthState, isThumbnail?:boolean}> = ({data, user, isThumbnail = true}) => {

    const THUMBNAIL_BASEWIDTH = 290;
    const MAX_ITEMS = 18;

    const [visibleItem, setVisibleItem] = useState(6);
    const [translateWidth, setTranslateWidth] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [maxIndex, setMaxIndex] = useState(3)

    
    const resize_ob = new ResizeObserver(function(entries) {
        let rect = entries[0].contentRect;  
        let width = rect.width;
        
        const track = document.getElementById("track")
        const carousel_ul = document.getElementById("carousel_ul")
        const li_thumbnail = document.querySelectorAll(".carousel_li") as NodeListOf<HTMLDivElement>
    
        const visibleThumbnail = Math.floor((width / THUMBNAIL_BASEWIDTH));
        const singleItemWidth = Math.floor(width / visibleThumbnail);
        const newTrackWidth = Math.floor((singleItemWidth * visibleThumbnail) - 100)
    
        if (track) {
          track.style.width = `${newTrackWidth}px`
        } 
        
        li_thumbnail.forEach((item) => {
            item.style.width = `${(newTrackWidth / visibleThumbnail) }px`
        })

        if (currentIndex > 0) {
            carousel_ul!.style.transform = `translateX(-${(currentIndex) * newTrackWidth}px)`;
        } else {
            carousel_ul!.style.transform = `translateX(-${0}px)`;
        }

        if (currentIndex >= maxIndex) {
            setCurrentIndex(maxIndex - 1)
        }

        setVisibleItem(visibleThumbnail);
        setTranslateWidth(newTrackWidth)
        setMaxIndex(Math.floor(MAX_ITEMS / visibleThumbnail))

    //    console.log(visibleItem * maxIndex)
    });
    

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const container = document.getElementById("carousel")
        if (container) {
          resize_ob.observe(container as Element);
        }
      }
    
      useEffect(() => {
        if (typeof window !== 'undefined' && typeof document !== "undefined") {
          const carousel = document.getElementById("carousel") as Element;
          const li_thumbnail = document.querySelectorAll(".carousel_li") as NodeListOf<HTMLDivElement>
          const track = document.getElementById("track")
          const visibleThumbnail = Math.floor((carousel?.clientWidth / THUMBNAIL_BASEWIDTH));
          const singleItemWidth = Math.floor(carousel?.clientWidth / visibleThumbnail);
          const newTrackWidth = Math.floor((singleItemWidth * visibleThumbnail) - 100)
          
          if (track) {
            track.style.width = `${newTrackWidth}px`
          }

          li_thumbnail.forEach((item) => {
            item.style.width = `${(newTrackWidth / visibleThumbnail) }px`
          })

          setVisibleItem(visibleThumbnail);
          setTranslateWidth(newTrackWidth)
          setMaxIndex(Math.floor(MAX_ITEMS / visibleThumbnail))

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
            <div id="track" className="hidden ml-[50px] border-2">{ translateWidth }, max index: {maxIndex}, current index: {currentIndex}, visible items: {visibleItem}</div>
              <div 
                id="carousel" 
                className="flex flex-row items-center justify-start mt-4 relative overflow border-0 border-purple-500 min-w-[346px] h-[100%]"
                data-testid="carousel" 
              >
                
                <div
                    onClick={prevHandler} 
                    className="flex left-0 items-center justify-center absolute h-[100%] w-[50px] bg-black opacity-0 p-2 border-0 z-[1150] 
                cursor-pointer hover:opacity-80">
                    <ChevronLeftIcon className="w-[30px] h-[30px] text-white" />
                </div>
                <div 
                    onClick={nextHandler}
                    className="flex right-0 items-center justify-center absolute h-[100%] w-[50px] bg-black opacity-0 p-2 border-0 z-[1150]  
                    cursor-pointer hover:opacity-80">
                    <ChevronRightIcon className="w-[30px] h-[30px] text-white" />
                </div>
                
                <div id="carousel_ul" className={`flex relative items-center justify-start transition-all duration-1000 translate-x-[500] border-0 border-red-500 h-[100%] space-x-0`}>
                  <div
                    className="border-0 cursor-pointer h-[100%] w-[50px] p-[2px]"
                    id="filler_start"
                    data-testid="filler_start"
                  ></div>
                  {
                    
                    data.length > 0 && data.slice(0,visibleItem * maxIndex).map((item:any, i:any) => {
                      return (
                        <div  className={`flex items-start justify-center border-0 cursor-pointer h-[100%] 
                          w-[290px] p-[2px] carousel_li`}
                          key={i}
                        >
                            {
                                isThumbnail ? <Thumbnail user={user} result={item} /> : ""
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