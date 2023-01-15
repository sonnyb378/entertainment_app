import { fireEvent, render, screen, within, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import PosterImage from './PosterImage'
import { fake_trending } from '../../../model/fake_trending'
import React from 'react'

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} priority="true" />
    },
}))

describe("<PosterImage />", () => {

    beforeAll(() => {           
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render <PosterImage />", () => {
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
        const item:any = fake_trending[0];
        const { container } = render(<PosterImage 
            user={user} 
            expand={false}
            src={ item.backdrop_path}
            media_type={ item.media_type}
        />)
        const poster = within(container).getByTestId("poster_image_container")
        expect(poster).toBeInTheDocument()

    })

    it("must render bookmark icon ", () => {
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
        const { container } = render(<PosterImage 
            user={user} 
            expand={true}
            src={ item.backdrop_path }
            media_type={ item.media_type }
        />)

        const bookmark_icon = within(container).getByTestId("bookmark_icon")
        expect(bookmark_icon).toBeInTheDocument()
    })

    it("must not render bookmark icon ", () => {
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
        const { container } = render(<PosterImage 
            user={user} 
            expand={false}
            src={ item.backdrop_path }
            media_type={ item.media_type }
        />)

        const bookmark_icon = within(container).queryByTestId("bookmark_icon")
        expect(bookmark_icon).toBeNull()
    })

})