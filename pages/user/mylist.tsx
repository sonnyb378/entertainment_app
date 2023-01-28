
import React, { useEffect, useState } from "react";
import Main from "../../components/Layout/Main/Main";
import Thumbnail from "../../components/Thumbnail/Thumbnail";

import { NextPageWithLayout } from "../page";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setCurrentUrl } from "../../app/store/slices/url";
import { useAppContext } from "../../context/state";
import { fadeScreen } from "../../lib/fadeScreen";
import { IBookmarkData, selectBookmarkData } from "../../app/store/slices/bookmarks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { parseCookies } from "nookies"

// import nookies from "nookies";
// import { selectAuth } from "../../app/store/slices/auth";
// import { IAuthState } from "../../ts/states/auth_state";
// import { GetServerSideProps } from "next";

const MyList: NextPageWithLayout = () => {
    // const user = useAppSelector<IAuthState>(selectAuth);  
    // const {user, userLoading} = useUserStatus()
    const [isRedirecting, setIsRedirecting] = useState(false)
    const router = useRouter();
    const bookmarks = useAppSelector<IBookmarkData>(selectBookmarkData);

    const [user, loading] = useAuthState(auth);
    
    const { videoIsPlayed, showData } = useAppContext();
    
    const dispatch = useAppDispatch();
    
    const cookies = parseCookies();

    useEffect(() => {
      if (isRedirecting) {
        return;
      }
      if (!loading && !user && !cookies.token) {
        router.replace("/signin")
        setIsRedirecting(true)
      }
    }, [user])

    useEffect(() => {
      dispatch(setCurrentUrl({
        currentUrl: router.pathname
      }))
    },[router.pathname, dispatch])

    useEffect(() => {
      fadeScreen(videoIsPlayed, () => {
        router.push(`/watch/${showData.id}?mt=${showData.media_type}`)
      })
    }, [videoIsPlayed, showData.id, showData.media_type])

    return (
      <div className="flex flex-col items-start justify-center w-[90%] p-5 relative" data-testid="mylist_container">
        <h1 className="text-[30px] text-bold">My List</h1>
          {
          
                bookmarks.data && bookmarks.data.length > 0 ?            
                  <ul 
                      className="flex flex-wrap items-start justify-start border-0 mt-4 w-full relative" 
                      data-testid="results_item_container" 
                      id="results_item_container"
                  > 
                    {
                      bookmarks.data.map((result:any, i:any) => {
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
                                user={user} result={result} bookmarkData={bookmarks.data}
                            />                                                 
                        </li>  
                      })
                    }
                  </ul>
          
                :
                  <div className="flex items-center justify-start ml-[50px] mt-6 p-2">No bookmarks found</div>
            
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

  


