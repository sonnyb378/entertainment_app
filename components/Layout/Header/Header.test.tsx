import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import Header from './Header';

import { useRouter } from "next/router";

import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch } from "../../../app/hooks"
import { setAuthData } from "../../../app/store/slices/auth";

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

jest.mock("../../../app/hooks", () => ({
    useAppDispatch: jest.fn()
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

        render(<Header />)
        const headerComponent = screen.getByTestId("header")
        expect(headerComponent).toBeInTheDocument();           
        
    })

    it('must render a logo', () => {
        
        render(<Header />)
        const headerComponent = screen.getByTestId("header")
        expect(headerComponent).toBeInTheDocument(); 

        const logoComponent = within(headerComponent).getByTestId("logo_container")
        expect(logoComponent).toBeInTheDocument();
    })

    it('must render a Register button', () => {
        const user = useAuthState as jest.Mock;        
        user.mockReturnValue([false]);

        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn()
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
            pathname: "/signin"
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
            replace: jest.fn()
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
            pathname: "/register"
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

    // it("must mock signOut handler", () => {
    //     const user = useAuthState as jest.Mock;        
    //     user.mockReturnValue([true]);

    //     const dispatch = useAppDispatch as jest.Mock;

    //     const mockSetAuthData = setAuthData as unknown as jest.Mock;
    //     const mockUserAuth = jest.fn()
    //     mockSetAuthData.mockReturnValue(mockUserAuth)
    //     dispatch.mockReturnValue(mockSetAuthData)

    //     render(<Header />)
    //     const headerComponent = screen.getByTestId("header")
    //     expect(headerComponent).toBeInTheDocument();

    //     const logoutButton = within(headerComponent).getByText("Logout")
    //     expect(logoutButton).toBeInTheDocument();

    //     fireEvent.click(logoutButton)

    //     expect(mockSetAuthData).toHaveBeenCalledWith({
    //         id: null,
    //         accessToken: null,
    //         expiresAt: null,
    //     })

    // })

    

})

