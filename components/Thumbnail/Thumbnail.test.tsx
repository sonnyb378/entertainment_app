import { fireEvent, render, screen, within, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Thumbnail from './Thumbnail'

import { useAppDispatch } from "../../app/hooks"
import { useState } from "react";
import * as React from "react";
import * as AppContext from '../../context/state';
import { removeDataBookmarks, setDataBookmarks } from '../../app/store/slices/bookmarks'
import { useRouter } from "next/router"
import { fake_trending } from '../../model/fake_trending'
import { fake_person_popular } from '../../model/fake_person_popular';

jest.mock("../../app/store/slices/bookmarks", () => ({
    setDataBookmarks: jest.fn(),
    removeDataBookmarks: jest.fn()
}))

jest.mock('../../context/state', () => ({
    __esModule: true,
    ...jest.requireActual('../../context/state')
}))

jest.mock("react-firebase-hooks/auth", () => ({
    useAuthState: jest.fn()
}))

jest.mock("../../app/hooks", () => ({
    useAppDispatch: jest.fn()
}))

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} priority="true" />
    },
}))

jest.mock("next/router", () => ({
    __esModule: true,
    useRouter: jest.fn()
}))

describe("<Thumbnail />", () => {

    beforeAll(() => {           
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render <Thumbnail />", () => {
        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = fake_trending[0];
        const { container } = render(<Thumbnail 
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
        />)
        const thumbnail = within(container).getByTestId("thumbnail")
        expect(thumbnail).toBeInTheDocument();
    })

    it("must render <Thumbnail /> with the <BackdropImage /> component", () => {
        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, mockSetState])
        .mockImplementationOnce(() => [false, mockSetState])
        .mockImplementationOnce(() => [false, mockSetState])

        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = { ...fake_trending[0] };

        const { container } = render(<Thumbnail 
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
        />)
        const thumbnail = within(container).getByTestId("thumbnail")
        expect(thumbnail).toBeInTheDocument();
        
        const collapsed = within(thumbnail).getByTestId(`collapsed_${item.id}`)
        expect(collapsed).toBeInTheDocument();

        const backdrop = within(collapsed).getByTestId("backdrop_image_container")
        expect(backdrop).toBeInTheDocument();
    })

    it("must render <Thumbnail /> with the <PosterImage /> component", () => {
        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, mockSetState])
        .mockImplementationOnce(() => [false, mockSetState])
        .mockImplementationOnce(() => [false, mockSetState])

        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = { ...fake_trending[0] };

        const { debug, container } = render(<Thumbnail 
            user={user}
            result={ item?.media_type ? {...item, backdrop_path: null} : {...item, media_type: "movie", backdrop_path: null } }
            bookmarkData={[]}
        />)
        const thumbnail = within(container).getByTestId("thumbnail")
        expect(thumbnail).toBeInTheDocument();
        
        const collapsed = within(thumbnail).getByTestId(`collapsed_${item.id}`)
        expect(collapsed).toBeInTheDocument();

        const poster = within(collapsed).getByTestId("poster_image_container")
        expect(poster).toBeInTheDocument();

    })

    it("must render <Thumbnail /> with the <MediaTypeShow /> component", () => {        
        
        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = { ...fake_trending[0] };
        const {debug, container} = render(<Thumbnail 
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
        />)
        const thumbnail = within(container).getByTestId("thumbnail")
        expect(thumbnail).toBeInTheDocument();
        
        const collapsed = within(thumbnail).getByTestId(`collapsed_${item.id}`)
        expect(collapsed).toBeInTheDocument();

        const el = within(collapsed).getByTestId("mediatype_show")
        expect(el).toBeInTheDocument();
    })

    it("must render <Thumbnail /> with the <MediaTypePerson /> component", () => {   
        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = {
            "adult": false,
            "gender": 0,
            "id": 2875851,
            "known_for": [
                {
                    "adult": false,
                    "genre_ids": [
                        35
                    ],
                    "id": 769964,
                    "media_type": "movie",
                    "original_language": "es",
                    "original_title": "El sekuestro",
                    "overview": "",
                    "poster_path": "/hpF4gKv4SgtnVvxARfYlMzGWtQ8.jpg",
                    "release_date": "1997-04-24",
                    "title": "El sekuestro",
                    "video": false,
                    "vote_average": 0,
                    "vote_count": 0
                }
            ],
            "known_for_department": "Acting",
            "media_type": "person",
            "name": "Adam Black",
            "popularity": 0.6,
            "profile_path": null
        };
        const {debug, container} = render(<Thumbnail 
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "person" } }
            bookmarkData={[]}
        />)
        const thumbnail = within(container).getByTestId("thumbnail")
        expect(thumbnail).toBeInTheDocument();
        
        const collapsed = within(thumbnail).getByTestId(`collapsed_${item.id}`)
        expect(collapsed).toBeInTheDocument();

        const el = within(collapsed).getByTestId("mediatype_person")
        expect(el).toBeInTheDocument();
    })

    it("must trigger onMouseOver on collapsed card", () => {
        
        const mockContext = jest.fn().mockReturnValue({
            ctxOnEnterHandler: (e:any, callback:() => void) => callback()
        })
        jest.spyOn(AppContext, 'useAppContext').mockImplementation(mockContext);

        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = { ...fake_trending[0] };
        const { debug, container } = render(<Thumbnail 
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
        />)
        const thumbnail = screen.getByTestId("thumbnail")
        expect(thumbnail).toBeInTheDocument();       
        
        const collapsed = within(container).getByTestId(`collapsed_${item.id}`)
        expect(collapsed).toBeInTheDocument();

        fireEvent.mouseOver(collapsed)
        expect(mockContext).toHaveBeenCalled()

        const expand = within(container).getByTestId(`expand_${item.id}`)
        const flex = expand.classList.contains("flex")
        expect(flex).toBeTruthy()
        const eOpacity = expand.classList.contains("opacity-100")
        expect(eOpacity).toBeTruthy()

        const scale = collapsed.classList.contains("scale-[120%]")
        expect(scale).toBeTruthy()

    })   
    
    it("must trigger onMouseLeave on collapsed card", () => {
        
        const mockContext = jest.fn().mockReturnValue({
            ctxOnLeaveHandler: (e:any, callback:() => void) => callback()
        })
        jest.spyOn(AppContext, 'useAppContext').mockImplementation(mockContext);

        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = { ...fake_trending[0] };
        const { debug, container } = render(<Thumbnail 
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
        />)
        const thumbnail = screen.getByTestId("thumbnail")
        expect(thumbnail).toBeInTheDocument();       
        
        const collapsed = within(container).getByTestId(`collapsed_${item.id}`)
        expect(collapsed).toBeInTheDocument();

        fireEvent.mouseLeave(collapsed)
        expect(mockContext).toHaveBeenCalled()

        const scale = collapsed.classList.contains("scale-[120%]")
        expect(scale).toBeFalsy()
    })

    it("must trigger onMouseLeave on expanded card", () => {
        
        const mockContext = jest.fn().mockReturnValue({
            ctxOnLeaveHandler: (e:any, callback:() => void) => callback()
        })
        jest.spyOn(AppContext, 'useAppContext').mockImplementation(mockContext);

        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = { ...fake_trending[0] };
        const { debug, container } = render(<Thumbnail 
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
        />)
        const thumbnail = screen.getByTestId("thumbnail")
        expect(thumbnail).toBeInTheDocument();       
        
        const expand = within(container).getByTestId(`expand_${item.id}`)
        expect(expand).toBeInTheDocument();

        fireEvent.mouseLeave(expand)
        expect(mockContext).toHaveBeenCalled()

        const opacity = expand.classList.contains("opacity-0")
        expect(opacity).toBeTruthy()
        const scale = expand.classList.contains("scale-[80%]")
        expect(scale).toBeTruthy()

        const collapsed = within(container).getByTestId(`collapsed_${item.id}`)
        const cScale = collapsed.classList.contains("scale-[120%]")
        expect(cScale).toBeFalsy()
    }) 

    it("must trigger Play button on expanded card", () => {
        const mockSetState = jest.fn()
        const mockContext = jest.fn().mockReturnValue({
            setVideoIsPlayed: mockSetState
        })
        jest.spyOn(AppContext, 'useAppContext').mockImplementation(mockContext);

        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = { ...fake_trending[0] };
        const { debug, container } = render(<Thumbnail
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
        />)
        const thumbnail = screen.getByTestId("thumbnail")
        expect(thumbnail).toBeInTheDocument();   

        const play_button = within(container).getByTestId("play_button")
        expect(play_button).toBeInTheDocument();   

        fireEvent.click(play_button)
        expect(mockContext).toHaveBeenCalled()
    }) 

    it("must render <PlusIcon />", () => {
       
        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = { ...fake_trending[0] };

        const { debug, container } = render(<Thumbnail
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
        />)
        const thumbnail = screen.getByTestId("thumbnail")
        expect(thumbnail).toBeInTheDocument();   

        const bookmark = screen.getByTestId("add_bookmark_button")
        expect(bookmark).toBeInTheDocument();  
    })

    it("must render <CheckIcon />", () => {
        
        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = { ...fake_trending[0] };
        const { debug, container } = render(<Thumbnail 
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[item]}
        />)
        const thumbnail = screen.getByTestId("thumbnail")
        expect(thumbnail).toBeInTheDocument();   

        const remove_bookmark = within(container).getByTestId("remove_bookmark_button")
        expect(remove_bookmark).toBeInTheDocument(); 
       
    })

    it("must trigger add Bookmark button", async () => {

        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = { ...fake_trending[0] };

        const dispatch = useAppDispatch as jest.Mock;
        const mockSetDataBookmarks = setDataBookmarks as unknown as jest.Mock;
        const mockBookmark = jest.fn()
        mockSetDataBookmarks.mockReturnValue(mockBookmark)
        dispatch.mockReturnValue(mockSetDataBookmarks)

        const { debug, container } = render(<Thumbnail
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
        />)
        const thumbnail = screen.getByTestId("thumbnail")
        expect(thumbnail).toBeInTheDocument();   

        const bookmark = within(container).getByTestId("add_bookmark_button")
        expect(bookmark).toBeInTheDocument();  

        fireEvent.click(bookmark)
        expect(dispatch).toHaveBeenCalled() 
        
    }) 

    it("must trigger remove Bookmark button", async () => {

        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = { ...fake_trending[0] };

        const dispatch = useAppDispatch as jest.Mock;
        const mockRemoveDataBookmarks = removeDataBookmarks as unknown as jest.Mock;
        const mockBookmark = jest.fn()
        mockRemoveDataBookmarks.mockReturnValue(mockBookmark)
        dispatch.mockReturnValue(mockRemoveDataBookmarks)

        const { debug, container } = render(<Thumbnail
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[item]}
        />)
        const thumbnail = screen.getByTestId("thumbnail")
        expect(thumbnail).toBeInTheDocument();   

        const bookmark = within(container).getByTestId("remove_bookmark_button")
        expect(bookmark).toBeInTheDocument();  

        fireEvent.click(bookmark)
        expect(dispatch).toHaveBeenCalled() 
        
    }) 

    it("must trigger View detail button on expanded card", () => {

        const router = useRouter as jest.Mock;
        const mockRouter = {
            push: jest.fn()
        }
        router.mockReturnValue(mockRouter);

        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = { ...fake_trending[0] };
        const { debug, container } = render(<Thumbnail
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[item]}
        />)
        const thumbnail = screen.getByTestId("thumbnail")
        expect(thumbnail).toBeInTheDocument();   

        const view_detail = within(thumbnail).getByTestId("view_detail_button")
        expect(view_detail).toBeInTheDocument();      
        
        fireEvent.click(view_detail)
        expect(mockRouter.push).toHaveBeenCalledWith(`/movie/${item.id}`)
    }) 

})