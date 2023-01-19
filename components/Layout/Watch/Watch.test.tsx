import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Watch from './Watch';


describe("<Watch />", () => {
    it("must display the <Watch /> component", () => {
        render(<Watch />)
        const container = screen.getByTestId("main_component")
        expect(container).toBeInTheDocument();
    })
})