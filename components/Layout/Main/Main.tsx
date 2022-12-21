import Head from "next/head";
import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Hero from "../../Hero/Hero";
import styles from "./Main.module.css";

import Seo from "../../SEO/Seo"

export interface IMain {
    seo?: {
        title: string;
        description: string;
    },    
    showHero: boolean;
    children?: React.ReactNode;
}

const Main: React.FC<IMain> = ({ children, seo, showHero}) => {
    // console.log("Main")
    return (
        <div className={styles.container} data-testid="main_component">
            {/* <React.StrictMode> */}

            {
                seo && <Seo meta={seo} />
            }

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
            
            {/* </React.StrictMode> */}
        </div>
       
    );
}

export default Main;