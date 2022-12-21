import Image from 'next/image';

import logo from "../../assets/logo.svg"

import { useRouter } from "next/router";

const Logo: React.FC = () => {
    const router = useRouter();
    const redirectHandler = () => {
        router.replace("/");
    }
    return (
        <div className="hover:cursor-pointer scale-[80%]
        sm:scale-[80%]
        md:scale-[90%]
        lg:scale-[100%]
        xl:scale-[100%]
        " onClick={ redirectHandler } data-testid="logo_container">
            <Image src={logo} alt="logo" priority={true} />
        </div>
    )
}

export default Logo;