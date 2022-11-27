import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import LanguageSelector from "./LanguageSelector"

describe("<LanguageSelector />", () => {
    afterAll(() => {
        jest.clearAllMocks()
    })
    it("must display language selector", () => {
        render(<LanguageSelector />)
        const el = screen.getByTestId("language_selector")
        expect(el).toBeInTheDocument();
    })
})