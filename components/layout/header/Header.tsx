import React from "react";
import styles from "./Header.module.css";

export interface IHeader {
    children?: React.ReactNode;
}
const Header: React.FC<IHeader> = () => {
    return (
        <header className={styles.container}>
            <div className={styles.subcontainer}>
                <div>logo</div>
                <div>sign in</div>
            </div>
        </header>
    )
}

export default Header;