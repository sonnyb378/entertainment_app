import React from "react";
import styles from "./Header.module.css";
import Logo from "../../Logo";
import SigninBtn from "../../button/signin/SigninBtn";
import Navigation from "../navigation/Navigation";

import { useRouter } from "next/router";

export interface IHeader {
    children?: React.ReactNode;
}
const Header: React.FC<IHeader> = () => {
    const router = useRouter();

    const signinHandler = () => {
        // console.log("sign in handler");
        router.replace("./signin")
    }

    return (
        <header className={styles.container}>
            <div className={styles.subcontainer}>
                <div className={styles.nav_container}>
                    <Logo />
                    <Navigation />
                </div>
                <SigninBtn title="Sign In" onClick={signinHandler} />
            </div>
        </header>
    )
    
}

export default Header;