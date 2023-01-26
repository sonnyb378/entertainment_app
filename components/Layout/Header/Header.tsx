import React, { useEffect, useState, useCallback } from "react";
import styles from "./Header.module.css";
import Logo from "../../Logo/Logo";
import SigninBtn from "../../Button/SignIn/SigninBtn";
import Navigation from "../../Navigation/Navigation";
import Avatar from "../../Avatar/Avatar"
import SearchField from "../../Search/SearchField/SearchField"

import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { useAppDispatch } from "../../../app/hooks";
// import { IAuthState } from "../../../ts/states/auth_state";
// import { selectAuth, setAuthData } from "../../../app/store/slices/auth";
// import { useAppDispatch } from "../../../app/hooks";

export interface IHeader {
    children?: React.ReactNode;
}

const Header: React.FC<IHeader> = ({ children }) => {
    const [user] = useAuthState(auth);
    const [yValue, setYValue] = useState(0);
    const router = useRouter();
    const dispatch = useAppDispatch();

    let userInitial = "";
    if (user?.email) {
        userInitial = user?.email?.substring(0,1).toUpperCase()
    } else {
        const display_name = user?.displayName?.split(" ")
        if (display_name && display_name.length > 0) {
            userInitial = `${display_name[0].substring(0,1).toUpperCase()}${display_name[1].substring(0,1).toUpperCase()}`
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
           setYValue(window.scrollY);            
        })
    },[])

    const signInHandler = () => {
        router.replace("/signin")
    }

    const registerHandler = () => {
        router.replace("/register")
    }
    
    return (
       
        <header className={styles.container} data-testid="header">
            {/* <div id="overlay" className={ styles.overlay }></div> */}
            <div className={ yValue <= 80 ? styles.filler_container : styles.filler_container_show }></div>
            <div className={ yValue <= 80 ? styles.subcontainer : styles.subcontainer_scrolled }>
                <div className={styles.nav_container}>
                    <Logo urlPath={`${user ? "/movies" : "/"}`} />
                    {
                        user ? 
                            <>
                                <Navigation /> 
                                <SearchField />
                            </>
                        :                         
                            <div className="flex-1"></div>                        
                   
                        
                    }
                    {
                        // !loading &&
                            !user ?
                            // <button>test</button> 
                                <SigninBtn title={router.pathname === "/signin" ? "Register" : "Sign In"} onClick={ router.pathname === "/signin" ? registerHandler : signInHandler } /> 
                            :                          
                               <Avatar userInitial={ userInitial } />
                    }

                </div>
            </div>

        </header>
    )
    
}

export default Header;


