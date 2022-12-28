
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

import { collection, addDoc } from "firebase/firestore"; 
import { useAppSelector } from "../app/hooks";
import { IAuthState } from "../ts/states/auth_state";
import { selectAuth } from "../app/store/slices/auth";

export interface ContextState {
  setBookmark: (id:any, callback:(id:any) => void) => void
  setIsFullscreen: () => void,
  isFullscreen: boolean,
  ctxOnEnterHandler:(e:React.MouseEvent<HTMLElement>, callback:() => void) => void,
  ctxOnLeaveHandler:(e:React.MouseEvent<HTMLElement>, callback: (...args:any[]) => void) => void
}  

const initialState = {
  setBookmark: () => {},
  setIsFullscreen: () => {},
  isFullscreen: false,
  ctxOnEnterHandler: (e:React.MouseEvent<HTMLElement>, callback:() => void) => {},
  ctxOnLeaveHandler: (e:React.MouseEvent<HTMLElement>, callback: (...args:any[]) => void) => {}
};

const AppContext = createContext<ContextState>(initialState);

export const AppContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contextState, setContextState] = useState<ContextState>(initialState);
  const user = useAppSelector<IAuthState>(selectAuth);
  
  let timer: NodeJS.Timer;

  // TODO: bookmark send to firestore

  const setBookmark = (id:any, callback:(id:any) => void) => {
    // console.log("context: ", user.accessToken);
    callback(id)
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
    setBookmark,
    setIsFullscreen,
    isFullscreen: contextState.isFullscreen,
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
