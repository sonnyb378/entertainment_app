
import Image from "next/image";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { IAuthState } from "../../../ts/states/auth_state";
import { useAppContext } from "../../../context/state";

const Video: React.FC<{ id:string|number, user:IAuthState, expand?: boolean, src: string}> = ({ id, user, expand = false, src }) => {
    const { setBookmark } = useAppContext();
    return (
        <div className="image-container relative w-full" data-testid="backdrop_image_container" 
            
        >   
            <video autoPlay muted loop src={src} className="relative z-[100] w-full h-auto rounded-lg" />
            {
                expand && user && user.accessToken &&
                <div className="flex absolute top-0 right-0 items-center justify-end z-[1000] w-full p-2 space-x-2">
                    <div className="p-2 
                         hover:bg-btnprimary hover:rounded-full"
                         onClick={ () => setBookmark(id, () => {
                            console.log("video: (bookmark):", id)
                        }) }
                        >
                        <BookmarkIconSolid className=" w-[18px] h-[18px] text-white" />
                    </div>
                </div>          
            }
        </div>
    )
}

export default Video;
