
import Image from "next/image";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { IAuthState } from "../../../ts/states/auth_state";
import { useAppContext } from "../../../context/state";
import { IResult } from "../../Search/SearchResultItem/SearchResultItem";

const Video: React.FC<{ 
    result:IResult, 
    user:IAuthState, 
    expand?: boolean, 
    src: string,
    isBookmarked: boolean,
}> = ({ result, user, expand = false, src, isBookmarked }) => {
    const { setBookmark } = useAppContext();
    return (
        <div className="image-container relative w-full" data-testid="backdrop_image_container" 
            
        >   
            <video autoPlay muted loop src={src} className="relative z-[100] w-full h-auto rounded-lg" />
            {
                expand && user && user.accessToken &&
                <div className="flex absolute top-0 right-0 items-center justify-end z-[1000] w-full p-2 space-x-2">
                    <div className={`p-2 ${ !isBookmarked ? "hover:bg-btnprimary" : "hover:bg-white" } hover:rounded-full`}
                         onClick={ () => setBookmark(result, result.media_type, isBookmarked, (docID) => {
                            // console.log("video: (bookmark):", docID)
                        }) }
                        >
                        <BookmarkIconSolid className={`w-[18px] h-[18px] ${ !isBookmarked ? "text-white" : "text-btnprimary" } `} />
                    </div>
                </div>          
            }
        </div>
    )
}

export default Video;
