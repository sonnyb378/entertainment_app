import React from "react"
import Image from "next/image";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { User } from "firebase/auth";
// import { IAuthState } from "../../../ts/states/auth_state";
// import { useEffect } from "react";

const BackdropImage: React.FC<{ 
    user: User | null | undefined, 
    expand?: boolean, 
    src: string,
    media_type: string
}> = ({ user, expand = false, src, media_type }) => {


    return (
        <div className="flex-1 items-start justify-start relative w-full h-[169px] border-0" data-testid="backdrop_image_container">   
            <Image 
                src={ `${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH}${src}` } 
                layout="responsive"
                width={300}
                height={169}
                alt=""
                className={`object-contain cursor-pointer z-[1000]`}
            />   
            {
                expand && user && media_type !== "people" &&
                <div className="flex absolute top-0 right-0 items-center justify-end z-[1000] w-full p-2 space-x-2">
                    <div><BookmarkIcon className=" w-[18px] h-[18px]" data-testid="bookmark_icon" /></div>
                </div>          
            }
        </div>
    )
}

export default BackdropImage;
