import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PlayCircleIcon, PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

import CustomBtn from './CustomBtn';

describe('<CustomBtn />', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });    

    it('must render "CustomBtn" Play button', () => {
        const handleClick = jest.fn();
        const {container} = render(<CustomBtn title={'Play'} Icon={PlayCircleIcon} onClickHandler={handleClick} />);
        const el = screen.queryByText("Play");
        expect(el?.textContent).toEqual("Play");

        const button = within(container).getByTestId("custom_btn")
        expect(button).toBeInTheDocument();

        fireEvent.click(button)
        expect(handleClick).toBeCalledTimes(1)
    })

    it('must render "CustomBtn" Add to List button', () => {
        const handleClick = jest.fn();
        const {container} = render(<CustomBtn title={'Add to List'} Icon={PlusCircleIcon} onClickHandler={handleClick} />);
        const el = screen.queryByText("Add to List");
        expect(el?.textContent).toEqual("Add to List");

        const button = within(container).getByTestId("custom_btn")
        expect(button).toBeInTheDocument();

        fireEvent.click(button)
        expect(handleClick).toBeCalledTimes(1)

    })

    it('must render "CustomBtn" Remove from List button', () => {
        const handleClick = jest.fn();
        const {container} = render(<CustomBtn title={'Remove from List'} Icon={MinusCircleIcon} onClickHandler={handleClick} />);
        const el = screen.queryByText("Remove from List");
        expect(el?.textContent).toEqual("Remove from List");

        const button = within(container).getByTestId("custom_btn")
        expect(button).toBeInTheDocument();

        fireEvent.click(button)
        expect(handleClick).toBeCalledTimes(1)
    })

})