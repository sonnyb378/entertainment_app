
import React, { useEffect, useState } from "react";
import Main from "../components/Layout/Main/Main";
import dynamic from "next/dynamic";
import Spinner from "../components/Spinner/Spinner";

import { NextPageWithLayout } from "./page";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hooks";
import { IUrl } from "../app/store/slices/url";
import { selectCurrentUrl } from "../app/store/slices/url";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { parseCookies } from "nookies";

const SearchResults = dynamic(() => import("../components/Search/SearchResults/SearchResults"), {
  loading: () => <Spinner />
})

// import nookies from "nookies";
// import { GetServerSideProps } from "next";

const Search: NextPageWithLayout = () => {

    const [isRedirecting, setIsRedirecting] = useState(false);
    const new_url = useAppSelector<IUrl>(selectCurrentUrl)

    const [user, loading] = useAuthState(auth);

    const router = useRouter();
    
    let cont: boolean = false;
    let kw: string = "";

    const cookies = parseCookies()

    useEffect(() => {
      if (isRedirecting) {
        return;
      }
      if (!loading && !user && !cookies.token) {
        router.replace("/signin")
        setIsRedirecting(true)
      }
    }, [user])

    if (user) {
      if (!router.asPath.includes("/search?q=")) {
        router.push(new_url.currentUrl)
      } else {
        const query = router.asPath.split("?")
        kw = query[1].split("=")[1]
        if (kw) {
          cont = true;
        }
      }
    }
    
    useEffect(() => {
      if (!cont) {
        if (user) {
          router.push(new_url.currentUrl, undefined, { shallow: true});
        } 
      }     
    }, [cont])


    if (!cont) return null


    return (
      <div className="flex flex-col items-start justify-center w-full p-5 relative" data-testid="search_container">
        <h2 className="text-[2rem]">Search Results: </h2>
        <h4 className="text-yellow-600 text-[38px] leading-none
        sm:text-[50px]">{ decodeURI(decodeURI(kw)) }</h4> 

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


  // export const getServerSideProps: GetServerSideProps = async (context:any) => {

  //   const cookies = nookies.get(context)

  //   if (!cookies.token) {
  //     return {
  //       redirect: {
  //         destination: '/signin',
  //         permanent: false,
  //       },
  //     }
  //   } else {
  //     return {
  //       props: {}
  //     }
  //   }

   

  // }


