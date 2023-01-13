import * as React from "react";
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import { useRouter } from "next/router"
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch } from "../../app/hooks"
import { setAuthData } from "../../app/store/slices/auth";

import Avatar from './Avatar';

jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn()
}))

jest.mock("react-firebase-hooks/auth", () => ({
    useAuthState: jest.fn()
}))

jest.mock("../../firebase", () => ({}))

jest.mock("../../app/store/slices/auth", () => ({
    setAuthData: jest.fn()
}))

jest.mock("../../app/hooks", () => ({
    useAppDispatch: jest.fn()
}))




describe("<Avatar />", () => {

    afterAll(() => {
        jest.clearAllMocks()
    })

    it("must display <Avatar />", () => {
        render(<Avatar />)
        const avatar = screen.getByTestId("avatar")
        expect(avatar).toBeInTheDocument()
    })

    it("must redirect to /user/mylist if 'My List' is clicked", () => {

        const router = useRouter as jest.Mock;
        const mockRouter = {
            push: jest.fn()
        }
        router.mockReturnValue(mockRouter);

        render(<Avatar />)
        const avatarComponent = screen.getByTestId("avatar")
        expect(avatarComponent).toBeInTheDocument();

        const myListButton = within(avatarComponent).getByTestId("mylist_btn")
        expect(myListButton).toBeInTheDocument();

        fireEvent.click(myListButton)

        expect(mockRouter.push).toHaveBeenCalledWith("/user/mylist")

    })

    it("must logout user", () => {
        const user = useAuthState as jest.Mock;        
        user.mockReturnValue([true]);

        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn()
        }
        router.mockReturnValue(mockRouter);

        const dispatch = useAppDispatch as jest.Mock;
        const mockSetAuthData = setAuthData as unknown as jest.Mock;
        const mockUserAuth = jest.fn()
        mockSetAuthData.mockReturnValue(mockUserAuth)
        dispatch.mockReturnValue(mockSetAuthData)

        render(<Avatar />)
        const avatarComponent = screen.getByTestId("avatar")
        expect(avatarComponent).toBeInTheDocument();

        const logoutButton = within(avatarComponent).getByTestId("logout_btn")
        expect(logoutButton).toBeInTheDocument();

        fireEvent.click(logoutButton)

        expect(mockSetAuthData).toHaveBeenCalledWith({
            id: null,
            accessToken: null,
            expiresAt: null,
        })
    })

    it("must toggle dropdown", () => {
        const { debug } = render(<Avatar />)
        const avatarComponent = screen.getByTestId("avatar")
        expect(avatarComponent).toBeInTheDocument();


        const dropdownHide = avatarComponent.querySelector(".dropdown_hide");
        expect(dropdownHide).toBeInTheDocument();

        fireEvent.click(avatarComponent)

        const dropdownShow = avatarComponent.querySelector(".dropdown_show");
        expect(dropdownShow).toBeInTheDocument();

        fireEvent.click(avatarComponent)

        const dropdownHide2 = avatarComponent.querySelector(".dropdown_hide");
        expect(dropdownHide2).toBeInTheDocument();

    })


})