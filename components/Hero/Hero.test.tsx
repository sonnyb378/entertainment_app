import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import Hero from "./Hero"

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
      return <img {...props } priority="true" />
    },
  }))

describe("<Hero />", () => {

    afterAll(() => {
        jest.clearAllMocks()
    })
    
    it("must display the hero component", () => {
        render(<Hero />)
        const heroComponent = screen.getByTestId("hero")
        expect(heroComponent).toBeInTheDocument();
    })

    it("must display the <Image />", async () => {
        const { debug, container} = render(<Hero />)
        const heroComponent = within(container).getByTestId("hero")
        expect(heroComponent).toBeInTheDocument();

        const img = within(container).getByTestId("image_container")
        expect(img).toBeInTheDocument();
        
        // debug();

    })


})