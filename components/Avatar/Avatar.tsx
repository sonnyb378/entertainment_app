import React, { useState, useEffect, useRef } from "react";
import styles from "./Avatar.module.css";

import { BookmarkIcon } from "@heroicons/react/24/solid";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAppDispatch } from "../../app/hooks";
import { setAuthData } from "../../app/store/slices/auth";
import { setCurrentUrl } from "../../app/store/slices/url";
import { useRouter } from "next/router"
import nookies, { setCookie } from "nookies"
import Link from "next/link";

export interface IAvatar {
    userInitial?: string
}

const Avatar: React.FC<IAvatar> = ({ userInitial }) => {
    const router = useRouter();
    const [show, setShow] = useState(false)
    const dispatch = useAppDispatch()        

    const dropDownRef = useRef<HTMLDivElement | null>(null)

    const closeAvatar = (e:any) => {
        if (dropDownRef.current && show && !dropDownRef.current.contains(e.target)) {
            setShow(false)
        }
    }

    document.addEventListener("mousedown", closeAvatar)

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (show) {
                setShow(false)
            }
        })
    },[show])

    const logoutHandler = () => {
        signOut(auth);

        setCookie(undefined, 'token', "", { path: '/' });

        dispatch(setCurrentUrl({
            currentUrl: "/"
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
                <div ref={dropDownRef} className={ show ? styles.dropdown_show : styles.dropdown_hide} id="signin_dropdown" >
                    <ul className={ styles.menu }>
                        <li className={ styles.menu_item } data-testid='mylist_btn' onClick={ myListHandler }>
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