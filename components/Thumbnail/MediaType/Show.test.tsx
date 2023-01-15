import { fireEvent, render, screen, within, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import MediaTypeShow from './Show'
import { fake_trending } from '../../../model/fake_trending'

describe("<MediaTypeShow />", () => {

    beforeAll(() => {           
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render <MediaTypeShow />", () => {
        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = { ...fake_trending[0] };

        const { container } = render(<MediaTypeShow result={ item } />)
        const mediatype_show = within(container).getByTestId("mediatype_show")
        expect(mediatype_show).toBeInTheDocument();
    })

    it("must render movie icon", () => {
        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = { ...fake_trending[0] };

        const { container } = render(<MediaTypeShow result={ item } />)
        const mediatype_show = within(container).getByTestId("mediatype_show")
        expect(mediatype_show).toBeInTheDocument();

        const film_icon = within(mediatype_show).queryByTestId("film_icon")
        expect(film_icon).not.toBeNull();

        const tv_icon = within(mediatype_show).queryByTestId("tv_icon")
        expect(tv_icon).toBeNull();

    })

    it("must render tv icon", () => {
        const user = {
            id: "somevalue",
            accessToken: "someToken",
            expiresAt: "someTimestamp"
        }
        const item:any = { ...fake_trending[0], media_type: "tv" };

        const { debug, container } = render(<MediaTypeShow result={ item } />)

        const mediatype_show = within(container).getByTestId("mediatype_show")
        expect(mediatype_show).toBeInTheDocument();

        const tv_icon = within(mediatype_show).queryByTestId("tv_icon")
        expect(tv_icon).not.toBeNull();

        const film_icon = within(mediatype_show).queryByTestId("film_icon")
        expect(film_icon).toBeNull();

    })

})

