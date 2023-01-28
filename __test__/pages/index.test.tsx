import * as React from "react";
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import Home from "../../pages/index"

import { useRouter } from "next/router"
// import { selectAuth } from "../../app/store/slices/auth";
import { useAppSelector } from "../../app/hooks";
import { useAuthState } from "react-firebase-hooks/auth";

jest.mock('nookies', () => (
    {
        __esModule: true,
        parseCookies: jest.fn().mockReturnValue({
            token: "sometokenvalue"
        })
    }
))
jest.mock("react-firebase-hooks/auth", () => ({
    useAuthState: jest.fn()
}))

jest.mock("next/router", () => ({
    __esModule: true,
    useRouter: jest.fn()
})) 
jest.mock("../../firebase", () => ({
    auth: jest.fn(),
}))
jest.mock("../../app/hooks", () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn()
}))
jest.mock("../../app/store/slices/auth", () => ({}))




// const searchSection = function(parent: string, searchFor?: string) {
//     let section: any

//     render(<Home />)      

//     const parent_container = screen.getByTestId(parent)
//     expect(parent_container).toBeInTheDocument();

//     if (!!searchFor) {
//         section = within(parent_container).getByTestId(searchFor)
//         expect(section).toBeInTheDocument();
//     }
//     return {
//         parent_container,
//         section
//     }
// }

describe("Homepage", () => {


    afterAll(() => {
        jest.clearAllMocks();
    })

    it("must render homepage", () => {    
        const setState = jest.fn();
        jest.spyOn(React, "useState")
        .mockImplementationOnce(() => [false, setState])

        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([false, false]);
        
        const router = useRouter as jest.Mock;
        const mockRouter = {
            asPath: jest.fn()
        }
        router.mockReturnValue(mockRouter)

        render(<Home />)      
        const parent_container = screen.getByTestId("homepage_container")
        expect(parent_container).toBeInTheDocument();

    })

    it("must redirect to /movies if user is logged in", () => {  


        const setState = jest.fn();
        jest.spyOn(React, "useState")
        .mockImplementationOnce(() => [true, setState])

        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn()
        }
        router.mockReturnValue(mockRouter)
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        render(<Home />)
        expect(mockRouter.replace).toHaveBeenCalledWith("/movies")
    })

    it("must render 'Getting Started' section", () => {  
        const setState = jest.fn();
        jest.spyOn(React, "useState")
        .mockImplementationOnce(() => [false, setState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([false, false]);

        render(<Home />)      
        const parent_container = screen.getByTestId("homepage_container")
        expect(parent_container).toBeInTheDocument();

        const section = within(parent_container).getByTestId("getting_started")
        expect(section).toBeInTheDocument();
    })

    it("must redirect to register page if 'Getting Started' button is clicked", () => {
        const setState = jest.fn();
        jest.spyOn(React, "useState")
        .mockImplementationOnce(() => [false, setState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([false, false]);

        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn()
        }
        router.mockReturnValue(mockRouter);

        render(<Home />)      
        const parent_container = screen.getByTestId("homepage_container")
        expect(parent_container).toBeInTheDocument();

        const btn = within(parent_container).getByTestId("btn_component")
        expect(btn).toBeInTheDocument();

        fireEvent.click(btn);
        expect(mockRouter.replace).toHaveBeenCalledWith("/register")
    })

    it("must render getting 'Enjoy Your TV' section", () => {
        const setState = jest.fn();
        jest.spyOn(React, "useState")
        .mockImplementationOnce(() => [false, setState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([false, false]);

        render(<Home />)      
        const parent_container = screen.getByTestId("homepage_container")
        expect(parent_container).toBeInTheDocument();

        const section = within(parent_container).getByTestId("enjoy_your_tv")
        expect(section).toBeInTheDocument();  
    })

    it("must render getting 'Download and Watch' section", () => {
        const setState = jest.fn();
        jest.spyOn(React, "useState")
        .mockImplementationOnce(() => [false, setState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([false, false]);

        render(<Home />)      
        const parent_container = screen.getByTestId("homepage_container")
        expect(parent_container).toBeInTheDocument();

        const section = within(parent_container).getByTestId("download_and_watch")
        expect(section).toBeInTheDocument();   
    })

    it("must render getting 'Stream Anywhere' section", () => {
        const setState = jest.fn();
        jest.spyOn(React, "useState")
        .mockImplementationOnce(() => [false, setState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([false, false]);

        render(<Home />)      
        const parent_container = screen.getByTestId("homepage_container")
        expect(parent_container).toBeInTheDocument();

        const section = within(parent_container).getByTestId("stream_anywhere")
        expect(section).toBeInTheDocument(); 
    })

    it("must render getting 'Frequently Asked Questions' section", () => {
        const setState = jest.fn();
        jest.spyOn(React, "useState")
        .mockImplementationOnce(() => [false, setState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([false, false]);

        render(<Home />)      
        const parent_container = screen.getByTestId("homepage_container")
        expect(parent_container).toBeInTheDocument();

        const section = within(parent_container).getByTestId("frequently_asked_questions")
        expect(section).toBeInTheDocument(); 
    })


})