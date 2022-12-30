
import Image from "next/image";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { IAuthState } from "../../../ts/states/auth_state";

const BackdropImage: React.FC<{ user:IAuthState, expand?: boolean, src: string}> = ({ user, expand = false, src }) => {
    return (
        <div className="image-container relative w-full" data-testid="backdrop_image_container">   
            <Image 
                src={ `${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH}${src}` } 
                layout="fill"
                priority={true}
                className={`object-contain cursor-pointer !relative !h-[unset] z-[1000]`}
            />   
            {
                expand && user && user.accessToken &&
                <div className="flex absolute top-0 right-0 items-center justify-end z-[1000] w-full p-2 space-x-2">
                    <div><BookmarkIcon className=" w-[18px] h-[18px]" /></div>
                </div>          
            }
        </div>
    )
}

export default BackdropImage;