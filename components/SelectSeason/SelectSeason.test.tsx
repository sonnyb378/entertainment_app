import { fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
// import { useRouter } from "next/router"

import SelectSeason from './SelectSeason'
import { tvData } from '../../model/fake_tv_detail'
import React from "react"
import { useState } from "react";

jest.mock('react', ()=>({
    ...jest.requireActual('react'),
    useState: jest.fn()
}))


describe("<SelectSeason />", () => {

    beforeEach(() => {
        const mockUseState = useState as jest.Mock;
        mockUseState.mockImplementation(jest.requireActual('react').useState);
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render <SelectSeason />", () => {
        const clickHandler = jest.fn();

        render(<SelectSeason data={tvData} onClickHandler={clickHandler} />)
        const dropdown_container = screen.getByTestId("dropdown_container")
        expect(dropdown_container).toBeInTheDocument()
    })

    it("must render dropdown items", () => {
        const clickHandler = jest.fn();

        render(<SelectSeason data={tvData} onClickHandler={clickHandler} />)
        const dropdown_container = screen.getByTestId("dropdown_container")
        expect(dropdown_container).toBeInTheDocument()

        const dropdown_items = screen.getAllByTestId("dropdown_item")
        expect(dropdown_items.length).toBeGreaterThan(0)
    })

    it("must render dropdown button", () => {
        const clickHandler = jest.fn();

        render(<SelectSeason data={tvData} onClickHandler={clickHandler} />)
        const dropdown_container = screen.getByTestId("dropdown_container")
        expect(dropdown_container).toBeInTheDocument()

        const dropdown_button = screen.getByTestId("dropdown_button")
        expect(dropdown_button).toBeInTheDocument()
    })

    it("must trigger dropdown button", () => {
        const clickHandler = jest.fn();

        const { debug, container } = render(<SelectSeason data={tvData} onClickHandler={clickHandler} />)
        const dropdown_container = screen.getByTestId("dropdown_container")
        expect(dropdown_container).toBeInTheDocument()

        const dropdown_list_hidden = within(container).getByTestId("dropdown_items_container")
        expect(dropdown_list_hidden).toHaveClass("hidden")

        const dropdown_button = within(container).getByTestId("dropdown_button")
        expect(dropdown_button).toBeInTheDocument()

        fireEvent.click(dropdown_button)
        const dropdown_list_show = within(container).getByTestId("dropdown_items_container")
        expect(dropdown_list_show).toHaveClass("flex")

    })

    it("must be able to select a season", () => {
        const clickHandler = jest.fn();

        const { debug, container } = render(<SelectSeason data={tvData} onClickHandler={clickHandler} />)
        const dropdown_container = within(container).getByTestId("dropdown_container")
        expect(dropdown_container).toBeInTheDocument()

        const item = within(container).getAllByTestId("dropdown_item")
        fireEvent.click(item[0])
        expect(clickHandler).toHaveBeenCalled()

    })


})