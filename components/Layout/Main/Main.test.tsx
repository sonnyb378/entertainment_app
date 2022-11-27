import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import Main from "./Main"

import { useAuthState } from "react-firebase-hooks/auth";

jest.mock("../../../firebase", () => ({}))
jest.mock("../../../app/hooks")

describe("<Main />", () => {

    beforeAll(() => {
        const mockUseAuthState = useAuthState as jest.Mock;
        mockUseAuthState.mockReturnValue([true, false])
    })
    afterAll(() => {
        jest.clearAllMocks()
    })

    it("must display the <Main /> component", () => {
        const meta = {
            pageTitle: "Page Title",
            pageDescription: "Page Description"
        }

        render(<Main showHero={true} meta={meta} />)
        
    }) 

    it("must display metadata", () => {
    }) 

    it("must display <Hero /> component", () => {
    }) 

    it("must not display <Hero /> component", () => {
    })

    it("must display <Header /> component", () => {
    }) 

    it("must not display <Footer /> component", () => {
    })


})