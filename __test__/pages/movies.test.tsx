import { render, screen, fireEvent, within, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { setCurrentUrl } from '../../app/store/slices/url'
import { removeDataBookmarks, setDataBookmarks } from '../../app/store/slices/bookmarks'
import { useMovieDetail } from '../../lib/hooks/useMovieDetail' 
import * as AppContext from '../../context/state';

import * as React from "react";
import Movies from "../../pages/movies"

import { fake_trending, fake_featured } from '../../model/fake_trending'
import { fake_popular } from '../../model/fake_popular'
import { useAuthState } from "react-firebase-hooks/auth";
import { parseCookies } from "nookies"

import axios from "axios"

jest.mock('axios');
jest.mock('nookies', () => (
    {
        __esModule: true,
        parseCookies: jest.fn()
    }
))

jest.mock("react-firebase-hooks/auth", () => ({
    useAuthState: jest.fn()
}))

jest.mock("next/router", () => ({
    __esModule: true,
    useRouter: jest.fn()
})) 
jest.mock("../../firebase", () => ({
    auth: jest.fn(),
}))
jest.mock('../../context/state', () => ({
    __esModule: true,
    ...jest.requireActual('../../context/state')
}))
jest.mock("../../lib/hooks/useMovieDetail", () => ({
    __esModule: true,
    useMovieDetail: jest.fn()
}))

jest.mock("../../app/store/slices/bookmarks", () => ({
    setDataBookmarks: jest.fn(),
    removeDataBookmarks: jest.fn(),
    selectBookmarkData: jest.fn()
}))

jest.mock("../../app/store/slices/auth", () => ({
    setAuthData: jest.fn(),
    selectAuth: jest.fn()
}))

jest.mock("../../app/hooks", () => ({
    __esModule: true,
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn()
}))

jest.mock('react', ()=>({
    ...jest.requireActual('react'),
    useState: jest.fn()
}))

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} priority="true" />
    },
}))

jest.mock("../../app/store/slices/url", () => ({
    setCurrentUrl: jest.fn()
}))

describe("<Movies />", () => {
    
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
            pathname: jest.fn(),
            push: jest.fn(),
            replace: jest.fn()
        }
        router.mockReturnValue(mockRouter)

        const dispatch = useAppDispatch as jest.Mock;
        const mockSetCurrentURL = setCurrentUrl as unknown as jest.Mock;
        const mockCurrentURL = jest.fn()
        mockSetCurrentURL.mockReturnValue(mockCurrentURL)
        dispatch.mockReturnValue(mockSetCurrentURL)        

        const mockUseMovieDetail = useMovieDetail as jest.Mock;
        const mockUseMovie = { 
            movie_detail: { ...fake_featured }, 
            featuredIsLoading: false, 
            featuredHasError: null
        }
        mockUseMovieDetail.mockReturnValue(mockUseMovie)        

    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render the movies page", async () => {

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])

        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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
            }]
        })

        const mockNookies = parseCookies as jest.Mock;
        mockNookies.mockReturnValue({
            token: "somecookietoken"
        })
    
        const router = useRouter as jest.Mock;
        const mockRouter = {
            push: jest.fn()
        }
        router.mockReturnValue(mockRouter);


        const trending = fake_trending
        const popular = fake_popular
        const data = {
            trending,
            popular,
            feature_id: 555604,
        }
        
        const {container} = render(<Movies data={ data } />)
        const movies_container = within(container).getByTestId("movies_container")
        waitFor(() => {
            expect(axios.get).toHaveBeenCalled()
        })
        expect(movies_container).toBeInTheDocument();
    })

    it("must render featured movie", () => {
        const trending = fake_trending
        const popular = fake_popular
        const data = {
            trending,
            popular
        }

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const router = useRouter as jest.Mock;
        const mockRouter = {
            push: jest.fn()
        }
        router.mockReturnValue(mockRouter);

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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
        const mockNookies = parseCookies as jest.Mock;
        mockNookies.mockReturnValue({
            token: "somecookietoken"
        })

        const {debug, container } = render(<Movies data={data} />);
        const movies_container = within(container).getByTestId("movies_container")
        expect(movies_container).toBeInTheDocument();

        const backdrop = within(movies_container).getByTestId("featured_backdrop")
        expect(backdrop).toBeInTheDocument();

        const title = within(movies_container).getByText("Guillermo del Toro's Pinocchio")
        expect(title).toBeInTheDocument();
    })

    it("must render 'Add to List' button", () => {
        const trending = fake_trending
        const popular = fake_popular
        const data = {
            trending,
            popular
        }
        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            data: []
        })

        const {debug, container } = render(<Movies data={data} />);
        const movies_container = within(container).getByTestId("movies_container")
        expect(movies_container).toBeInTheDocument();

        const add_bookmark = within(container).queryByText("Add to List")
        expect(add_bookmark).toBeInTheDocument();

    })

    it("must not render 'Add to List' button", () => {
        const trending = fake_trending
        const popular = fake_popular
        const data = {
            trending,
            popular
        }
        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([false, false]);

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            data: []
        })

        const {debug, container } = render(<Movies data={data} />);
        const movies_container = within(container).getByTestId("movies_container")
        expect(movies_container).toBeInTheDocument();

        const add_bookmark = within(container).queryByText("Add to List")
        expect(add_bookmark).not.toBeInTheDocument();

    })

    it("must render 'Remove from List' button", () => {

        const trending = fake_trending
        const popular = fake_popular
        const data = {
            trending,
            popular
        }

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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

        const {debug, container } = render(<Movies data={data} />);
        const movies_container = within(container).getByTestId("movies_container")
        expect(movies_container).toBeInTheDocument();

        const remove_bookmark = within(container).queryByText("Remove from List")
        expect(remove_bookmark).toBeInTheDocument();


    })

    it("must trigger play button", () => {
        const trending = fake_trending
        const popular = fake_popular
        const data = {
            trending,
            popular
        }

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockContext = jest.fn().mockReturnValue({
            setVideoIsPlayed: jest.fn(),
            showData: jest.fn()
        })
        jest.spyOn(AppContext, 'useAppContext').mockImplementation(mockContext);
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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

        const {debug, container } = render(<Movies data={data} />);
        const movies_container = within(container).getByTestId("movies_container")
        expect(movies_container).toBeInTheDocument();

        const play_button = within(movies_container).getByText("Play")
        expect(play_button).toBeInTheDocument();  
        fireEvent.click(play_button)
        expect(mockContext).toHaveBeenCalled()

    })

    it("must trigger 'Add to List' button", () => {

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({ data: [] })

        const trending = fake_trending
        const popular = fake_popular
        const data = {
            trending,
            popular
        }

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

        const dispatch = useAppDispatch as jest.Mock;
        const mockSetDataBookmarks = setDataBookmarks as unknown as jest.Mock;
        const mockBookmark = jest.fn().mockReturnValue(bookmarkData)
        mockSetDataBookmarks.mockReturnValue(mockBookmark)
        dispatch.mockImplementation(mockSetDataBookmarks)

        const {debug, container } = render(<Movies data={ data } />);
        const movies_container = within(container).getByTestId("movies_container")
        expect(movies_container).toBeInTheDocument();

        const add_bookmark = within(container).getByText("Add to List")
        expect(add_bookmark).toBeInTheDocument();  

        act(() => {
            fireEvent.click(add_bookmark)
        })
        expect(dispatch).toHaveBeenCalled()
    })

    it("must trigger 'Remove from List' button", () => {

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

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
        .mockReturnValueOnce({ data: [bookmarkData] })

        const trending = fake_trending
        const popular = fake_popular
        const data = {
            trending,
            popular
        }

        const dispatch = useAppDispatch as jest.Mock;
        const mockRemoveDataBookmark = removeDataBookmarks as unknown as jest.Mock;
        const mockBookmark = jest.fn().mockReturnValue({ id: 555604 })
        mockRemoveDataBookmark.mockReturnValue(mockBookmark)
        dispatch.mockImplementation(mockRemoveDataBookmark)

        const {debug, container } = render(<Movies data={ data } />);
        const movies_container = within(container).getByTestId("movies_container")
        expect(movies_container).toBeInTheDocument();

        const remove_bookmark = within(container).getByText("Remove from List")
        expect(remove_bookmark).toBeInTheDocument();  

        act(() => {
            fireEvent.click(remove_bookmark)
        })
        expect(dispatch).toHaveBeenCalled()
    })

    
    it("must trigger 'More Info' button", () => {
        
        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const trending = fake_trending
        const popular = fake_popular
        const data = {
            trending,
            popular
        }

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
        .mockReturnValueOnce({ data: [bookmarkData] })

        const router = useRouter as jest.Mock;
        const mockRouter = {
            push: jest.fn()
        }
        router.mockReturnValue(mockRouter)

        const {debug, container } = render(<Movies data={ data } />);
        const movies_container = within(container).getByTestId("movies_container")
        expect(movies_container).toBeInTheDocument();

        const more_info = within(container).getByText("More Info")
        expect(more_info).toBeInTheDocument();  

        fireEvent.click(more_info)
        expect(mockRouter.push).toHaveBeenCalledWith("/movie/555604")

    })

    it("must render 'Trending Movies' section", () => {

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const trending = fake_trending
        const popular = fake_popular
        const data = {
            trending,
            popular
        }
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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
            }]
        })
 
        const { container } = render(<Movies data={ data } />)
        const trending_movies = within(container).getByTestId("trending_movies")
        expect(trending_movies).toBeInTheDocument();

        const carousel = within(trending_movies).getByTestId("carousel_maincontainer")
        expect(carousel).toBeInTheDocument();
    })

    it("must render 'Popular Movies' section", () => {

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);


        const trending = fake_trending
        const popular = fake_popular
        const data = {
            trending,
            popular
        }
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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
            }]
        })
  
        const { container } = render(<Movies data={ data } />)
        const popular_movies = within(container).getByTestId("popular_movies")
        expect(popular_movies).toBeInTheDocument();

        const carousel = within(popular_movies).getByTestId("carousel_maincontainer")
        expect(carousel).toBeInTheDocument();
    })

    it("must render 'Recommended Movies' section", () => {

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const trending = fake_trending
        const popular = fake_popular
        const data = {
            trending,
            popular
        }
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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
            }]
        })

        const { container } = render(<Movies data={ data } />)
        const recommended_movies = within(container).getByTestId("recommended_movies")
        expect(recommended_movies).toBeInTheDocument();

        const carousel = within(recommended_movies).getByTestId("carousel_maincontainer")
        expect(carousel).toBeInTheDocument();        
    })

    it("must render 'My List' section", () => {

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const trending = fake_trending
        const popular = fake_popular
        const data = {
            trending,
            popular
        }
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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
            }]
        })

        const { container } = render(<Movies data={ data } />)
        const mylist_container = within(container).getByTestId("mylist_container")
        expect(mylist_container).toBeInTheDocument();

        const carousel = within(mylist_container).getByTestId("carousel_maincontainer")
        expect(carousel).toBeInTheDocument();  
    })

    it("must not render 'My List'", () => {

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([false, false]);

        const trending = fake_trending
        const popular = fake_popular
        const data = {
            trending,
            popular
        }
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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
            }]
        })

        const { container } = render(<Movies data={ data } />)
        const mylist_container = within(container).queryByTestId("mylist_container")
        expect(mylist_container).not.toBeInTheDocument();

    })

    it("must display 'No bookmarks found' if bookmark data is empty", () => {
        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])
        
        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);
        
        const trending = fake_trending
        const popular = fake_popular
        const data = {
            trending,
            popular
        }
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValue({
            data: []
        })

        const { container } = render(<Movies data={ data } />)
        const mylist_container = within(container).getByTestId("mylist_container")
        expect(mylist_container).toBeInTheDocument();

        const not_found = within(mylist_container).getByText("No bookmarks found")
        expect(not_found).toBeInTheDocument();  
    })
    
})