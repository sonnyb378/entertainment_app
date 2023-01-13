import { useState } from "react";
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import * as React from "react";

import Register from "../../pages/register"

import { useRouter } from "next/router"
import { useAppDispatch } from "../../app/hooks"
import { setAuthData } from "../../app/store/slices/auth";

jest.mock('react', ()=>({
    ...jest.requireActual('react'),
    useState: jest.fn()
}))

jest.mock("next/router", () => ({
    __esModule: true,
    useRouter: jest.fn()
}))

jest.mock("../../firebase", () => ({
    auth: jest.fn(),
    googleProvider: {
        setCustomParameters: jest.fn()
    }  
}))
jest.mock("../../app/hooks", () => ({
    useAppDispatch: jest.fn()
}))
jest.mock("../../app/store/slices/auth", () => ({
    setAuthData: jest.fn()
}))

jest.mock("firebase/auth", () => ({ 
    createUserWithEmailAndPassword: jest.fn(() => (Promise.resolve(
        {
            user: {
                getIdTokenResult: jest.fn(() => Promise.resolve({ 
                    claims: {
                        user_id: "123"
                    },
                    token: "newtoken",
                    expiresAt: "datetime"
                }))
            }
        }
    )))
}));

const enterInputValue = function(container: HTMLElement, name: string, value: string) {
    const input = container.querySelector(`input[name='${name}']`)!
    expect(input).toBeInTheDocument()        
    fireEvent.change(input, { target: { value: `${value}` }})
}

describe("test register page", () => {
    beforeAll(() => {
        const mockUseState = useState as jest.Mock;
        mockUseState.mockImplementation(jest.requireActual('react').useState); 
    })

    afterAll(() => {
        jest.clearAllMocks();
    })

    it("must render <Register />", () => {
        render(<Register />)
        const register = screen.getByTestId("register_container")
        expect(register).toBeInTheDocument();
    })

    it("must render email address field", () => {
        const { debug, container } = render(<Register />)
        const registerContainer = screen.getByTestId("register_container")
        expect(registerContainer).toBeInTheDocument();

        const email = container.querySelector("input[name='email_address']")
        expect(email).toBeInTheDocument(); 

    })

    it("must render confirm email address field", () => {
        const { debug, container } = render(<Register />)
        const registerContainer = screen.getByTestId("register_container")
        expect(registerContainer).toBeInTheDocument();

        const confirm_email = container.querySelector("input[name='confirm_email_address']")
        expect(confirm_email).toBeInTheDocument(); 
    })

    it("must render password field", () => {
        const { debug, container } = render(<Register />)
        const registerContainer = screen.getByTestId("register_container")
        expect(registerContainer).toBeInTheDocument();

        const password = container.querySelector("input[name='password']")
        expect(password).toBeInTheDocument();
    })

    it("must render confirm password field", () => {
        const { debug, container } = render(<Register />)
        const registerContainer = screen.getByTestId("register_container")
        expect(registerContainer).toBeInTheDocument();

        const confirm_password = container.querySelector("input[name='confirm_password']")
        expect(confirm_password).toBeInTheDocument();
    })

    it("must not render register button if fields are empty", () => {
        const { debug } = render(<Register />)
        const registerContainer = screen.getByTestId("register_container")
        expect(registerContainer).toBeInTheDocument();

        const registerButton = within(registerContainer).queryByTestId("btn_component")
        expect(registerButton).not.toBeInTheDocument();
    })

    it("must render register button if all fields are entered", () => {
        const { debug, unmount, container } = render(<Register />)
        const registerContainer = screen.getByTestId("register_container")
        expect(registerContainer).toBeInTheDocument();

        enterInputValue(container, "email_address", "demo@demo.com")
        enterInputValue(container, "confirm_email_address", "demo@demo.com")
        enterInputValue(container, "password", "password")
        enterInputValue(container, "confirm_password", "password")

        const signInButton = within(registerContainer).getByTestId("btn_component")
        expect(signInButton).toBeInTheDocument();

        // debug()
    })

    it("must render an error message", () => {
        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [true, mockSetState])
        .mockImplementationOnce(() => ["demo@demo.com", mockSetState])
        .mockImplementationOnce(() => ["demo@demo.comm", mockSetState])
        .mockImplementationOnce(() => ["password", mockSetState])
        .mockImplementationOnce(() => ["passwordd", mockSetState])
        .mockImplementationOnce(() => [[{
            error: "Please confirm email address"
        },{
            error: "Please confirm password"
        }], mockSetState])

        render(<Register />)
        const register_container = screen.getByTestId("register_container")
        expect(register_container).toBeInTheDocument();

        const error = within(register_container).getByTestId("error_message")
        expect(error).toBeInTheDocument();

    })

    it("must display spinning component when register button is clicked", () => {
        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [true, mockSetState])
        .mockImplementationOnce(() => ["demo@demo.com", mockSetState])
        .mockImplementationOnce(() => ["demo@demo.com", mockSetState])
        .mockImplementationOnce(() => ["password", mockSetState])
        .mockImplementationOnce(() => ["password", mockSetState])
        .mockImplementationOnce(() => [[], mockSetState])

        const { debug } = render(<Register />)
        const register_container = screen.getByTestId("register_container")
        expect(register_container).toBeInTheDocument();

        const spinning_component = within(register_container).getByTestId("spinning_component")
        expect(spinning_component).toBeInTheDocument();

    })

    
    it("must render 'Sign In here' button", () => {
        render(<Register />)
        const signinHere = screen.getByText("Sign In here")
        expect(signinHere).toBeInTheDocument();
    })

    it("must trigger the onClick event of 'Sign In here' button", () => {
        
        const router = useRouter as jest.Mock;
        const mockRouter = {
            push: jest.fn()
        }
        router.mockReturnValue(mockRouter);

        render(<Register />)

        const register_container = screen.getByTestId("register_container")
        expect(register_container).toBeInTheDocument();

        const signInHereButton = within(register_container).getByTestId("signinhere_button")
        expect(signInHereButton).toBeInTheDocument();

        fireEvent.click(signInHereButton);

        expect(mockRouter.push).toHaveBeenCalledWith("./signin")


    })
    


    it("must mock register", async () => {

        const dispatch = useAppDispatch as jest.Mock;
        const mockSetAuthData = setAuthData as unknown as jest.Mock;
        const mockUserAuth = jest.fn()
        mockSetAuthData.mockReturnValue(mockUserAuth)
        dispatch.mockReturnValue(mockSetAuthData)

        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn()
        }
        router.mockReturnValue(mockRouter);

        const { debug, unmount, container } = render(<Register />)
        const registerContainer = screen.getByTestId("register_container")
        expect(registerContainer).toBeInTheDocument();

        enterInputValue(container, "email_address", "demo@demo.com")
        enterInputValue(container, "confirm_email_address", "demo@demo.com")
        enterInputValue(container, "password", "password")
        enterInputValue(container, "confirm_password", "password")

        const signInButton = within(registerContainer).getByTestId("btn_component")
        expect(signInButton).toBeInTheDocument();

        fireEvent.click(signInButton);
        
        await waitFor(() => {
            /*
                uncomment code in /pages/register.tsx  - line: 77
            */
            // for active registration
            // expect(mockRouter.replace).toHaveBeenCalledWith("./movies")

            // for disabled registration
            const registerDisabled = screen.getByText("Registration disabled.")
            expect(registerDisabled).toBeInTheDocument();
        })

    })


    /**
     * end of test
     */

    
})