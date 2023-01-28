import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useRouter } from 'next/router';
import { getServerSideProps } from '../../../pages/watch/[id]'
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import axios from "axios"
import { useAuthState } from 'react-firebase-hooks/auth';

import * as React from "react";
import { parseCookies } from "nookies"
import { fake_watch } from '../../../model/fake_watch';

jest.mock('axios');
jest.mock('nookies', () => (
    {
        __esModule: true,
        parseCookies: jest.fn()
    }
))
jest.mock("react-firebase-hooks/auth", () => ({
    useAuthState: jest.fn()
}))
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

        const mockSetState = jest.fn()
        jest.spyOn(React, 'useState')
        .mockImplementation(() => [false, mockSetState])

        const user = useAuthState as jest.Mock;     
        user.mockReturnValue([true, false]);

        const mockNookies = parseCookies as jest.Mock;
        mockNookies.mockReturnValue({
            token: "somecookietoken"
        })

        const mockAppSelector = useAppSelector as jest.Mock
        mockAppSelector
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

        // axios.get = jest.fn().mockImplementationOnce(
        //     () => Promise.resolve({ 
        //         data: {...fake_watch}
        //     })
        // );

        axios.get = jest.fn().mockImplementationOnce(
            () => Promise.resolve({
                data: {
                    ...fake_watch
                }
            })
        );

        
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