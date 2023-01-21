import React from 'react'
import { render, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import Video from '../../../../components/Thumbnail/Video/Video'

import {movieData} from "../../../../model/fake_detail"

describe("<Video />", () => {

    afterAll(() => {
        jest.clearAllMocks()
    })

    it("must render <Video />", () => {
        const data = movieData as any
        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const { container } = render(<Video 
            result={data} 
            expand={true} 
            user={user} 
            src="/train.mp4" 
            isBookmarked={true}
        />)
        const video_container = within(container).getByTestId("video_container")
        expect(video_container).toBeInTheDocument();

    })
})
