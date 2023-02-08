import React from "react";
import styles from "./Footer.module.css";

import Image from "next/image";
import FooterNav from "./FooterNav/FooterNav";
import LanguageSelector from "../../LanguageSelector/LanguageSelector";

import { aboutusNav, browseNav, legalNav, helpNav } from "../../../model/footer_links";

import youtube from "../../../assets/youtube.svg";
import twitter from "../../../assets/twitter.svg";
import instagram from "../../../assets/instagram.svg";
import facebook from "../../../assets/facebook.svg";
import pixabay from "../../../assets/pixabay.svg";


export interface IFooter {
    children?: React.ReactNode;
} 

const Footer: React.FC<IFooter> = () => {
    const dt = new Date();
    const year = dt.getFullYear();

    return (
        <footer className={styles.container} data-testid="footer_container">
            <section className="flex flex-col items-start justify-center border-0 border-[#707070] py-0 w-full 
            md:flex-row md:justify-center md:pb-8">

                <FooterNav title="About Us" items={aboutusNav} />
                <FooterNav title="Browse" items={browseNav} />
                <FooterNav title="Legal" items={legalNav} />
                <FooterNav title={null} items={helpNav} />
            

            </section>
            <section className={styles.bottom_container}>
                <div className="flex flex-col items-start justify-center w-full">
                    <div className="flex items-center justify-center gap-6 space-x-5 py-8 w-full
                    lg:justify-start">
                        <Image src={youtube} alt="Youtube" width={35} height={35} className="object-contain" />
                        <Image src={twitter} alt="Twitter" width={25} height={25} className="object-contain" />
                        <Image src={instagram} alt="Instagram" width={25} height={25} className="object-contain" />
                        <Image src={facebook} alt="Facebook" width={25} height={25} className="object-contain" />
                    </div>
                    <div className="flex items-center justify-center w-full text-[#d1d0d0]
                    lg:justify-start">
                        { year } Wibix. All Rights Reserved.
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full border-0
                lg:flex-col lg:justify-center lg:items-end">
                    <LanguageSelector />
                    <div className="flex items-center justify-center border-0 h-[50px] mt-[10px]">
                        <span className="text-sm mr-[5px] text-[#5f5f5f]">Videos are from</span>
                        <div className="w-[100px] border-0 hover:cursor-pointer" >
                            <a href="https://pixabay.com" target="_blank" rel="noreferrer nofollow">
                                <Image 
                                    src={pixabay} 
                                    layout="responsive"
                                    alt="Pixabay" 
                                    width={100} 
                                    height={30} 
                                    className="object-contain" 
                                />
                            </a>
                        </div>
                        
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer;