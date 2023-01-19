import { render, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import MediaTypePerson from './Person'
// import { fake_trending } from '../../../model/fake_trending'

describe("<MediaTypePerson />", () => {

    beforeAll(() => {           
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render <MediaTypePerson />", () => {
        
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

        const { container } = render(<MediaTypePerson result={ item } />)
        const mediatype_person = within(container).getByTestId("mediatype_person")
        expect(mediatype_person).toBeInTheDocument();
    })

   

})

