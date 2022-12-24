
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
import useSWR from "swr";
import { fetcher } from "../../lib/hooks/fetcher";
import { Result } from "postcss";


const Movie: NextPageWithLayout = (props:any) => {
    const router = useRouter();
    
    // const { data, isLoading, isError } = useMovieDetail(props.movie_id);    

    const isLoading = false;
    const isError = undefined;

    const data = {
      "adult": false,
      "backdrop_path": "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
      "belongs_to_collection": null,
      "budget": 200000000,
      "genres": [
          {
              "id": 28,
              "name": "Action"
          },
          {
              "id": 14,
              "name": "Fantasy"
          },
          {
              "id": 878,
              "name": "Science Fiction"
          }
      ],
      "homepage": "https://www.dc.com/BlackAdam",
      "id": 436270,
      "imdb_id": "tt6443346",
      "original_language": "en",
      "original_title": "Black Adam",
      "overview": "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
      "popularity": 3060.682,
      "poster_path": "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
      "production_companies": [
          {
              "id": 12,
              "logo_path": "/iaYpEp3LQmb8AfAtmTvpqd4149c.png",
              "name": "New Line Cinema",
              "origin_country": "US"
          },
          {
              "id": 34081,
              "logo_path": null,
              "name": "Flynn Picture Company",
              "origin_country": "US"
          },
          {
              "id": 73669,
              "logo_path": "/7tmSGstK3KwgcDIuBYLTAayjit9.png",
              "name": "Seven Bucks Productions",
              "origin_country": "US"
          },
          {
              "id": 128064,
              "logo_path": "/13F3Jf7EFAcREU0xzZqJnVnyGXu.png",
              "name": "DC Films",
              "origin_country": "US"
          }
      ],
      "production_countries": [
          {
              "iso_3166_1": "US",
              "name": "United States of America"
          }
      ],
      "release_date": "2022-10-19",
      "revenue": 389000000,
      "runtime": 125,
      "spoken_languages": [
          {
              "english_name": "Arabic",
              "iso_639_1": "ar",
              "name": "العربية"
          },
          {
              "english_name": "Portuguese",
              "iso_639_1": "pt",
              "name": "Português"
          },
          {
              "english_name": "English",
              "iso_639_1": "en",
              "name": "English"
          }
      ],
      "status": "Released",
      "tagline": "The world needed a hero. It got Black Adam.",
      "title": "Black Adam",
      "video": false,
      "vote_average": 7.233,
      "vote_count": 3204
    }
    
    // console.log(data, isLoading, isError)

    if (isError) return <div>Error occured while fetching movie details. Please try again.</div>

    return (
      <div className="flex flex-col items-start justify-center w-full relative" data-testid="movie_container">
        {
            isLoading && <div className="flex items-center justify-start w-full">
                <ArrowPathIcon className="w-[30px] h-[30px] animate-spin mr-2" />
                <span>Loading</span>
            </div>
        }
        {
          !isLoading && data && <section className="flex flex-col items-start justify-center w-full p-0">
            
            <section className={`flex flex-col items-start justify-center w-full border-2 relative
               sm:border-red-500
               md:border-blue-500
               lg:border-green-500 lg:flex-row lg:justify-end
               xl:border-purple-500
               2xl:border-orange-500`
            }
            >

              <div className="flex flex-col flex-1 relative items-start justify-start w-full z-[1200] border-0 p-4 h-[100%]
              lg:w-[60%] lg:absolute lg:top-0 lg:left-0
              xl:w-[70%] ">
                <div className="w-full py-4">
                  back
                </div>
                <div className="flex flex-col border-0 
                  xl:ml-[100px] xl:mr-[100px]">
                  <div className="w-full p-4 text-[30px] font-bold">{ data.title || data.original_title }</div>
                  <div className="w-full p-4 text-[15px]">{ data.overview }</div>
                  
                  <div className="flex w-full px-4">
                    <span className="text-[12px] font-bold mr-[8px]">Release Date:</span>
                    <span className="text-[12px]">{ data.release_date }</span>
                  </div>
                  <div className="flex w-full px-4">
                    <span className="text-[12px] font-bold mr-[8px]">Country:</span>
                    <span className="text-[12px]">{ data.release_date }</span>
                  </div>
                  <div className="flex w-full px-4">
                    <span className="text-[12px] font-bold mr-[8px]">Production Company:</span>
                    <span className="text-[12px]">{ data.release_date }</span>
                  </div>
                  <div className="flex w-full px-4">
                    <span className="text-[12px] font-bold mr-[8px]">Cast:</span>
                    <span className="text-[12px]">{ data.release_date }</span>
                  </div>
                  <div className="flex w-full px-4">
                    <span className="text-[12px] font-bold mr-[8px]">Genres:</span>
                    <span className="text-[12px]">{ data.genres.map((genre, i) => {
                        return <span key={i}>{genre.name}</span>;
                    }) }</span>
                  </div>
                  
                </div>
              </div>

              <div className="hidden w-full border-0 absolute z-[1100] h-[100%] bg-gradient-to-r from-black via-black lg:flex"></div>
            
              <div className="image-container relative w-full  border-0 lg:w-[70%] lg:right-0 lg:top-0">
                <Image 
                    src={ `${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH_ORIGINAL}${data.backdrop_path}` } 
                    layout="fill"
                    priority={true}                  
                    className={`object-contain !relative !h-[unset] z-[1000]`}
                /> 
              </div> 

            </section>

            <section className="flex flex-col px-[50px] py-4">
              <h1>Recommended Movies</h1>
            </section>

            <section className="flex flex-col px-[50px] py-4">
              <h1>My List</h1>
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


  


