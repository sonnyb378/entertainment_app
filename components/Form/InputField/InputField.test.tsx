import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

// import {within} from '@testing-library/dom';
// import userEvent from "@testing-library/user-event";

import InputField from "./InputField";

describe("<InputField />", () => {

    afterAll(() => {
        jest.clearAllMocks()
    })

    it("must display input field type type: text", () => {
        const emailHandler = jest.fn();
        render(<InputField 
            type="text" 
            label="Email Address" 
            id="email_address" 
            placeholder=" " 
            onChange={emailHandler} 
            value=""
        />)
        const inputFieldComponent = screen.getByTestId("inputfield")
        expect(inputFieldComponent).toHaveAttribute("type", "text")
    })

    it("must display input field type: password", () => {
        const passwordHandler = jest.fn();
        render(<InputField 
            type="password" 
            label="Password" 
            id="password" 
            placeholder=" " 
            onChange={passwordHandler} 
            value=""
        />)
        const inputFieldComponent = screen.getByTestId("inputfield")
        expect(inputFieldComponent).toHaveAttribute("type", "password")
    })

    it("shoudl trugger 'onChange' event", async () => {
        const onChangeHandler = jest.fn();
        
        render(<InputField 
            type="text" 
            label="Email Address" 
            id="email_address" 
            placeholder=" " 
            onChange={ onChangeHandler }
            value=""
        />)
        const inputFieldComponent = screen.getByTestId("inputfield")
        expect(inputFieldComponent).toBeInTheDocument();

        fireEvent.change(inputFieldComponent, { target: { value: "new_value" }})            
        expect(onChangeHandler).toBeCalledTimes(1);


    })

})