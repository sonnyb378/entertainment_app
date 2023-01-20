import * as React from "react"
import { render, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import Info from '../../../components/Info/Info'

describe("<Info />", () => {

    it("must render Info with run time (hr. mins.)", () => {
        const data = {
            runtime: 117
        }
        const { container } = render(<Info title="" valueFor="runtime" value={data.runtime} />)
        
        const hr = Math.floor(Number(data.runtime) / 60);
        const mins = (Number(data.runtime) % 60)
        const displayValue = `${hr > 0 ? hr > 1 ? `${hr}hrs. ` : `${hr}hr. ` : "" }${mins}mins.`

        const info = within(container).getByText(displayValue)
        expect(info).toBeInTheDocument();

    })

    it("must render Info with run time (mins.)", () => {
        const data = {
            runtime: 45
        }
        const { container } = render(<Info title="" valueFor="runtime" value={data.runtime} />)
        
        const hr = Math.floor(Number(data.runtime) / 60);
        const mins = (Number(data.runtime) % 60)
        const displayValue = `${hr > 0 ? hr > 1 ? `${hr}hrs. ` : `${hr}hr. ` : "" }${mins}mins.`

        const info = within(container).getByText(displayValue)
        expect(info).toBeInTheDocument();

    })

    it("must render Info release date", () => {
        const data = {
            release_date: "2022-11-25"
        }
        const { container } = render(<Info title="Release Date" value={data.release_date} />)
        const info = within(container).getByText("2022-11-25")
        expect(info).toBeInTheDocument();
    })

    it("must render Info country", () => {
        const data = {
            production_countries: [
                {
                    "iso_3166_1": "US",
                    "name": "United States of America"
                }
            ]
        }
        
        const { container } = render(<Info title="Country" value={data.production_countries} />)
        const info = within(container).getByText("United States of America")
        expect(info).toBeInTheDocument();
    })

    it("must render Info production companies", () => {
        const data = {
            production_companies: [
                {
                    "id": 420,
                    "logo_path": "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
                    "name": "Marvel Studios",
                    "origin_country": "US"
                },
                {
                    "id": 94218,
                    "logo_path": null,
                    "name": "Troll Court Entertainment",
                    "origin_country": "US"
                },
                {
                    "id": 176762,
                    "logo_path": null,
                    "name": "Kevin Feige Productions",
                    "origin_country": "US"
                }
            ]
        }
        
        const { container } = render(<Info title="Production Company" value={data.production_companies} />)
        const info = within(container).getByText("Marvel Studios ● Troll Court Entertainment ● Kevin Feige Productions")
        expect(info).toBeInTheDocument();
    })

    it("must render Info cast", () => {
        const data = {
            credits: {
                cast: [{
                    "adult": false,
                    "gender": 2,
                    "id": 73457,
                    "known_for_department": "Acting",
                    "name": "Chris Pratt",
                    "original_name": "Chris Pratt",
                    "popularity": 60.844,
                    "profile_path": "/83o3koL82jt30EJ0rz4Bnzrt2dd.jpg",
                    "cast_id": 3,
                    "character": "Peter Quill / Star-Lord",
                    "credit_id": "5fd2c49f0bc5290042916873",
                    "order": 0
                },
                {
                    "adult": false,
                    "gender": 2,
                    "id": 543530,
                    "known_for_department": "Acting",
                    "name": "Dave Bautista",
                    "original_name": "Dave Bautista",
                    "popularity": 99.2,
                    "profile_path": "/sAeWLLUFEVggkLjrnkI6NiUMtLO.jpg",
                    "cast_id": 5,
                    "character": "Drax",
                    "credit_id": "5fd2c4b9d20c87003d370597",
                    "order": 1
                }]
            }
        }
        
        const { container } = render(<Info title="Production Company" value={data.credits.cast} />)
        const info = within(container).getByText("Chris Pratt ● Dave Bautista")
        expect(info).toBeInTheDocument();
    })


    it("must render Info genre", () => {
        const data = {
            genres: [
                {
                    "id": 35,
                    "name": "Comedy"
                },
                {
                    "id": 878,
                    "name": "Science Fiction"
                },
                {
                    "id": 12,
                    "name": "Adventure"
                }
            ]
        }
        
        const { container } = render(<Info title="Genres" value={data.genres} />)
        const info = within(container).getByText("Comedy ● Science Fiction ● Adventure")
        expect(info).toBeInTheDocument();
    })

    
})