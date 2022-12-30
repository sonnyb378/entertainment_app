
import React, { useEffect, useState } from "react";
import Main from "../../components/Layout/Main/Main";
import { NextPageWithLayout } from "../page";
import { useRouter } from "next/router";
import { useAppSelector } from "../../app/hooks";
import { IAuthState } from "../../ts/states/auth_state";
import { selectAuth } from "../../app/store/slices/auth";
import { useMovieDetail } from "../../lib/hooks/useMovieDetail";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Info from "../../components/Info/Info";

import CustomBtn from "../../components/Button/CustomBtn/CustomBtn";
import { useAppContext } from "../../context/state";
import { PlayCircleIcon, PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import Thumbnail from "../../components/Thumbnail/Thumbnail";

import { movieData, movieRecommendations } from "../../model/fake_detail";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Carousel from "../../components/Carousel/Carousel";

const Movie: NextPageWithLayout = (props:any) => {
  const router = useRouter();
  const { setBookmark } = useAppContext()
  const user = useAppSelector<IAuthState>(selectAuth);
  const [isBookmarked, setIsBookmarked] = useState(false)
  
  
  // const { data, recommendations, isLoading, isError } = useMovieDetail(props.movie_id);    

  const isLoading = false;
  const isError = undefined;
  const data = movieData
  const recommendations = movieRecommendations;


  let recommendationsArr:any[] = [];
  let timer: NodeJS.Timer;

  recommendations && recommendations.results && recommendations.results.slice(0,18).map((item) => {
    recommendationsArr.push(item)
  })

  
  // useEffect(() => {
  //   onSnapshot(collection(db, 'bookmark', `${user.id}`, "movie"),
  //     (snapshot) => setIsBookmarked(snapshot.docs.findIndex((movie) => movie.id === props.movie_id) !== -1) )
  // }, [props.movie_id])


    if (isError) return <div>Error occured while fetching movie details. Please try again.</div>

    return (
      <div className="flex flex-col items-start justify-center w-full overflow-hidden pb-[100px]" data-testid="movie_container">
        {
            isLoading && <div className="flex items-center justify-start w-full">
                <ArrowPathIcon className="w-[30px] h-[30px] animate-spin mr-2" />
                <span>Loading</span>
            </div>
        }
        {
          !isLoading && data && <section className="flex flex-col items-start justify-center w-full p-0">
            
            <section className={`flex flex-1 flex-col items-start justify-center w-full border-0 relative h-[100%]
                sm:border-red-500
                md:border-blue-500
                lg:border-green-500 
                xl:border-purple-500
                2xl:border-orange-500`
              }
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
                  <Info title="Cast" value={ data.casts?.cast } />
                  <Info title="Genres" value={data.genres} />

                  <div className="flex flex-col w-full items-center justify-start space-x-2 border-0 p-4 mt-4 space-y-2
                  sm:space-y-0 sm:space-x-2 sm:flex-row
                  lg:space-x-2">
                    <CustomBtn title="Play" Icon={PlayCircleIcon} onClickHandler={() => console.log("PlayCircleIcon: ",data.id)} />
                    {
                      !isBookmarked ? 
                        <CustomBtn title="Add to List" Icon={PlusCircleIcon} onClickHandler={() => setBookmark(data, "movie", isBookmarked, (id) => {
                          // console.log("detail PlusCircleIcon bookmark ", id)
                        })} />
                      :
                        <CustomBtn title="Remove from List" Icon={MinusCircleIcon} onClickHandler={() => setBookmark(data, "movie", isBookmarked, (id) => {
                          // console.log("detail MinusCircleIcon bookmark ", id)
                        })} />
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
                    className={`object-cover z-[1000] opacity-20 border-0 border-red-500 object-center-top
                    sm:opacity-70`}
                /> 
              </div> 

            </section>

            <section className="flex flex-col px-[0px] z-[2000] border-0 w-full relative">
              <h1 className="ml-[50px] text-[20px]">Recommended Movies</h1>

              <Carousel data={recommendationsArr} user={user}  />

            </section>

            <section className="flex flex-col px-[50px] py-4 mt-6">
              <h1 className="text-[20px]">My List</h1>
            </section>
            
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

  export async function getServerSideProps(context:any) {
    return {
        props: {
            movie_id: context.params.id
        }
    }
  }


  

