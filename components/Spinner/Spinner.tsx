import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const Spinner:React.FC = () => {

    return(
        <div className="flex items-center justify-center" data-testid="spinner_container">
            <ArrowPathIcon className="w-[30px] h-[30px] text-white animate-spin" />
        </div>
    )
}

export default Spinner;