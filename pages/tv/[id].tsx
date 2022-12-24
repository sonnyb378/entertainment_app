
import Main from "../../components/Layout/Main/Main";
import { NextPageWithLayout } from "../page";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { IAuthState } from "../../ts/states/auth_state";
import { selectAuth } from "../../app/store/slices/auth";


const TV: NextPageWithLayout = (props:any) => {
    const router = useRouter();
    return (
      <div className="flex flex-col items-start justify-center w-full p-5 relative" data-testid="movie_container">
        {
            props.person_id
        }
      </div> 
    );
    
  };
  
  export default TV;
  
  
  TV.getLayout = (page) => {
    const meta = {
      title: "TV details page",
      description: "TV detail - Wibix"
    }

    const [pageIsLoading, setPageIsLoading] = useState(true);
    const user = useAppSelector<IAuthState>(selectAuth);
    const router = useRouter();

    useEffect(() => {
        setPageIsLoading(false);
      },[router.asPath]);

  
    if (pageIsLoading) return null;
   
    return (
      <Main seo={meta} showHero={false}>
        {page}   
      </Main>
    );

  };

  export function getServerSideProps(context:any) {
    // TODO: fetch TV detail
    return {
        props: {
            tv_id: context.params.id
        }
    }
  }


  


