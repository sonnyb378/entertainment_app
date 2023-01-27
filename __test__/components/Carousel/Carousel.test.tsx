import * as React from "react";
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { PlayCircleIcon, PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

// import { useAuthState } from "react-firebase-hooks/auth";
// import { IAuthState } from '../../ts/states/auth_state';
import Carousel from '../../../components/Carousel/Carousel';
import { useAppDispatch } from "../../../app/hooks"
import { fake_popular } from "../../../model/fake_popular"
import { useState } from "react";
import { User } from "firebase/auth";


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

// jest.mock('next/image');

jest.mock('react', ()=>({
    ...jest.requireActual('react'),
    useState: jest.fn()
}))

describe('<CustomBtn />', () => {
    
    beforeEach(() => {
        const mockUseState = useState as jest.Mock;
        mockUseState.mockImplementation(jest.requireActual('react').useState);

        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }))

        global.window = window;
    })

    afterEach(() => {
        jest.clearAllMocks();
    });    

    it('must render <Carousel />', () => {
        const mockSetState = jest.fn()
        jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => [6, mockSetState])
        .mockImplementationOnce(() => [3, mockSetState])
        .mockImplementationOnce(() => [899, mockSetState])
        .mockImplementationOnce(() => [0, mockSetState])

        const user = {
            id: "sometoken"
        } as unknown as User

        const dataBookmark:any = []
        const carouselData:any = fake_popular.slice(0,6);
        
        const {container} = render(<Carousel 
            data={carouselData} 
            user={user} 
            maxItems={carouselData.length} 
            bookmarkData={dataBookmark}
            baseWidth={290} 
            target="t"
          />)

        const carousel = within(container).getByTestId("carousel_maincontainer");
        expect(carousel).toBeInTheDocument();
    })

    it('must render <Carousel /> with Thumbnail component', () => {
        
        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [6, mockSetState])
        .mockImplementationOnce(() => [3, mockSetState])
        .mockImplementationOnce(() => [599, mockSetState])
        .mockImplementationOnce(() => [0, mockSetState])
        
        const dispatch = useAppDispatch as jest.Mock;
        const user = {
            id: "sometoken"
        } as unknown as User
        const dataBookmark:any = []
        
        const { container } = render(<Carousel 
            data={fake_popular.slice(0,4)} 
            user={user} 
            maxItems={fake_popular.slice(0,4).length} 
            bookmarkData={dataBookmark}
            baseWidth={290} 
            target="t"
            isThumbnail={true}
          />)

        const carousel = within(container).getByTestId("carousel_maincontainer");
        expect(carousel).toBeInTheDocument();

        const thumbnail = within(container).getAllByTestId("thumbnail")
        expect(thumbnail.length).toBeGreaterThan(0)
    })

    it('must render <Carousel /> with PopularCard component', () => {
        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [6, mockSetState])
        .mockImplementationOnce(() => [3, mockSetState])
        .mockImplementationOnce(() => [599, mockSetState])
        .mockImplementationOnce(() => [0, mockSetState])
        
        
        const user = {
            id: "sometoken"
        } as unknown as User
        const dataBookmark:any = []
        
        const { container } = render(<Carousel 
            data={fake_popular.slice(0,4)} 
            user={user} 
            maxItems={fake_popular.slice(0,4).length} 
            bookmarkData={dataBookmark}
            baseWidth={290} 
            target="t"
            isThumbnail={false}
          />)

        const carousel = within(container).getByTestId("carousel_maincontainer");
        expect(carousel).toBeInTheDocument();

        const popular_card = within(container).getAllByTestId("popular_card")
        expect(popular_card.length).toBeGreaterThan(0)
    })

    it('must trigger nextHandler event', () => {

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [6, mockSetState])
        .mockImplementationOnce(() => [2, mockSetState])
        .mockImplementationOnce(() => [699, mockSetState])
        .mockImplementationOnce(() => [0, mockSetState])

        const setStateMock = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMock];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        
        const user = {
            id: "sometoken"
        } as unknown as User
        const dataBookmark:any = []
        
        const { container } = render(<Carousel 
            data={fake_popular.slice(0,4)} 
            user={user} 
            maxItems={fake_popular.slice(0,4).length} 
            bookmarkData={dataBookmark}
            baseWidth={290} 
            target="t"
            isThumbnail={true}
          />)

        const carousel = within(container).getByTestId("carousel_maincontainer");
        expect(carousel).toBeInTheDocument();

        const nextBtn = within(container).getByTestId("next_btn")
        expect(nextBtn).toBeInTheDocument();
        act(() => {
            fireEvent.click(nextBtn)
        })
        expect(setStateMock).toHaveBeenCalled();

    })


    it('must trigger prevHandler event', () => {

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [6, mockSetState])
        .mockImplementationOnce(() => [2, mockSetState])
        .mockImplementationOnce(() => [699, mockSetState])
        .mockImplementationOnce(() => [0, mockSetState])

        const setStateMock = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMock];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        
        const user = {
            id: "sometoken"
        } as unknown as User
        const dataBookmark:any = []
        
        const { container } = render(<Carousel 
            data={fake_popular.slice(0,4)} 
            user={user} 
            maxItems={fake_popular.slice(0,4).length} 
            bookmarkData={dataBookmark}
            baseWidth={290} 
            target="t"
            isThumbnail={true}
          />)

        const carousel = within(container).getByTestId("carousel_maincontainer");
        expect(carousel).toBeInTheDocument();

        const nextBtn = within(container).getByTestId("next_btn")
        expect(nextBtn).toBeInTheDocument();

        act(() => {
            fireEvent.click(nextBtn)
        })
        expect(setStateMock).toHaveBeenCalled();

        const prevBtn = within(container).getByTestId("prev_btn")
        expect(prevBtn).toBeInTheDocument();
        act(() => {
            fireEvent.click(prevBtn)
        })
        expect(setStateMock).toHaveBeenCalled();

    })

})