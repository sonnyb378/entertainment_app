
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

import { useAppSelector } from "../app/hooks";
import { IAuthState } from "../ts/states/auth_state";
import { selectAuth } from "../app/store/slices/auth";
import { collection, addDoc, setDoc, doc, documentId, deleteDoc, FieldValue, arrayUnion, Unsubscribe, serverTimestamp } from "firebase/firestore"; 
import { IResult } from "../components/Search/SearchResultItem/SearchResultItem";

export interface ContextState {
  setIsFullscreen: () => void,
  isFullscreen: boolean,
  setVideoIsPlayed: (isPlay:boolean, showData:any) => void,
  videoIsPlayed: boolean;
  showData: any;
  ctxOnEnterHandler:(e:React.MouseEvent<HTMLElement>, callback:() => void) => void,
  ctxOnLeaveHandler:(e:React.MouseEvent<HTMLElement>, callback: (...args:any[]) => void) => void
}  

const initialState = {
  setIsFullscreen: () => {},
  isFullscreen: false,
  setVideoIsPlayed: (isPlay:boolean, showData:any) => {},
  videoIsPlayed: false,
  showData: {},
  ctxOnEnterHandler: (e:React.MouseEvent<HTMLElement>, callback:() => void) => {},
  ctxOnLeaveHandler: (e:React.MouseEvent<HTMLElement>, callback: (...args:any[]) => void) => {},
};

const AppContext = createContext<ContextState>(initialState);

export const AppContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contextState, setContextState] = useState<ContextState>(initialState);
  const user = useAppSelector<IAuthState>(selectAuth);
  
  let timer: NodeJS.Timer;

  const setVideoIsPlayed = (isPlay:boolean, showData:any) => {
    setContextState((prev) => {
      return {
        ...prev,
        videoIsPlayed: isPlay,
        showData: {
          id: showData.id,
          title: showData.title || showData.name || showData.original_title || showData.original_name,
          media_type: showData.media_type,
          season_number: showData.season_number,
          episode_number: showData.episode_number
        }
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
    setVideoIsPlayed,
    videoIsPlayed: contextState.videoIsPlayed,
    showData: contextState.showData,
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
