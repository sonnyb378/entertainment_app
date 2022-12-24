
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export interface ContextState {
  setBookmark: (id:any, callback:(id:any) => void) => void
}  

const initialState = {
  setBookmark: () => {}
};

const AppContext = createContext<ContextState>(initialState);

export const AppContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contextState, setContextState] = useState<ContextState>(initialState);

  // TODO: bookmark send to firestore
  const setBookmark = (id:any, callback:(id:any) => void) => {
    callback(id)
  }

  const ctx = {
    setBookmark
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
