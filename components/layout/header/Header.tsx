import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Logo from "../../Logo";
import SigninBtn from "../../button/signin/SigninBtn";
import Navigation from "../navigation/Navigation";

import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

import { selectAuth, setAuthData } from "../../../app/store/slices/auth";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useAppContext } from "../../../context/state";

export interface IHeader {
    children?: React.ReactNode;
}

const Header: React.FC<IHeader> = () => {
    const [user, loading, error] = useAuthState(auth);
    const [yValue, setYValue] = useState(0);
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
    })

    const scrollHandler = () => {
        setYValue(window.scrollY);
    }

    const signinHandler = () => {
        router.replace("./signin")
    }

    const registerHandler = () => {
        router.replace("./register")
    }

    const logoutHandler = () => {
        signOut(auth);
        dispatch(setAuthData({
            id: null,
            accessToken: null,
            expiresAt: null
          }))

    }

    return (
        <header className={styles.container}>
            <div className={yValue <= 60 ? styles.subcontainer : styles.subcontainer_scrolled}>
                <div className={styles.nav_container}>
                    <Logo />
                    {
                        user && <Navigation />
                    }
                    {
                        !user ? <SigninBtn title={router.pathname === "/signin" ? "Register" : "Sign In"} onClick={ router.pathname === "/signin" ? registerHandler : signinHandler} /> : 
                        <SigninBtn title="Logout" onClick={logoutHandler} />
                    }
                </div>
            </div>
        </header>
    )
    
}

export default Header;
