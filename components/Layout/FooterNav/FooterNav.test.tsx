import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import FooterNav from "../FooterNav/FooterNav";


describe("<FooterNav />", () => {

    afterAll(() => {
        jest.clearAllMocks();
    })

    it("must display the footer nav", () => {
        const items = [{
            title: "Item Title",
            url: "./item_url"
        }]
        render(<FooterNav title="Nav Title" items={items} />)
        const footerNavComponent = screen.getByTestId("footernav_container")
        expect(footerNavComponent).toBeInTheDocument();
        
        const liItems = within(footerNavComponent).getAllByRole("footer_items")
        expect(liItems.length > 0).toBeTruthy();

    })

    it("must display title", () => {
        const items = [{
            title: "Item Title",
            url: "./item_url"
        }]
        render(<FooterNav title="Nav Title" items={items} />)
        const footerNavComponent = screen.getByTestId("footernav_container")

        const navTitle = within(footerNavComponent).getByText("Nav Title")
        expect(navTitle).toBeInTheDocument();

    })

    it("must not display title", () => {
        const items = [{
            title: "Item Title",
            url: "./item_url"
        }]
        render(<FooterNav title={null} items={items} />)
        const footerNavComponent = screen.getByTestId("footernav_container")

        const navTitle = within(footerNavComponent).queryByText("Nav Title")
        expect(navTitle).not.toBeInTheDocument();
    })


})