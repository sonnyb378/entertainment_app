import React, { useEffect } from "react";
import styles from "./Search.module.css";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

import { debounce } from "../../lib/debounce";

const Search: React.FC = () => {

    const search = debounce((e) => {
        const keyword = e.target as HTMLInputElement;
        if (keyword.value.trim() === "" ) return;
        console.log("call fetch here with keyword: ", encodeURI(keyword.value))
    }, 800)
    

    return(
        <div className={ styles.search_container } data-testid="search_container">
            <MagnifyingGlassIcon className="w-[30px] h-[30px] ml-2 mr-2 text-white" />
            <input id="search" onKeyUp={search} className={styles.input_field} type="text" placeholder="Name, Cast, Company" data-testid="search_input" required />
            <ChevronRightIcon className="w-[30px] h-[30px] ml-2 mr-2 text-white" />
        </div>
    )
}

export default Search;

