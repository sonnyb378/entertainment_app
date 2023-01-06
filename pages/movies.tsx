
import Main from "../components/Layout/Main/Main";
import { NextPageWithLayout } from "./page";

import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectAuth } from "../app/store/slices/auth";
import { IAuthState } from "../ts/states/auth_state";

import { setCurrentUrl } from "../app/store/slices/url";

import { GetServerSideProps, GetStaticProps } from "next";
import { IResult } from "../components/Search/SearchResultItem/SearchResultItem";
import axios from "axios";
import { getRandom } from "../lib/getRandom";
import Carousel from "../components/Carousel/Carousel";
import { useBookmark } from "../lib/hooks/useBookmark";
import { ArrowPathIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { PlayCircleIcon, PlusCircleIcon, MinusCircleIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import Info from "../components/Info/Info";
import CustomBtn from "../components/Button/CustomBtn/CustomBtn";
import { fake_trending, fake_featured } from "../model/fake_trending";
import { useMovieDetail } from "../lib/hooks/useMovieDetail";
import { movieRecommendations } from "../model/fake_detail";
import { useAppContext } from "../context/state";
import { fake_popular } from "../model/fake_popular";


const Movies: NextPageWithLayout<{ data: any }> = ({ data }) => {
    const user = useAppSelector<IAuthState>(selectAuth);    
    const [dataBookmark, setDataBookmark] = useState<any>([])
    const [isBookmarked, setIsBookmarked] = useState(false)
    const { setBookmark } = useAppContext()

    const router = useRouter();
    const dispatch = useAppDispatch();

    const { trending, popular } = data;
    
    // featured id: "555604"
    // const trending = fake_trending;
    const featured = fake_featured;
    const recommendations = movieRecommendations;
    // const popular = fake_popular;
    
    // const feature_id = trending && trending[getRandom(trending.results.length-1)].id;
    // const { movie_detail: featured, recommendations, isLoading, isError } = useMovieDetail(`${feature_id}`); 

    // const { bookmark_data, bookmarkLoading, fetchBookmarks } = useBookmark();

  let recommendationsArr:any[] = [];
  
  recommendations && recommendations.results && recommendations.results.slice(0,20).map((item:any) => {
    recommendationsArr.push(item)
  })

  const fetchBookmarks = () => {
    console.log("fake fetchBookmarks")
  }

    useEffect(() => {
      dispatch(setCurrentUrl({
        currentUrl: router.pathname
      }))
    }, [])

    // useEffect(() => {
    //   fetchBookmarks();
    // }, [])
  
    // useEffect(() => {
    //   let bookmarkArr:any[] = [];
    //   if (bookmark_data) {
    //     setIsBookmarked(bookmark_data.findIndex((movie:any) => movie.id === feature_id) !== -1)
    //     bookmark_data && bookmark_data.map((bookmark:any, i:any) => {
    //       const data = {
    //         id: bookmark.data().id,
    //         name: bookmark.data().name,
    //         media_type: bookmark.data().media_type,
    //         genre_ids: bookmark.data().genre_ids,
    //         backdrop_path: bookmark.data().backdrop_path,
    //         poster_path: bookmark.data().poster_path,
    //       }
    //       bookmarkArr.push(data)      
    //     })
    //     setDataBookmark(bookmarkArr) 
    //   }    
    // }, [bookmark_data])


    
   
    return (
      <div className="flex flex-col items-start justify-center w-full overflow-hidden pb-[100px] -mt-[4px]" data-testid="movies_container">
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
                        
                        <div className="w-full p-4 text-[30px] font-bold">{ featured.title || featured.original_title }</div>
                        <div className="flex items-center justify-start p-4 border-0">
                          <Info title="" valueFor="runtime" value={featured.runtime} />
                          <span className="ml-[10px] mr-[10px] text-[11px]">●</span>
                          <div className="flex items-start justify-start text-[12px] border-0">
                            <span className="mr-[10px]">{ Math.floor(featured.vote_average) } / 10</span> 
                            <span className="mr-[10px]">-</span> 
                            <span>Votes: {featured.vote_count} </span>
                          </div>
                        </div>

                        <div className="w-full p-4 text-[15px] ">{ featured.overview }</div>
                        
                        <Info title="Release Date" value={featured.release_date} />
                        <Info title="Country" value={featured.production_countries} />
                        <Info title="Production Company" value={featured.production_companies} />
                        <Info title="Cast" value={ featured.casts?.cast } /> 
                        <Info title="Genres" value={featured.genres} />

                        <div className="flex flex-col w-full items-center justify-start border-0 p-0 mt-4 space-y-2
                        sm:space-y-0 sm:space-x-2 sm:flex-row
                        lg:space-x-2">
                          <CustomBtn title="Play" Icon={PlayCircleIcon} onClickHandler={() => console.log("PlayCircleIcon: ",featured.id)} />
                          {
                            !isBookmarked ? 
                              user && user.accessToken && <CustomBtn title="Add to List" Icon={PlusCircleIcon} onClickHandler={() => setBookmark(data, "movie", isBookmarked, (id) => {
                                fetchBookmarks()
                              })} />
                            :
                              user && user.accessToken &&  <CustomBtn title="Remove from List" Icon={MinusCircleIcon} onClickHandler={() => setBookmark(data, "movie", isBookmarked, (id) => {
                                fetchBookmarks()
                              })} />
                          }
                          <CustomBtn title="More Info" Icon={QuestionMarkCircleIcon} onClickHandler={() => {
                            router.push(`/movie/${ featured.id}`)
                          }} />
                        </div>

                      </div>
                  </div> 
                </>
                
                
              }

            </section>

            <section className="flex flex-col px-[0px] z-[2000] border-0 w-full relative mt-[50px]">
              <h1 className="ml-[50px] text-[20px]">Trending Movies</h1>

              <Carousel 
                data={trending} 
                user={user} 
                maxItems={trending.length} 
                bookmarkData={dataBookmark}
                baseWidth={290}
                target="t"
                fetchHandler={fetchBookmarks}
              />

            </section>

            <section className="flex flex-col px-[0px] z-[2000] border-0 w-full relative mt-[50px]">
              <h1 className="ml-[50px] text-[20px]">Popular</h1>

              <Carousel 
                data={popular.slice(0,10)} 
                user={user} 
                maxItems={10} 
                bookmarkData={dataBookmark}
                baseWidth={290}
                target="p"
                fetchHandler={fetchBookmarks}
                isThumbnail={false}
                mediaType="movie"
              />

            </section>


            <section className="flex flex-col px-[0px] z-[1000] border-0 w-full relative mt-[50px]">
              <h1 className="ml-[50px] text-[20px]">Recommended Movies</h1>

              <Carousel 
                data={recommendationsArr} 
                user={user} 
                maxItems={recommendationsArr.length} 
                bookmarkData={dataBookmark}
                baseWidth={290}
                target="r"
                fetchHandler={fetchBookmarks}
              />

            </section>
            
            {
              // user && user.accessToken &&
              //   <section className="flex flex-col px-[0px] z-[2000] border-0 w-full relative mt-[50px]">
              //     <h1 className="ml-[50px] text-[20px]">My List</h1>
                  
              //     {
              //       bookmarkLoading ?
              //         <div className="flex items-center justify-start ml-[50px] mt-6 p-2">
              //           <ArrowPathIcon className="w-[30px] h-[30px] animate-spin mr-2" />
              //           <span>Loading</span>
              //         </div>
              //       :
              //       dataBookmark && dataBookmark.length > 0 ?
              //           <Carousel 
              //             data={ dataBookmark }
              //             user={user} 
              //             maxItems={ dataBookmark.length } 
              //             bookmarkData={dataBookmark}
              //             baseWidth={290}
              //             target="m"
              //             fetchHandler={fetchBookmarks}
              //           />
              //         :
              //           <div className="flex items-center justify-start ml-[50px] mt-6 p-2">No bookmarks found</div>
                        

              //     }
                  
              //   </section>
            }
            
            
          </section>

      </div> 
    );
    
  };
  
  export default Movies;
  
  
  Movies.getLayout = (page) => {
    const meta = {
      title: "Movies",
      description: "Movies - Wibix"
    }
    const [pageIsLoading, setPageIsLoading] = useState(true);
    const user = useAppSelector<IAuthState>(selectAuth);
    const router = useRouter();

    useEffect(() => {
      // console.log("movies: (useEffect)")
      if (!user || !user.accessToken) {
        router.push("/signin");
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

  export const getStaticProps: GetStaticProps = async (context:any) => {
    return {
      props: {
        data: {
          trending : fake_trending,
          featured_id: "555604",
          popular: fake_popular,
        }
      },
      // revalidate: 10,
    }  
  }

  // export const getStaticProps: GetStaticProps = async (context:any) => {
    
  //   const [reqTrending, reqPopular] = await Promise.all([
  //     await axios.get(`${process.env.NEXT_PUBLIC_TMDB_API_URL}trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}`).then(res => res.data),
  //     await axios.get(`${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US&region=US&page=1`).then(res => res.data)   
  //   ])

  //   const [resTrending, resPopular] = await Promise.all([
  //     reqTrending, reqPopular
  //   ])

  //   return {
  //     props: {
  //       data: {
  //         trending: resTrending ? [].concat(...resTrending.results) : [],
  //         popular: resPopular ? [].concat(...resPopular.results) : [],
  //       }
  //     },
  //     // revalidate: 10,
  //   }

  // }
