import React, { useRef, useCallback, useEffect, useState } from "react";
import styles from "./Search.module.css";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { debounce } from "../../lib/debounce";

import { sendRequest } from "../../lib/sendRequest";

import { fake_multi_search_data } from "../../model/fake_search";

import { useRouter } from "next/router";
import InputField from "../Form/InputField/InputField";

const Search: React.FC = () => {
    const router = useRouter();
    let last_keyword:string = ""
    const inputRef = useRef<HTMLInputElement>(null);

    const search_input = document.getElementById("search") as HTMLInputElement
    const xicon = document.getElementById("xcircleicon") 
    const righticon = document.getElementById("chevronrighticon")

    let current_path = router.pathname
    let current_aspath = router.asPath

    const clearInputHandler = () => {
        search_input.value = ""
        xicon?.classList.replace("flex", "hidden")            
        righticon?.classList.replace("hidden", "flex")
        router.push(current_path)
    }

    const refreshQuery = useCallback(debounce((e) => {        
        const search_keyword = e.target as HTMLInputElement;
        if (search_keyword.value.trim() === "") return
        if (last_keyword === search_keyword.value.trim()) return;

        last_keyword = search_keyword.value.trim()
        router.push(router.pathname, {
            pathname: "/search",
            query: {
                q: encodeURI(search_keyword.value.trim())
            }
        }) 
    }, 1200), [router.pathname])

    const search = (event: React.KeyboardEvent) => {
        const search_keyword = event.target as HTMLInputElement;
    
        if (search_keyword.value.trim() !== "") {
            xicon?.classList.replace("hidden", "flex")
            righticon?.classList.replace("flex", "hidden")
        } else {            
            xicon?.classList.replace("flex", "hidden")            
            righticon?.classList.replace("hidden", "flex")
        }


        if (search_keyword.value.trim() !== "") {
            if (!current_aspath.includes("/search")) {
                router.replace(router.pathname, {
                    pathname: "/search",
                    query: {
                        q: ""
                    }
                }) 
            } else {
                let searchParams = new URLSearchParams(window.location.search);

                searchParams.set("q", encodeURI(search_keyword.value));
    
                if (window.history.replaceState) {
                    const url = window.location.protocol 
                                + "//" + window.location.host 
                                + window.location.pathname 
                                + "?" 
                                + searchParams.toString();
    
                    window.history.replaceState({
                        path: url
                    }, "", url)
                }
                
                refreshQuery(event)
            }
            


        }
        
        if (current_aspath.includes("/search") && search_keyword.value.trim() === "") {            
            router.replace(current_path, current_path)    
        }

        // db(event)
        
    }

    return(
        <div className={ styles.search_container } data-testid="search_container">
            <MagnifyingGlassIcon className="w-[30px] h-[30px] ml-2 mr-2 text-white" />
            <input 
                id="search" 
                onKeyUp={ (e) => search(e) } 
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

