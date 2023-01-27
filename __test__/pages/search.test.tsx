import * as React from "react";
import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import Search from '../../pages/search'
import useSWRInfinite from 'swr/infinite'

import { useRouter } from "next/router"
import { removeDataBookmarks, setDataBookmarks } from '../../app/store/slices/bookmarks'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useAuthState } from "react-firebase-hooks/auth";

jest.mock("react-firebase-hooks/auth", () => ({
    useAuthState: jest.fn()
}))

jest.mock("next/router", () => ({
    __esModule: true,
    useRouter: jest.fn()
}))

jest.mock("../../app/hooks", () => ({
    __esModule: true,
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn()
}))

jest.mock("../../firebase", () => ({
    auth: jest.fn(),
}))

jest.mock("../../app/store/slices/bookmarks", () => ({
    setDataBookmarks: jest.fn(),
    removeDataBookmarks: jest.fn(),
    selectBookmarkData: jest.fn()
}))

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} priority="true" />
    },
}))

jest.mock("swr/infinite")

describe("<Search />", () => {

    beforeAll(() => {    
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
        .mockReturnValue({
            currentUrl: "/movies"
        })
        .mockReturnValue({ data: [bookmarkData] })

        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);
        
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render <Search />", () => {

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, mockSetState])
        .mockImplementationOnce(() => [false, mockSetState])
        .mockImplementationOnce(() => [false, mockSetState])

        const data =[
            {
                "adult": false,
                "backdrop_path": "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
                "genre_ids": [
                    28,
                    14,
                    878
                ],
                "id": 436270,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Black Adam",
                "overview": "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
                "popularity": 9649.909,
                "poster_path": "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
                "release_date": "2022-10-19",
                "title": "Black Adam",
                "video": false,
                "vote_average": 7.3,
                "vote_count": 2353
            },
            {
                "adult": false,
                "backdrop_path": "/jVsbzy5gj3McD8V6dDr7EMrLSqT.jpg",
                "genre_ids": [
                    99
                ],
                "id": 1040330,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Black Adam: Saviour or Destroyer?",
                "overview": "Ahead of the release of upcoming fantasy film ‘Black Adam’, sit down with Dwayne Johnson as he discusses his starring role as the eponymous superhero.",
                "popularity": 184.817,
                "poster_path": "/sTuXDWacwdcMS7NNLaynkfVBZkr.jpg",
                "release_date": "2022-10-15",
                "title": "Black Adam: Saviour or Destroyer?",
                "video": false,
                "vote_average": 7.1,
                "vote_count": 257
            },
            {
                "adult": false,
                "backdrop_path": "/1GzlEn3AOlBFrx6vsqq1JAkH4G3.jpg",
                "genre_ids": [
                    16,
                    28,
                    878,
                    14
                ],
                "id": 43641,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Superman/Shazam!: The Return of Black Adam",
                "overview": "Chosen the world’s protector against the Seven Deadly Enemies of Man – pride, envy, greed, hatred, selfishness, laziness and injustice – young Billy Batson accepts his destiny as Captain Marvel. Battling alongside Superman against nefarious Black Adam, Billy soon discovers the challenge super heroes ultimately face: is it revenge or justice?",
                "popularity": 77.19,
                "poster_path": "/3MgwChvi42N1RnhQE9A4pQVHyUY.jpg",
                "release_date": "2010-11-16",
                "title": "Superman/Shazam!: The Return of Black Adam",
                "video": false,
                "vote_average": 7,
                "vote_count": 1206
            },
            {
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
            },
            {
                "adult": false,
                "backdrop_path": "/vg3TwaY1rj0ETlFCTha8tm9tJVL.jpg",
                "genre_ids": [
                    16,
                    28,
                    12,
                    14,
                    878
                ],
                "id": 640810,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "DC Showcase Original Shorts Collection",
                "overview": "An anthology of DC Showcase stories consisting of a new Superman/Shazam feature and extended versions of older shorts.",
                "popularity": 20.189,
                "poster_path": "/cEowD2KjdAzGqQcn3kIZpdEsvfr.jpg",
                "release_date": "2010-11-09",
                "title": "DC Showcase Original Shorts Collection",
                "video": true,
                "vote_average": 7.2,
                "vote_count": 18
            },
            {
                "adult": false,
                "backdrop_path": "/mwJqenycCK0jCLgIz8dHTidd7Xw.jpg",
                "genre_ids": [
                    10751,
                    12,
                    16,
                    35
                ],
                "id": 690369,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "LEGO DC: Shazam! Magic and Monsters",
                "overview": "It’s high time the Justice League took notice of Shazam, but joining the world’s greatest team of superheroes is a lot harder when they’ve all been turned into kids.",
                "popularity": 30.032,
                "poster_path": "/ziIyuNNNwYqv0qbOpV9VvvdnRBb.jpg",
                "release_date": "2020-04-28",
                "title": "LEGO DC: Shazam! Magic and Monsters",
                "video": false,
                "vote_average": 7.4,
                "vote_count": 117
            }
        ]
        
        const mockSWRInfinite = useSWRInfinite as jest.Mock;
        const mockResult = {
            data: data
        }
        mockSWRInfinite.mockReturnValue({ "data": [...mockResult.data], "error": null });

        const router = useRouter as jest.Mock;
        const mockRouter = {
            asPath: {
                includes: jest.fn().mockImplementation(() => "/search?q=movietitle"),
                split: jest.fn().mockReturnValue(["/search", "q=movietitle"])
            },
            push: jest.fn()
        }
        router.mockReturnValue(mockRouter)
        
        const { debug, container } = render(<Search />)
        const search_container = within(container).getByTestId("search_container")
        expect(search_container).toBeInTheDocument();

        // debug();
    })


    it("must render <SearchResults />", () => {
        
        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, mockSetState])
        .mockImplementationOnce(() => [false, mockSetState])
        .mockImplementationOnce(() => [false, mockSetState])

        const data =[
            {
                "adult": false,
                "backdrop_path": "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
                "genre_ids": [
                    28,
                    14,
                    878
                ],
                "id": 436270,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Black Adam",
                "overview": "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
                "popularity": 9649.909,
                "poster_path": "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
                "release_date": "2022-10-19",
                "title": "Black Adam",
                "video": false,
                "vote_average": 7.3,
                "vote_count": 2353
            },
            {
                "adult": false,
                "backdrop_path": "/jVsbzy5gj3McD8V6dDr7EMrLSqT.jpg",
                "genre_ids": [
                    99
                ],
                "id": 1040330,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Black Adam: Saviour or Destroyer?",
                "overview": "Ahead of the release of upcoming fantasy film ‘Black Adam’, sit down with Dwayne Johnson as he discusses his starring role as the eponymous superhero.",
                "popularity": 184.817,
                "poster_path": "/sTuXDWacwdcMS7NNLaynkfVBZkr.jpg",
                "release_date": "2022-10-15",
                "title": "Black Adam: Saviour or Destroyer?",
                "video": false,
                "vote_average": 7.1,
                "vote_count": 257
            },
            {
                "adult": false,
                "backdrop_path": "/1GzlEn3AOlBFrx6vsqq1JAkH4G3.jpg",
                "genre_ids": [
                    16,
                    28,
                    878,
                    14
                ],
                "id": 43641,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Superman/Shazam!: The Return of Black Adam",
                "overview": "Chosen the world’s protector against the Seven Deadly Enemies of Man – pride, envy, greed, hatred, selfishness, laziness and injustice – young Billy Batson accepts his destiny as Captain Marvel. Battling alongside Superman against nefarious Black Adam, Billy soon discovers the challenge super heroes ultimately face: is it revenge or justice?",
                "popularity": 77.19,
                "poster_path": "/3MgwChvi42N1RnhQE9A4pQVHyUY.jpg",
                "release_date": "2010-11-16",
                "title": "Superman/Shazam!: The Return of Black Adam",
                "video": false,
                "vote_average": 7,
                "vote_count": 1206
            },
            {
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
            },
            {
                "adult": false,
                "backdrop_path": "/vg3TwaY1rj0ETlFCTha8tm9tJVL.jpg",
                "genre_ids": [
                    16,
                    28,
                    12,
                    14,
                    878
                ],
                "id": 640810,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "DC Showcase Original Shorts Collection",
                "overview": "An anthology of DC Showcase stories consisting of a new Superman/Shazam feature and extended versions of older shorts.",
                "popularity": 20.189,
                "poster_path": "/cEowD2KjdAzGqQcn3kIZpdEsvfr.jpg",
                "release_date": "2010-11-09",
                "title": "DC Showcase Original Shorts Collection",
                "video": true,
                "vote_average": 7.2,
                "vote_count": 18
            },
            {
                "adult": false,
                "backdrop_path": "/mwJqenycCK0jCLgIz8dHTidd7Xw.jpg",
                "genre_ids": [
                    10751,
                    12,
                    16,
                    35
                ],
                "id": 690369,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "LEGO DC: Shazam! Magic and Monsters",
                "overview": "It’s high time the Justice League took notice of Shazam, but joining the world’s greatest team of superheroes is a lot harder when they’ve all been turned into kids.",
                "popularity": 30.032,
                "poster_path": "/ziIyuNNNwYqv0qbOpV9VvvdnRBb.jpg",
                "release_date": "2020-04-28",
                "title": "LEGO DC: Shazam! Magic and Monsters",
                "video": false,
                "vote_average": 7.4,
                "vote_count": 117
            }
        ]
        
        const mockSWRInfinite = useSWRInfinite as jest.Mock;
        const mockResult = {
            data: data
        }
        mockSWRInfinite.mockReturnValue({ "data": [...mockResult.data], "error": null });

        const router = useRouter as jest.Mock;
        const mockRouter = {
            asPath: {
                includes: jest.fn().mockImplementation(() => "/search?q=movietitle"),
                split: jest.fn().mockReturnValue(["/search", "q=movietitle"])
            },
            push: jest.fn()
        }
        router.mockReturnValue(mockRouter)


        const { debug, container } = render(<Search />)
        const search_container = within(container).getByTestId("search_container")
        expect(search_container).toBeInTheDocument();

        const search_results_container = within(search_container).getByTestId("search_results_container")
        expect(search_results_container).toBeInTheDocument();

    })

})