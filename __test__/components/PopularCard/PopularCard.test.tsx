import { fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import PopularCard from '../../../components/PopularCard/PopularCard'

import { useAppDispatch } from "../../../app/hooks"
import { fake_popular } from '../../../model/fake_popular'
// import { useState } from "react";
import * as React from "react";
import * as AppContext from '../../../context/state';
import { removeDataBookmarks, setDataBookmarks } from '../../../app/store/slices/bookmarks'
import { useRouter } from "next/router"
import { User } from 'firebase/auth'


jest.mock("../../../app/store/slices/bookmarks", () => ({
    setDataBookmarks: jest.fn(),
    removeDataBookmarks: jest.fn()
}))

jest.mock('../../../context/state', () => ({
    __esModule: true,
    ...jest.requireActual('../../../context/state')
}))

jest.mock("react-firebase-hooks/auth", () => ({
    useAuthState: jest.fn()
}))

jest.mock("../../../app/hooks", () => ({
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


describe("<PopularCard />", () => {

    beforeAll(() => {           
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render <PopularCard />", () => {
        const user = {
            id: "sometoken"
        } as unknown as User
        const item:any = fake_popular[0];
        render(<PopularCard 
            visibleItems={3}
            indexCount={0}
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
            screenWidth={800}
        />)
        const card = screen.getByTestId("popular_card")
        expect(card).toBeInTheDocument();
    })

    it("must render <PopularCard /> with the <BackdropImage /> component", () => {
       
        const user = {
            id: "sometoken"
        } as unknown as User
        const item:any = { ...fake_popular[0] };
        render(<PopularCard 
            visibleItems={3}
            indexCount={0}
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
            screenWidth={800}
        />)
        const popular_card = screen.getByTestId("popular_card")
        expect(popular_card).toBeInTheDocument();
        
        const card = screen.getByTestId("backdrop_image_container")
        expect(card).toBeInTheDocument();
    })

    it("must render <PopularCard /> with the <PosterImage /> component", () => {        
        
        const user = {
            id: "sometoken"
        } as unknown as User
        const item:any = { ...fake_popular[0], backdrop_path: null };
        render(<PopularCard 
            visibleItems={3}
            indexCount={0}
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
            screenWidth={800}
        />)
        const popular_card = screen.getByTestId("popular_card")
        expect(popular_card).toBeInTheDocument();
        
        const card = screen.getByTestId("poster_image_container")
        expect(card).toBeInTheDocument();
    })

    it("must render <PopularCard /> with the <MediaTypeShow /> component", () => {        
        
        const user = {
            id: "sometoken"
        } as unknown as User
        const item:any = { ...fake_popular[0] };
        render(<PopularCard 
            visibleItems={3}
            indexCount={0}
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
            screenWidth={800}
        />)
        const popular_card = screen.getByTestId("popular_card")
        expect(popular_card).toBeInTheDocument();

        const el = screen.getByTestId("mediatype_show")
        expect(el).toBeInTheDocument();
    })

    it("must trigger onMouseOver on collapsed card", () => {
        
        const mockContext = jest.fn().mockReturnValue({
            ctxOnEnterHandler: (e:any, callback:() => void) => callback()
        })
        jest.spyOn(AppContext, 'useAppContext').mockImplementation(mockContext);

        const user = {
            id: "sometoken"
        } as unknown as User
        const item:any = { ...fake_popular[0] };
        const { debug, container } = render(<PopularCard 
            visibleItems={3}
            indexCount={0}
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
            screenWidth={800}
        />)
        const popular_card = screen.getByTestId("popular_card")
        expect(popular_card).toBeInTheDocument();       
        
        const collapsed = within(container).getByTestId(`collapsed_${item.id}`)
        expect(collapsed).toBeInTheDocument();

        fireEvent.mouseOver(collapsed)
        expect(mockContext).toHaveBeenCalled()

        const expand = within(container).getByTestId(`expand_${item.id}`)
        const flex = expand.classList.contains("flex")
        expect(flex).toBeTruthy()
        const eOpacity = expand.classList.contains("opacity-100")
        expect(eOpacity).toBeTruthy()

        const opacity = collapsed.classList.contains("opacity-0")
        expect(opacity).toBeTruthy()

        const scale = collapsed.classList.contains("scale-[120%]")
        expect(scale).toBeTruthy()

    })    

    it("must trigger onMouseLeave on collapsed card", () => {
        
        const mockContext = jest.fn().mockReturnValue({
            ctxOnLeaveHandler: (e:any, callback:() => void) => callback()
        })
        jest.spyOn(AppContext, 'useAppContext').mockImplementation(mockContext);

        const user = {
            id: "sometoken"
        } as unknown as User
        const item:any = { ...fake_popular[0] };
        const { debug, container } = render(<PopularCard 
            visibleItems={3}
            indexCount={0}
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
            screenWidth={800}
        />)
        const popular_card = screen.getByTestId("popular_card")
        expect(popular_card).toBeInTheDocument();       
        
        const collapsed = within(container).getByTestId(`collapsed_${item.id}`)
        expect(collapsed).toBeInTheDocument();

        fireEvent.mouseLeave(collapsed)
        expect(mockContext).toHaveBeenCalled()

        const opacity = collapsed.classList.contains("opacity-0")
        expect(opacity).toBeFalsy()

        const scale = collapsed.classList.contains("scale-[120%]")
        expect(scale).toBeFalsy()
    })   

    it("must trigger onMouseLeave on expanded card", () => {
        
        const mockContext = jest.fn().mockReturnValue({
            ctxOnLeaveHandler: (e:any, callback:() => void) => callback()
        })
        jest.spyOn(AppContext, 'useAppContext').mockImplementation(mockContext);

        const user = {
            id: "sometoken"
        } as unknown as User
        const item:any = { ...fake_popular[0] };
        const { debug, container } = render(<PopularCard 
            visibleItems={3}
            indexCount={0}
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
            screenWidth={800}
        />)
        const popular_card = screen.getByTestId("popular_card")
        expect(popular_card).toBeInTheDocument();       
        
        const expand = within(container).getByTestId(`expand_${item.id}`)
        expect(expand).toBeInTheDocument();

        fireEvent.mouseLeave(expand)
        expect(mockContext).toHaveBeenCalled()

        const opacity = expand.classList.contains("opacity-0")
        expect(opacity).toBeTruthy()
        const scale = expand.classList.contains("scale-[80%]")
        expect(scale).toBeTruthy()

        const collapsed = within(container).getByTestId(`collapsed_${item.id}`)
        const cOpacity = collapsed.classList.contains("opacity-0")
        expect(cOpacity).toBeFalsy()
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
            id: "sometoken"
        } as unknown as User
        const item:any = { ...fake_popular[0] };
        const { debug, container } = render(<PopularCard 
            visibleItems={3}
            indexCount={0}
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
            screenWidth={800}
        />)
        const popular_card = screen.getByTestId("popular_card")
        expect(popular_card).toBeInTheDocument();   

        const play_button = screen.getByTestId("play_button")
        expect(play_button).toBeInTheDocument();   

        fireEvent.click(play_button)
        expect(mockContext).toHaveBeenCalled()
    }) 

    it("must render <PlusIcon />", () => {
       
        const user = {
            id: "sometoken"
        } as unknown as User
        const item:any = { ...fake_popular[0] };

        const { debug, container } = render(<PopularCard 
            visibleItems={3}
            indexCount={0}
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
            screenWidth={800}
        />)
        const popular_card = screen.getByTestId("popular_card")
        expect(popular_card).toBeInTheDocument();   

        const bookmark = screen.getByTestId("add_bookmark_button")
        expect(bookmark).toBeInTheDocument();  
    }) 

    it("must render <CheckIcon />", () => {
        
        const user = {
            id: "sometoken"
        } as unknown as User
        const item:any = { ...fake_popular[0] };
        const { debug, container } = render(<PopularCard 
            visibleItems={3}
            indexCount={0}
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[item]}
            screenWidth={800}
        />)
        const popular_card = screen.getByTestId("popular_card")
        expect(popular_card).toBeInTheDocument();   

        const remove_bookmark = screen.getByTestId("remove_bookmark_button")
        expect(remove_bookmark).toBeInTheDocument(); 
       
    })

    it("must trigger add Bookmark button", async () => {

        const user = {
            id: "sometoken"
        } as unknown as User
        const item:any = { ...fake_popular[0] };

        const dispatch = useAppDispatch as jest.Mock;
        const mockSetDataBookmarks = setDataBookmarks as unknown as jest.Mock;
        const mockBookmark = jest.fn()
        mockSetDataBookmarks.mockReturnValue(mockBookmark)
        dispatch.mockReturnValue(mockSetDataBookmarks)

        const { debug, container } = render(<PopularCard 
            visibleItems={3}
            indexCount={0}
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[]}
            screenWidth={800}
        />)
        const popular_card = screen.getByTestId("popular_card")
        expect(popular_card).toBeInTheDocument();   

        const bookmark = screen.getByTestId("add_bookmark_button")
        expect(bookmark).toBeInTheDocument();  

        fireEvent.click(bookmark)
        expect(dispatch).toHaveBeenCalled() 
        
    }) 

    it("must trigger remove Bookmark button", async () => {

        const user = {
            id: "sometoken"
        } as unknown as User
        const item:any = { ...fake_popular[0] };

        const dispatch = useAppDispatch as jest.Mock;
        const mockRemoveDataBookmarks = removeDataBookmarks as unknown as jest.Mock;
        const mockBookmark = jest.fn()
        mockRemoveDataBookmarks.mockReturnValue(mockBookmark)
        dispatch.mockReturnValue(mockRemoveDataBookmarks)

        const { debug, container } = render(<PopularCard 
            visibleItems={3}
            indexCount={0}
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[item]}
            screenWidth={800}
        />)
        const popular_card = screen.getByTestId("popular_card")
        expect(popular_card).toBeInTheDocument();   

        const bookmark = screen.getByTestId("remove_bookmark_button")
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
            id: "sometoken"
        } as unknown as User
        const item:any = { ...fake_popular[0] };
        const { debug, container } = render(<PopularCard 
            visibleItems={3}
            indexCount={0}
            user={user}
            result={ item?.media_type ? {...item} : {...item, media_type: "movie" } }
            bookmarkData={[item]}
            screenWidth={800}
        />)
        const popular_card = screen.getByTestId("popular_card")
        expect(popular_card).toBeInTheDocument();   

        const view_detail = screen.getByTestId("view_detail_button")
        expect(view_detail).toBeInTheDocument();      
        
        fireEvent.click(view_detail)
        expect(mockRouter.push).toHaveBeenCalledWith(`/movie/${item.id}`)
    }) 

})