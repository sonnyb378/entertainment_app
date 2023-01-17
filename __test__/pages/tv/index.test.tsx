import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useTVDetail } from '../../../lib/hooks/useTVDetail';
import { tvData } from '../../../model/fake_tv_detail';
import { useState } from "react";
import { setCurrentUrl } from '../../../app/store/slices/url'
import { useRouter } from 'next/router';
import TV from '../../../pages/tv/[id]'

jest.mock("../../../lib/hooks/useTVDetail", () => ({
    __esModule: true,
    useTVDetail: jest.fn()
}))

jest.mock("next/router", () => ({
    __esModule: true,
    useRouter: jest.fn()
})) 

jest.mock("../../../app/hooks", () => ({
    __esModule: true,
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn()
}))

jest.mock('../../../context/state', () => ({
    __esModule: true,
    ...jest.requireActual('../../../context/state')
}))

jest.mock("../../../firebase", () => ({
    auth: jest.fn(),
}))

jest.mock("../../../app/store/slices/bookmarks", () => ({
    setDataBookmarks: jest.fn(),
    removeDataBookmarks: jest.fn(),
    selectBookmarkData: jest.fn()
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

jest.mock('react', ()=>({
    ...jest.requireActual('react'),
    useState: jest.fn()
}))


describe("<TV />", () => {

    beforeEach(() => {
        const mockUseState = useState as jest.Mock;
        mockUseState.mockImplementation(jest.requireActual('react').useState);

        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }))

        global.window = window;

        const router = useRouter as jest.Mock;
        const mockRouter = {
            pathname: jest.fn()
        }
        router.mockReturnValue(mockRouter)

        const dispatch = useAppDispatch as jest.Mock;
        const mockSetCurrentURL = setCurrentUrl as unknown as jest.Mock;
        const mockCurrentURL = jest.fn()
        mockSetCurrentURL.mockReturnValue(mockCurrentURL)
        dispatch.mockReturnValue(mockSetCurrentURL)        

        const mockUseTVDetail = useTVDetail as jest.Mock;
        const mockUseTV = { 
            tv_detail: { ...tvData }, 
            isLoading: false, 
            isError: null
        }
        mockUseTVDetail.mockReturnValue(mockUseTV)       

    })

    afterAll(() => {
        jest.clearAllMocks()
    })

    it("must render TV detail page", () => {
          
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            accessToken: "123"
        })
        .mockReturnValue({
            data: [{
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

        const {container} = render(<TV />)
        const tv_container = within(container).getByTestId("tv_container")
        expect(tv_container).toBeInTheDocument()

    })

    it("must render Loading icon", () => {
        const mockUseTVDetail = useTVDetail as jest.Mock;
        const mockUseTV = { 
            tv_detail: { ...tvData }, 
            isLoading: true, 
            isError: null
        }
        mockUseTVDetail.mockReturnValue(mockUseTV)

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            accessToken: "123"
        })
        .mockReturnValueOnce({
            data: [{
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

        const {container} = render(<TV />)
        const tv_container = within(container).getByTestId("tv_container")
        expect(tv_container).toBeInTheDocument()

        const loading_container = within(tv_container).getByTestId("loading_container")
        expect(loading_container).toBeInTheDocument()

    })

    it("must render tv details", () => {

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            accessToken: "123"
        })
        .mockReturnValueOnce({
            data: [{
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

        const {container} = render(<TV />)
        const tv_container = within(container).getByTestId("tv_container")
        expect(tv_container).toBeInTheDocument()

        const tv_info = within(tv_container).getByTestId("tv_info_container")
        expect(tv_info).toBeInTheDocument()

        const title = within(tv_info).getByText("Star Wars: The Bad Batch")
        expect(title).toBeInTheDocument()

    })

    it("must render recommended tv shows", () => {

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            accessToken: "123"
        })
        .mockReturnValueOnce({
            data: [{
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

        const {container} = render(<TV />)
        const tv_container = within(container).getByTestId("tv_container")
        expect(tv_container).toBeInTheDocument()

        const recommended_tvshows = within(tv_container).getByTestId("recommended_tvshows")
        expect(recommended_tvshows).toBeInTheDocument()

        const carousel = within(recommended_tvshows).getByTestId("carousel_maincontainer")
        expect(carousel).toBeInTheDocument()

    })

    it("must render bookmark", () => {

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValue({
            accessToken: "123",
            data: [{
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

        const {container} = render(<TV />)
        const tv_container = within(container).getByTestId("tv_container")
        expect(tv_container).toBeInTheDocument()

        const bookmark_container = within(tv_container).getByTestId("bookmark_container")
        expect(bookmark_container).toBeInTheDocument()

        const carousel = within(bookmark_container).getByTestId("carousel_maincontainer")
        expect(carousel).toBeInTheDocument()

    })

    it("must render 'No bookmarks found'", () => {

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValue({
            accessToken: "123",
            data: []
        })

        const {container} = render(<TV />)
        const tv_container = within(container).getByTestId("tv_container")
        expect(tv_container).toBeInTheDocument()

        const bookmark_container = within(tv_container).getByTestId("bookmark_container")
        expect(bookmark_container).toBeInTheDocument()

        const no_bookmark = within(bookmark_container).getByText("No bookmarks found")
        expect(no_bookmark).toBeInTheDocument()

    })

})