
import Main from "../components/Layout/Main/Main";
import { NextPageWithLayout } from "./page";

import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectAuth } from "../app/store/slices/auth";
import { IAuthState } from "../ts/states/auth_state";

import { setCurrentUrl } from "../app/store/slices/url";

import { GetStaticProps } from "next";
import { IResult } from "../components/Search/SearchResultItem/SearchResultItem";
import axios from "axios";


const Movies: NextPageWithLayout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // const { trending } = props.data;

    // console.log("trending: ", trending)

    useEffect(() => {
      dispatch(setCurrentUrl({
        currentUrl: router.pathname
      }))
    },[])

    
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
      // console.log("movies: (useEffect)")
      if (!user || !user.accessToken) {
        router.push("/signin");
      } else {
        setPageIsLoading(false);
      }
    },[router.asPath]);


    if (pageIsLoading) return null;
   
    return (
      <Main seo={meta} showHero={false} >
        {page}   
      </Main>
    );

  };

  // export const getStaticProps: GetStaticProps = async (context:any) => {
    
  //   const [reqTrending] = await Promise.all([
  //     await axios.get(`${process.env.NEXT_PUBLIC_TMDB_API_URL}trending/tv/week?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}`).then(res => res.data)   
  //   ])

  //   const [resTrending] = await Promise.all([
  //     reqTrending
  //   ])

      // TODO: get first 10
      // TODO: for featured, random pick from entire list

  //   return {
  //     props: {
  //       data: {
  //         featured: {},
  //         trending: resTrending ? [].concat(...resTrending.results) : [],
  //         popular: [],
  //         bookmark: []  
  //       }
  //     },
  //     revalidate: 10,
  //   }

  // }
