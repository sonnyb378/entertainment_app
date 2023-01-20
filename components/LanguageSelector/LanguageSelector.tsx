import React from "react";
import styles from "./LanguageSelector.module.css";

import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const LanguageSelector: React.FC = () => {
    return (
        <div className={styles.container} data-testid="language_selector">
            <div><GlobeAltIcon className="w-[25px] h-[25px]" /></div>
            <div>English</div>
            <div><ChevronDownIcon className="w-[25px] h-[25px]" /></div>
        </div>
    );
}

export default LanguageSelector;