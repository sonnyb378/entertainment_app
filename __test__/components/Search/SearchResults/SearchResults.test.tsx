import * as React from "react";
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
// import { useRouter } from "next/router"

import SearchResults from '../../../../components/Search/SearchResults/SearchResults'
import { useAppSelector } from "../../../../app/hooks"
// import { removeDataBookmarks, setDataBookmarks, selectBookmarkData } from '../../../app/store/slices/bookmarks'
// import axios from 'axios';

import { useBlackAdam, useStarTrek } from '../../../../model/fake_search'

import useSWRInfinite from 'swr/infinite'


jest.mock("../../../../app/store/slices/bookmarks", () => ({
    setDataBookmarks: jest.fn(),
    removeDataBookmarks: jest.fn()
}))

jest.mock("react-firebase-hooks/auth", () => ({
    useAuthState: jest.fn()
}))

jest.mock("../../../../app/hooks", () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn()
}))

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} priority="true" />
    },
}))

jest.mock("swr/infinite")


describe("<SearchResults />", () => {

    beforeAll(() => {           
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render <SearchResults />", () => {

        const fake_search = useBlackAdam(encodeURI("some movie title"));

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector.mockReturnValue(jest.fn())
        mockAppSelector.mockReturnValue({ data: [
            {
                id: 76600,
                name: "Movie Title",
                backdrop_path: "/tQ91wWQJ2WRNDXwxuO7GCXX5VPC.jpg",
                poster_path: "/94xxm5701CzOdJdUEdIuwqZaowx.jpg",
                media_type: "movie",
                genre_ids: [878, 28, 12],
            }
        ]})

        const useSWR_Infinite = useSWRInfinite as jest.Mock;
        const mockSWRInfinite = { 
            data: [[fake_search.data.results[0]]], 
            error: null, 
            size: 0, 
            setSize: jest.fn() 
        }
        useSWR_Infinite.mockReturnValue(mockSWRInfinite)

        render(<SearchResults keyword={ encodeURI("some title")} />)
        const search_results_container = screen.getByTestId("search_results_container")
        expect(search_results_container).toBeInTheDocument();
    })


    it("must render <SearchResults /> with no result", async () => {

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector.mockReturnValue({ data: [
            {
                id: 76600,
                name: "Movie Title",
                backdrop_path: "/tQ91wWQJ2WRNDXwxuO7GCXX5VPC.jpg",
                poster_path: "/94xxm5701CzOdJdUEdIuwqZaowx.jpg",
                media_type: "movie",
                genre_ids: [878, 28, 12],
            }
        ]})

        const useSWR_Infinite = useSWRInfinite as jest.Mock;
        const mockSWRInfinite = { 
            data: [[]], 
            error: null, 
            size: 0, 
            setSize: jest.fn() 
        }
        useSWR_Infinite.mockReturnValue(mockSWRInfinite)

        const { debug, container } = render(<SearchResults keyword={ encodeURI("some title")} />)
        const search_results_container = screen.getByTestId("search_results_container")
        expect(search_results_container).toBeInTheDocument();

        const no_records = within(container).getByText("No Records Found")
        expect(no_records).toBeInTheDocument();


    })


    it("must render <SearchResults /> load more button", async () => {

        const fake_search = useStarTrek(encodeURI("some movie title"));

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector.mockReturnValue({ data: [
            {
                id: 76600,
                name: "Movie Title",
                backdrop_path: "/tQ91wWQJ2WRNDXwxuO7GCXX5VPC.jpg",
                poster_path: "/94xxm5701CzOdJdUEdIuwqZaowx.jpg",
                media_type: "movie",
                genre_ids: [878, 28, 12],
            }
        ]})

        const useSWR_Infinite = useSWRInfinite as jest.Mock;
        const mockSWRInfinite = { 
            data: [fake_search.data.results], 
            error: null, 
            size: 0, 
            setSize: jest.fn() 
        }
        useSWR_Infinite.mockReturnValue(mockSWRInfinite)

        // const search_results = mockSWRInfinite.data

        const { debug, container } = render(<SearchResults keyword={ encodeURI("some title")} />)
        const search_results_container = screen.getByTestId("search_results_container")
        expect(search_results_container).toBeInTheDocument();

        const loadmore_button = within(container).getByTestId("loadmore_button")
        expect(loadmore_button).toBeInTheDocument();


    })

})



// [
//     [
        // {
        //     "adult": false,
        //     "backdrop_path": "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
        //     "genre_ids": [
        //         14,
        //         28,
        //         878
        //     ],
        //     "id": 436270,
        //     "media_type": "movie",
        //     "original_language": "en",
        //     "original_title": "Black Adam",
        //     "overview": "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
        //     "popularity": 1876.042,
        //     "poster_path": "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
        //     "release_date": "2022-10-21",
        //     "title": "Black Adam",
        //     "video": false,
        //     "vote_average": 7.2,
        //     "vote_count": 3650
        // },
//         {
//             "adult": false,
//             "backdrop_path": "/jVsbzy5gj3McD8V6dDr7EMrLSqT.jpg",
//             "genre_ids": [
//                 99
//             ],
//             "id": 1040330,
//             "media_type": "movie",
//             "original_language": "en",
//             "original_title": "Black Adam: Saviour or Destroyer?",
//             "overview": "Ahead of the release of upcoming fantasy film ‘Black Adam’, sit down with Dwayne Johnson as he discusses his starring role as the eponymous superhero.",
//             "popularity": 80.431,
//             "poster_path": "/sTuXDWacwdcMS7NNLaynkfVBZkr.jpg",
//             "release_date": "2022-10-15",
//             "title": "Black Adam: Saviour or Destroyer?",
//             "video": false,
//             "vote_average": 7,
//             "vote_count": 356
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/1GzlEn3AOlBFrx6vsqq1JAkH4G3.jpg",
//             "genre_ids": [
//                 16,
//                 28,
//                 878,
//                 14
//             ],
//             "id": 43641,
//             "media_type": "movie",
//             "original_language": "en",
//             "original_title": "Superman/Shazam!: The Return of Black Adam",
//             "overview": "Chosen the world’s protector against the Seven Deadly Enemies of Man – pride, envy, greed, hatred, selfishness, laziness and injustice – young Billy Batson accepts his destiny as Captain Marvel. Battling alongside Superman against nefarious Black Adam, Billy soon discovers the challenge super heroes ultimately face: is it revenge or justice?",
//             "popularity": 38.142,
//             "poster_path": "/3MgwChvi42N1RnhQE9A4pQVHyUY.jpg",
//             "release_date": "2010-11-16",
//             "title": "Superman/Shazam!: The Return of Black Adam",
//             "video": false,
//             "vote_average": 7,
//             "vote_count": 1339
//         },
//         {
//             "adult": false,
//             "gender": 0,
//             "id": 2875851,
//             "known_for": [
//                 {
//                     "adult": false,
//                     "genre_ids": [
//                         35
//                     ],
//                     "id": 769964,
//                     "media_type": "movie",
//                     "original_language": "es",
//                     "original_title": "El sekuestro",
//                     "overview": "",
//                     "poster_path": "/hpF4gKv4SgtnVvxARfYlMzGWtQ8.jpg",
//                     "release_date": "1997-04-24",
//                     "title": "El sekuestro",
//                     "video": false,
//                     "vote_average": 0,
//                     "vote_count": 0
//                 }
//             ],
//             "known_for_department": "Acting",
//             "media_type": "person",
//             "name": "Adam Black",
//             "popularity": 0.6,
//             "profile_path": null
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/vg3TwaY1rj0ETlFCTha8tm9tJVL.jpg",
//             "genre_ids": [
//                 16,
//                 28,
//                 12,
//                 14,
//                 878
//             ],
//             "id": 640810,
//             "media_type": "movie",
//             "original_language": "en",
//             "original_title": "DC Showcase Original Shorts Collection",
//             "overview": "An anthology of DC Showcase stories consisting of a new Superman/Shazam feature and extended versions of older shorts.",
//             "popularity": 16.482,
//             "poster_path": "/cEowD2KjdAzGqQcn3kIZpdEsvfr.jpg",
//             "release_date": "2010-11-09",
//             "title": "DC Showcase Original Shorts Collection",
//             "video": true,
//             "vote_average": 7.1,
//             "vote_count": 20
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/mwJqenycCK0jCLgIz8dHTidd7Xw.jpg",
//             "genre_ids": [
//                 10751,
//                 12,
//                 16,
//                 35
//             ],
//             "id": 690369,
//             "media_type": "movie",
//             "original_language": "en",
//             "original_title": "LEGO DC: Shazam! Magic and Monsters",
//             "overview": "It’s high time the Justice League took notice of Shazam, but joining the world’s greatest team of superheroes is a lot harder when they’ve all been turned into kids.",
//             "popularity": 20.702,
//             "poster_path": "/ziIyuNNNwYqv0qbOpV9VvvdnRBb.jpg",
//             "release_date": "2020-04-28",
//             "title": "LEGO DC: Shazam! Magic and Monsters",
//             "video": false,
//             "vote_average": 7.4,
//             "vote_count": 122
//         }
//     ]
// ]