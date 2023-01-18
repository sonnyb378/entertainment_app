import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useRouter } from 'next/router';
import Person, { getServerSideProps } from '../../../pages/person/[id]'
import { fake_person_popular } from '../../../model/fake_person_popular';
import { GetServerSidePropsContext } from 'next';

jest.mock("../../../app/hooks", () => ({
    __esModule: true,
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn()
}))

jest.mock('../../../context/state', () => ({
    __esModule: true,
    ...jest.requireActual('../../../context/state')
}))

jest.mock("../../../firebase", () => ({
    auth: jest.fn(),
}))

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} priority="true" />
    },
}))

jest.mock("next/router", () => ({
    __esModule: true,
    useRouter: jest.fn()
})) 

describe("<Person />", () => {

    beforeEach(() => {
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }))

        global.window = window;

        const router = useRouter as jest.Mock;
        const mockRouter = {
            push: jest.fn()
        }
        router.mockReturnValue(mockRouter)
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must render person page", async () => {
        
        // const props = await Person.get
        // expect(value).toEqual({ props: { data: { id: 11701 } }})

        // const { container } = render(<Person />)
        // const person_container = within(container).getByTestId("person_container")
        // expect(person_container).toBeInTheDocument();
    })

})