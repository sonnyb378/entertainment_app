import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import MyList from "../../../pages/user/mylist"

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setCurrentUrl } from '../../../app/store/slices/url'
import { useRouter } from "next/router"

jest.mock("next/router", () => ({
    __esModule: true,
    useRouter: jest.fn()
})) 
jest.mock("../../../firebase", () => ({
    auth: jest.fn(),
}))
jest.mock("../../../app/hooks", () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn()
}))
jest.mock("../../../app/store/slices/auth", () => ({
    setAuthData: jest.fn()
}))

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} priority="true" />
    },
}))

jest.mock("../../../app/store/slices/url", () => ({
    setCurrentUrl: jest.fn()
}))


describe("<Movies />", () => {
    
    beforeEach(() => {
        const dispatch = useAppDispatch as jest.Mock;
        const mockSetCurrentURL = setCurrentUrl as unknown as jest.Mock;
        const mockCurrentURL = jest.fn()
        mockSetCurrentURL.mockReturnValue(mockCurrentURL)
        dispatch.mockReturnValue(mockSetCurrentURL) 
    })
    afterAll(() => {
        jest.clearAllMocks();
    })

    it("must render the My List page", () => {
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValue({
            accessToken: "sometoken"
        })

        const router = useRouter as jest.Mock;
        const mockRouter = {
            pathname: "/mylist"
        }
        router.mockReturnValueOnce(mockRouter);

        render(<MyList />)
        const movies_container = screen.getByTestId("mylist_container")
        expect(movies_container).toBeInTheDocument();
    })

    it("must render bookmarks", () => {
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValue({
            accessToken: "sometoken"
        })
        .mockReturnValue({
            data: [{
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
            },{
                "id": 105971,
                "name": "Star Wars: The Bad Batch",
                "backdrop_path": "/sjxtIUCWR74yPPcZFfTsToepfWm.jpg",
                "poster_path": "/5Q6z9bjy8dHKA5T8kNmCd8hj6Gl.jpg",
                "media_type": "tv",
                "genre_ids": [
                    16,
                    10759,
                    10765
                ]
            }]
        })

        const router = useRouter as jest.Mock;
        const mockRouter = {
            pathname: "/mylist"
        }
        router.mockReturnValueOnce(mockRouter);

        const { container } = render(<MyList />)
        const mylist_container = within(container).getByTestId("mylist_container")
        expect(mylist_container).toBeInTheDocument();

        const results = within(mylist_container).getByTestId("results_item_container")
        expect(results).toBeInTheDocument();
    })

    it("must render 'No bookmarks found'", () => {
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValue({
            accessToken: "sometoken"
        })
        .mockReturnValue({
            data: []
        })

        const router = useRouter as jest.Mock;
        const mockRouter = {
            pathname: "/mylist"
        }
        router.mockReturnValueOnce(mockRouter);

        const { container } = render(<MyList />)
        const mylist_container = within(container).getByTestId("mylist_container")
        expect(mylist_container).toBeInTheDocument();

        const no_bookmarks = within(mylist_container).getByText("No bookmarks found")
        expect(no_bookmarks).toBeInTheDocument();
    })


})