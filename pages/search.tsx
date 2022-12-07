
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
    const [hasSearch, setHasSearch] = useState(true)
    const new_url = useAppSelector<IUrl>(selectCurrentUrl)
    
    const [queryString, setQueryString] = useState("")
    
    useEffect(() => {
      if (router.asPath.includes("/search?q=")) {
        const query = router.asPath.split("?")
        const kw = query[1].split("=")[1]
        if (kw === "") {
            setQueryString("")
            router.replace(new_url.currentUrl)
        } else {
            setQueryString(kw)      
            setHasSearch(false)
        }       
      } else {
        setQueryString("")
        router.replace(new_url.currentUrl)
      }

    },[router.asPath])


    if (hasSearch) return null

    return (
      <div className="flex flex-col items-center justify-center w-full" data-testid="movies_container">
        {
            queryString !== "" ?
            <SearchResults keyword={decodeURI(queryString)} /> 
            :
            "No Results Found!"
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


  


