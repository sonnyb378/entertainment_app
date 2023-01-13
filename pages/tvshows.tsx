
import Main from "../components/Layout/Main/Main";
import { NextPageWithLayout } from "./page";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectAuth } from "../app/store/slices/auth";
import { IAuthState } from "../ts/states/auth_state";

import { setCurrentUrl } from "../app/store/slices/url";
import { useAppContext } from "../context/state";
import { getRandom } from "../lib/getRandom";
import { useTVDetail } from "../lib/hooks/useTVDetail";
import Image from "next/image";
import Info from "../components/Info/Info";
import CustomBtn from "../components/Button/CustomBtn/CustomBtn";
import { ArrowPathIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { PlayCircleIcon, PlusCircleIcon, MinusCircleIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Carousel from "../components/Carousel/Carousel";
import axios from "axios";
import { GetStaticProps } from "next";
import { fake_tv_featured, fake_tv_trending } from "../model/fake_tv_trending";
import { fake_tv_popular } from "../model/fake_tv_popular";
import { fadeScreen } from "../lib/fadeScreen";
import { IBookmarkData, removeDataBookmarks, selectBookmarkData, setDataBookmarks } from "../app/store/slices/bookmarks";


const TVShows: NextPageWithLayout<{ data:any }> = ({ data }) => {
    const user = useAppSelector<IAuthState>(selectAuth);    

    const [isBookmarked, setIsBookmarked] = useState(false)
    const { videoIsPlayed, showData } = useAppContext();

    const bookmarks = useAppSelector<IBookmarkData>(selectBookmarkData);
    const [dataBookmark, setDataBookmark] = useState<any>([])

    const router = useRouter();
    const dispatch = useAppDispatch();

    const { trending, popular } = data;
    // const featured = fake_tv_featured;
    
    
    const feature_id = trending && trending[getRandom(trending.length-1)].id;
    const { tv_detail: featured, isLoading: featuredIsLoading, isError:featuredHasError } = useTVDetail(`${feature_id}`); 

    let recommendationsArr:any[] = [];  
    const genres:any = [];

    if (!featuredIsLoading) {
      featured.recommendations && featured.recommendations.results && featured.recommendations.results.slice(0,20).map((item:any) => {
        recommendationsArr.push(item)
      })

      
      if (featured.genres) {
        featured.genres.map((genre:any) => {
          genres.push(genre.id)
        })
      } else {
        genres.push([...featured.genre_ids])
      }

    }
    

    useEffect(() => {
      dispatch(setCurrentUrl({
        currentUrl: router.pathname
      }))
    },[])

    useEffect(() => {
      fadeScreen(videoIsPlayed, () => {
        router.push(`/watch/${showData.id}?mt=${showData.media_type}`)
      })
    }, [videoIsPlayed])
    
    useEffect(() => {
      if (!featuredIsLoading) {
        setIsBookmarked(bookmarks.data.findIndex((show:any) => show.id === featured.id) !== -1)
      }
      setDataBookmark([...bookmarks.data])
    }, [bookmarks])
  
   
    const saveBookmark = (data:any) => {
      dispatch(setDataBookmarks({
        id: data.id,
        name: data.title || data.name || data.original_title || data.original_name,
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

    return (
      <div className="flex flex-col items-start justify-center w-full overflow-hidden pb-[100px] -mt-[4px]" data-testid="tv_container">
        <section className="flex flex-col items-start justify-center w-full p-0">
          
          <section className={`flex flex-col items-start transition-all duraiton-200 ease-in-out justify-center w-full border-0 relative h-[100%] -mt-[0px]
                sm:border-red-500
                md:border-blue-500
                lg:border-green-500 
                xl:border-purple-500
                2xl:border-orange-500`
              }
            >
              {
                featured &&
                <>
                  <div className="image-container relative w-full border-0 border-purple-500 h-[4/6]">       
                    <Image 
                        src={ `${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH_ORIGINAL}${featured.backdrop_path}` } 
                        layout="responsive"
                        priority={true}  
                        width={300}
                        height={169}     
                        className={`object-cover z-[1000] opacity-40 border-2 border-red-500 object-center-top
                        sm:opacity-50`}
                    />
                    <div className="flex w-full h-[100px] border-0 absolute z-[1100] bg-gradient-to-t from-black via-black bottom-0
                      lg:h-[200px]
                      xl:h-[250px]
                      2xl:h-[300px]
                    "></div>
                  </div>

                  <div className="flex flex-col relative items-start transition-all duration-200 ease-in-out justify-center w-full z-[1200] border-0 p-10 h-[100%] top-0 left-0 -mt-[150px]
                      md:-mt-[300px]
                      lg:-mt-[400px]
                      xl:-mt-[500px]
                      2xl:-mt-[650px]
                  ">   
                      <div className="flex flex-col items-start justify-start border-0 pb-[0px] h-[100%] w-full">
                        
                        <div className="w-full p-4 text-[30px] font-bold">{ featured.name || featured.original_name }</div>
                        <div className="flex items-center justify-start p-4 text-[12px] border-0">
                          {
                            featured.number_of_seasons && featured.number_of_seasons > 0 && 
                              <>
                                <div className="mr-[10px] p-2 border border-green-500 text-green-500">
                                  Seasons: { featured.number_of_seasons }
                                </div>  
                                
                              </>

                          }
                          <Info title="" value={featured.genres} />
                          <span className="ml-[10px] mr-[10px] text-[11px]">●</span>
                          <div className="flex items-center justify-start">
                            <span className="mr-[10px]">{ Math.floor(featured.vote_average) } / 10</span> 
                            <span className="mr-[10px]">-</span> 
                            <span>Votes: {featured.vote_count} </span>
                          </div>
                        </div>

                        <div className="w-full p-4 text-[15px] ">{ featured.overview }</div>
                        {
                          featured.created_by && featured.created_by.length > 0 && <Info title="Created By" value={ featured.created_by } />
                        }
                        <Info title="Cast" value={ featured.credits?.cast } />
                  
                        <Info title="Audio Languages" value={featured.spoken_languages} />

                        <div className="flex flex-col w-full items-center justify-start space-x-2 border-0 p-4 mt-4 space-y-2
                          sm:space-y-0 sm:space-x-2 sm:flex-row
                          lg:space-x-2">
                          {/* <CustomBtn title="Play" Icon={PlayCircleIcon} onClickHandler={() => console.log("PlayCircleIcon: ",data.id)} /> */}
                          {/* <CustomBtn title="Season" Icon={ChevronDownIcon} onClickHandler={() => console.log("Dropdown season: ",data.id)} /> */}
                          {
                            !isBookmarked ? 
                              user && user.accessToken && <CustomBtn title="Add to List" Icon={PlusCircleIcon} onClickHandler={() => 
                                saveBookmark(featured)
                              } />
                            :
                              user && user.accessToken &&  <CustomBtn title="Remove from List" Icon={MinusCircleIcon} onClickHandler={() => 
                                deleteBookmark(featured.id)
                              } />
                          }
                          <CustomBtn title="More Info" Icon={QuestionMarkCircleIcon} onClickHandler={() => {
                            router.push(`/tv/${ featured.id}`)
                          }} />
                          <div className="flex items-center justify-start space-x-2">
                            {
                            featured.networks.map((network:any, i:any) => {
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
                            }
                          </div>

                        </div>


                      </div>
                  </div> 
                </>
                
                
              }

          </section>

          <section className="flex flex-col px-[0px] z-[2000] border-0 w-full relative mt-[50px]">
            <h1 className="ml-[50px] text-[20px]">Trending TV Shows</h1>

            <Carousel 
              data={trending} 
              user={user} 
              maxItems={trending.length} 
              bookmarkData={dataBookmark}
              baseWidth={290}
              target="t"
            />

          </section>

          <section className="flex flex-col px-[0px] z-[2000] border-0 w-full relative mt-[50px]">
            <h1 className="ml-[50px] text-[20px]">Popular TV Shows</h1>

            <Carousel 
              data={popular.slice(0,10)} 
              user={user} 
              maxItems={10} 
              bookmarkData={dataBookmark}
              baseWidth={290}
              target="p"
              isThumbnail={false}
              mediaType="tv"
            />

          </section>


          <section className="flex flex-col px-[0px] z-[1000] border-0 w-full relative mt-[50px]">
            <h1 className="ml-[50px] text-[20px]">Recommended TV Shows</h1>

            <Carousel 
              data={recommendationsArr} 
              user={user} 
              maxItems={recommendationsArr.length} 
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
      </div> 
    );
    
  };
  
  export default TVShows;
  
  
  TVShows.getLayout = (page) => {
    const meta = {
      title: "TVShows",
      description: "TVShows - Wibix"
    }
    const [pageIsLoading, setPageIsLoading] = useState(true);
    const user = useAppSelector<IAuthState>(selectAuth);
    const router = useRouter();

    useEffect(() => {
      if (!user || !user.accessToken) {
        router.replace("/signin");
      } else {
        setPageIsLoading(false);
      }
    },[router.asPath]);

    if (pageIsLoading) return null;
   
    return (
      <Main seo={meta} showHero={false} >
        {page}   
      </Main>
    );

  };

  // export const getStaticProps: GetStaticProps = async (context:any) => {
  //   return {
  //     props: {
  //       data: {
  //         trending : fake_tv_trending,
  //         popular: fake_tv_popular,
  //       }
  //     },
  //     // revalidate: 10,
  //   }  
  // }


  export const getStaticProps: GetStaticProps = async (context:any) => {
    
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

    return {
      props: {
        data: {
          trending: resTrending ? [].concat(...resTrending.results) : [],
          popular: resPopular ? [].concat(...resPopular.results) : [],
        }
      },
      // revalidate: 10,
    }

  }


  


