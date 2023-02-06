import React, { useEffect, useState } from "react";
import Watch from "../../components/Layout/Watch/Watch";
import axios from "axios";

import { GetServerSideProps } from "next";
import { NextPageWithLayout } from "../page";
import { ArrowLeftIcon, EllipsisHorizontalCircleIcon, PauseIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon, ArrowUturnLeftIcon, ArrowUturnRightIcon } from "@heroicons/react/24/solid";
import { useAppContext } from "../../context/state";
import { useRouter } from "next/router";
import { useAppSelector } from "../../app/hooks";
import { IAuthState } from "../../ts/states/auth_state";
import { selectAuth } from "../../app/store/slices/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import nookies, { parseCookies} from "nookies"
import { screenBreakPoint } from "../../lib/constants";


const WatchShow: NextPageWithLayout<{ data: any }> = ({ data }) => {

    const [isRedirecting, setIsRedirecting] = useState(false);
    const [user, loading] = useAuthState(auth);
    const router = useRouter()
    const [showControl, setShowControls] = useState(true)
    const [screenWidth, setScreenWidth] = useState(360)
    const { setVideoIsPlayed } = useAppContext()
    
    const { info } = data

    const cookies = parseCookies()

    useEffect(() => {
        if (isRedirecting) {
            return;
        }
        if (!loading && !user && !cookies.token) {
            router.replace("/signin")
            setIsRedirecting(true)
        }
    }, [user])

    const resizeHandler = () => {
        setScreenWidth(window.innerWidth)
    }
  
    useEffect(() => {
        window.addEventListener("resize", resizeHandler)
        return () => {
            window.removeEventListener("resize", resizeHandler);
        }
    },[])

    useEffect(() => {
        setVideoIsPlayed(false, {})
    }, [])
    
    const videoControlsHandler = (callback: (...args: [any]) => void, delay: number) => {
        let timer: NodeJS.Timeout;
        return function (...args: [any]) {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                callback(...args)
            }, delay)
        }
    }

    const backHandler = () => {
        router.back()
    }

    return(
        <div
            onMouseMove={ videoControlsHandler(
                () => {
                    setShowControls(!showControl)
                }, showControl ? 3000:0 ) } 
            className={`flex flex-col items-start justify-start w-full h-[100%] relative border-0 bg-black`}
            data-testid="show_container"
            >

            <div
                className="flex relative z-[1000] w-full h-screen items-center justify-center">
                <video autoPlay muted loop src="/train.mp4" className="absolute z-[100] w-full h-[100%] object-center" />
            </div>

            <div className={`${ showControl ? "flex" : "hidden"} flex-col items-start justify-between absolute w-full h-[100%] border-0 z-[1000]`}>
                <div className="flex w-full h-[100px] p-6 items-center justify-between">
                    <ArrowLeftIcon 
                        className="w-[35px] h-[35px] p-2 rounded-full hover:bg-gray-500 hover:cursor-pointer
                        sm:w-[60px] sm:h-[60px] " 
                        onClick={ backHandler }
                    />     
                    {
                        screenWidth <= screenBreakPoint.small ? 
                            <div className="flex flex-1 items-center justify-start text-[15px] border-0
                            sm:text-[22px]">
                                {
                                    info.title || info.name || info.original_title || info.original_name
                                }
                            </div>
                        :
                                ""
                    }  
                                 
                </div>
                <div className="flex flex-col w-full p-6">
                    <div className="flex w-full items-center justify-center mb-[25px]">
                        <div className="w-full h-[3px] border-0 bg-gray-500"></div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <ul className="flex items-center justify-center space-x-2">
                                <li><PauseIcon className="w-[20px] h-[20px]
                                sm:w-[50px] sm:h-[50px]" /></li>
                                <li><ArrowUturnLeftIcon className="w-[18px] h-[18px]
                                sm:w-[40px] sm:h-[40px]" /></li>
                                <li><ArrowUturnRightIcon className="w-[18px] h-[18px]
                                sm:w-[40px] sm:h-[40px]" /></li>
                                <li><SpeakerWaveIcon className="w-[20px] h-[20px]
                                sm:w-[50px] sm:h-[50px]" /></li>
                            </ul>
                        </div>
                        {
                            screenWidth > screenBreakPoint.small ?
                                <div className="flex flex-1 items-center justify-center text-[20px] border-0">
                                    {
                                        info.title || info.name || info.original_title || info.original_name
                                    }
                                </div>
                            :
                            ""
                        }
                        
                        <div className="flex items-center justify-center">
                            <ul className="flex items-center justify-center space-x-2">
                                <li><EllipsisHorizontalCircleIcon className="w-[20px] h-[20px]
                                sm:w-[50px] sm:h-[50px]" /></li>
                                <li><ArrowTopRightOnSquareIcon className="w-[20px] h-[20px]
                                sm:w-[50px] sm:h-[50px]" /></li>
                            </ul>                            
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default WatchShow;


WatchShow.getLayout = (page) => {
    // const meta = {
    //   title: "Movies",
    //   description: "Movies - Wibix"
    // }
   
    return (
      <Watch>
        {page}   
      </Watch>
    );

  };

  export const  getServerSideProps: GetServerSideProps = async (context:any) => {

    const show_id = context.params.id;
    let url: string = `${context.query.mt}/${show_id}`

    if (context.query.mt === "tv" && context.query.s) {
        url = `tv/${context.query.t}/season/${context.query.s}/episode/${context.query.e}`
    }
    
    const [reqShow] = await Promise.all([
        await axios.get(`${process.env.NEXT_PUBLIC_TMDB_API_URL}${url}?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US`, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
            }).then(res => res.data)
    ]) 
    const [resShow] = await Promise.all([
        reqShow
    ])

    return {
        props: {
            data: {
                info: { ...resShow },
            }
        }
    }
    

    
  }