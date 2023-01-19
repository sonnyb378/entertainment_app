import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import Footer from "./Footer";
// import LanguageSelector from "../../LanguageSelector/LanguageSelector"

describe("<Footer />", () => {
    afterAll(() => {
        jest.clearAllMocks();
    })

    it("must display the footer", () => {
        render(<Footer />)
        const footerComponent = screen.getByTestId("footer_container")
        expect(footerComponent).toBeInTheDocument();
    })

    it("must display a footer nav", () => {
        render(<Footer />)
        const footerComponent = screen.getByTestId("footer_container")
        const footerNavComponent = within(footerComponent).getAllByTestId("footernav_container")

        expect(footerNavComponent.length > 0).toBeTruthy();
    })

    it("must display <LanguageSelector />", () => {
        render(<Footer />)
        const footerComponent = screen.getByTestId("footer_container")
        const languageSelector = within(footerComponent).getByTestId("language_selector")

        expect(languageSelector).toBeInTheDocument();
    })
})