import styles from "./Navigation.module.css";


export interface INavigation {
    show: boolean;
}

const Navigation: React.FC<INavigation> = ({ show }) => {
    return (
        <nav className={ show ? styles.container : styles.container_hidden}>
            Movies TV Shows My List
        </nav>
    )
}

export default Navigation;