import * as React from "react";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Watch from '../../../../components/Layout/Watch/Watch';

import { auth } from "../../../../firebase";
import { parseCookies, setCookie } from "nookies"

jest.mock('axios');
jest.mock('nookies', () => (
    {
        __esModule: true,
        parseCookies: jest.fn(),
        setCookie: jest.fn()
    }
))

jest.mock("../../../../firebase", () => ({
    auth: jest.fn(),
}))


describe("<Watch />", () => {
    it("must display the <Watch /> component", () => {

        const mockNookies = parseCookies as jest.Mock;
        mockNookies.mockReturnValue({
            token: "somecookietoken"
        })

        render(<Watch />)
        const container = screen.getByTestId("main_component")
        expect(container).toBeInTheDocument();
    })
})