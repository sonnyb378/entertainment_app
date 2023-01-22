
import React, { useEffect } from "react";
import Main from "../../components/Layout/Main/Main";
import Image from "next/image";
import Info from "../../components/Info/Info";
import CustomBtn from "../../components/Button/CustomBtn/CustomBtn";
import Carousel from "../../components/Carousel/Carousel";

import { NextPageWithLayout } from "../page";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IAuthState } from "../../ts/states/auth_state";
import { selectAuth } from "../../app/store/slices/auth";
import { useMovieDetail } from "../../lib/hooks/useMovieDetail";
import { useAppContext } from "../../context/state";
import { ArrowPathIcon, PlayCircleIcon, PlusCircleIcon, MinusCircleIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { fadeScreen } from "../../lib/fadeScreen";
import { IBookmarkData, selectBookmarkData, setDataBookmarks, removeDataBookmarks } from "../../app/store/slices/bookmarks";

// import { movieData } from "../../model/fake_detail";

const Movie: NextPageWithLayout = (props:any) => {
  const user = useAppSelector<IAuthState>(selectAuth);
  const bookmarks = useAppSelector<IBookmarkData>(selectBookmarkData);
  
  const router = useRouter();

  let isBookmarked = false;

  const { setVideoIsPlayed, videoIsPlayed, showData } = useAppContext()  

  const dispatch = useAppDispatch() 

  const { movie_detail: data, isLoading, isError } = useMovieDetail(props.movie_id); 

  // const isLoading = false;
  // const isError = undefined;
  // const data = movieData

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
  
  const saveBookmark = (data:any) => {
    dispatch(setDataBookmarks({
      id: data.id,
      name: data.title || data.original_title,
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


    if (isError) return <div>Error occured while fetching movie details. Please try again.</div>

    return (
      <div className="flex flex-col items-start justify-center w-full overflow-hidden pb-[100px] -mt-[4px]" data-testid="movie_container">
        {
            isLoading && <div className="flex items-center justify-start w-full" data-testid="loading_container">
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
                data-testid="movie_info_container"
              >

                <div className="flex flex-col flex-1 relative items-start justify-start w-full z-[1200] border-0 p-6 pb-[100px]
                  md:w-[60%] md:relative 
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
                    
                    <div className="w-full p-4 text-[30px] font-bold">{ data.title || data.original_title }</div>
                    <div className="flex items-center justify-start">                    
                      <Info title="" valueFor="runtime" value={data.runtime} />
                      <span className="mr-[10px] text-[11px]">●</span>
                      <div className="flex items-center justify-start text-[12px]">
                        <span className="mr-[10px]">{ Math.floor(data.vote_average) } / 10</span> 
                        <span className="mr-[10px]">-</span> 
                        <span>Votes: {data.vote_count} </span>
                      </div>
                    </div>

                    <div className="w-full p-4 text-[15px] ">{ data.overview }</div>
                    
                    <Info title="Release Date" value={data.release_date} />
                    <Info title="Country" value={data.production_countries} />
                    <Info title="Production Company" value={data.production_companies} />
                    <Info title="Cast" value={ data.credits?.cast } />
                    <Info title="Genres" value={data.genres} />

                    <div className="flex flex-col w-full items-center justify-start space-x-2 border-0 p-4 mt-4 space-y-2
                    sm:space-y-0 sm:space-x-2 sm:flex-row
                    lg:space-x-2">
                      {
                        user && user.accessToken &&
                          <CustomBtn title="Play" Icon={PlayCircleIcon} onClickHandler={() => setVideoIsPlayed(true, {...data, media_type: "movie"})} />
                      }
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
                      alt={`${data.title}`}
                      className={`object-cover z-[1000] opacity-20 border-0 border-red-500 object-center-top
                      sm:opacity-70`}
                  /> 
                </div> 

              </section>

              {
                recommendationsArr && recommendationsArr.length > 0 &&              
                  <section className="flex flex-col px-[0px] z-[2000] border-0 w-full relative" data-testid="recommended_movies">
                    <h1 className="ml-[50px] text-[20px]">Recommended Movies</h1>

                    <Carousel 
                      data={recommendationsArr} 
                      user={user} 
                      maxItems={recommendationsArr.length} 
                      bookmarkData={[...bookmarks.data]}
                      baseWidth={290}
                      target="r"
                    />

                  </section>
              }
              {
                user && user.accessToken &&
                  <section className="flex flex-col px-[0px] z-[2000] border-0 w-full relative mt-[50px]" data-testid="bookmark_container">
                    <h1 className="ml-[50px] text-[20px]">My List</h1>
                    
                    {
                      [...bookmarks.data] && [...bookmarks.data].length > 0 ?
                          <Carousel 
                            data={ [...bookmarks.data] }
                            user={user} 
                            maxItems={ [...bookmarks.data].length } 
                            bookmarkData={ [...bookmarks.data] }
                            baseWidth={290}
                            target="b"
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

  export async function getServerSideProps(context:any) {
    return {
        props: {
            movie_id: context.params.id
        }
    }
  }


  


