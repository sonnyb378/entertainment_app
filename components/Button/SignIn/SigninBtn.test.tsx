import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import SigninBtn from './SigninBtn';

// import userEvent from "@testing-library/user-event";
// import { useRouter } from "next/router"

global.window = Object.create(window);

jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn()
}))

describe('<SignInBtn />', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });    

    it('must render "Sign In" button', () => {
        const handleClick = jest.fn();
        render(<SigninBtn title={'Sign In'} onClick={handleClick} />);
        const el = screen.queryByText("Sign In");
        expect(el?.textContent).toEqual("Sign In");
    })

    it('must render "Register" button', () => {
        const handleClick = jest.fn();
        render(<SigninBtn title={'Register'} onClick={ handleClick} />);
        const el = screen.queryByText("Register");
        expect(el?.textContent).toEqual("Register");
    })

    it('must render "Get Started" button', () => {
        const handleClick = jest.fn();
        render(<SigninBtn title={'Get Started'} onClick={handleClick} />);
        const el = screen.queryByText("Get Started");
        expect(el?.textContent).toEqual("Get Started");
    })

    it('must trigger onClick prop', () => {

        const clickHandler = jest.fn();
        
        render(<SigninBtn title="Sign In" onClick={ clickHandler }/>)
        const buttonComponent = screen.getByTestId("btn_component")
        expect(buttonComponent).toBeInTheDocument();
        
        fireEvent.click(buttonComponent);

        expect(clickHandler).toBeCalledTimes(1)


    })

    

})



