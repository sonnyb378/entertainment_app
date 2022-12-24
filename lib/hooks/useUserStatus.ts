import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../app/store/slices/auth";
import { IAuthState } from "../../ts/states/auth_state";


const useUserStatus = () => {
    const [isOnline, setIsOnline] = useState(false)
    const user = useAppSelector<IAuthState>(selectAuth);

    useEffect(() => {
        if (user && user.accessToken) {
            setIsOnline(true)
        }        
    }, [])

    return {
        isOnline,
        user
    }
}

export default useUserStatus;