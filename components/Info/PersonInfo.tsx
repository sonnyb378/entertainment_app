
export const calculateAge = (birthday:string) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const PersonInfo: React.FC<{
    title: string,
    separator: string,
    value: any
}> = ({ title, separator, value}) => {

    let newValue = "";
    if (title.toLowerCase() === "gender") {
        switch (value) {
            case 1: newValue = "Female"; break;
            case 2: newValue = "Male"; break;
        }
    } else if (title.toLowerCase() === "birthday") {
        newValue = `${value} (${calculateAge(value)} years old)`
    }

    return (
        <div className="mt-[15px]" data-testid="personinfo_container">
            <span className="mr-[5px] font-semibold text-[16px]">{ title }{ separator }</span>
            <div className="text-slate-400 text-[15px]">
                { 
                typeof value === "object"  && value.length > 0 ? 
                    <ul>
                        {
                            value && value.map((item:any, i:any) => {
                                return <li key={i}>{ item }</li>
                            })
                        }                    
                    </ul>  
                : 
                    newValue ? newValue : value
                }
            </div>
        </div>
    )
}

export default PersonInfo;