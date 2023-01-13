import { useAppContext } from "../../../context/state";
import styles from "./CustomBtn.module.css";


const CustomBtn:React.FC<{ title: string, Icon: React.ElementType, onClickHandler: () => void}> = ({ title, Icon, onClickHandler }) => {

    return(
        <button className={ styles.button_container } onClick={onClickHandler} data-testid="custom_btn">
            <span className="flex items-center justify-start text-lg">{ title }</span>
            { Icon && <Icon className="flex items-center justify-center p-2 w-[50px] h-[50px]" /> }
        </button>
    )
}

export default CustomBtn;
