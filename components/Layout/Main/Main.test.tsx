import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';
import Main from "./Main"

import { useRouter } from "next/router"
import { useAuthState } from "react-firebase-hooks/auth";

jest.mock("../../../firebase", () => ({}))
jest.mock("../../../app/hooks")

jest.mock("next/head", () => ({
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
        return <>{children}</>;
    }
}))

jest.mock("next/router", () => ({
    __esModule: true,
    useRouter: jest.fn()
})) 

describe("<Main />", () => {

    beforeAll(() => {
        const mockUseAuthState = useAuthState as jest.Mock;
        mockUseAuthState.mockReturnValue([true, false])
    })
    afterAll(() => {
        jest.clearAllMocks()
    })

    it("must display the <Main /> component", () => {
        const router = useRouter as jest.Mock;
        const mockRouter = {
            asPath: jest.fn()
        }
        router.mockReturnValue(mockRouter)
        
        render(<Main showHero={true} ></Main>)
        const mainComponent = screen.getByTestId("main_component")
        expect(mainComponent).toBeInTheDocument();        
    }) 

    it("must display <Hero /> component", () => {
        render(<Main showHero={true} ></Main>)
        const mainComponent = screen.getByTestId("main_component")

        const heroComponent = within(mainComponent).getByTestId("hero")
        expect(heroComponent).toBeInTheDocument();
    }) 

    it("must not display <Hero /> component", () => {
        render(<Main showHero={false} ></Main>)
        const mainComponent = screen.getByTestId("main_component")

        const heroComponent = within(mainComponent).queryByTestId("hero")
        expect(heroComponent).not.toBeInTheDocument();
    })

    it("must display <Header /> component", () => {
        render(<Main showHero={false} ></Main>)
        const mainComponent = screen.getByTestId("main_component")

        const header = within(mainComponent).getByTestId("header")
        expect(header).toBeInTheDocument();
    }) 

    it("must not display <Footer /> component", () => {
        render(<Main showHero={false} ></Main>)
        const mainComponent = screen.getByTestId("main_component")

        const footer = within(mainComponent).getByTestId("footer_container")
        expect(footer).toBeInTheDocument();
    })


})