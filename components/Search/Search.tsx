import React from "react";
import styles from "./Search.module.css";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";


const Search: React.FC = () => {
    return(
        <div className={ styles.search_container } data-testid="search_container">
            <MagnifyingGlassIcon className="w-[30px] h-[30px] ml-2 mr-2 text-white" />
            <input className={styles.input_field} type="text" placeholder="Name, Cast, Company" data-testid="search_input" required/>
            <ChevronRightIcon className="w-[30px] h-[30px] ml-2 mr-2 text-white" />
        </div>
    )
}

export default Search;

