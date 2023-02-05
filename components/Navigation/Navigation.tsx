import React, { useEffect, useRef, useState } from "react"
import styles from "./Navigation.module.css";

import { useRouter } from "next/router"
import { ChevronDownIcon, FilmIcon, TvIcon, BookmarkIcon } from "@heroicons/react/24/solid"



const Navigation: React.FC = () => {
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false)

    const navDropdownRef = useRef<HTMLUListElement | null>(null)

    const closeNavDropdown = (e:any) => {
        if (navDropdownRef.current && showDropdown && !navDropdownRef.current.contains(e.target)) {
            setShowDropdown(false)
        }
    }

    document.addEventListener("mousedown", closeNavDropdown)

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("resize", () => {
                const nav_container = document.getElementById("navigation_container")!
                if (showDropdown && nav_container && nav_container.clientWidth >= 318) {
                    setShowDropdown(false)
                }
            })

        }
    },[showDropdown])

    function redirectHandler (e: React.MouseEvent<HTMLUListElement>) {
        e.preventDefault();
        setShowDropdown(false)
        const target = (e.target as HTMLLIElement) as HTMLLIElement;
        
        if (target.id !== "ul_navigation") {
            const str = target.textContent?.trim().toLowerCase().split(" ").join("");
            let url: string = "/movies"
            url = str === "mylist" ? `/user/${str}` : `/${str}`
            if (router.pathname !== url) {
                router.replace(url)
            }
        }        
    }

    const toggleDropDown = () => {
        setShowDropdown(!showDropdown)
    }
    
    return (
        <nav className="flex-1 items-center justify-start w-full pl-2 relative" id="navigation_container" data-testid="navigation_container">
            
            <button 
                onClick={ toggleDropDown } 
                className={`flex items-center justify-start text-white hover:text-yellow-500 md:hidden`} 
                data-testid="toggle_dropdown_btn"
            >
                <h1 className="">Browse</h1>
                <ChevronDownIcon className="flex w-[20px] h-[20px] items-start ml-2" />
            </button>

            <ul ref={navDropdownRef} className={ !showDropdown ? styles.navigation : styles.show_navigation } onClick={redirectHandler} data-testid="toggle_nav" id="ul_navigation">
                <li data-testid="nav_movies">
                    <FilmIcon className="w-[20px] h-[20px] mr-1 md:hidden" />Movies
                </li>
                <li data-testid="nav_tvshows">
                    <TvIcon className="w-[20px] h-[20px] mr-1 md:hidden" />TV Shows
                </li>
                <li data-testid="nav_mylist">
                    <BookmarkIcon className="w-[20px] h-[20px] mr-1 md:hidden" />My List
                </li>
            </ul>            

        </nav>
    )
}

export default Navigation;