import { fireEvent, render, screen, within, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import BackdropImage from './BackdropImage'
import { fake_trending } from '../../../model/fake_trending'
import React from 'react'

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} priority="true" />
    },
}))


describe("<BackdropImage />", () => {

    beforeAll(() => {           
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render <BackdropImage />", () => {
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
        const { container } = render(<BackdropImage 
            user={user} 
            expand={false}
            src={ item.backdrop_path}
            media_type={ item.media_type}
        />)
        const backdrop = within(container).getByTestId("backdrop_image_container")
        expect(backdrop).toBeInTheDocument()
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
        const { container } = render(<BackdropImage 
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
        const { container } = render(<BackdropImage 
            user={user} 
            expand={false}
            src={ item.backdrop_path }
            media_type={ item.media_type }
        />)

        const bookmark_icon = within(container).queryByTestId("bookmark_icon")
        expect(bookmark_icon).toBeNull()
    })

})