
import Main from "../components/Layout/Main/Main";
import { NextPageWithLayout } from "./page";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../app/store/slices/auth";

import { IAuthState } from "../ts/states/auth_state";
import { IUrl } from "../app/store/slices/url";
import { selectCurrentUrl } from "../app/store/slices/url";

import SearchResults from "../components/Search/SearchResults/SearchResults";

const Search: NextPageWithLayout = () => {
    const router = useRouter();
    const new_url = useAppSelector<IUrl>(selectCurrentUrl)
    
    let cont: boolean = false;
    let kw: string = "";

    if (!router.asPath.includes("/search?q=")) {
      router.push(new_url.currentUrl)
      return <></>
    } else {
      const query = router.asPath.split("?")
      kw = query[1].split("=")[1]
      if (kw) {
        cont = true;
      }
    }

    useEffect(() => {
      if (!cont) {
       router.push(new_url.currentUrl);
      }
    },[router.asPath])


    if (!cont) return null


    return (
      <div className="flex flex-col items-start justify-center w-full p-5 relative" data-testid="movies_container">
        <h2 className="text-[2rem]">Search Results: </h2>
        <h4 className="text-yellow-600 text-3xl">{ decodeURI(decodeURI(kw)) }</h4> 

        {
            kw !== "" && <SearchResults keyword={decodeURI(kw)} /> 
        }

      </div> 
    );
    
  };
  
  export default Search;
  
  
  Search.getLayout = (page) => {
    const meta = {
      title: "Search Results",
      description: "Search Results - Wibix"
    }

    const [pageIsLoading, setPageIsLoading] = useState(true);
    const user = useAppSelector<IAuthState>(selectAuth);
    const router = useRouter();

    useEffect(() => {
        // if (!user || !user.accessToken) {
        //   router.replace("/signin");
        // } else {
        //   setPageIsLoading(false);
        // }
        setPageIsLoading(false);
      },[router.asPath]);

  
    if (pageIsLoading) return null;
   
    return (
      <Main seo={meta} showHero={false}>
        {page}   
      </Main>
    );

  };


  


