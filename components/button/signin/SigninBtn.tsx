import { MouseEventHandler } from "react";
import styles from "./SigninBtn.module.css";

export interface IButton {
    title: string;
    onClick?: () => void;
    className?: string;
    Icon?: React.ElementType;
}

const SigninBtn: React.FC<IButton> = ({ title, onClick, className, Icon }) => {
    
    return (
        <button className={className || styles.container} onClick={ onClick } data-testid="btn_component">
            <span>{title}</span>
            {
                Icon && <span><Icon className="h-6 w-6" /></span>
            }
        </button>
    );

}

export default SigninBtn;
