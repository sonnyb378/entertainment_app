import * as React from "react";
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import EpisodeCard from '../../../components/EpisodeCard/EpisodeCard';
import { fake_tv_episodes } from '../../../model/fake_tv_episodes';

import * as AppContext from '../../../context/state';
// import { useContext } from 'react';

jest.mock('../../../context/state', () => ({
    __esModule: true,
    ...jest.requireActual('../../../context/state')
}))

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
      return <img {...props } priority="true" />
    },
  }))


describe('<CustomBtn />', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });    

    it('must render <EpisodeCard />', () => {
        const { debug, container } = render(<EpisodeCard data={fake_tv_episodes[0] } screenWidth={800} />)
        const card = within(container).getByTestId("episode_card")
        expect(card).toBeInTheDocument();
    })

    it('must trigger Play onClick button', () => {

        const setStateMock = jest.fn();
        const mockContext = jest.fn().mockReturnValue({
            setVideoIsPlayed: setStateMock
        });
        jest.spyOn(AppContext, 'useAppContext').mockImplementation(mockContext);

        const { debug, container } = render(<EpisodeCard data={ fake_tv_episodes[0] } screenWidth={800} />)
        const card = within(container).getByTestId("episode_card")
        expect(card).toBeInTheDocument();

        const playButton = within(container).getByTestId("play_button")
        expect(playButton).toBeInTheDocument();

        fireEvent.click(playButton)
        expect(mockContext).toHaveBeenCalled()

    })
})
