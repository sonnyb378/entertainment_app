import * as React from "react"
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// import { useRouter } from "next/router"

import SearchResultItem from "../../../../components/Search/SearchResultItem/SearchResultItem"
// import { IResult } from './SearchResultItem'

import { useBlackAdam } from '../../../../model/fake_search'
import { useAppSelector } from "../../../../app/hooks"
// import { IAuthState } from '../../../ts/states/auth_state'

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

describe("<SearchResultItem />", () => {

    beforeAll(() => {           
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render <SearchResultItem />", () => {
        const { data } = useBlackAdam("black%20adam");
        const item:any = { ...data.results[0], first_air_date:"2022-11-23", name:"", original_name: "", known_for: null }

        render(<SearchResultItem result={ item } bookmarkData={[]} />)
        const thumbnail = screen.getByTestId("thumbnail_container")
        expect(thumbnail).toBeInTheDocument()
    })

    it("must render with thumbnail", () => {
        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector.mockReturnValue({
            accessToken: null
        })

        const { data } = useBlackAdam("black%20adam");
        const item:any = { ...data.results[0], first_air_date:"2022-11-23", name:"", original_name: "", known_for: null }

        render(<SearchResultItem result={ item } bookmarkData={[]} />)
        const thumbnail_container = screen.getByTestId("thumbnail_container")
        expect(thumbnail_container).toBeInTheDocument()

        const thumbnail = screen.getByTestId("thumbnail")
        expect(thumbnail).toBeInTheDocument()


    })

})