import { fireEvent, render, screen, within, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from "next/router"

import ResultCardLoading from './ResultCardLoading'

describe("<ResultCardLoading />", () => {

    beforeAll(() => {           
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render <ResultCardLoading />", () => {
        render(<ResultCardLoading count={8} />)
        const loading_container = screen.getByTestId("loading_container")
        expect(loading_container).toBeInTheDocument()
    })

    it("must render specific number of loading cards", () => {
        const { container } = render(<ResultCardLoading count={8} />)
        const loading_container = screen.getByTestId("loading_container")
        expect(loading_container).toBeInTheDocument()

        const loading_card = within(container).getAllByTestId("loading_card")
        expect(loading_card.length).toEqual(8)
    })



})