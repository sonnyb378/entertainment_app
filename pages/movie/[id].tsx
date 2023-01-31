
import React, { useEffect, useState } from "react";
import Main from "../../components/Layout/Main/Main";
import dynamic from "next/dynamic";
import Image from "next/image";
import Info from "../../components/Info/Info";
import Spinner from "../../components/Spinner/Spinner";
import CustomBtn from "../../components/Button/CustomBtn/CustomBtn";

import { NextPageWithLayout } from "../page";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useMovieDetail } from "../../lib/hooks/useMovieDetail";
import { useAppContext } from "../../context/state";
import { ArrowPathIcon, PlayCircleIcon, PlusCircleIcon, MinusCircleIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { fadeScreen } from "../../lib/fadeScreen";
import { IBookmarkData, selectBookmarkData, setDataBookmarks, removeDataBookmarks } from "../../app/store/slices/bookmarks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import nookies, { parseCookies } from "nookies"
import axios from "axios";
import { GetStaticPaths } from "next";

// import { IAuthState } from "../../ts/states/auth_state";
// import { selectAuth } from "../../app/store/slices/auth";
// import { movieData } from "../../model/fake_detail";

const Carousel = dynamic(() => import("../../components/Carousel/Carousel"), {
  loading: () => <Spinner />
})

const Movie: NextPageWithLayout<{data:any}> = ({data}) => {
  const router = useRouter();
  const dispatch = useAppDispatch() 
  const bookmarks = useAppSelector<IBookmarkData>(selectBookmarkData);
  const [user, loading] = useAuthState(auth);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [screenWidth, setScreenWidth] = useState(360)
  const cookies = parseCookies();
  
  let isBookmarked = false;
  let recommendationsArr:any[] = [];
  
  const { setVideoIsPlayed, videoIsPlayed, showData } = useAppContext()  
  // const { movie_detail: data, isLoading, isError } = useMovieDetail(props.movie_id); 

  // const { data } = props;

  // const isLoading = false;
  // const isError = undefined;
  // const data = movieData

  useEffect(() => {
    if (isRedirecting) {
      return;
    }
    if (!loading && !user && !cookies.token) {
      router.replace("/signin")
      setIsRedirecting(true)
    }
  }, [user])


  if (data) {
    data.recommendations && data.recommendations.results && data.recommendations.results.slice(0,20).map((item:any) => {
      recommendationsArr.push(item)
    })

    if (bookmarks) {
      isBookmarked = bookmarks.data.findIndex((show:any) => show.id === data.id) !== -1
    }
  }

  useEffect(() => {
    fadeScreen(videoIsPlayed, () => {
      router.push(`/watch/${showData.id}?mt=${showData.media_type}`)
    })
  }, [videoIsPlayed, router, showData.id, showData.media_type])

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
      media_type: "movie",
      genre_ids: genres,
    }))    
  }

  const deleteBookmark = (showID:number) => {
    dispatch(
      removeDataBookmarks({ id: showID })
    )
  }

    // if (isError) return <div>Error occured while fetching movie details. Please try again.</div>

    return (
      <div className="flex flex-col items-start justify-center w-full overflow-hidden pb-[100px] -mt-[4px]" data-testid="movie_container">
        {
            // isLoading && <div className="flex items-center justify-start w-full" data-testid="loading_container">
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
                data-testid="movie_info_container"
              >
                
                <div className="flex items-center justify-start w-full absolute top-0 left-0 z-[2000] p-2
                sm:p-10
                ">
                    <ChevronLeftIcon className="w-[30px] h-[30px] mr-[10px] border border-btnprimary bg-btnprimary rounded-full p-1 
                    hover:cursor-pointer hover:border-white" 
                    onClick={ () => router.back() } />
                    <span>Back</span>
                </div>

                <div className="image-container relative w-full border-0 border-purple-500 h-[4/6]" data-testid="featured_backdrop"> 
                  <Image 
                      src={ `${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH_ORIGINAL}${data.backdrop_path}` } 
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
                    
                    <div className="w-full p-0 text-[40px] font-bold text-center leading-none mt-[50px]
                        sm:text-center sm:text-[50px]
                        md:text-left">{ data.title || data.original_title }</div>
                    <div className="flex flex-row items-center justify-center p-4 text-[12px] border-0 w-full space-y-0
                      md:flex-row md:space-y-0 md:justify-start md:py-4 md:px-0">                                          
                      <Info title="" valueFor="runtime" value={data.runtime} />
                      <span className="hidden ml-[10px] mr-[10px] text-[11px] md:flex">●</span>
                      <div className="flex items-center justify-start text-[12px]">
                        <span className="mr-[10px]">{ Math.floor(data.vote_average) } / 10</span> 
                        <span className="mr-[10px]">-</span> 
                        <span>Votes: {data.vote_count} </span>
                      </div>
                    </div>

                    <div className="w-full p-0 text-[15px] line-clamp-3 mb-[20px]
                        sm:text-left
                        md:mb-[5px]
                      ">{ data.overview }</div>
                    
                    <div className={`w-full mt-[15px]`}>
                      <Info title="Release Date" value={data.release_date} />
                      <Info title="Country" value={data.production_countries} />
                      <Info title="Production Company" value={data.production_companies} />
                      <Info title="Cast" value={ data.credits?.cast } />
                      <Info title="Genres" value={data.genres} />
                    </div>

                    <div className="flex flex-col w-full items-center justify-start border-0 p-0 mt-4 space-y-2
                        sm:space-y-0 sm:space-x-2 sm:flex-row
                        lg:space-x-2">
                      {
                        user &&
                          <CustomBtn title="Play" Icon={PlayCircleIcon} onClickHandler={() => setVideoIsPlayed(true, {...data, media_type: "movie"})} />
                      }
                      {

                        !isBookmarked ? 
                          user && <CustomBtn title="Add to List" Icon={PlusCircleIcon} onClickHandler={() => 
                            saveBookmark(data)                          
                        } />
                        :
                          user  &&  <CustomBtn title="Remove from List" Icon={MinusCircleIcon} onClickHandler={() => 
                            deleteBookmark(data.id)
                          } />

                      }
                    </div>
                  </div>
                </div>

              

              </section>

              {
                recommendationsArr && recommendationsArr.length > 0 &&              
                  <section className="flex flex-col px-[0px] z-[2000] border-0 w-full relative" data-testid="recommended_movies">
                    <h1 className={`${ screenWidth <= 500 ? " ml-[10px]" : " ml-[50px]" } text-[20px]`}>Recommended Movies</h1>

                    <Carousel 
                      data={recommendationsArr} 
                      user={user} 
                      maxItems={recommendationsArr.length} 
                      bookmarkData={[...bookmarks.data]}
                      baseWidth={screenWidth > 600 ? 290 : 224 }
                      target="r"
                      screenWidth={screenWidth}
                    />

                  </section>
              }
              {
                user &&
                  <section className="flex flex-col px-[0px] z-[2000] border-0 w-full relative mt-[50px]" data-testid="bookmark_container">
                    <h1 className={`${ screenWidth <= 500 ? " ml-[10px]" : " ml-[50px]" } text-[20px]`}>My List</h1>
                    
                    {
                      [...bookmarks.data] && [...bookmarks.data].length > 0 ?
                          <Carousel 
                            data={ [...bookmarks.data] }
                            user={user} 
                            maxItems={ [...bookmarks.data].length } 
                            bookmarkData={ [...bookmarks.data] }
                            baseWidth={screenWidth > 600 ? 290 : 224 }
                            target="b"
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
  
  export default Movie;
  
  
  Movie.getLayout = (page) => {
    const meta = {
      title: "Movie detail page",
      description: "Movie details page - Wibix"
    }
   
    return (
      <Main seo={meta} showHero={false}>
        {page}   
      </Main>
    );

  };


  export const getStaticPaths: GetStaticPaths = async () => {

    const [reqTrending] = await Promise.all([
      await axios.get(`${process.env.NEXT_PUBLIC_TMDB_API_URL}trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}`,{
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
      }).then(res => res.data)
    ])
    const [resTrending] = await Promise.all([
      reqTrending
    ])

    const paths = resTrending.results.map((movie: any) => ({
      params: { id: movie.id.toString() },
    }))

    return {
      paths,
      fallback: "blocking"
    }
  }

  export async function getStaticProps(context:any) {

    const movie_id = context.params.id;

    const [reqMovie] = await Promise.all([
      await axios.get(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/${movie_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US&append_to_response=recommendations,credits`,
        {
          headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        }
        ).then(res => res.data),
    ])

    const [resMovie] = await Promise.all([
      reqMovie
    ])

    return {
      props: {
          data: resMovie
      }
    }
  }


  


