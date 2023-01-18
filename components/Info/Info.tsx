
import styles from "./Info.module.css"

const Info:React.FC<{
    title: string;
    valueFor?: string;
    value: string | number | any[];
}> = ({ title, valueFor, value }) => {

    const valuesArr:any[] = [];
    let displayValue: string | number | undefined = undefined;


    if (typeof value === "object" && value) {
        value.slice(0,5).map((item, i) => {
            if (item.name) {
                valuesArr.push(item.name)
            } else {
                valuesArr.push(item)
            }
        })        
    }

    if (valueFor === "runtime") {
        const hr = Math.floor(Number(value) / 60);
        const mins = (Number(value) % 60)
        displayValue = `${hr > 0 ? hr > 1 ? `${hr}hrs. ` : `${hr}hr. ` : "" }${mins}mins.`
    }

    return (
        value || valuesArr.length > 0 ? 
        <div className={ title ? styles.info_container : styles.info_container_notitle } data-testid="info_container">
            {
                title && <span className={ styles.info_title }>{ title }:</span>
            }
            {
                title ? 
                    <span className={ styles.info_value}>
                        { valuesArr.length > 0 ? valuesArr.join(" ● ") : value }
                    </span>
                :
                    valueFor === "runtime" ? 
                        <span className={ styles.info_runtime }>{ displayValue }</span>
                    : 
                        <span>{ valuesArr.length > 0 ? valuesArr.join(" ● ") : value }</span>
            }
            
        </div> : null
    )
}

export default Info;