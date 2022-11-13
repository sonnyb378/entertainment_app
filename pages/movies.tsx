
import Main from "../components/layout/main/Main";
import { NextPageWithLayout } from "./page";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../app/store/slices/auth";

import { IAuthState } from "../ts/states/auth_state";

const Movies: NextPageWithLayout = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        movies  
      </div> 
    );
    
  };
  
  export default Movies;
  
  
  Movies.getLayout = (page) => {
    const meta = {
      pageTitle: "Movies",
      pageDescription: "Movies - Wibix"
    }
    const [pageIsLoading, setPageIsLoading] = useState(true);
    const user = useAppSelector<IAuthState>(selectAuth);
    const router = useRouter();

    useEffect(() => {
      console.log("movies getLayout: ", user);
      if (!user || !user.accessToken) {
        router.replace("./signin");
      } else {
        setPageIsLoading(false);
      }
    });

    if (pageIsLoading) return null;
   
    return (
      <Main meta={meta} showHero={false}>
        {page}   
      </Main>
    );

  };

  


