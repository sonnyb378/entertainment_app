import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Logo from "../../Logo";
import SigninBtn from "../../button/signin/SigninBtn";
import Navigation from "../navigation/Navigation";

import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

import { setAuthData } from "../../../app/store/slices/auth";
import { useAppDispatch } from "../../../app/hooks";
import { signOut } from "firebase/auth";

export interface IHeader {
    children?: React.ReactNode;
}

const Header: React.FC<IHeader> = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const [yValue, setYValue] = useState(0);
    const router = useRouter();
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     console.log("header test >>>>>> ", user);
        // console.log("header >>>>> ", router.pathname);
    // }, []);

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
    })

    const scrollHandler = () => {
        setYValue(window.scrollY);
    }

    const logoutHandler = () => {
        signOut(auth);
        dispatch(setAuthData({
            id: null,
            accessToken: null,
            expiresAt: null
        }))

    }

    const signInHandler = () => {
        router.replace("./signin")
    }
    const registerHandler = () => {
        router.replace("./register")
    }

    return (
        <header className={styles.container} data-testid="header">
            <div className={yValue <= 60 ? styles.subcontainer : styles.subcontainer_scrolled}>
                <div className={styles.nav_container}>
                    <Logo />
                    {
                        user && <Navigation show={!!user} />
                    }
                    {
                        !user ? 
                        <SigninBtn title={router.pathname === "/signin" ? "Register" : "Sign In"} onClick={ router.pathname === "/signin" ? registerHandler : signInHandler } /> 
                        : 
                        <SigninBtn title="Logout" onClick={logoutHandler} />
                    }
                </div>
            </div>
        </header>
    )
    
}

export default Header;
