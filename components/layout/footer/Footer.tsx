
import styles from "./Footer.module.css";

import Image from "next/image";
import FooterNav from "../footer_nav/FooterNav";

import { aboutusNav, browseNav, legalNav, helpNav } from "../../../model/footer_links";
import youtube from "../../../assets/youtube.svg";
import twitter from "../../../assets/twitter.svg";
import instagram from "../../../assets/instagram.svg";
import facebook from "../../../assets/facebook.svg";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

export interface IFooter {
    children?: React.ReactNode;
} 

const Footer: React.FC<IFooter> = () => {
    const dt = new Date();
    const year = dt.getFullYear();
    return (
        <footer className={styles.container}>
            <section className="flex items-start justify-start border-b-2 border-[#707070] py-8 w-full">

                <FooterNav title="About Us" items={aboutusNav} />
                <FooterNav title="Browse" items={browseNav} />
                <FooterNav title="Legal" items={legalNav} />
                <FooterNav title=" " items={helpNav} />
            

            </section>
            <section className={styles.bottom_container}>
                <div className="flex flex-col items-start justify-center w-full">
                    <div className="flex items-center justify-start gap-6 space-x-5 py-8  w-full">
                        <Image src={youtube} alt="Youtube" width={35} height={35} className="object-contain" />
                        <Image src={twitter} alt="Twitter" width={25} height={25} className="object-contain" />
                        <Image src={instagram} alt="Instagram" width={25} height={25} className="object-contain" />
                        <Image src={facebook} alt="Facebook" width={25} height={25} className="object-contain" />
                    </div>
                    <div>
                        { year } Wibix. All Rights Reserved.
                    </div>
                </div>
                <div>
                    <LanguageSelector />
                </div>
            </section>
        </footer>
    )
}

export default Footer;