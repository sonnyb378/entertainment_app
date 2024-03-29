import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useRouter } from "next/router"
import { fake_tv_trending, fake_tv_featured } from '../../model/fake_tv_trending'
import { fake_tv_popular } from '../../model/fake_tv_popular'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { setCurrentUrl } from '../../app/store/slices/url'
import TVShows from '../../pages/tvshows'
import { useTVDetail } from '../../lib/hooks/useTVDetail'
// import * as AppContext from '../../context/state';
import { removeDataBookmarks, setDataBookmarks } from '../../app/store/slices/bookmarks'
import axios from "axios"

import { useAuthState } from "react-firebase-hooks/auth";
import * as React from "react";
import { parseCookies } from "nookies"

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
jest.mock("../../lib/hooks/useTVDetail", () => ({
    __esModule: true,
    useTVDetail: jest.fn()
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

describe("<TVShows />", () => {
    
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
            replace: jest.fn(),
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
            tv_detail: { ...fake_tv_featured }, //105971
            featuredIsLoading: false, 
            featuredHasError: null
        }
        mockUseTVDetail.mockReturnValue(mockUseTV)  
      

    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render the tv shows page", () => {
        const trending = fake_tv_trending
        const popular = fake_tv_popular
        const data = {
            trending,
            popular
        }

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])

        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockNookies = parseCookies as jest.Mock;
        mockNookies.mockReturnValue({
            token: "somecookietoken"
        })

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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
        
        render(<TVShows data={ data } />)
        const tv_container = screen.getByTestId("tv_container")

        waitFor(() => {
            expect(axios.get).toHaveBeenCalled()
        })

        expect(tv_container).toBeInTheDocument();
    })

    it("must render featured tv show", () => {
        const trending = fake_tv_trending
        const popular = fake_tv_popular
        const data = {
            trending,
            popular
        }

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])

        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockNookies = parseCookies as jest.Mock;
        mockNookies.mockReturnValue({
            token: "somecookietoken"
        })

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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

        const {debug, container } = render(<TVShows data={data} />);
        const tv_container = within(container).getByTestId("tv_container")
        expect(tv_container).toBeInTheDocument();

        const backdrop = within(tv_container).getByTestId("featured_backdrop")
        expect(backdrop).toBeInTheDocument();

        const title = within(tv_container).getByText("Star Wars: The Bad Batch")
        expect(title).toBeInTheDocument();
    })

    it("must render 'Add to List' button", () => {
        const trending = fake_tv_trending
        const popular = fake_tv_popular
        const data = {
            trending,
            popular
        }

        const mockUseTVDetail = useTVDetail as jest.Mock;
        const mockUseTV = { 
            tv_detail: { ...fake_tv_featured }, //105971
            featuredIsLoading: false, 
            featuredHasError: null
        }
        mockUseTVDetail.mockReturnValue(mockUseTV)  

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])

        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockNookies = parseCookies as jest.Mock;
        mockNookies.mockReturnValue({
            token: "somecookietoken"
        })

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            data: [{
                "id": 105972,
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

        const {debug, container } = render(<TVShows data={data} />);
        const tv_container = within(container).getByTestId("tv_container")
        expect(tv_container).toBeInTheDocument();

        waitFor(() => {
            expect(axios.get).toHaveBeenCalled()
        })

        const add_bookmark = within(container).queryByText("Add to List")
        expect(add_bookmark).toBeInTheDocument();

    })

    it("must not render 'Add to List' button", () => {
        const trending = fake_tv_trending
        const popular = fake_tv_popular
        const data = {
            trending,
            popular,
            feature_id: 105971
        }

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])

        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockNookies = parseCookies as jest.Mock;
        mockNookies.mockReturnValue({
            token: "somecookietoken"
        })

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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

        const {debug, container } = render(<TVShows data={data} />);
        const tv_container = within(container).getByTestId("tv_container")
        expect(tv_container).toBeInTheDocument();

        const add_bookmark = within(container).queryByText("Add to List")
        expect(add_bookmark).not.toBeInTheDocument()

    })

    it("must render 'Remove from List' button", () => {

        const trending = fake_tv_trending
        const popular = fake_tv_popular
        const data = {
            trending,
            popular,
            feature_id: 105971
        }

        const mockUseTVDetail = useTVDetail as jest.Mock;
        const mockUseTV = { 
            tv_detail: { ...fake_tv_featured }, //105971
            featuredIsLoading: false, 
            featuredHasError: null
        }
        mockUseTVDetail.mockReturnValue(mockUseTV)  

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])

        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockNookies = parseCookies as jest.Mock;
        mockNookies.mockReturnValue({
            token: "somecookietoken"
        })

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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

        const {debug, container } = render(<TVShows data={data} />);
        const tv_container = within(container).getByTestId("tv_container")
        expect(tv_container).toBeInTheDocument();

        const remove_bookmark = within(container).queryByText("Remove from List")
        expect(remove_bookmark).toBeInTheDocument();

    })

    it("must trigger 'Add to List' button", () => {

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])

        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockNookies = parseCookies as jest.Mock;
        mockNookies.mockReturnValue({
            token: "somecookietoken"
        })

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({ data: [] })

        const trending = fake_tv_trending
        const popular = fake_tv_popular
        const data = {
            trending,
            popular
        }

        const bookmarkData = {
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
        }

        const dispatch = useAppDispatch as jest.Mock;
        const mockSetDataBookmarks = setDataBookmarks as unknown as jest.Mock;
        const mockBookmark = jest.fn().mockReturnValue(bookmarkData)
        mockSetDataBookmarks.mockReturnValue(mockBookmark)
        dispatch.mockImplementation(mockSetDataBookmarks)

        const {debug, container } = render(<TVShows data={ data } />);
        const tv_container = within(container).getByTestId("tv_container")
        expect(tv_container).toBeInTheDocument();

        const add_bookmark = within(container).getByText("Add to List")
        expect(add_bookmark).toBeInTheDocument();  

        fireEvent.click(add_bookmark)
        expect(mockSetDataBookmarks).toHaveBeenCalled()
    })

    it("must trigger 'Remove from List' button", () => {

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])

        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockNookies = parseCookies as jest.Mock;
        mockNookies.mockReturnValue({
            token: "somecookietoken"
        })

        const bookmarkData = {
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
        }
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({ data: [bookmarkData] })

        const trending = fake_tv_trending
        const popular = fake_tv_popular
        const data = {
            trending,
            popular
        }

        const dispatch = useAppDispatch as jest.Mock;
        const mockRemoveDataBookmark = removeDataBookmarks as unknown as jest.Mock;
        const mockBookmark = jest.fn().mockReturnValue({ id: 105971 })
        mockRemoveDataBookmark.mockReturnValue(mockBookmark)
        dispatch.mockImplementation(mockRemoveDataBookmark)

        const {debug, container } = render(<TVShows data={ data } />);
        const tv_container = within(container).getByTestId("tv_container")
        expect(tv_container).toBeInTheDocument();

        const remove_bookmark = within(container).getByText("Remove from List")
        expect(remove_bookmark).toBeInTheDocument();  

        fireEvent.click(remove_bookmark)
        expect(mockRemoveDataBookmark).toHaveBeenCalled()
    })

    it("must trigger 'More Info' button", () => {
        const trending = fake_tv_trending
        const popular = fake_tv_popular
        const data = {
            trending,
            popular
        }

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])

        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockNookies = parseCookies as jest.Mock;
        mockNookies.mockReturnValue({
            token: "somecookietoken"
        })

        const bookmarkData = {
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
        }
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({ data: [bookmarkData] })

        const router = useRouter as jest.Mock;
        const mockRouter = {
            push: jest.fn()
        }
        router.mockReturnValue(mockRouter)

        const {debug, container } = render(<TVShows data={ data } />);
        const tv_container = within(container).getByTestId("tv_container")
        expect(tv_container).toBeInTheDocument();

        const more_info = within(container).getByText("More Info")
        expect(more_info).toBeInTheDocument();  

        fireEvent.click(more_info)
        expect(mockRouter.push).toHaveBeenCalledWith("/tv/105971")

    })

    it("must render 'Trending TV Shows' section", () => {
        const trending = fake_tv_trending
        const popular = fake_tv_popular
        const data = {
            trending,
            popular
        }
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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
 
        const { container } = render(<TVShows data={ data } />)
        const trending_tvshows = within(container).getByTestId("trending_tvshows")
        expect(trending_tvshows).toBeInTheDocument();

        const carousel = within(trending_tvshows).getByTestId("carousel_maincontainer")
        expect(carousel).toBeInTheDocument();
    })

    it("must render 'Popular TV Shows' section", () => {
        const trending = fake_tv_trending
        const popular = fake_tv_popular
        const data = {
            trending,
            popular
        }
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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
  
        const { container } = render(<TVShows data={ data } />)
        const popular_tvshows = within(container).getByTestId("popular_tvshows")
        expect(popular_tvshows).toBeInTheDocument();

        const carousel = within(popular_tvshows).getByTestId("carousel_maincontainer")
        expect(carousel).toBeInTheDocument();
    })

    it("must render 'Recommended TV Shows' section", () => {
        const trending = fake_tv_trending
        const popular = fake_tv_popular
        const data = {
            trending,
            popular
        }
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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

        const { container } = render(<TVShows data={ data } />)
        const recommended_tvshows = within(container).getByTestId("recommended_tvshows")
        expect(recommended_tvshows).toBeInTheDocument();

        const carousel = within(recommended_tvshows).getByTestId("carousel_maincontainer")
        expect(carousel).toBeInTheDocument();        
    })

    it("must render 'My List' section", () => {
        const trending = fake_tv_trending
        const popular = fake_tv_popular
        const data = {
            trending,
            popular
        }

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])

        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockNookies = parseCookies as jest.Mock;
        mockNookies.mockReturnValue({
            token: "somecookietoken"
        })

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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

        const { container } = render(<TVShows data={ data } />)
        const mylist_container = within(container).getByTestId("mylist_container")
        expect(mylist_container).toBeInTheDocument();

        const carousel = within(mylist_container).getByTestId("carousel_maincontainer")
        expect(carousel).toBeInTheDocument();  
    })

    it("must not render 'My List' section", () => {
        const trending = fake_tv_trending
        const popular = fake_tv_popular
        const data = {
            trending,
            popular
        }

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])

        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([false, false]);

        const mockNookies = parseCookies as jest.Mock;
        mockNookies.mockReturnValue({
            token: "somecookietoken"
        })

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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

        const { container } = render(<TVShows data={ data } />)
        const mylist_container = within(container).queryByTestId("mylist_container")
        expect(mylist_container).not.toBeInTheDocument();

    })

    it("must display 'No bookmarks found' if bookmark data is empty", () => {
        const trending = fake_tv_trending
        const popular = fake_tv_popular
        const data = {
            trending,
            popular
        }

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])

        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockNookies = parseCookies as jest.Mock;
        mockNookies.mockReturnValue({
            token: "somecookietoken"
        })

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValue({
            data: []
        })

        const { container } = render(<TVShows data={ data } />)
        const mylist_container = within(container).getByTestId("mylist_container")
        expect(mylist_container).toBeInTheDocument();

        const not_found = within(mylist_container).getByText("No bookmarks found")
        expect(not_found).toBeInTheDocument();  
    })
    
})