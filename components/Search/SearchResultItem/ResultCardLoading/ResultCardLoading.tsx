import Image from "next/image";
import styles from "./ResultCardLoading.module.css"

import no_result from "../../../../assets/no_result.png"

const ResultCardLoading: React.FC<{ count: number }> = ({ count }) => {
    const cards = new Array(count).fill(0)
    
    return (
        <div className="flex flex-wrap items-start justify-start w-full relative mt-4">
            {
                cards.map((card, i) => {
                    return (
                        <div key={i} className={ styles.container }>              
                            <div className="flex flex-col items-stretch justify-start relative border-0 w-full rounded-[5px] overflow-hidden">
                                <div className="image-container relative w-full h-full border-0 border-slate-100 bg-gray-600 bg-opacity-90">   
                                    <Image 
                                        src={ no_result } 
                                        layout="responsive"
                                        priority={true}
                                        width={300}
                                        height={169}
                                        className={`object-cover cursor-pointer z-[1000] opacity-0`}
                                    />
                                </div>
                                <div className={ styles.media_type_show_container }>
                                    <div className="w-full font-bold h-[20px] p-0 m-0 bg-gray-800"></div>
                                    <div className="flex items-start justify-start w-[50%] h-[20px] bg-gray-800 mt-1.5"></div>   
                                </div> 
                            </div>                         
                        </div>
                    )
                })
            }
            

        </div>
        
    )
}

export default ResultCardLoading;