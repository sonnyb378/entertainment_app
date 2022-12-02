import { useEffect, useState } from "react"
import styles from "./Navigation.module.css";

import { useRouter } from "next/router"

export interface INavigation {
    show: boolean;
}

const Navigation: React.FC<INavigation> = ({ show }) => {
    const router = useRouter();

    // const homeHandler = () => {
    //     router.replace("/movies")
    // }
    const moviesHandler = () => {
        router.replace("/movies")
    }
    const tvShowsHandler = () => {
        router.replace("/tv-shows")
    }
    const myListHandler = () => {
        router.replace("/user/mylist")
    }


    return (
        <nav className={ show ? styles.container : styles.container_hidden} data-testid="navigation_container">
            <ul className={ styles.navigation }>
                {/* <li onClick={homeHandler}>Home</li> */}
                <li onClick={moviesHandler}>Movies</li>
                <li onClick={tvShowsHandler}>TV Shows</li>
                <li onClick={myListHandler}>My List</li>
            </ul>
        </nav>
    )
}

export default Navigation;