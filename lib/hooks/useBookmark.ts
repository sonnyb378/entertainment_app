import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../app/store/slices/auth";
import { db } from "../../firebase";
import { IAuthState } from "../../ts/states/auth_state";

export const useBookmark = () => {
    const user = useAppSelector<IAuthState>(selectAuth);

    const [bookmarks, setBookmarks] = useState<any>(null);

    const fetchBookmarks = async () => {
        const movieList:any = [];
        const tvList:any = [];

        const docRefMovie = collection(db, "bookmark", `${user.id}`, "movie");
        const docSnapMovie = await getDocs(docRefMovie);
    
        const docRefTV = collection(db, "bookmark", `${user.id}`, "tv");
        const docSnapTV = await getDocs(docRefTV);

        if (!docSnapMovie.empty) movieList.push(...docSnapMovie.docs);
    
        if (!docSnapTV.empty) tvList.push(...docSnapTV.docs);


        let bookmarkCombine:any[] = [...movieList, ...tvList];
        let bookmarkArr:any[] = [];

        if (bookmarkCombine) {
            bookmarkCombine && bookmarkCombine.map((bookmark:any, i:any) => {
                const data = {
                    id: bookmark.data().id,
                    name: bookmark.data().name,
                    media_type: bookmark.data().media_type,
                    genre_ids: bookmark.data().genre_ids,
                    backdrop_path: bookmark.data().backdrop_path,
                    poster_path: bookmark.data().poster_path,
                }
                bookmarkArr.push(data)      
            })
            setBookmarks(bookmarkArr)
        } 

    }

    return {
        dataBookmark: bookmarks,
        bookmarkLoading: !bookmarks,
        fetchBookmarks
    }


}