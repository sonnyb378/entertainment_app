import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useRouter } from "next/router"
import { removeDataBookmarks, setDataBookmarks } from '../../app/store/slices/bookmarks'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Search from '../../pages/search'

jest.mock("next/router", () => ({
    __esModule: true,
    useRouter: jest.fn()
}))

jest.mock("../../app/hooks", () => ({
    __esModule: true,
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn()
}))

jest.mock("../../firebase", () => ({
    auth: jest.fn(),
}))

jest.mock("../../app/store/slices/bookmarks", () => ({
    setDataBookmarks: jest.fn(),
    removeDataBookmarks: jest.fn(),
    selectBookmarkData: jest.fn()
}))

describe("<Search />", () => {

    beforeAll(() => {           
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render <Search />", () => {
        
        const bookmarkData = {
            "id": 555604,
            "name": "Guillermo del Toro's Pinocchio",
            "backdrop_path": "/tyNqJUWqqb0tjhqXYH4uwRwsp6A.jpg",
            "poster_path": "/vx1u0uwxdlhV2MUzj4VlcMB0N6m.jpg",
            "media_type": "movie",
            "genre_ids": [
                16,
                14,
                18
            ]
        }

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            currentUrl: "/movies"
        })
        .mockReturnValueOnce({
            accessToken: "123"
        })
        .mockReturnValueOnce({ data: [bookmarkData] })

        const router = useRouter as jest.Mock;
        const mockRouter = {
            asPath: {
                includes: jest.fn().mockImplementation(() => "/search?q=movietitle"),
                split: jest.fn().mockReturnValue(["/search", "q=movietitle"])
            },
            push: jest.fn()
        }
        router.mockReturnValue(mockRouter)


        const { debug, container } = render(<Search />)
        const search_container = within(container).getByTestId("search_container")
        expect(search_container).toBeInTheDocument();

        debug();
    })


    it("must render <SearchResults />", () => {
        
        const bookmarkData = {
            "id": 555604,
            "name": "Guillermo del Toro's Pinocchio",
            "backdrop_path": "/tyNqJUWqqb0tjhqXYH4uwRwsp6A.jpg",
            "poster_path": "/vx1u0uwxdlhV2MUzj4VlcMB0N6m.jpg",
            "media_type": "movie",
            "genre_ids": [
                16,
                14,
                18
            ]
        }

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            currentUrl: "/movies"
        })
        .mockReturnValueOnce({
            accessToken: "123"
        })
        .mockReturnValueOnce({ data: [bookmarkData] })

        const router = useRouter as jest.Mock;
        const mockRouter = {
            asPath: {
                includes: jest.fn().mockImplementation(() => "/search?q=movietitle"),
                split: jest.fn().mockReturnValue(["/search", "q=movietitle"])
            },
            push: jest.fn()
        }
        router.mockReturnValue(mockRouter)


        const { debug, container } = render(<Search />)
        const search_container = within(container).getByTestId("search_container")
        expect(search_container).toBeInTheDocument();

        const search_results_container = within(search_container).getByTestId("search_results_container")
        expect(search_results_container).toBeInTheDocument();

    })

})