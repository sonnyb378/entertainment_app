
import styles from "./Footer.module.css";

export interface IFooter {
    children?: React.ReactNode;
} 

const Footer: React.FC<IFooter> = () => {
    return (
        <footer className={styles.container}>
            <section>top section</section>
            <section className={styles.bottom_container}>
                <div>
                    <div>
                        social media
                    </div>
                    <div>
                        copyright
                    </div>
                </div>
                <div>
                    english
                </div>
            </section>
        </footer>
    )
}

export default Footer;