
import Main from "../components/Layout/Main/Main";
import { NextPageWithLayout } from "./page";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectAuth } from "../app/store/slices/auth";
import { IAuthState } from "../ts/states/auth_state";

import { setCurrentUrl } from "../app/store/slices/url";


const TVShows: NextPageWithLayout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(setCurrentUrl({
        currentUrl: router.pathname
      }))
    },[])


    return (
      <div className="flex flex-col items-center justify-center w-full" data-testid="movies_container">
        TVShows  
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
    });

    if (pageIsLoading) return null;
   
    return (
      <Main seo={meta} showHero={false} >
        {page}   
      </Main>
    );

  };


  


