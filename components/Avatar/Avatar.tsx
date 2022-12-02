import React, { useState, useEffect } from "react";

import { BookmarkIcon } from "@heroicons/react/24/solid";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

import styles from "./Avatar.module.css";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAppDispatch } from "../../app/hooks";
import { setAuthData } from "../../app/store/slices/auth";

import { useRouter } from "next/router"

export interface IAvatar {
    userInitial?: string
}

const Avatar: React.FC<IAvatar> = ({ userInitial }) => {
    const router = useRouter();
    const [show, setShow] = useState(false)
    const dispatch = useAppDispatch()    
    
    const logoutHandler = () => {
        signOut(auth);
        dispatch(setAuthData({
            id: null,
            accessToken: null,
            expiresAt: null
        }))
    }

    const myListHandler = () => { 
        router.push("/user/mylist")
    }

    const toggleDropdown = () => {
        setShow(!show)
    }

    return (
        <div className={ styles.container } data-testid="avatar" onClick={toggleDropdown}>
            <div className={ styles.avatar } data-testid="initial_container">{ userInitial || "" }</div>
            <div className={ show ? styles.dropdown_show : styles.dropdown_hide} >
                <ul className={ styles.menu }>
                    <li className={ styles.menu_item } onClick={ myListHandler } data-testid='mylist_btn'>
                        <BookmarkIcon className="w-[20px] h-[20px] mr-2" />My List
                    </li>
                    <li className={ styles.menu_item } onClick={ logoutHandler } data-testid='logout_btn'>
                        <ArrowRightOnRectangleIcon className="w-[20px] h-[20px] mr-2" />Logout
                    </li>
                </ul>
            </div>
        </div>
    )

}

export default Avatar;