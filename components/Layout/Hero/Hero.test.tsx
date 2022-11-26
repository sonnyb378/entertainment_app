import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom';

import Hero from "./Hero"

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
      return <img {...props} />
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
        render(<Hero />)
        const heroComponent = screen.getByTestId("hero")
        expect(heroComponent).toBeInTheDocument();

        const img = within(heroComponent).getByTestId("image_container")
        expect(img).toBeInTheDocument();
       
    })


})