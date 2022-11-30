import { useState } from "react";
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import * as React from "react";

import Register from "../../pages/register"

jest.mock('react', ()=>({
    ...jest.requireActual('react'),
    useState: jest.fn()
}))

describe("test register page", () => {
    beforeAll(() => {
        const mockUseState = useState as jest.Mock;
        mockUseState.mockImplementation(jest.requireActual('react').useState); 
    })
    afterAll(() => {
        jest.clearAllMocks();
    })
    it("must render email address field", () => {

    })
    it("must render confirm email address field", () => {

    })
    it("must render password field", () => {

    })
    it("must render confirm password field", () => {

    })

    it("must not render register button if fields are empty", () => {

    })

    it("must render register button if all fields are entered", () => {

    })

    it("must render an error if email or password is not confirmed", () => {

    })

    it("must display spinning component when register button is clicked", () => {
        const mockSetState = jest.fn()
        jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => [true, mockSetState])
        .mockImplementationOnce(() => ["demo@demo.com", mockSetState])
        .mockImplementationOnce(() => ["demo@demo.com", mockSetState])
        .mockImplementationOnce(() => ["password", mockSetState])
        .mockImplementationOnce(() => ["password", mockSetState])
        .mockImplementationOnce(() => [[], mockSetState])
    })

    it("must mock register", () => {

    })

    it("must render 'Already have an account?' button", () => {

    })

    /**
     * end of test
     */

    
})