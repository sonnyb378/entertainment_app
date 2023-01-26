import React from "react";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { IResult } from "../../Search/SearchResultItem/SearchResultItem";
import { User } from "firebase/auth";
// import { IAuthState } from "../../../ts/states/auth_state";
// import Image from "next/image";
// import { useAppDispatch } from "../../../app/hooks";
// import { removeDataBookmarks, setDataBookmarks } from "../../../app/store/slices/bookmarks";
// import { useState } from "react";

const Video: React.FC<{ 
    result:IResult, 
    user: User | null | undefined, 
    expand?: boolean, 
    src: string,
    isBookmarked: boolean
}> = ({ result, user, expand = false, src, isBookmarked }) => {

    return (
        <div className="image-container relative w-full" data-testid="video_container " >   
            <video autoPlay muted loop src={src} className="relative z-[100] w-full h-auto rounded-lg" />
            {
                expand && user && result.id &&
                <div className="flex absolute top-0 right-0 items-center justify-end z-[1000] w-full p-2 space-x-2">

                    <div className={`p-2 ${isBookmarked ? "bg-btnprimary rounded-full":"" } `}>
                        {
                            isBookmarked ? 
                                <BookmarkIconSolid className={`w-[18px] h-[18px] text-white } `} />
                                :
                                <BookmarkIconOutline className={`w-[18px] h-[18px] text-white `} />

                        }
                    </div>

                </div>          
            }
        </div>
    )
}

export default Video;
