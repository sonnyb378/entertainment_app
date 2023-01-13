import { useState } from "react";
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import Signin from "../../pages/signin"

import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from 'next/router';
import { useAppDispatch } from "../../app/hooks"
import { setAuthData } from "../../app/store/slices/auth";

import * as React from "react";

jest.useFakeTimers();

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
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
    signInWithPopup: jest.fn(() => (Promise.resolve(
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
}))

jest.mock('react', ()=>({
    ...jest.requireActual('react'),
    useState: jest.fn()
}))

describe("test sign in page", () => {

    beforeAll(() => {
        const mockUseState = useState as jest.Mock;
        mockUseState.mockImplementation(jest.requireActual('react').useState);

        const mockUserAuthState = useAuthState as jest.Mock;
        mockUserAuthState.mockReturnValue([true, false])    
    })

    afterAll(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    })

    it("must display email address field", () => {

        render(<Signin />)
        const signinContainer = screen.getByTestId("signin_container")
        expect(signinContainer).toBeInTheDocument();

        const email = within(signinContainer).getByText("Email Address")
        expect(email).toBeInTheDocument();        

    })
    
    it("must display password field", () => {
        render(<Signin />)
        const signinContainer = screen.getByTestId("signin_container")
        expect(signinContainer).toBeInTheDocument();

        const password = within(signinContainer).getByText("Password")
        expect(password).toBeInTheDocument();  
    })

    it("must not render 'Sign In' button, when email and password are empty", () => {
        const {container } = render(<Signin />)

        const emailField = container.querySelector("input[name='email_address']")!
        expect(emailField).toBeInTheDocument()
        fireEvent.change(emailField, { target: { value: "" }}) 

        const passwordField = container.querySelector("input[name='password']")!
        expect(passwordField).toBeInTheDocument()        
        fireEvent.change(passwordField, { target: { value: "" }})

        const signinContainer = screen.getByTestId("signin_container")
        expect(signinContainer).toBeInTheDocument();

        const signInButton = within(signinContainer).queryByTestId("btn_component")
        expect(signInButton).not.toBeInTheDocument();
    })

    it("must render 'Sign In' button, when email and password are entered", () => {

        const { unmount, container } = render(<Signin />)
        const signinContainer = screen.getByTestId("signin_container")
        expect(signinContainer).toBeInTheDocument();

        const emailField = container.querySelector("input[name='email_address']")!
        expect(emailField).toBeInTheDocument()
        fireEvent.change(emailField, { target: { value: "demo@demo.com" }})

        const passwordField = container.querySelector("input[name='password']")!
        expect(passwordField).toBeInTheDocument()        
        fireEvent.change(passwordField, { target: { value: "password" }})

        const signInButton = within(signinContainer).getByTestId("btn_component")
        expect(signInButton).toBeInTheDocument();

        unmount()
        
    })

    it("must display spinning component during login process", async () => {

        const mockSetState = jest.fn()
        jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => [true, mockSetState])
        .mockImplementationOnce(() => ["demo@demo.com", mockSetState])
        .mockImplementationOnce(() => ["password", mockSetState])
        .mockImplementationOnce(() => [[], mockSetState])

        const { debug, container } = render(<Signin />)

        const signinContainer = screen.getByTestId("signin_container")
        expect(signinContainer).toBeInTheDocument();

        await waitFor(() => {           
            // debug()
            const spinner = within(signinContainer).getByTestId("spinning_component")
            expect(spinner).toBeInTheDocument();
        })
    })

    it("must display error message if email or password is invalid", async () => {

        const mockSetState = jest.fn()
        jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, mockSetState])
        .mockImplementationOnce(() => ["demo@demo.com", mockSetState])
        .mockImplementationOnce(() => ["wrongpassword", mockSetState])
        .mockImplementationOnce(() => [[{ error: "Please check your email and password" }], mockSetState])

        const {container } = render(<Signin />)

        const signinContainer = screen.getByTestId("signin_container")
        expect(signinContainer).toBeInTheDocument();
     
        await waitFor(() => {           
            // debug()
            const error = within(signinContainer).getByText("Please check your email and password")
            expect(error).toBeInTheDocument();
        })
    })

    it("must display 'Sign In with Google' button", () => {
        
        render (<Signin />)
        const signInWithGoogle = screen.getByTestId("google_signin")
        expect(signInWithGoogle).toBeInTheDocument();

    })

    it("must mock Google login", async () => {

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

        const stateSetter = jest.fn()
        jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, stateSetter])
        .mockImplementationOnce(() => ["", stateSetter])
        .mockImplementationOnce(() => ["", stateSetter])
        .mockImplementationOnce(() => [[], stateSetter])

        const { debug } = render (<Signin />)
        const signInContainer = screen.getByTestId("signin_container")
        expect(signInContainer).toBeInTheDocument();

        const signInWithGoogle = within(signInContainer).getByTestId("google_signin")
        expect(signInWithGoogle).toBeInTheDocument();

        fireEvent.click(signInWithGoogle)

        await waitFor(() => {
            expect(mockRouter.replace).toHaveBeenCalledWith("./movies")
        })

    })

    /**
     * end of test
     */

})