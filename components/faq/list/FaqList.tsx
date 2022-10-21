import FaqItem from "../item/FaqItem";
import styles from "./FaqList.module.css";
import { IFaqItem } from "../item/FaqItem";

export interface IFaqList {
    list: IFaqItem[];
}

const FaqList: React.FC<IFaqList> = ({ list }) => {
    return (
        <ul className={styles.container}>
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