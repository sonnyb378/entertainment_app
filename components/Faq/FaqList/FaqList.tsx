import FaqItem from "../FaqItem/FaqItem";
import styles from "./FaqList.module.css";
import { IFaqItem } from "../FaqItem/FaqItem";

export interface IFaqList {
    list: IFaqItem[];
}

const FaqList: React.FC<IFaqList> = ({ list }) => {
    return (
        <ul className={styles.container} data-testid="faq_container">
        {
            list.map((faq) => {
                return (
                    <FaqItem key={faq.id} id={faq.id} title={faq.title} description={faq.description} />
                );
            })
        }
        </ul>  
    );
}

export default FaqList;