import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Logo from "../../Logo/Logo";
import SigninBtn from "../../Button/SignIn/SigninBtn";
import Navigation from "../../Navigation/Navigation";

import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

import { setAuthData } from "../../../app/store/slices/auth";
import { useAppDispatch } from "../../../app/hooks";
import { signOut } from "firebase/auth";

import Avatar from "../../Avatar/Avatar"
import SearchField from "../../Search/SearchField/SearchField"

export interface IHeader {
    children?: React.ReactNode;
}

const Header: React.FC<IHeader> = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const [yValue, setYValue] = useState(0);
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        // console.log("header test >>>>>> ", user?.email?.substring(0,1).toUpperCase());
        // console.log("header >>>>> ", router.pathname);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
    })

    const scrollHandler = () => {
        setYValue(window.scrollY);
    }

    const signInHandler = () => {
        router.replace("/signin")
    }
    const registerHandler = () => {
        router.replace("/register")
    }

    
    return (
        <header className={styles.container} data-testid="header">
            <div className={yValue <= 150 ? styles.subcontainer : styles.subcontainer_scrolled}>
                <div className={styles.nav_container}>
                    <Logo />
                    {
                        user ? <Navigation show={!!user} /> : <div className="flex-1"></div>
                        
                    }
                    <SearchField />
                    {
                        !loading &&
                            !user ? 
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
