
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

import { useAppSelector } from "../app/hooks";
import { IAuthState } from "../ts/states/auth_state";
import { selectAuth } from "../app/store/slices/auth";
import { collection, addDoc, setDoc, doc, documentId, deleteDoc } from "firebase/firestore"; 
import { IResult } from "../components/Search/SearchResultItem/SearchResultItem";

export interface ContextState {
  setIsFullscreen: () => void,
  isFullscreen: boolean,
  setBookmark: (id:any, media_type:string, isBookmarked:boolean, callback:(id:any) => void) => void,
  ctxOnEnterHandler:(e:React.MouseEvent<HTMLElement>, callback:() => void) => void,
  ctxOnLeaveHandler:(e:React.MouseEvent<HTMLElement>, callback: (...args:any[]) => void) => void
}  

const initialState = {
  setIsFullscreen: () => {},
  isFullscreen: false,
  setBookmark: () => {},
  ctxOnEnterHandler: (e:React.MouseEvent<HTMLElement>, callback:() => void) => {},
  ctxOnLeaveHandler: (e:React.MouseEvent<HTMLElement>, callback: (...args:any[]) => void) => {}
};

const AppContext = createContext<ContextState>(initialState);

export const AppContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contextState, setContextState] = useState<ContextState>(initialState);
  const user = useAppSelector<IAuthState>(selectAuth);
  
  let timer: NodeJS.Timer;

  const setBookmark = async (
    result:IResult, 
    media_type:string, 
    isBookmarked: boolean,
    callback:(id:any) => void
  ) => {

    try {
      
      if (!isBookmarked) {
        await setDoc(doc(db, "bookmark", `${user.id}`), {
          user_id: user.id
        })
        await setDoc(doc(db, "bookmark", `${user.id}`, `${media_type}`, `${result.id}`), {
          id: result.id,
          name: result.name || result.title || result.original_name || result.original_title,
          backdrop_path: result.backdrop_path,
          poster_path: result.poster_path
        })
      } else {
        await deleteDoc(doc(db, "bookmark", `${user.id}`, `${media_type}`, `${result.id}` ));
        // console.log("ctx removing bookmark")
      }

      callback(result.id)
    } catch (e) {
      // console.error("Error adding document: ", e);
    }

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
        }, 500)
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
