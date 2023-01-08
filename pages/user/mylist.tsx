
import Main from "../../components/Layout/Main/Main";
import { NextPageWithLayout } from "../page";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAuth } from "../../app/store/slices/auth";
import { IAuthState } from "../../ts/states/auth_state";

import { setCurrentUrl } from "../../app/store/slices/url";
import Thumbnail from "../../components/Thumbnail/Thumbnail";
import { useAppContext } from "../../context/state";
import { useBookmark } from "../../lib/hooks/useBookmark";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import SearchResultItem from "../../components/Search/SearchResultItem/SearchResultItem";

const MyList: NextPageWithLayout = () => {
    const user = useAppSelector<IAuthState>(selectAuth);  
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [dataBookmark, setDataBookmark] = useState<any>([])

    const { bookmark_data, bookmarkLoading, fetchBookmarks } = useBookmark();

    useEffect(() => {
      fetchBookmarks();
    }, [])
  

    useEffect(() => {
      dispatch(setCurrentUrl({
        currentUrl: router.pathname
      }))
    },[])

    useEffect(() => {
      let bookmarkArr:any[] = [];
      if (bookmark_data) {
        bookmark_data && bookmark_data.map((bookmark:any, i:any) => {
          const data = {
            id: bookmark.data().id,
            name: bookmark.data().name,
            media_type: bookmark.data().media_type,
            genre_ids: bookmark.data().genre_ids,
            backdrop_path: bookmark.data().backdrop_path,
            poster_path: bookmark.data().poster_path,
          }
          bookmarkArr.push(data)      
        })
        setDataBookmark(bookmarkArr) 
      }    
    }, [bookmark_data])

    // console.log("dataBookmark: ", dataBookmark, bookmarkLoading)
 
    return (
      <div className="flex flex-col items-start justify-center w-[90%] p-5 relative" data-testid="mylist_container">
        <h1 className="text-[30px] text-bold">My List</h1>
        {
          bookmarkLoading ?
            <div className="flex items-center justify-start ml-[50px] mt-6 p-2">
              <ArrowPathIcon className="w-[30px] h-[30px] animate-spin mr-2" />
              <span>Loading</span>
            </div>
          :
            <ul 
                className="flex flex-wrap items-start justify-start border-0 mt-4 w-full relative" 
                data-testid="results_item_container" 
                id="results_item_container"
            >           
             {
                dataBookmark && dataBookmark.length > 0 ?
                  dataBookmark.map((result:any, i:any) => {
                    return <li key={i} className="flex flex-col items-center justify-center cursor-pointer relative transition-all duration-100 p-0.5 border-0 w-6/12
                        sm:w-6/12 sm:border-red-500
                        md:w-4/12 md:border-blue-500
                        lg:w-3/12 lg:border-green-500
                        xl:w-3/12 xl:border-purple-500
                        2xl:w-2/12 2xl:border-orange-500"
                        id={`thumbnail_container`}
                        data-testid="thumbnail_container"            
                    >
                        <Thumbnail 
                            user={user} result={result} bookmarkData={dataBookmark} fetchHandler={fetchBookmarks}
                        />                                                 
                    </li>  
                  })
                :
                  <div className="flex items-center justify-start ml-[50px] mt-6 p-2">No bookmarks found</div>
              }
            </ul> 
            
        }
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
      if (!user || !user.accessToken) {
        router.replace("/signin");
      } else {
        setPageIsLoading(false);
      }
    },[router.asPath]);

    if (pageIsLoading) return null;
   
    return (
      <Main seo={meta} showHero={false}>
        {page}   
      </Main>
    );

  };

  


