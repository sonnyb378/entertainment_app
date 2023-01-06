
import Main from "../../components/Layout/Main/Main";
import { NextPageWithLayout } from "../page";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { IAuthState } from "../../ts/states/auth_state";
import { selectAuth } from "../../app/store/slices/auth";
import axios from "axios";
import { GetServerSideProps } from "next";

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

    console.log(props.data)

    return (
      <div className="flex flex-col items-start justify-center w-full p-5 relative" data-testid="movie_container">
        {
            props.person_id
        }
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

  export const getServerSideProps: GetServerSideProps = async (context:any) => {

    const personID = context.params.id
    
    const [reqPerson] = await Promise.all([
      await axios.get(`${process.env.NEXT_PUBLIC_TMDB_API_URL}person/${personID}?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US`).then(res => res.data),
    ])

    const [resPerson] = await Promise.all([
      reqPerson
    ])

    return {
        props: {
            person_id: context.params.id,
            data: resPerson
        }
    }
  }

  


