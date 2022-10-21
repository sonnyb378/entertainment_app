import React from "react";
import styles from "./FooterNav.module.css";


export interface IItem {
    title: string;
    url: string;
}
export interface IFooterNav {
    title: string;
    items: IItem[];
}

const FooterNav: React.FC<IFooterNav> = ({ title, items }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{ title }</h1>
            <ul className={styles.items}>
                {
                    items.map((item) => {
                        return <li key={item.title}>{ item.title }</li>
                    })
                }               
            </ul>
        </div>
    );
}

export default FooterNav;