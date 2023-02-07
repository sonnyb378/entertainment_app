import * as React from "react";
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import { useRouter } from "next/router"
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch } from "../../../app/hooks"
import { setAuthData } from "../../../app/store/slices/auth";

import axios from "axios"

import Avatar from '../../../components/Avatar/Avatar';

import { parseCookies, setCookie } from "nookies"
import * as Nookies from "nookies";
import { setCurrentUrl } from "../../../app/store/slices/url";
import { useState } from "react";

jest.mock('axios');
jest.mock('nookies', () => ({
    __esModule: true,
    parseCookies: jest.fn(),
    setCookie: jest.fn()
}))

jest.mock('react', ()=>({
    ...jest.requireActual('react'),
    useState: jest.fn()
}))

jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn()
}))

jest.mock("react-firebase-hooks/auth", () => ({
    useAuthState: jest.fn()
}))

jest.mock("../../../firebase", () => ({}))

jest.mock("../../../app/store/slices/auth", () => ({
    setAuthData: jest.fn()
}))

jest.mock("../../../app/store/slices/url", () => ({
    setCurrentUrl: jest.fn()
}))

jest.mock("../../../app/hooks", () => ({
    useAppDispatch: jest.fn()
}))




describe("<Avatar />", () => {

    beforeEach(() => {
        const mockUseState = useState as jest.Mock;
        mockUseState.mockImplementation(jest.requireActual('react').useState);
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must display <Avatar />", () => {
        render(<Avatar />)
        const avatar = screen.getByTestId("avatar")
        expect(avatar).toBeInTheDocument()
    })

    it("must redirect to /user/mylist if 'My List' is clicked", () => {

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [true, mockSetState])

        const router = useRouter as jest.Mock;
        const mockRouter = {
            push: jest.fn()
        }
        router.mockReturnValue(mockRouter);

        const { debug, container } = render(<Avatar />)
        const avatarComponent = within(container).getByTestId("avatar")
        expect(avatarComponent).toBeInTheDocument();

        const myListButton = within(container).getByTestId("mylist_btn")
        expect(myListButton).toBeInTheDocument();

        fireEvent.click(myListButton)

        expect(mockRouter.push).toHaveBeenCalledWith("/user/mylist")

    })

    it("must logout user", () => {

        const mockSetState = jest.fn()
        jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => [true, mockSetState])

        const mockSetCookie = setCookie as jest.Mock;
        mockSetCookie.mockReturnValue(jest.fn());

        const dispatch = useAppDispatch as jest.Mock;
        const mockSetCurrentUrl = setCurrentUrl as unknown as jest.Mock;
        const mockCurrentUrl = jest.fn()
        mockSetCurrentUrl.mockReturnValue(mockCurrentUrl)
        dispatch.mockReturnValue(mockSetCurrentUrl)

        const user = useAuthState as jest.Mock;        
        user.mockReturnValue([true, false]);

        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn()
        }
        router.mockReturnValue(mockRouter);

        const { container } = render(<Avatar />)
        const avatarComponent = within(container).getByTestId("avatar")
        expect(avatarComponent).toBeInTheDocument();

        const logoutButton = within(container).getByTestId("logout_btn")
        expect(logoutButton).toBeInTheDocument();

        fireEvent.click(logoutButton)

        expect(mockSetCookie).toHaveBeenCalled()
        expect(mockSetCurrentUrl).toHaveBeenCalled()

    })

    it("must toggle dropdown", () => {
        const { debug, container } = render(<Avatar />)
        const avatarComponent = within(container).getByTestId("avatar")
        expect(avatarComponent).toBeInTheDocument();

        const dropdownHide = container.querySelector(".dropdown_hide");
        expect(dropdownHide).toBeTruthy();

        fireEvent.click(avatarComponent)

        const dropdownShow = container.querySelector(".dropdown_show");
        expect(dropdownShow).toBeTruthy();

        fireEvent.click(avatarComponent)

        const dropdownHide2 = container.querySelector(".dropdown_hide");
        expect(dropdownHide2).toBeTruthy();

    })


})