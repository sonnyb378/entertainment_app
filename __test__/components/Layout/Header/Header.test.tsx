import * as React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import Header from '../../../../components/Layout/Header/Header';

import { useRouter } from "next/router";

import { useAuthState } from "react-firebase-hooks/auth";
// import { useAppDispatch } from "../../../app/hooks"
// import { setAuthData } from "../../../app/store/slices/auth";

jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn()
}))

jest.mock("react-firebase-hooks/auth", () => ({
    useAuthState: jest.fn()
}))

jest.mock("../../../../firebase", () => ({}))

jest.mock("../../../../app/store/slices/auth", () => ({
    setAuthData: jest.fn()
}))

jest.mock("../../../../app/hooks", () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn()
}))

global.window = Object.create(window);

describe('Header', () => {

    beforeAll(() => {
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const router = useRouter as jest.Mock;
        router.mockReturnValue({ pathname: "/register"})
    })

    afterAll(() => {
        jest.clearAllMocks();
    })

    it("must display header", () => {

        const router = useRouter as jest.Mock;
        const mockRouter = {
            asPath: {
                includes: jest.fn()
            }
        }
        router.mockReturnValue(mockRouter);
        
        render(<Header />)
        const headerComponent = screen.getByTestId("header")
        expect(headerComponent).toBeInTheDocument();           
        
    })

    it('must render a logo', () => {
        
        render(<Header />)
        const headerComponent = screen.getByTestId("header")
        expect(headerComponent).toBeInTheDocument(); 
        
        const router = useRouter as jest.Mock;
        const mockRouter = {
            asPath: {
                includes: jest.fn()
            }
        }
        router.mockReturnValue(mockRouter);

        const logoComponent = within(headerComponent).getByTestId("logo_container")
        expect(logoComponent).toBeInTheDocument();
    })

    it('must render a Register button', () => {
        const user = useAuthState as jest.Mock;        
        user.mockReturnValue([false]);

        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn(),
            asPath: {
                includes: jest.fn()
            }
        }
        router.mockReturnValue({ 
            replace: mockRouter.replace,
            pathname: "/signin"
        })       

        render(<Header />)
        const headerComponent = screen.getByTestId("header")
        expect(headerComponent).toBeInTheDocument();
        
        const buttonComponent = within(headerComponent).getByText("Register");
        expect(buttonComponent).toBeInTheDocument();

    })

    it('must redirect to register page on user click', () => {
        
        const user = useAuthState as jest.Mock;        
        user.mockReturnValue([false]);

        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn(),
            pathname: "/signin",
            asPath: {
                includes: jest.fn()
            }
        }
        router.mockReturnValue(mockRouter);

        render(<Header />)
        const headerComponent = screen.getByTestId("header")
        expect(headerComponent).toBeInTheDocument();
        
        const buttonComponent = within(headerComponent).getByText("Register");
        expect(buttonComponent).toBeInTheDocument();

        fireEvent.click(buttonComponent);

        expect(mockRouter.replace).toHaveBeenCalledWith("/register");

    })

    it('must render a SignIn button', () => {
       
        const user = useAuthState as jest.Mock;        
        user.mockReturnValue([false]);

        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn(),
            asPath: {
                includes: jest.fn()
            }
        }
        router.mockReturnValue({ 
            replace: mockRouter.replace,
            pathname: "/register"
        })       

        render(<Header />)
        const headerComponent = screen.getByTestId("header")
        expect(headerComponent).toBeInTheDocument();
        
        const buttonComponent = within(headerComponent).getByText("Sign In");
        expect(buttonComponent).toBeInTheDocument();

    })

    it('must redirect to sign in page on user click', () => {
        
        const user = useAuthState as jest.Mock;        
        user.mockReturnValue([false]);

        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn(),
            pathname: "/register",
            asPath: {
                includes: jest.fn()
            }
        }
        router.mockReturnValue(mockRouter);

        render(<Header />)
        const headerComponent = screen.getByTestId("header")
        expect(headerComponent).toBeInTheDocument();
        
        const buttonComponent = within(headerComponent).getByText("Sign In");
        expect(buttonComponent).toBeInTheDocument();

        fireEvent.click(buttonComponent);

        expect(mockRouter.replace).toHaveBeenCalledWith("/signin");

    })

    it('must display navigation', () => {
        const user = useAuthState as jest.Mock;        
        user.mockReturnValue([true]);

        render(<Header />)
        const headerComponent = screen.getByTestId("header")
        expect(headerComponent).toBeInTheDocument();

        const navComponent = within(headerComponent).getByTestId("navigation_container");
        expect(navComponent).toBeInTheDocument();
    })

    it('must not display navigation', () => {
        const user = useAuthState as jest.Mock;        
        user.mockReturnValue([false]);

        render(<Header />)
        const headerComponent = screen.getByTestId("header")
        expect(headerComponent).toBeInTheDocument();

        const navComponent = within(headerComponent).queryByTestId("navigation_container");
        expect(navComponent).toBeNull();
    })

    it("must display Avatar button", () => {
        const user = useAuthState as jest.Mock;        
        user.mockReturnValue([true]);

        render(<Header />)
        const headerComponent = screen.getByTestId("header")
        expect(headerComponent).toBeInTheDocument();

        const avatar = within(headerComponent).getByTestId("avatar")
        expect(avatar).toBeInTheDocument();

    })

    

    

})

