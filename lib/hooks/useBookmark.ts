import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../app/store/slices/auth";
import { db } from "../../firebase";
import { IAuthState } from "../../ts/states/auth_state";

export const useBookmark = () => {
    const user = useAppSelector<IAuthState>(selectAuth);

    const [bookmarks, setBookmarks] = useState<any[]>([]);

    const fetchBookmarks = async () => {
        const movieList:any = [];
        const tvList:any = [];

        const docRefMovie = collection(db, "bookmark", `${user.id}`, "movie");
        const docSnapMovie = await getDocs(docRefMovie);
    
        const docRefTV = collection(db, "bookmark", `${user.id}`, "tv");
        const docSnapTV = await getDocs(docRefTV);

        if (!docSnapMovie.empty) {
            movieList.push(...docSnapMovie.docs);
        } else {
            // console.log("movie No such document!");
        }
    
        if (!docSnapTV.empty) {
            tvList.push(...docSnapTV.docs);
        } else {
            // console.log("tv: No such document!");
        }

        setBookmarks([...movieList, ...tvList])

    }

    return {
        bookmark_data: bookmarks,
        fetchBookmarks
    }


}