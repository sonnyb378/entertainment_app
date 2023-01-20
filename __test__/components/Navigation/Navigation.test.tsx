import { fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'

// import { useAuthState } from "react-firebase-hooks/auth";
import {useRouter} from "next/router"; 
import Navigation from "../../../components/Navigation/Navigation";
import * as React from "react";
import { useState } from "react";

jest.mock("next/router", () => ({
    __esModule: true,
    useRouter: jest.fn()
}))

jest.mock('react', ()=>({
    ...jest.requireActual('react'),
    useState: jest.fn()
}))


describe("<Navigation />", () => {

    beforeEach(() => {
        const mockUseState = useState as jest.Mock;
        mockUseState.mockImplementation(jest.requireActual('react').useState);
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must display navigation", () => {
        const mockSetState = jest.fn()
        jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, mockSetState])

        render(<Navigation />)
        const nav = screen.getByTestId('toggle_nav')
        expect(nav).toBeInTheDocument();
    })

    
    it("must redirect to /movies when 'Movies' button is clicked", () => {
        const mockSetState = jest.fn()
        jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, mockSetState])

        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn()
        }
        router.mockReturnValue(mockRouter)

        render(<Navigation />)
        const navBtn = screen.getByTestId('nav_movies')
        expect(navBtn).toBeInTheDocument()

        fireEvent.click(navBtn)
        expect(mockRouter.replace).toHaveBeenCalledWith("/movies")

    })

    it("must redirect to /tvshows when 'TV Shows' button ic clicked", () => {
        const mockSetState = jest.fn()
        jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, mockSetState])

        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn()
        }
        router.mockReturnValue(mockRouter)

        render(<Navigation />)
        const navBtn = screen.getByTestId('nav_tvshows')
        expect(navBtn).toBeInTheDocument()

        fireEvent.click(navBtn)
        expect(mockRouter.replace).toHaveBeenCalledWith("/tvshows")
    })

    it("must redirect to /user/mylist when 'My List' button ic clicked", () => {
        const mockSetState = jest.fn()
        jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, mockSetState])

        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn()
        }
        router.mockReturnValue(mockRouter)

        render(<Navigation />)
        const navBtn = screen.getByTestId('nav_mylist')
        expect(navBtn).toBeInTheDocument()

        fireEvent.click(navBtn)
        expect(mockRouter.replace).toHaveBeenCalledWith("/user/mylist")
    })

    it("must trigger toggle dropdown", () => {

        const { debug, container } = render(<Navigation />)
        const navigation = screen.getByTestId("navigation_container")

        const dropdownBtn = within(container).getByTestId("toggle_dropdown_btn")
        expect(dropdownBtn).toBeInTheDocument();

        fireEvent.click(dropdownBtn); 
        const showDropdown = navigation.querySelector(".show_navigation");
        expect(showDropdown).toBeInTheDocument();

        fireEvent.click(dropdownBtn); 
        const hideDropdown = navigation.querySelector(".navigation");
        expect(hideDropdown).toBeInTheDocument();

    })



})
