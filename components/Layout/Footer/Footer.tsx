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


export interface IFooter {
    children?: React.ReactNode;
} 

const Footer: React.FC<IFooter> = () => {
    const dt = new Date();
    const year = dt.getFullYear();
    return (
        <footer className={styles.container} data-testid="footer_container">
            <section className="flex flex-col items-start justify-center border-b-2 border-[#707070] py-0 w-full md:flex-row md:justify-start md:pb-8">

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
                    <div className="flex items-center justify-center w-full
                    lg:justify-start">
                        { year } Wibix. All Rights Reserved.
                    </div>
                </div>
                <div className="flex items-center justify-center w-full 
                lg:justify-end">
                    <LanguageSelector />
                </div>
            </section>
        </footer>
    )
}

export default Footer;