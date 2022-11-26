import styles from "./Hero.module.css";
import Image from "next/image";

import hero_image from "../../../assets/hero_image.png";

export interface IHero {
    children?: React.ReactNode;
}
const Hero:React.FC<IHero> = ({ children }) => {
    return (
            <section className={styles.container} data-testid="hero">
                <Image src={hero_image} alt="hero" quality={50}  layout="fill" className="object-cover relative" data-testid="image_container"/>
                { children}
            </section>  
    )
}

export default Hero;