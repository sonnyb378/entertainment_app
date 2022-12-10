import React, { useRef, useCallback, useEffect, useState } from "react";
import styles from "./SearchField.module.css";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { debounce } from "../../../lib/debounce";

import { useRouter } from "next/router";

import { useAppSelector } from "../../../app/hooks";
import { selectCurrentUrl } from "../../../app/store/slices/url";
import { IUrl } from "../../../app/store/slices/url";

const Search: React.FC = () => {
    const router = useRouter();
    const new_url = useAppSelector<IUrl>(selectCurrentUrl);
    const [searchKeyword, setSearchKeyword] = useState("")
    
    const [lastKeyword, setLastKeyword] = useState("")

    let search_input: HTMLInputElement;
    let xicon: HTMLElement | null;
    let righticon: HTMLElement | null;

    useEffect(() => {
        if (typeof window !== "undefined") {
            search_input = document.getElementById("search") as HTMLInputElement
            search_input.value = window.location.search.substring(3)
            xicon = document.getElementById("xcircleicon") 
            righticon = document.getElementById("chevronrighticon")
        }   
    }, [])
    

    const clearInputHandler = () => {
        search_input.value = ""
        xicon?.classList.replace("flex", "hidden")            
        righticon?.classList.replace("hidden", "flex")
        setLastKeyword("")
        router.replace(new_url.currentUrl)
    }

    const sendRequest = debounce((keyword, e) => {
        if (!keyword) return

        router.replace({
            pathname: "/search",
            query: {
                q: encodeURI(keyword)
            }
        })
    }, 1000)

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        const search_keyword = e.target.value;

        if (search_keyword.trim() !== "") {
            xicon?.classList.replace("hidden", "flex")
            righticon?.classList.replace("flex", "hidden")
        } else {            
            xicon?.classList.replace("flex", "hidden")            
            righticon?.classList.replace("hidden", "flex")
        }
        
        let searchParams = new URLSearchParams(window.location.search);            
        searchParams.set("q", encodeURI(search_keyword.trim()));       

        if (window.history.replaceState) {
            const url = window.location.protocol 
            + "//" + window.location.host 
            + "/search"
            + "?" 
            + searchParams.toString();
            
            window.history.replaceState({
                path: url
            }, "", url)
        }

        if (search_keyword.trim() === "") {
            router.replace(new_url.currentUrl)
        }

        sendRequest(search_keyword.trim(), e)

    }

    return(
        <div className={ styles.search_container } data-testid="search_container">
            <MagnifyingGlassIcon className="w-[30px] h-[30px] ml-2 mr-2 text-white" />
            <input 
                id="search" 
                onChange={ searchHandler } 
                className={styles.input_field}  
                type="text" 
                placeholder="Name, Cast, Company" 
                data-testid="search_input" 
                required 
            />
  
            <XCircleIcon 
                id="xcircleicon" 
                className="hidden w-[30px] h-[30px] ml-2 mr-2 text-white cursor-pointer hover:text-red-500" 
                onClick={clearInputHandler}
                data-testid="xcircleicon"
            />
             
            <ChevronRightIcon 
                id="chevronrighticon" 
                className="flex w-[30px] h-[30px] ml-2 mr-2 text-white" 
                data-testid="chevronrighticon"
            />
     
            
        
        </div>
    )
}

export default Search;

