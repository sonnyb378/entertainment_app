import React from "react";
import styles from "./InputField.module.css";

export interface IInputField {
    type: string;
    label: string;
    id: string;
    placeholder: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const InputField: React.FC<IInputField> = ({type, label, id, placeholder, value, onChange}) => {
    return (
        <div className={type !== "checkbox" ? styles.container : styles.c_container} data-testid="inputfield_container">
            <div id="inputContainer" className={type !== "checkbox" ? styles.input_container : styles.checkbox_container}>
                <input 
                    className={type !== "checkbox" ? styles.input_field : styles.checkbox } 
                    type={type} 
                    id={id} 
                    name={id} 
                    placeholder={placeholder} 
                    value={value}
                    onChange={onChange} 
                    data-testid="inputfield"
                />
                {
                    type !== "checkbox" && <label className={styles.input_label} htmlFor={id}>{label}</label>
                }                
            </div>
        </div>
    );
}

export default InputField;