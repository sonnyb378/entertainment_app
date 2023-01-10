
import Main from "../../components/Layout/Main/Main";
import { NextPageWithLayout } from "../page";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { IAuthState } from "../../ts/states/auth_state";
import { selectAuth } from "../../app/store/slices/auth";
import axios from "axios";
import { GetServerSideProps } from "next";
import { fake_person_popular, fake_person_popular2 } from "../../model/fake_person_popular";
import Image from "next/image"
import PersonInfo from "../../components/Info/PersonInfo";
import Carousel from "../../components/Carousel/Carousel";
import { useAppContext } from "../../context/state";
import { fadeScreen } from "../../lib/fadeScreen";
import { IBookmarkData, selectBookmarkData } from "../../app/store/slices/bookmarks";

export interface IPerson {
	"adult": boolean,
	"also_known_as": any[],
	"biography": string,
  "birthday": string,
	"deathday": string|null,
	"gender": number,
	"homepage": string,
	"id": string|number,
	"imdb_id": string,
	"known_for_department": string,
	"name": string,
	"place_of_birth": string,
	"popularity": string|number,
	"profile_path": string
}

const Person: NextPageWithLayout = (props:any) => {
    const router = useRouter();
    const user = useAppSelector<IAuthState>(selectAuth); 
    const { videoIsPlayed, showData } = useAppContext(); 
    const bookmarks = useAppSelector<IBookmarkData>(selectBookmarkData);

    const { data } = props;

    let movies: any = []
    let tvshows: any = []
    let tvResult: any = []
    let movieResult: any = []

    if (data) {
      
      movies = data.combined_credits.cast.filter((item:any) => {
        return item.popularity > 50 && item.backdrop_path !== null && item.media_type === "movie"   
      })
      movies.filter((item:any) => {
        var i = movieResult.findIndex((x:any) => (x.id == item.id));
        if (i <= -1) {
          movieResult.push(item);
        }
        return null;
      })


      tvshows = data.combined_credits.cast.filter((item:any) => {
        return item.popularity > 50 && item.backdrop_path !== null && item.media_type === "tv" && item.episode_count > 0  && !item.character.includes("Self")  
      })

      tvshows.filter((item:any) => {
        var i = tvResult.findIndex((x:any) => (x.id == item.id));
        if(i <= -1){
          tvResult.push(item);
        }
        return null;
      })
    }

    
    useEffect(() => {
      fadeScreen(videoIsPlayed, () => {
        router.push("/watch/"+showData.id)
      })
    }, [videoIsPlayed])


    
    return (
      <div className="flex items-start justify-center w-full p-0 relative border-0 px-4
        sm:border-red-500 
        md:border-blue-500 
        lg:border-green-500 
        xl:border-purple-500
        2xl:border-orange-500
      " data-testid="person_container">
        
        <div className="flex flex-1 items-start justify-start w-full space-x-[20px] h-[100%] p-4">

          <div className="flex flex-col items-start justify-start min-w-[300px] h-[100%] border-0 border-red-500">

            <div className="image-container relative border-0 rounded-md overflow-hidden w-full">
              <Image 
                src={ `${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH}${data.profile_path}` }
                layout="fill"
                alt={`${data.name}`}
                className="object-cover !relative !h-[unset] object-top-left"
              />
            </div>

            <div className="w-full mt-[20px]">
              <h1 className="font-bold text-[20px]">Personal Info</h1>
              
              <PersonInfo title="Known For" separator=":" value={data.known_for_department} />
              <PersonInfo title="Gender" separator=":" value={data.gender} />
              <PersonInfo title="Birthday" separator=":" value={data.birthday} />
              <PersonInfo title="Place of Birth" separator=":" value={data.place_of_birth} />
              <PersonInfo title="Also Known As" separator=":" value={data.also_known_as} />

            </div>
          </div>

          <div className="flex flex-1 flex-col items-start justify-start border-0 overflow-hidden w-full border-blue-500">
            <h1 className="text-[40px] text-white">{ data.name }</h1>
            
            <div className="mt-[30px] mb-[50px]">
              <span className={`text-[20px] font-bold`}>Biography</span>
              <p className="mt-[15px]">{ data.biography }</p>
            </div>
            
            {
              movieResult && movieResult.length > 0 &&
                <div className="flex flex-col items-start justify-center w-full">
                    <span className={`text-[20px] font-bold`}>Movies</span>
                    <div className="flex flex-col px-[0px] z-[2000] border-0 w-full relative pb-[50px]">
                      <Carousel 
                        data={movieResult} 
                        user={user} 
                        maxItems={movieResult.length} 
                        bookmarkData={bookmarks.data}
                        baseWidth={290}
                        target="movie"
                      />
                    </div>
                </div>
            }
            

            {
              tvResult && tvResult.length > 0 &&
                <div className="flex flex-col items-start justify-center w-full border-0 pb-[50px] ">
                    <span className={`text-[20px] font-bold`}>TV Shows</span>
                    <div className="flex flex-col px-[0px] z-[2000] border-0 w-full relative">
                      <Carousel 
                        data={tvResult} 
                        user={user} 
                        maxItems={tvResult.length} 
                        bookmarkData={bookmarks.data}
                        baseWidth={290}
                        target="tv"
                      />
                    </div>
                </div>        
            }
            


          </div>

        </div>
        

      </div> 
    );
    
  };
  
  export default Person;
  
  
  Person.getLayout = (page) => {
    const meta = {
      title: "Person detail page",
      description: "Person's detail - Wibix"
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

    const personID = context.params.id
    
    const [reqPerson] = await Promise.all([
      await axios.get(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}person/${personID}?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US&append_to_response=combined_credits`,
        {
          headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        }
        ).then(res => res.data),
    ])

    const [resPerson] = await Promise.all([
      reqPerson
    ])

    return {
        props: {
            person_id: personID,
            data: resPerson //fake_person_popular
        }
    }
  }

  


