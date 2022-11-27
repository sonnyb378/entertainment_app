import React from "react";
import styles from "./FooterNav.module.css";


export interface IItem {
    title: string;
    url: string;
}
export interface IFooterNav {
    title: string | null;
    items: IItem[];
}

const FooterNav: React.FC<IFooterNav> = ({ title, items }) => {
    return (
        <div className={ title ? styles.container : styles.container_no_title } data-testid="footernav_container">
            <h1 className={ title ? styles.title : styles.no_title}>{ title }</h1>       
            <ul className={styles.items}>
                {
                    items.map((item) => {
                        return (
                            <li key={item.title} role="footer_items">
                                { item.title }
                            </li>
                        )
                    })
                }               
            </ul>
        </div>
    );
}

export default FooterNav;