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
 
    const inputRef = useRef<HTMLInputElement>(null);

    const search_input = document.getElementById("search") as HTMLInputElement
    const xicon = document.getElementById("xcircleicon") 
    const righticon = document.getElementById("chevronrighticon")

    // const changeURLQuery = (search_keyword: HTMLInputElement) => {
    //     let searchParams = new URLSearchParams(window.location.search);
    //     searchParams.set("q", encodeURI(search_keyword.value));
        
    //     if (window.history.replaceState) {
    //         const url = window.location.protocol 
    //                     + "//" + window.location.host 
    //                     + window.location.pathname 
    //                     + "?" 
    //                     + searchParams.toString();
    
    //         window.history.replaceState({
    //             path: url
    //         }, "", url)           
    //     }
    // }

    // const clearInputHandler = () => {
    //     search_input.value = ""
    //     router.push("/movies")
    // }

    // const df = debounce(async (e) => {
        
    //     const search_keyword = e.target as HTMLInputElement;
        
    //     if (search_keyword.value.trim() === "" ) return;
    //     const search_value = inputRef;
    //     console.log("inputRef.current: ", search_value.current?.value);

        // const response = await sendRequest(
        //     EMethodTypes.GET, 
        //     `search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY_V3}&language=en-US&page=1&include_adult=false&query=${encodeURI(keyword.value.trim())}`, 
        // ).then((data) => data)
        // .catch((error) => { 
        //     //console.log("error: ", error)
        // })
        // console.log("search_keyword: ", encodeURI(search_keyword.value.trim()))
        
    // }, 1000)
    
    // const search = (event: React.KeyboardEvent) => {
    //     const search_keyword = event.target as HTMLInputElement;
       
        // if (router.pathname !== "/search") {
        //     router.push({
        //         pathname: "/search",
        //         query: {
        //             q: encodeURI(search_keyword.value)
        //         }
        //     })
        // } else {
        //     if (search_keyword.value.trim() === "") router.push("/movies")
        //     df(event)
        // }
    //     changeURLQuery(search_keyword)
        
    // }

    const clearInputHandler = () => {
        search_input.value = ""
        xicon?.classList.replace("flex", "hidden")            
        righticon?.classList.replace("hidden", "flex")
        router.push("/movies")
    }

    const db = debounce((e) => {
        const kw = e.target as HTMLInputElement;
        if (kw.value.trim() === "") return
        console.log("sendRequest: ", kw.value);
    }, 1000)

    const search = (event: React.KeyboardEvent) => {
        const search_keyword = event.target as HTMLInputElement;

        if (search_keyword.value.trim() !== "") {
            xicon?.classList.replace("hidden", "flex")
            righticon?.classList.replace("flex", "hidden")
        } else {            
            xicon?.classList.replace("flex", "hidden")            
            righticon?.classList.replace("hidden", "flex")
        }

        // TODO: redirect to search if keyword is entered if not already in search page
        if (router.pathname !== "/search" && search_keyword.value.trim() !== "") {
            
        } else {

        }

        db(event)
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

