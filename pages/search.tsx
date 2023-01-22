
import React, { useEffect } from "react";
import Main from "../components/Layout/Main/Main";
import dynamic from "next/dynamic";
import Spinner from "../components/Spinner/Spinner";
// import SearchResults from "../components/Search/SearchResults/SearchResults";

const SearchResults = dynamic(() => import("../components/Search/SearchResults/SearchResults"), {
  loading: () => <Spinner />
})

import { NextPageWithLayout } from "./page";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../app/store/slices/auth";
import { IAuthState } from "../ts/states/auth_state";
import { IUrl } from "../app/store/slices/url";
import { selectCurrentUrl } from "../app/store/slices/url";


const Search: NextPageWithLayout = () => {
    const user = useAppSelector<IAuthState>(selectAuth);    
    const new_url = useAppSelector<IUrl>(selectCurrentUrl)

    const router = useRouter();
    
    let cont: boolean = false;
    let kw: string = "";

    if (!router.asPath.includes("/search?q=")) {
      router.push(new_url.currentUrl)
      // return <></>
    } else {
      const query = router.asPath.split("?")

      kw = query[1].split("=")[1]
      if (kw) {
        cont = true;
      }
    }

    useEffect(() => {
      if (!user || !user.accessToken) {
        router.push("/signin");
      } else if (!cont) {
        router.push(new_url.currentUrl);
      }
    }, [router, new_url.currentUrl, cont, user])

    // useEffect(() => {
    //   if (!user || !user.accessToken) {
    //     router.push("/signin");
    //   }
    // }, [router, user])



    if (!cont) return null


    return (
      <div className="flex flex-col items-start justify-center w-full p-5 relative" data-testid="search_container">
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

   
    return (
      <Main seo={meta} showHero={false}>
        {page}   
      </Main>
    );

  };


  


