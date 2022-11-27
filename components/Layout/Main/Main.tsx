import Head from "next/head";
import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Hero from "../../Hero/Hero";
import styles from "./Main.module.css";

export interface IMain {
    meta: {
        pageTitle: string;
        pageDescription: string;
    },
    showHero: boolean;
    children?: React.ReactNode;
}

const Main: React.FC<IMain> = ({ children, meta, showHero}) => {
    return (
        <div className={styles.container} data-testid="main_component">

            <Head>
                <title>{meta.pageTitle}</title>
                <meta name="description" content={`${meta.pageDescription}`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {
                showHero ? 
                <>
                    <Hero />
                    <section className={styles.sub_container}>
                        <Header />
                        <main className={styles.main_section}>
                            {children}
                        </main>   
                    </section>   
                    <Footer />                                                                                                     
                                          
                </> :
                <>
                    <Header />
                    <main className={styles.main_section}>
                        {children}
                    </main>   
                    <Footer />
                </>
            }
            

        </div>
       
    );
}

export default Main;