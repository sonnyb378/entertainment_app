import styles from "./FaqItem.module.css";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export interface IFaqItem {
    id: number;
    title: string;
    description: string;
}

const FaqItem:React.FC<IFaqItem> = ({ id, title, description }) => {
    const [show, setShow] = useState(false);
    const onClickHandler = (show: boolean) => {
        // console.log(show);
        setShow(show);
    }

    return (
        <li key={id} className={`mb-[.5rem] ${styles.faqli}`}>
            <div className={`${styles.container}`} onClick={(e) => onClickHandler(!show) }>
                <span className="flex-1 text-[1rem]">{title}</span>
                <div className={!show ? styles.icon_container_close : styles.icon_container_open}>
                    {/* <ChevronDownIcon className="w-6 h-6"/> */}
                    &nbsp;
                </div>
            </div>
            <div className={!show ? styles.description_close : styles.description_open}>
                <p>{description}</p>
            </div>
        </li>
    );
}

export default FaqItem;