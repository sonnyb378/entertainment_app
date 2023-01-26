// import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";

// import Footer from "../Footer/Footer";
// import Header from "../Header/Header";
// import Hero from "../../Hero/Hero";
import styles from "./Main.module.css";

import Spinner from "../../Spinner/Spinner";

const Header = dynamic(() => import("../Header/Header"), {
    loading: () => <div></div> //<Spinner />
})

const Footer = dynamic(() => import("../Footer/Footer"), {
    loading: () => <div></div> //<Spinner />
})

const Hero = dynamic(() => import("../../Hero/Hero"), {
    loading: () => <div></div> //<Spinner />
})

import Seo from "../../SEO/Seo"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { useRouter } from "next/router";
// import { useAppContext } from "../../../context/state";
// import { AppProps } from "next/app";

import { parseCookies } from "nookies"
import { signOut } from "firebase/auth";

export interface IMain {
    seo?: {
        title: string;
        description: string;
    },    
    showHero: boolean;
    children?: React.ReactNode;
}

const Main: React.FC<IMain> = ({ children, seo, showHero }) => {

    const cookies = parseCookies()

    if (!cookies.token) {
        signOut(auth)
    }

    return (
        <div className={ styles.container } data-testid="main_component">        
            <div className="flex-col items-center justify-center w-full bg-black transition-all duration-100 opacity-100" id="main_component" >
                    
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
                    
            </div>            
        </div>
    )
    

    
    

}

export default Main;