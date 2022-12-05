
import Main from "../components/Layout/Main/Main";
import { NextPageWithLayout } from "./page";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../app/store/slices/auth";

import { IAuthState } from "../ts/states/auth_state";

import SearchResults from "../components/Search/SearchResults/SearchResults";


const Movies: NextPageWithLayout = () => {
  const router = useRouter();

  // console.log("movies page: ", router.pathname, router.asPath, router.asPath.split("?"))

    if (router.asPath.includes("/search")) return <SearchResults />

    return (
      <div className="flex flex-col items-center justify-center w-full" data-testid="movies_container">
        movies  
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
      if (!user || !user.accessToken) {
        router.replace("/signin");
      } else {
        setPageIsLoading(false);
      }
    });

    if (pageIsLoading) return null;
   
    return (
      <Main seo={meta} showHero={false}>
        {page}   
      </Main>
    );

  };

  


