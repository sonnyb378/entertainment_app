import styles from "./Hero.module.css";
import Image from "next/image";

import hero_image from "../../../assets/hero_image.png";

export interface IHero {
    children?: React.ReactNode;
}
const Hero:React.FC<IHero> = ({ children }) => {
    return (
        <>
            <section className={styles.container}>
                <Image src={hero_image} alt="hero" layout="fill" className="object-cover relative" priority />
                { children}
            </section>            
        </>
    )
}

export default Hero;