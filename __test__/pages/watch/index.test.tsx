import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useRouter } from 'next/router';
import { getServerSideProps } from '../../../pages/watch/[id]'
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import axios from "axios"

import { fake_watch } from '../../../model/fake_watch';

jest.mock('axios');

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


describe("<WatchShow />", () => {

    beforeEach(() => {
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }))

        global.window = window;
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("must return data (getServerSideProps)", async () => {

        axios.get = jest.fn().mockImplementationOnce(
            () => Promise.resolve({ 
                data: {...fake_watch}
            })
        );

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
        .mockReturnValueOnce({
            accessToken: "123"
        })
        .mockReturnValueOnce({
            data: [{
                "id": 105971,
                "name": "Star Wars: The Bad Batch",
                "backdrop_path": "/sjxtIUCWR74yPPcZFfTsToepfWm.jpg",
                "poster_path": "/5Q6z9bjy8dHKA5T8kNmCd8hj6Gl.jpg",
                "media_type": "tv",
                "genre_ids": [
                    16,
                    10759,
                    10765
                ]
            }]
        }) 

        const router = useRouter as jest.Mock;
        const mockRouter = {
            push: jest.fn()
        }
        router.mockReturnValue(mockRouter);
        
        const context = {
            params: { id: "858408" } as ParsedUrlQuery,
            query: { mt: "movie" } as ParsedUrlQuery
        };
        const props = await getServerSideProps(context as GetServerSidePropsContext);

        expect(props).toEqual({
            props: {
                data: {
                    info: { ...fake_watch }
                }
            }
        });

    })



})