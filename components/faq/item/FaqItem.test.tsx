import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';
import FaqItem from './FaqItem';


describe("<FaqItem />", () => {

    afterAll(() => {
        jest.clearAllMocks();
    })

    it("must render the <FaqItem />", () => {
        const fakedata = {
            key: 0,
            id: 0,
            title: 'Some Title',
            description: 'Some description'
        }
        render(<FaqItem key={fakedata.key} id={fakedata.id} title={fakedata.title} description={fakedata.description} />)
        const itemComponent = screen.getByTestId("faq_item")
        expect(itemComponent).toBeInTheDocument();
    })

    it("must check if initial is closed, clicked to open", () => {
        const fakedata = {
            key: 0,
            id: 0,
            title: 'Some Title',
            description: 'Some description'
        }

        render(<FaqItem key={fakedata.key} id={fakedata.id} title={fakedata.title} description={fakedata.description} />)
        const itemComponent = screen.getByTestId("clickable_item")
        expect(itemComponent).toBeInTheDocument();

        // description_container is initially closed
        const description_close = screen.getByTestId("description_container")
        expect(description_close).toHaveClass("description_close")

        // trigger onClick event
        fireEvent.click(itemComponent)

        // description_container must be open
        const description_open = screen.getByTestId("description_container")
        expect(description_open).toHaveClass("description_open")

    })
})