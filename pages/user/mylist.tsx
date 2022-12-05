
import Main from "../../components/Layout/Main/Main";
import { NextPageWithLayout } from "../page";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../app/store/slices/auth";

import { IAuthState } from "../../ts/states/auth_state";

import SearchResults from "../../components/Search/SearchResults/SearchResults";

const MyList: NextPageWithLayout = () => {
    const router = useRouter();

    if (router.asPath.includes("/search")) return <SearchResults />

    return (
      <div className="flex flex-col items-center justify-center w-full" data-testid="mylist_container">
        my list  
      </div> 
    );
    
  };
  
  export default MyList;
  
  
  MyList.getLayout = (page) => {
    const meta = {
      title: "Bookmarked Movies, TV Shows",
      description: "Movies - Wibix"
    }
    const [pageIsLoading, setPageIsLoading] = useState(true);
    const user = useAppSelector<IAuthState>(selectAuth);
    const router = useRouter();

    useEffect(() => {
      // console.log("movies getLayout: ", user);
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

  


