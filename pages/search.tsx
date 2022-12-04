
import Main from "../components/Layout/Main/Main";
import { NextPageWithLayout } from "./page";

import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../app/store/slices/auth";

import { IAuthState } from "../ts/states/auth_state";


const Search: NextPageWithLayout = () => {
    const router = useRouter();
    const search = document.getElementById("search") as HTMLInputElement

    useEffect(() => {
        if (search.value === "") router.replace("/movies")
    },[])

    return (
      <div className="flex flex-col items-start justify-center w-full p-5" data-testid="movies_container">
        <h2 className="text-[2rem]">Search Results: </h2>
        <div></div> 
      </div> 
    );
    
  };
  
  export default Search;
  
  
  Search.getLayout = (page) => {
    const meta = {
      title: "Search Movies and TV Shows",
      description: "Search for Movies and TV Shows - Wibix"
    }
    const [pageIsLoading, setPageIsLoading] = useState(true);
    const user = useAppSelector<IAuthState>(selectAuth);
    const router = useRouter();

    useEffect(() => {
        if (!user || !user.accessToken) router.replace("/signin");
        setPageIsLoading(false);      
    });

    if (pageIsLoading) return null;
   
    return (
      <Main seo={meta} showHero={false}>
        {page}   
      </Main>
    );

  };

  


