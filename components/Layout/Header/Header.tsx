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
// import { useAppDispatch } from "../../../app/hooks";


export interface IHeader {
    children?: React.ReactNode;
}

const Header: React.FC<IHeader> = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [yValue, setYValue] = useState(0);
    const router = useRouter();
    // const dispatch = useAppDispatch();

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
                    <Logo />
                    {
                        user ? <Navigation /> : <div className="flex-1"></div>                        
                    }
                    <SearchField />
                    {
                        !loading &&
                            !user ?
                            // <button>test</button> 
                                <SigninBtn title={router.pathname === "/signin" ? "Register" : "Sign In"} onClick={ router.pathname === "/signin" ? registerHandler : signInHandler } /> 
                            :                          
                               <Avatar userInitial={user?.email?.substring(0,1).toUpperCase()} />
                    }

                </div>
            </div>

        </header>
    )
    
}

export default Header;
