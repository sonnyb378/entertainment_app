import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useAuthState } from "react-firebase-hooks/auth";
import {useRouter} from "next/router"; 
import Navigation from "./Navigation";

jest.mock("next/router", () => ({
    __esModule: true,
    useRouter: jest.fn()
}))

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


    it("must redirect to /movies when 'Movies' button is clicked", () => {
        
        const eventHandler = jest.fn();

        const user = useAuthState as jest.Mock;        
        user.mockReturnValue({
            id: "somevalue"
        });
        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn()
        }
        router.mockReturnValue(mockRouter)

        render(<Navigation show={ !!user().id }/>)
        const navBtn = screen.getByTestId('nav_movies')
        expect(navBtn).toBeInTheDocument()

        fireEvent.click(navBtn)
        expect(mockRouter.replace).toHaveBeenCalledWith("/movies")

    })

    it("must redirect to /tvshows when 'TV Shows' button ic clicked", () => {
        const user = useAuthState as jest.Mock;        
        user.mockReturnValue({
            id: "somevalue"
        });
        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn()
        }
        router.mockReturnValue(mockRouter)

        render(<Navigation show={ !!user().id }/>)
        const navBtn = screen.getByTestId('nav_tvshows')
        expect(navBtn).toBeInTheDocument()

        fireEvent.click(navBtn)
        expect(mockRouter.replace).toHaveBeenCalledWith("/tvshows")
    })

    it("must redirect to /user/mylist when 'My List' button ic clicked", () => {
        const user = useAuthState as jest.Mock;        
        user.mockReturnValue({
            id: "somevalue"
        });
        const router = useRouter as jest.Mock;
        const mockRouter = {
            replace: jest.fn()
        }
        router.mockReturnValue(mockRouter)

        render(<Navigation show={ !!user().id }/>)
        const navBtn = screen.getByTestId('nav_mylist')
        expect(navBtn).toBeInTheDocument()

        fireEvent.click(navBtn)
        expect(mockRouter.replace).toHaveBeenCalledWith("/user/mylist")
    })

})
