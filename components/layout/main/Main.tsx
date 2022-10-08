import Head from "next/head";
import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import styles from "./Main.module.css";

export interface IMain {
    meta: {
        pageTitle: string;
        pageDescription: string;
    },
    children?: React.ReactNode;
}

const Main: React.FC<IMain> = ({ children, meta}) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>{meta.pageTitle}</title>
                <meta name="description" content={`${meta.pageDescription}`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
       
    );
}

export default Main;