import { signOut } from "firebase/auth";
import { parseCookies } from "nookies";
import React from "react";
import { auth } from "../../../firebase";
import styles from "./Watch.module.css";

export interface IWatch {
    children?: React.ReactNode;
}

const Watch: React.FC<IWatch> = ({ children }) => {
   
    const cookies = parseCookies()

    if (!cookies.token) {
        signOut(auth)
    }
    
    return (
        <div className={styles.container} data-testid="main_component">
            { children }
        </div>
    );
}

export default Watch;