
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export interface ContextState {
  keyword: string;
  setKeyword: (keyword: string) => void
}  

const initialState = {
  keyword: "",
  setKeyword: () => {}
};

const AppContext = createContext<ContextState>(initialState);

export const AppContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contextState, setContextState] = useState<ContextState>(initialState);

  // const setKeyword = (keyword: string) => {
  //   console.log("called");
  //   setContextState((prev) => {
  //       return {
  //           ...prev,
  //           keyword: keyword
  //       }
  //   })
  // }

  const setKeyword = () => {}

  const ctx = {
    keyword: contextState.keyword,
    setKeyword
  }

  return (
      <AppContext.Provider value={ ctx  } >        
        {children}
      </AppContext.Provider>
    )
};

export function useAppContext() {
  return useContext(AppContext);
}
