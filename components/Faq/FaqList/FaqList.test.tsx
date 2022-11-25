import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import FaqList from "./FaqList";

// import {faq_list} from "../../../model/faq";

describe("<FaqList />", () => {
    it("must display <FaqList /> with items", () => {
        
        render(<FaqList list={[
            {
                id: 0, 
                title: "What is Wibix?",
                description: "Wibix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices." +
                "You can watch as much as you want, whenever you want – all for one low monthly price. There\'s always something new to discover and new TV shows and movies are added every week!"
            }
        ]} />);

        const faqListComponent = screen.getByTestId("faq_container")
        expect(faqListComponent).toBeInTheDocument();

        const items = within(faqListComponent).getAllByTestId("faq_item")
        
        // check if a faq list item exists
        expect(items.length > 0).toBeTruthy();

    })
})