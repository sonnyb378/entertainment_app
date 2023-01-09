
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

import { useAppSelector } from "../app/hooks";
import { IAuthState } from "../ts/states/auth_state";
import { selectAuth } from "../app/store/slices/auth";
import { collection, addDoc, setDoc, doc, documentId, deleteDoc, FieldValue, arrayUnion, Unsubscribe } from "firebase/firestore"; 
import { IResult } from "../components/Search/SearchResultItem/SearchResultItem";

export interface ContextState {
  setIsFullscreen: () => void,
  isFullscreen: boolean,
  setVideoIsPlayed: (isPlay:boolean, showID:number) => void,
  videoIsPlayed: boolean;
  showID: number;
  setBookmark: (id:any, media_type:string, isBookmarked:boolean, callback:(id:any) => void) => void,
  ctxOnEnterHandler:(e:React.MouseEvent<HTMLElement>, callback:() => void) => void,
  ctxOnLeaveHandler:(e:React.MouseEvent<HTMLElement>, callback: (...args:any[]) => void) => void
}  

const initialState = {
  setIsFullscreen: () => {},
  isFullscreen: false,
  setBookmark: () => {},
  setVideoIsPlayed: (isPlay:boolean, showID:number) => {},
  videoIsPlayed: false,
  showID: 0,
  ctxOnEnterHandler: (e:React.MouseEvent<HTMLElement>, callback:() => void) => {},
  ctxOnLeaveHandler: (e:React.MouseEvent<HTMLElement>, callback: (...args:any[]) => void) => {},
};

const AppContext = createContext<ContextState>(initialState);

export const AppContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contextState, setContextState] = useState<ContextState>(initialState);
  const user = useAppSelector<IAuthState>(selectAuth);
  
  let timer: NodeJS.Timer;

  const setBookmark = async (
    result:any, 
    media_type:string, 
    isBookmarked: boolean,
    callback:(id:any) => void
  ) => {

    try {
      
      if (!isBookmarked) {

        // const genres:any = [];
        // if (result.genres) {
        //   result.genres.map((genre:any) => {
        //     genres.push(genre.id)
        //   })
        // }

        // await setDoc(doc(db, "bookmark", `${user.id}`), {
        //   user_id: user.id
        // })
        // await setDoc(doc(db, "bookmark", `${user.id}`, `${media_type}`, `${result.id}`), {
        //   id: result.id,
        //   name: result.name || result.title || result.original_name || result.original_title,
        //   backdrop_path: result.backdrop_path,
        //   poster_path: result.poster_path,
        //   media_type: media_type,
        //   genre_ids: genres.length > 0 ? genres : result.genre_ids
        // })
        callback(`adding bookmark: ${result.id}`)
      } else {
        // await deleteDoc(doc(db, "bookmark", `${user.id}`, `${media_type}`, `${result.id}` ));
        callback(`deleting bookmark: ${result.id}`)
      }

      // callback(result.id)
    } catch (e) {
      // console.error("Error adding document: ", e);
      callback(e)
    }

  }

  const setVideoIsPlayed = (isPlay:boolean, showID:number) => {
    setContextState((prev) => {
      return {
        ...prev,
        videoIsPlayed: isPlay,
        showID: showID
      }
    })
  }

  const setIsFullscreen = () => {
    setContextState((prev) => {
      return {
        ...prev,
        isFullscreen: true
      }
    })
  }

  const ctxOnEnterHandler = (e:React.MouseEvent<HTMLElement>, callback: () => void) => {
    const target = e.target as HTMLElement;
    const parent = target.closest("#thumbnail")
    if (timer) clearTimeout(timer)
    if (parent) {
        timer = setTimeout(() => {
            callback()
        }, 1000)
    }   
  }

  const ctxOnLeaveHandler = (e:React.MouseEvent<HTMLElement>, callback: (...args:any[]) => void) => {
    const target = e.target as HTMLElement;
    const parent = target.closest("#thumbnail")
    if (parent) {
        callback(timer)
    }   
  }


  const ctx = {
    setIsFullscreen,
    isFullscreen: contextState.isFullscreen,
    setBookmark,
    setVideoIsPlayed,
    videoIsPlayed: contextState.videoIsPlayed,
    showID: contextState.showID,
    ctxOnEnterHandler,
    ctxOnLeaveHandler
  }

  return (
      <AppContext.Provider value={ ctx } >        
        {children}
      </AppContext.Provider>
    )
};

export function useAppContext() {
  return useContext(AppContext);
}
