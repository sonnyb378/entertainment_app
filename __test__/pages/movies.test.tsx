import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import Movies from "../../pages/movies"

import { useRouter } from "next/router"

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


describe("<Movies />", () => {
    
    // afterAll(() => {
    //     jest.clearAllMocks();
    // })

    // it("must render the movies page", () => {
    //     render(<Movies />)
    //     const movies_container = screen.getByTestId("movies_container")
    //     expect(movies_container).toBeInTheDocument();
    // })

    it("must render header with navigation bar and user avatar", () => {

    })


})