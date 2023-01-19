import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from "next/router"
// import { useAppSelector } from "../../../app/hooks"
// import { selectCurrentUrl } from "../../../app/store/slices/url";

import SearchField from "./SearchField"

jest.mock("../../../app/hooks", () => ({
    useAppSelector: jest.fn()
}))

jest.mock("next/router", () => ({
    __esModule: true,
    useRouter: jest.fn()
}))

jest.mock("../../../app/store/slices/url", () => ({
    selectCurrentUrl: jest.fn()
}))

describe("<PopularCard />", () => {

    beforeAll(() => {           
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render <SearchField />", () => {
        const router = useRouter as jest.Mock;
        const mockRouter = {
            asPath: jest.fn()
        }
        router.mockReturnValue(mockRouter)

        render(<SearchField />)
        const search = screen.getByTestId("search_container")
        expect(search).toBeInTheDocument();
    })

    it("must trigger onChange handler", () => {
        const router = useRouter as jest.Mock;
        const mockRouter = {
            asPath: jest.fn()
        }
        router.mockReturnValue(mockRouter)

        render(<SearchField />)
        const search = screen.getByTestId("search_container")
        expect(search).toBeInTheDocument();

        const search_input = screen.getByTestId("search_input")
        expect(search_input).toBeInTheDocument();

        fireEvent.change(search_input, { target: { value: "some movie title" }})

        expect((search_input as HTMLInputElement).value).toEqual("some movie title")


    })

})