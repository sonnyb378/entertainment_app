import * as React from "react";
import Image from 'next/image';

import { useRouter } from "next/router";
import logo from "../../assets/logo.svg"


const Logo: React.FC<{ urlPath: string}> = ({ urlPath}) => {
    const router = useRouter();
    const redirectHandler = () => {
        router.replace(urlPath);
    }
    return (
        <div className="hover:cursor-pointer scale-[80%]
        sm:scale-[80%]
        md:scale-[90%]
        lg:scale-[100%]
        xl:scale-[100%]
        " onClick={ redirectHandler } data-testid="logo_container">
            <Image src={logo} alt="logo" />
        </div>
    )
}

export default Logo;