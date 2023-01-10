
import React, { useEffect, useState } from "react";
import Main from "../../components/Layout/Main/Main";
import { NextPageWithLayout } from "../page";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IAuthState } from "../../ts/states/auth_state";
import { selectAuth } from "../../app/store/slices/auth";
import { useTVDetail } from "../../lib/hooks/useTVDetail";
import { ArrowPathIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Info from "../../components/Info/Info";

import CustomBtn from "../../components/Button/CustomBtn/CustomBtn";
import { useAppContext } from "../../context/state";
import { PlayCircleIcon, PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import Thumbnail from "../../components/Thumbnail/Thumbnail";

import { tvData } from "../../model/fake_tv_detail";
import { collection, DocumentData, onSnapshot, QuerySnapshot, Unsubscribe } from "firebase/firestore";
import { db } from "../../firebase";
import Carousel from "../../components/Carousel/Carousel";
import PreviousMap from "postcss/lib/previous-map";

import { GetServerSideProps, GetStaticProps } from "next";
import axios from "axios";
import { fake_tv_episodes } from "../../model/fake_tv_episodes";
import EpisodeCard from "../../components/EpisodeCard/EpisodeCard";
import SelectSeason from "../../components/SelectSeason/SelectSeason";
import { fadeScreen } from "../../lib/fadeScreen";
import { IBookmarkData, removeDataBookmarks, selectBookmarkData, setDataBookmarks } from "../../app/store/slices/bookmarks";

const TV: NextPageWithLayout = (props:any) => {
  const router = useRouter();
  const user = useAppSelector<IAuthState>(selectAuth);
  const { videoIsPlayed, showData } = useAppContext();

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isEpisodesLoading, setIsEpisodesLoading] = useState(false)
  
  const bookmarks = useAppSelector<IBookmarkData>(selectBookmarkData);
  const [dataBookmark, setDataBookmark] = useState<any>([])
  
  const dispatch = useAppDispatch() 

  // const { tv_detail: data, isLoading, isError } = useTVDetail(props.tv_id); 

  const isLoading = false;
  const isError = undefined;
  const data = tvData

  let timer: NodeJS.Timer;

  let recommendationsArr:any[] = [];
  let episodes:any[] = [];
  
  if (data) {
    data.recommendations && data.recommendations.results && data.recommendations.results.slice(0,20).map((item:any) => {
      recommendationsArr.push(item)
    })

    data["season/1"] && data["season/1"].episodes.length > 0  && data["season/1"].episodes.map((episode:any) => {
      episodes.push(episode)
    })    
  }

  const fetchSeasonEpisodes = async (season_number: string, callback: (season_number:string) => void) => {
    // setIsEpisodesLoading(true)
    callback(season_number)

    // const episodes = await axios.get(`${process.env.NEXT_PUBLIC_TMDB_API_URL}tv/${props.tv_id}/season/${season_number}?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US`).then(res => res.data) 
    
    // setIsEpisodesLoading(false)
    // setEpisodes(episodes && episodes.episodes)

    console.log("fetch season episodes : ", season_number)
    
  }

  useEffect(() => {
    fadeScreen(videoIsPlayed, () => {
      router.push(`/watch/${showData.id}?mt=${showData.media_type}`)
    })
  }, [videoIsPlayed])

  useEffect(() => {
    setIsBookmarked(bookmarks.data.findIndex((show:any) => show.id === data.id) !== -1)
    setDataBookmark([...bookmarks.data])
  }, [bookmarks])

  const genres:any = [];
  if (data.genres) {
    data.genres.map((genre:any) => {
      genres.push(genre.id)
    })
  }
  const saveBookmark = (data:any) => {
    dispatch(setDataBookmarks({
      id: data.id,
      name: data.title || data.original_title,
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
    
    if (isError) return <div>Error occured while fetching TV details. Please try again.</div>

    return (
      <div className="flex flex-col items-start justify-center w-full overflow-hidden pb-[100px] -mt-[4px]" data-testid="tv_container">
        {
            isLoading && <div className="flex items-center justify-start w-full">
                <ArrowPathIcon className="w-[30px] h-[30px] animate-spin mr-2" />
                <span>Loading</span>
            </div>
        }
        {
          !isLoading && data && 
          <section className="flex flex-col items-start justify-center w-full p-0">
            
            <section className={`flex flex-1 flex-col items-start justify-center w-full border-0 relative h-[100%]
                sm:border-red-500
                md:border-blue-500
                lg:border-green-500 
                xl:border-purple-500
                2xl:border-orange-500`
              }
            >

              <div className="flex flex-col flex-1 relative items-start justify-start w-full z-[1200] border-0 p-6 pb-[100px]
                md:w-[90%] md:relative 
                lg:top-0 lg:left-0
                xl:w-[70%] ">
                
                <div className="flex items-center justify-start w-full py-4">
                    <ChevronLeftIcon className="w-[30px] h-[30px] mr-[10px] border border-btnprimary bg-btnprimary rounded-full p-1 
                    hover:cursor-pointer hover:border-white" 
                    onClick={ () => router.back() } />
                    <span>Back</span>
                </div>

                <div className="flex flex-col border-0 h-[100%] w-full
                  xl:w-[70%] xl:ml-[100px] xl:mr-[100px]">
                  
                  <div className="w-full p-4 text-[30px] font-bold">{ data.name || data.original_name }</div>
                  <div className="flex items-center justify-start p-4 text-[12px] border-0">
                    {
                      data.number_of_seasons && data.number_of_seasons > 0 && 
                        <>
                          <div className="mr-[10px] p-2 border border-green-500 text-green-500">
                            Seasons: { data.number_of_seasons }
                          </div>  
                          
                        </>

                    }
                    <Info title="" value={data.genres} />
                    <span className="mr-[10px] text-[11px]">●</span>
                    <div className="flex items-center justify-start">
                      <span className="mr-[10px]">{ Math.floor(data.vote_average) } / 10</span> 
                      <span className="mr-[10px]">-</span> 
                      <span>Votes: {data.vote_count} </span>
                    </div>
                  </div>

                  <div className="w-full p-4 text-[15px] ">{ data.overview }</div>
                  
                  <Info title="Created By" value={ data.created_by } />
                  <Info title="Cast" value={ data.credits?.cast } />
                  
                  <Info title="Audio Languages" value={data.spoken_languages} />

                  <div className="flex flex-col w-full items-center justify-start space-x-2 border-0 p-4 mt-4 space-y-2
                    sm:space-y-0 sm:space-x-2 sm:flex-row
                    lg:space-x-2">
                    {/* <CustomBtn title="Play" Icon={PlayCircleIcon} onClickHandler={() => console.log("PlayCircleIcon: ",data.id)} /> */}
                    {/* <CustomBtn title="Season" Icon={ChevronDownIcon} onClickHandler={() => console.log("Dropdown season: ",data.id)} /> */}
                    {
                      !isBookmarked ? 
                        user && user.accessToken && <CustomBtn title="Add to List" Icon={PlusCircleIcon} onClickHandler={() => 
                          saveBookmark(data)
                        } />
                      :
                        user && user.accessToken &&  <CustomBtn title="Remove from List" Icon={MinusCircleIcon} onClickHandler={() => 
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

              <div className="flex w-full h-[50px] border-0 absolute z-[1100] bg-gradient-to-t from-black -bottom-[3px]"></div> 

              <div className="image-container absolute w-full h-[100%] border-0 border-purple-500 right-0
              sm:w-[60%]
              ">       
                <div className="hidden -left-[5px] w-[100px] border-0 absolute z-[1100] h-[100%] bg-gradient-to-r from-black
                sm:flex sm:-left-[5px]
                "></div>       
                <Image 
                    src={ `${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH_ORIGINAL}${data.backdrop_path}` } 
                    layout="responsive"
                    priority={true}  
                    width={300}
                    height={169}     
                    className={`object-cover z-[1000] opacity-20 border-0 border-red-500 object-center-top
                    sm:opacity-70`}
                /> 
              </div> 

            </section>


            <section className="flex flex-col items-start justify-center px-[0px] z-[2000] border-0 w-full relative mb-[20px]">              
              <div className="flex flex-col py-6 border-0 border-red-500 w-full px-[50px]">
                <h1 className="text-[20px]">                  
                  <SelectSeason data={data} onClickHandler={fetchSeasonEpisodes} />
                </h1>

                {
                  !isEpisodesLoading ? 
                
                  <div className="flex flex-col w-full border-0 mt-[10px]" id="episodes_container">
                      {
                        episodes && episodes.length > 0 && episodes.map((episode:any, i:any) => {
                          return (
                            <EpisodeCard key={i} data={episode}  />
                          )
                        })
                      }
                  </div>
                  :
                  <div className="flex items-center justify-start w-full border-0 mt-[10px]" id="episodes_container">
                    <ArrowPathIcon className="mt-[10px] w-[40px] h-[40px] animate-spin mr-[5px]" /> 
                    <span>Loading Episodes</span>
                  </div>
                }

              </div>
            </section>

            <section className="flex flex-col px-[0px] z-[2000] border-0 w-full relative">
              <h1 className="ml-[50px] text-[20px]">Recommended TV Shows</h1>

              <Carousel 
                data={recommendationsArr} 
                user={user} 
                maxItems={ recommendationsArr.length } 
                bookmarkData={dataBookmark}
                baseWidth={290}
                target="r"
              />

            </section>
            {
              user && user.accessToken &&
                <section className="flex flex-col px-[0px] z-[2000] border-0 w-full relative mt-[50px]">
                  <h1 className="ml-[50px] text-[20px]">My List</h1>
                  
                  {
                    dataBookmark && dataBookmark.length > 0 ?
                        <Carousel 
                          data={ dataBookmark }
                          user={user} 
                          maxItems={ dataBookmark.length } 
                          bookmarkData={dataBookmark}
                          baseWidth={290}
                          target="m"
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

    const [pageIsLoading, setPageIsLoading] = useState(true);
    const user = useAppSelector<IAuthState>(selectAuth);
    const router = useRouter();

    useEffect(() => {
        setPageIsLoading(false);
      },[router.asPath]);

  
    if (pageIsLoading) return null;
   
    return (
      <Main seo={meta} showHero={false}>
        {page}   
      </Main>
    );

  };

  export const  getServerSideProps: GetServerSideProps = async (context:any) => {
    
    const tvID = context.params.id;

    return {
        props: {
            tv_id: tvID
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

  


