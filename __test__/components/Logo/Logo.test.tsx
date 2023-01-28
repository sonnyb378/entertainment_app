import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Logo from "../../../components/Logo/Logo"

import { useRouter } from "next/router"

jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn()
}))

describe('<Logo />', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('must display logo', async () => {
        const alt = "logo"

        render(<Logo urlPath='/' />);
        const img = screen.getByAltText(alt);
        expect(img).toBeInTheDocument();
    })

    it("must redirect to homepage when user clicks logo", () => {
        
        const router = useRouter as jest.Mock;
        const mockRouter =  {
            replace: jest.fn() 
        }
        router.mockReturnValue(mockRouter)

        render(<Logo urlPath="/" />);        
        const buttonComponent = screen.getByTestId("logo_container");
        expect(buttonComponent).toBeInTheDocument();
        
        fireEvent.click(buttonComponent)
        
        expect(mockRouter.replace).toHaveBeenCalledWith("/")

    })

    it("must redirect to /movies when a loggedin user clicks logo", () => {
        
        const router = useRouter as jest.Mock;
        const mockRouter =  {
            replace: jest.fn() 
        }
        router.mockReturnValue(mockRouter)

        render(<Logo urlPath="/movies" />);        
        const buttonComponent = screen.getByTestId("logo_container");
        expect(buttonComponent).toBeInTheDocument();
        
        fireEvent.click(buttonComponent)
        
        expect(mockRouter.replace).toHaveBeenCalledWith("/movies")

    })

})