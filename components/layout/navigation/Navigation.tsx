import styles from "./Navigation.module.css";


export interface INavigation {
    show: boolean;
}

const Navigation: React.FC<INavigation> = ({ show }) => {
    return (
        <nav className={ show ? styles.container : styles.container_hidden} data-testid="navigation_container">
            Home Movies TV Series My Shows
        </nav>
    )
}

export default Navigation;