import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useAuthState } from "react-firebase-hooks/auth";

import Navigation from "./Navigation";

describe("<Navigation />", () => {

    afterAll(() => {
        jest.clearAllMocks();
    })

    it("must display navigation", () => {
        const user = useAuthState as jest.Mock;        
        user.mockReturnValue({
            id: "somevalue"
        });
        render(<Navigation show={ !!user().id }/>)
        const nav = screen.getByTestId('navigation_container')
        expect(nav).toHaveAttribute("class", "container")
    })

    it("must not display navigation", () => {
        const user = useAuthState as jest.Mock;        
        user.mockReturnValue({
            id: null
        });

        render(<Navigation show={ !!user().id }/>)
        const nav = screen.getByTestId('navigation_container')
        expect(nav).toHaveAttribute("class", "container_hidden")

    })

})
