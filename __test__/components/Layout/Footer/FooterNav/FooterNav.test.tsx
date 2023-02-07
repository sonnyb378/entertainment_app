import * as React from "react";
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import FooterNav from "../../../../../components/Layout/Footer/FooterNav/FooterNav";


describe("<FooterNav />", () => {

    afterAll(() => {
        jest.clearAllMocks();
    })

    it("must display footer nav", () => {
        const items = [{
            title: "Item Title",
            url: "./item_url"
        }]
        
        const {container} = render(<FooterNav title="Nav Title" items={items} />)
        const footerNavComponent = within(container).getByTestId("footernav_container")
        expect(footerNavComponent).toBeInTheDocument();
        
        const liItems = within(container).getAllByRole("listitem")
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