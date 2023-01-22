import React from "react"
import { fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import Spinner from "../../../components/Spinner/Spinner"

describe("<Spinner />", () => {
 
    afterAll(() => {
        jest.clearAllMocks();
    })

    it("must render <Spinner />", () => {
        const { container } = render(<Spinner />)
        const spinner_container = within(container).getByTestId("spinner_container")
        expect(spinner_container).toBeInTheDocument();
    })
    
})