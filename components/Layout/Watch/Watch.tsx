import React from "react";
// import Head from "next/head";
import styles from "./Watch.module.css";

import Seo from "../../SEO/Seo"

export interface IWatch {
    children?: React.ReactNode;
}

const Watch: React.FC<IWatch> = ({ children }) => {
    return (
        <div className={styles.container} data-testid="main_component">
            { children }
        </div>
       
    );
}

export default Watch;