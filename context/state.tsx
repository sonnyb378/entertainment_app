
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export interface ContextState {
  scrollYValue: number;
}  

const initialState = {
  scrollYValue: 0
};

const AppContext = createContext<ContextState>(initialState);

// const ctxSetters = {
//     setScrollYValue: (yValue: number) => {}
// }

// const AppContextSetters = createContext(ctxSetters);

export const AppContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contextState, setContextState] = useState<ContextState>(initialState);

  // const setScrollYValue = useCallback(() => {
  //   setContextState((prev) => {
  //       return {
  //           ...prev,
  //           scrollYValue: window.scrollY
  //       }
  //   })
  // },[contextState.scrollYValue])

  // useEffect(() => {
  //   window.addEventListener('scroll', setScrollYValue);
  // })

  // const ctxSetters = useMemo(() =>  {
  //   return {
  //     setScrollYValue
  //   }
  // }, [setScrollYValue] )

  return <AppContext.Provider value={ contextState  }>
        {/* <AppContextSetters.Provider value={ ctxSetters }> */}
            {children}
        {/* </AppContextSetters.Provider> */}
    </AppContext.Provider>;
};

export function useAppContext() {
  return useContext(AppContext);
}
// export function useAppContextSetters() {
//   return useContext(AppContextSetters);
// }
