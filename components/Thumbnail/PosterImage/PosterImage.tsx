import Image from "next/image";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { IAuthState } from "../../../ts/states/auth_state";

const PosterImage: React.FC<{user:IAuthState, src:string}> = ({ user, src }) => {

    return (
        <div className="image-container relative w-full h-full" data-testid="poster_image_container">   
            <Image 
                src={ `${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH}${src}` } 
                layout="responsive"
                width={300}
                height={169}
                priority={true}
                className={`object-cover cursor-pointer z-[1000]`}
            />                             
            {
                user && user.accessToken &&
                <div className="flex absolute top-0 left-0 items-center justify-end z-[1200] w-full p-2 space-x-2">
                    <div><BookmarkIcon className=" w-[18px] h-[18px]" /></div>
                </div>          
            }
        </div>
    )
}

export default PosterImage;