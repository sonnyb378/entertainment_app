import React, { useEffect } from "react";
import styles from "./SearchField.module.css";

import { MagnifyingGlassIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { debounce } from "../../../lib/debounce";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../app/hooks";
import { selectCurrentUrl } from "../../../app/store/slices/url";
import { IUrl } from "../../../app/store/slices/url";

const getElements = () => {
    let search_input: HTMLInputElement;
    let xicon: HTMLElement | null;
    let righticon: HTMLElement | null;
    if (typeof window !== "undefined") {
        search_input = document.getElementById("search") as HTMLInputElement
        xicon = document.getElementById("xcircleicon") 
        righticon = document.getElementById("chevronrighticon")
        return {
            search_input,
            xicon,
            righticon
        }
    }
    return { 
        search_input: null, 
        xicon: null, 
        righticon: null 
    }
}

const Search: React.FC = () => {
    const router = useRouter();
    const new_url = useAppSelector<IUrl>(selectCurrentUrl);
    const { search_input, xicon, righticon } = getElements();

    useEffect(() => {
        const inputField = document.getElementById("search") as HTMLInputElement
        inputField.disabled = false;
        if (router.asPath.includes("/search")) {
            inputField.value = `${router.query["q"]}`
        }
    },[router.asPath])    

    useEffect(() => {
        if (router.asPath.includes("/search")) {
            if (typeof window !== "undefined") {
                const xicon = document.getElementById("xcircleicon") 
                const righticon = document.getElementById("chevronrighticon")

                righticon?.classList.replace("flex", "hidden")            
                xicon?.classList.replace("hidden", "flex")

            }
        }        
       
    },[])
        
    if (router.pathname !== "/search") {
        if (search_input) {
            search_input.value = ""
            xicon?.classList.replace("flex", "hidden")            
            righticon?.classList.replace("hidden", "flex")
        }
    } else {
        // if (search_input && router.query.hasOwnProperty("q")) {
        if (Object.prototype.hasOwnProperty.call(router.query, "q") && search_input) {
            const { q } = router.query;
            search_input.value = decodeURI(String(q))
            righticon?.classList.replace("flex", "hidden")            
            xicon?.classList.replace("hidden", "flex")
        }
    }
   

    const clearInputHandler = () => {
        const { search_input, xicon, righticon } = getElements();
        if (search_input) {
            search_input.value = ""
            xicon?.classList.replace("flex", "hidden")            
            righticon?.classList.replace("hidden", "flex")
        }
        router.replace(new_url.currentUrl)
    }

    const sendRequest = debounce((keyword, e) => {        
        if (!keyword) return
        // router.replace({
        //     pathname: "/search",
        //     query: {
        //         q: `${encodeURI(keyword.trim())}`
        //     }
        // })
        router.replace(`/search?q=${keyword.trim()}`)
    }, 1500)

    const searchHandler =(e: React.ChangeEvent<HTMLInputElement>) => {

        const search_keyword = e.target.value;
        const { xicon, righticon } = getElements();
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
            + decodeURI(searchParams.toString());
            
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
        <div className={ styles.search_container } id="search_container" data-testid="search_container">
            <MagnifyingGlassIcon className="w-[30px] h-[30px] ml-2 mr-2 text-white" />
            <input 
                id="search" 
                onChange={ searchHandler } 
                className={styles.input_field}  
                type="text" 
                placeholder="Name, Cast, Company" 
                data-testid="search_input" 
                autoComplete="off"
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

