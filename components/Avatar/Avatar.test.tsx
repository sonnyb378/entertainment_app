import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import Movies from "../../pages/movies"

import { useRouter } from "next/router"
import Avatar from './Avatar';

jest.mock("next/router", () => ({
    __esModule: true,
    useRouter: jest.fn()
})) 
jest.mock("../../firebase", () => ({
    auth: jest.fn(),
}))
jest.mock("../../app/hooks", () => ({
    useAppDispatch: jest.fn()
}))
jest.mock("../../app/store/slices/auth", () => ({
    setAuthData: jest.fn()
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
})