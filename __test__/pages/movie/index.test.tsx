import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useMovieDetail } from '../../../lib/hooks/useMovieDetail' 
import { movieData } from '../../../model/fake_detail';
import { useState } from "react";
import { setCurrentUrl } from '../../../app/store/slices/url'
import { useRouter } from 'next/router';
import Movie from '../../../pages/movie/[id]'

jest.mock("../../../lib/hooks/useMovieDetail", () => ({
    __esModule: true,
    useMovieDetail: jest.fn()
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


describe("<Movie />", () => {

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

        const mockUseMovieDetail = useMovieDetail as jest.Mock;
        const mockUseMovie = { 
            movie_detail: { ...movieData }, 
            IsLoading: false, 
            isError: null
        }
        mockUseMovieDetail.mockReturnValue(mockUseMovie)        

    })

    afterAll(() => {
        jest.clearAllMocks()
    })

    it("must render Movie detail page", () => {
        
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            accessToken: "123"
        })
        .mockReturnValueOnce({
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
            }]
        })        

        const {container} = render(<Movie />)
        const movie_container = within(container).getByTestId("movie_container")
        expect(movie_container).toBeInTheDocument()

    })

    it("must render Loading icon", () => {
        const mockUseMovieDetail = useMovieDetail as jest.Mock;
        const mockUseMovie = { 
            movie_detail: { ...movieData }, 
            isLoading: true, 
            isError: null
        }
        mockUseMovieDetail.mockReturnValueOnce(mockUseMovie)

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            accessToken: "123"
        })
        .mockReturnValueOnce({
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
            }]
        })  

        const {container} = render(<Movie />)
        const movie_container = within(container).getByTestId("movie_container")
        expect(movie_container).toBeInTheDocument()

        const loading_container = within(movie_container).getByTestId("loading_container")
        expect(loading_container).toBeInTheDocument()

    })

    it("must render movie details", () => {

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            accessToken: "123"
        })
        .mockReturnValueOnce({
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
            }]
        })  

        const {container} = render(<Movie />)
        const movie_container = within(container).getByTestId("movie_container")
        expect(movie_container).toBeInTheDocument()

        const movie_info = within(movie_container).getByTestId("movie_info_container")
        expect(movie_info).toBeInTheDocument()

        const title = within(movie_info).getByText("The Guardians of the Galaxy Holiday Special")
        expect(title).toBeInTheDocument()

    })

    it("must render recommended movies", () => {

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            accessToken: "123"
        })
        .mockReturnValueOnce({
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
            }]
        })  

        const {container} = render(<Movie />)
        const movie_container = within(container).getByTestId("movie_container")
        expect(movie_container).toBeInTheDocument()

        const recommended_movies = within(movie_container).getByTestId("recommended_movies")
        expect(recommended_movies).toBeInTheDocument()

        const carousel = within(recommended_movies).getByTestId("carousel_maincontainer")
        expect(carousel).toBeInTheDocument()

    })

    it("must render bookmark", () => {

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            accessToken: "123"
        })
        .mockReturnValueOnce({
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
            }]
        })  

        const {container} = render(<Movie />)
        const movie_container = within(container).getByTestId("movie_container")
        expect(movie_container).toBeInTheDocument()

        const bookmark_container = within(movie_container).getByTestId("bookmark_container")
        expect(bookmark_container).toBeInTheDocument()

        const carousel = within(bookmark_container).getByTestId("carousel_maincontainer")
        expect(carousel).toBeInTheDocument()

    })

    it("must render 'No bookmarks found'", () => {

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            accessToken: "123"
        })
        .mockReturnValueOnce({
            data: []
        })  

        const {container} = render(<Movie />)
        const movie_container = within(container).getByTestId("movie_container")
        expect(movie_container).toBeInTheDocument()

        const bookmark_container = within(movie_container).getByTestId("bookmark_container")
        expect(bookmark_container).toBeInTheDocument()

        const no_bookmark = within(bookmark_container).getByText("No bookmarks found")
        expect(no_bookmark).toBeInTheDocument()

    })

})