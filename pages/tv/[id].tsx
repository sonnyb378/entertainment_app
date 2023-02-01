
import React, { useEffect, useState } from "react";
import Main from "../../components/Layout/Main/Main";
import axios from "axios";
import Image from "next/image";
import Info from "../../components/Info/Info";
import CustomBtn from "../../components/Button/CustomBtn/CustomBtn";
import dynamic from "next/dynamic";
import Spinner from "../../components/Spinner/Spinner";
import SelectSeason from "../../components/SelectSeason/SelectSeason";
// import EpisodeCard from "../../components/EpisodeCard/EpisodeCard";
// import Carousel from "../../components/Carousel/Carousel";

const Carousel = dynamic(() => import("../../components/Carousel/Carousel"), {
  loading: () => <Spinner />
})
const EpisodeCard = dynamic(() => import("../../components/EpisodeCard/EpisodeCard"), {
  loading: () => <Spinner />
})

import { NextPageWithLayout } from "../page";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useTVDetail } from "../../lib/hooks/useTVDetail";
import { useAppContext } from "../../context/state";
import { ArrowPathIcon, PlusCircleIcon, MinusCircleIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { fadeScreen } from "../../lib/fadeScreen";
import { IBookmarkData, removeDataBookmarks, selectBookmarkData, setDataBookmarks } from "../../app/store/slices/bookmarks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import nookies, { parseCookies } from "nookies"

import { IAuthState } from "../../ts/states/auth_state";
import { selectAuth } from "../../app/store/slices/auth";
import { tvData } from "../../model/fake_tv_detail";
import { screenBreakPoint, thumbnailBaseWidth } from "../../lib/constants";
import { isMobile } from "../../lib/isMobile";
// import { fake_tv_episodes } from "../../model/fake_tv_episodes";

const TV: NextPageWithLayout<{ data:any }> = ({ data }) => {
  
  const router = useRouter();
  const dispatch = useAppDispatch() 
  const bookmarks = useAppSelector<IBookmarkData>(selectBookmarkData);
  const [user, loading] = useAuthState(auth);
  const { videoIsPlayed, showData } = useAppContext();
  
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [isEpisodesLoading, setIsEpisodesLoading] = useState(false)
  const [episodes, setEpisodes] = useState<any>([])
  const [screenWidth, setScreenWidth] = useState(360)
  
  const cookies = parseCookies();

  // const { tv_detail: data, isLoading, isError } = useTVDetail(props.tv_id); 
  // const { data } = props;

  // const isLoading = false;
  // const isError = undefined;
  // const data = tvData

  useEffect(() => {
    if (isRedirecting) {
      return;
    }
    if (!loading && !user && !cookies.token) {
      router.replace("/signin")
      setIsRedirecting(true)
    }
  }, [user])


  let isBookmarked = false;

  let recommendationsArr:any[] = [];
  
  if (data) {
    data.recommendations && data.recommendations.results && data.recommendations.results.slice(0,20).map((item:any) => {
      recommendationsArr.push(item)
    })

    if (bookmarks) {
      isBookmarked = bookmarks.data.findIndex((show:any) => show.id === data.id) !== -1
    }
  }

  useEffect(() => {
    if (data && data["season/1"]) {
      if (data["season/1"] && data["season/1"].episodes.length > 0) {
        setEpisodes(data["season/1"].episodes)
      }   
    }
  },[data])

  const fetchSeasonEpisodes = async (season_number: string, callback: (season_number:string) => void) => {
    setIsEpisodesLoading(true)
    callback(season_number)

    const season_episodes = await axios.get(`${process.env.NEXT_PUBLIC_TMDB_API_URL}tv/${data.id}/season/${season_number}?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US`).then(res => res.data) 
    
    // console.log("fetch season episodes : ", season_number, season_episodes.episodes)
    
    setIsEpisodesLoading(false)
    setEpisodes(season_episodes.episodes)
  }

  useEffect(() => {
    fadeScreen(videoIsPlayed, () => {
      router.push(`/watch/${showData.id}?mt=${showData.media_type}${ showData.media_type === "tv" && data.id && "&t="+data.id }${ showData.media_type ==="tv" && showData.season_number && "&s="+showData.season_number }${ showData.media_type ==="tv" && showData.episode_number && "&e="+showData.episode_number }`)
    })
  }, [videoIsPlayed, router, showData.id, showData.media_type, showData.season_number, showData.episode_number])

  const genres:any = [];
  if (data && data.genres) {
    data.genres.map((genre:any) => {
      genres.push(genre.id)
    })
  }

  const resizeHandler = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
      window.addEventListener("resize", resizeHandler)
      return () => window.removeEventListener("resize", resizeHandler);
  },[])

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  const saveBookmark = (data:any) => {
    dispatch(setDataBookmarks({
      id: data.id,
      name: data.title || data.original_title || data.name || data.original_name,
      backdrop_path: data.backdrop_path,
      poster_path: data.poster_path,
      media_type: "tv",
      genre_ids: genres,
    }))    
  }

  const deleteBookmark = (showID:number) => {
    dispatch(
      removeDataBookmarks({ id: showID })
    )
  }
    
    // if (isError) return <div>Error occured while fetching TV details. Please try again.</div>

    return (
      <div className="flex flex-col items-start justify-center w-full overflow-hidden pb-[100px] -mt-[4px]" data-testid="tv_container">
        {
            // isLoading && <div className="flex items-center justify-start w-full p-6" data-testid="loading_container">
            //     <ArrowPathIcon className="w-[30px] h-[30px] animate-spin mr-2" />
            //     <span>Loading</span>
            // </div>
        }
        {
          data && 
          <section className="flex flex-col items-start justify-center w-full p-0">
            
            <section className={`flex flex-1 flex-col items-start justify-center w-full border-0 relative h-[100%]
                sm:border-red-500
                md:border-blue-500
                lg:border-green-500 
                xl:border-purple-500
                2xl:border-orange-500`
              }
              data-testid="tv_info_container"
            >

                <div className="flex items-center justify-start w-full absolute top-0 left-0 z-[2000] p-2
                sm:p-10">
                    <ChevronLeftIcon className="w-[30px] h-[30px] mr-[10px] border border-btnprimary bg-btnprimary rounded-full p-1 
                    hover:cursor-pointer hover:border-white" 
                    onClick={ () => router.back() } />
                    <span>Back</span>
                </div>


                <div className="image-container relative w-full border-0 border-purple-500 h-[4/6]" data-testid="featured_backdrop"> 
                  <Image 
                      src={ `${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH_ORIGINAL}${data.backdrop_path ? data.backdrop_path : data.poster_path}` } 
                      layout="responsive"
                      width={300}
                      height={169}    
                      alt={`${data.title}`} 
                      priority={true}
                      className={`object-cover z-[1000] opacity-40 border-2 border-red-500 object-center-top
                      sm:opacity-50`}
                  />
                  <div className="flex w-full h-[100px] border-0 absolute z-[1100] bg-gradient-to-t from-black via-black bottom-0
                    lg:h-[200px]
                    xl:h-[250px]
                    2xl:h-[300px]
                  "></div>
                </div>

                <div className="flex flex-col flex-1 relative items-start justify-start w-full z-[1200] border-0 p-2 pb-[50px] -mt-[150px]
                  sm:p-10
                  md:-mt-[300px] md:pb-[80px]
                  lg:-mt-[400px]
                  xl:-mt-[500px] xl:w-[60%]
                  2xl:-mt-[750px] 2xl:w-[50%] 2xl:pb-[100px]
                ">

                <div className="flex flex-col items-center justify-start border-0 pb-[0px] h-[100%] w-full p-2
                        md:items-start">
                  
                  <div className="w-full p-0 text-[50px] font-bold text-center leading-none mt-[50px]
                  md:text-left">{ data.name || data.original_name }</div>
                  <div className="flex flex-col items-center justify-center py-4 text-[12px] border-0 w-full
                      md:flex-row">
                      <div className="flex flex-col items-center justify-center border-0 space-y-2
                          md:flex-row md:justify-start md:space-y-0
                        ">
                            {
                              data.number_of_seasons && data.number_of_seasons > 0 && 
                                <>
                                  <div className="mr-[10px] p-2 border border-green-500 text-green-500">
                                    Seasons: { data.number_of_seasons }
                                  </div>  
                                  
                                </>

                            }
                  
                          <Info title="" value={data.genres} />
                      </div> 
                      <div className="flex flex-1  items-center justify-center border-0 p-2
                        md:justify-start
                      ">
                          <span className="hidden mr-[10px] text-[11px] md:flex">●</span>

                          <div className="flex items-center justify-start">
                            <span className="mr-[10px]">{ Math.floor(data.vote_average) } / 10</span> 
                            <span className="mr-[10px]">-</span> 
                            <span>Votes: {data.vote_count} </span>
                          </div>
                      </div>
                  </div>

                  <div className="w-full p-0 text-[15px] line-clamp-3 mb-[20px]
                    sm:text-left
                    md:mb-[5px]
                  ">{ data.overview }</div>
                  
                  <div className={`w-full mt-[15px]`}>
                    <Info title="Created By" value={ data.created_by } />
                    <Info title="Cast" value={ data.credits?.cast } />                  
                    <Info title="Audio Languages" value={data.spoken_languages} />
                  </div>

                  <div className="flex flex-col w-full items-center justify-start border-0 p-0 mt-4 space-y-2
                        sm:space-y-0 sm:space-x-2 sm:flex-row
                        lg:space-x-2">
                    {/* <CustomBtn title="Play" Icon={PlayCircleIcon} onClickHandler={() => console.log("PlayCircleIcon: ",data.id)} /> */}
                    {/* <CustomBtn title="Season" Icon={ChevronDownIcon} onClickHandler={() => console.log("Dropdown season: ",data.id)} /> */}
                    {
                      !isBookmarked ? 
                        user && <CustomBtn title="Add to List" Icon={PlusCircleIcon} onClickHandler={() => 
                          saveBookmark(data)
                        } />
                      :
                        user &&  <CustomBtn title="Remove from List" Icon={MinusCircleIcon} onClickHandler={() => 
                          deleteBookmark(data.id)  
                        } />
                    }
                    <div className="flex items-center justify-start space-x-2">{
                      data.networks.map((network:any, i:any) => {
                        return (
                          <div key={i} className="flex items-center justify-center p-[5px] relative bg-white rounded-full">
                            <div className="image-container relative  border-0 border-red-500 rounded-full w-[30px] h-[30px]">
                              <Image
                                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH}${network.logo_path}`}
                                layout="responsive"
                                priority={true}  
                                width={300}
                                height={169}  
                                className="object-contain !position !h-[unset]"
                              />
                            </div>                            
                          </div>
                        )
                      })
                    }</div>
                  </div>
                </div>
              </div>

            </section>


            <section 
              className="flex flex-col items-start justify-center px-[0px] z-[2000] border-0 w-full relative mb-[20px]" 
              data-testid="episodes_container"
            >              
              <div className={`flex flex-col py-6 border-0 border-red-500 w-full ${ screenWidth <=  screenBreakPoint.small ? "px-[5px]":"px-[50px]" }`}>
                <h1 className="text-[20px]">                  
                  <SelectSeason data={data} onClickHandler={fetchSeasonEpisodes} />
                </h1>

                {
                  !isEpisodesLoading ?                 
                    <div 
                      className="flex flex-col w-full border-0 mt-[10px]" 
                      data-testid="episode_list_container"
                    >
                        {
                          episodes && episodes.length > 0 && episodes.map((episode:any, i:any) => {
                            return (
                              <EpisodeCard key={i} data={episode}  screenWidth={screenWidth} />
                            )
                          })
                        }
                    </div>
                  :
                    <div 
                      className="flex items-center justify-start w-full border-0 mt-[10px]" 
                      id="loading_episodes_container"
                      data-testid="loading_episodes_container"
                    >
                      <ArrowPathIcon className="mt-[10px] w-[40px] h-[40px] animate-spin mr-[5px]" /> 
                      <span>Loading Episodes</span>
                    </div>
                }

              </div>
            </section>

            {
              recommendationsArr && recommendationsArr.length > 0 &&            
                <section className="flex flex-col px-[0px] z-[2000] border-0 w-full relative" data-testid="recommended_tvshows">
                  <h1 className={`${ isMobile() ? " ml-[10px]" : " ml-[50px]" } text-[20px]`}>Recommended TV Shows</h1>

                  <Carousel 
                    data={recommendationsArr} 
                    user={user} 
                    maxItems={ recommendationsArr.length } 
                    bookmarkData={[...bookmarks.data]}
                    baseWidth={screenWidth > screenBreakPoint.small ? thumbnailBaseWidth.large : thumbnailBaseWidth.small }
                    target="r"
                    screenWidth={screenWidth}
                  />
                </section>
            }
            {
              user &&
                <section className="flex flex-col px-[0px] z-[2000] border-0 w-full relative mt-[50px]" data-testid="bookmark_container">
                  <h1 className={`${ isMobile() ? " ml-[10px]" : " ml-[50px]" } text-[20px]`}>My List</h1>
                  
                  {
                    [...bookmarks.data] && [...bookmarks.data].length > 0 ?
                        <Carousel 
                          data={ [...bookmarks.data] }
                          user={user} 
                          maxItems={ [...bookmarks.data].length } 
                          bookmarkData={[...bookmarks.data]}
                          baseWidth={screenWidth > screenBreakPoint.small ? thumbnailBaseWidth.large : thumbnailBaseWidth.small }
                          target="m"
                          screenWidth={screenWidth}
                        />
                      :
                        <div className="flex items-center justify-start ml-[50px] mt-6 p-2">No bookmarks found</div>
                  }
                  
                </section>
            }
            
            
          </section>
        }
      </div> 
    );
    
  };
  
  export default TV;
  
  
  TV.getLayout = (page) => {
    const meta = {
      title: "TV detail page",
      description: "TV details page - Wibix"
    }
   
    return (
      <Main seo={meta} showHero={false}>
        {page}   
      </Main>
    );

  };



   export const getStaticPaths: GetStaticPaths = async () => {

    const [reqTrending, reqPopular] = await Promise.all([
      await axios.get(`${process.env.NEXT_PUBLIC_TMDB_API_URL}trending/tv/day?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}`, {
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
      }).then(res => res.data),
      await axios.get(`${process.env.NEXT_PUBLIC_TMDB_API_URL}tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US&region=US&page=1`, {
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
      }).then(res => res.data)   
    ])

    const [resTrending, resPopular] = await Promise.all([
      reqTrending, reqPopular
    ])

    let pathsArr:any[] = []

    if (resTrending && resTrending.results.length > 0) {
      pathsArr = [...resTrending.results]
    }
    if (resPopular && resPopular.results.length > 0) {
      pathsArr = [...resPopular.results]
    }

    const paths = pathsArr.map((tv: any) => ({
      params: { id: tv.id.toString() },
    }))

    return {
      paths,
      fallback: "blocking"
    }
  }

  export const  getStaticProps: GetStaticProps = async (context:any) => {

    const tv_id = context.params.id;

    const [reqTVShow] = await Promise.all([
      await axios.get(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}tv/${tv_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US&append_to_response=recommendations,credits,season/1`,
        {
          headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        }
        ).then(res => res.data),
    ])

    const [resTVShow] = await Promise.all([
      reqTVShow
    ])

    return {
      props: {
          data: resTVShow
      }
    }

  }


  /*
  {
    "success": false,
    "status_code": 34,
    "status_message": "The resource you requested could not be found."
  }
  */

  


