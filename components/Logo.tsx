import Image from 'next/image';
import logo from "../assets/logo.svg";

import { useRouter } from "next/router";
import { redirect } from 'next/dist/server/api-utils';


const Logo: React.FC = () => {
    const router = useRouter();
    const redirectHandler = () => {
        router.replace("./");
    }
    return (
        <div className="hover:cursor-pointer scale-[60%] 
        sm:scale-[70%]
        md:scale-[80%]
        lg:scale-[100%]
        xl:scale-[110%]" onClick={ redirectHandler }>
            <Image src={logo} alt="logo" />
        </div>
    )
}

export default Logo;