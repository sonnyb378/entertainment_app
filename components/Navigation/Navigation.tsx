import React, { MouseEventHandler, useEffect, useState } from "react"
import styles from "./Navigation.module.css";

import { useRouter } from "next/router"

export interface INavigation {
    show: boolean;
}

const Navigation: React.FC<INavigation> = ({ show }) => {
    const router = useRouter();

    const moviesHandler = () => {
        router.replace("/movies")
    }
    const tvShowsHandler = () => {
        router.replace("/tvshows")
    }
    const myListHandler = () => {
        router.replace("/user/mylist")
    }


    function redirectHandler (e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        const target = (e.target as HTMLElement) as HTMLElement;
        const str = target.textContent?.trim().toLowerCase().split(" ").join("");
        const url = str === "mylist" ? `/user/${str}` : `/${str}`
        router.replace(url)
    }


    return (
        <nav className={ show ? styles.container : styles.container_hidden} data-testid="navigation_container">
            <ul className={ styles.navigation } onClick={redirectHandler} data-testid="nav" id="navigation">
                <li data-testid="nav_movies">Movies</li>
                <li data-testid="nav_tvshows">TV Shows</li>
                <li data-testid="nav_mylist">My List</li>
            </ul>
        </nav>
    )
}

export default Navigation;