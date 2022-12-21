import { ISearchResults } from "../app/store/slices/searchResults"



export interface IFakeResponse {
    data: any,
    isLoading: boolean,
    isError: any,
    currentPage: number,
    totalPages: any,
}

export const useStarTrekInfinite = (getKey:number, keyword:string) => {

    // return {
    //     data, 
    //     error, 
    //     isLoading, 
    //     isValidating, 
    //     mutate, 
    //     size, 
    //     setSize
    // }

}


const sleep = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms));

const setData = async (ms: number, callback: any):Promise<IFakeResponse>  => {
    await sleep(ms)
    return new Promise<IFakeResponse>((resolve, reject) => {
        return resolve(callback())
    })
}

// export const useStarTrek = (searched:ISearchResults | null , keyword: string, page: number = 1) => {
export const useStarTrek = (keyword: string, page: number = 1) => {
   

    
    let data: any = [];
    let error: any;

//    if (searched) {
//         if (searched.data.length > 0) {
//             return {
//                 data: { results: searched.data },
//                 isLoading: false,
//                 isError: false,
//                 currentPage: searched.pageLoaded,
//                 totalPages: searched.totalPages
//             }
//         }
//    }


    const initial = {
        "page": 1,
        "results": [
            {
                "backdrop_path": "/ywK4VrR7vL56mDGXDLMtFypwqA8.jpg",
                "first_air_date": "1966-09-08",
                "genre_ids": [
                    10765,
                    18
                ],
                "id": 253,
                "media_type": "tv",
                "name": "Star Trek",
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Star Trek",
                "overview": "Space. The Final Frontier. The U.S.S. Enterprise embarks on a five year mission to explore the galaxy. The Enterprise is under the command of Captain James T. Kirk with First Officer Mr. Spock, from the planet Vulcan. With a determined crew, the Enterprise encounters Klingons, Romulans, time paradoxes, tribbles and genetic supermen led by Khan Noonian Singh. Their mission is to explore strange new worlds, to seek new life and new civilizations, and to boldly go where no man has gone before.",
                "popularity": 98.926,
                "poster_path": "/f2wbC7fxiOJqzTb6HPr4N6bsjLF.jpg",
                "vote_average": 8.1,
                "vote_count": 986
            },
            {
                "backdrop_path": "/7YFranrnnIcCrgsLYQsoq8aE3Ir.jpg",
                "first_air_date": "1995-01-16",
                "genre_ids": [
                    10765,
                    18,
                    10759
                ],
                "id": 1855,
                "media_type": "tv",
                "name": "Star Trek: Voyager",
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Star Trek: Voyager",
                "overview": "Pulled to the far side of the galaxy, where the Federation is 75 years away at maximum warp speed, a Starfleet ship must cooperate with Maquis rebels to find a way home.",
                "popularity": 81.896,
                "poster_path": "/gNS5tRSG3UlXodCxznKKOKweqxh.jpg",
                "vote_average": 7.9,
                "vote_count": 701
            },
            {
                "backdrop_path": "/gH5HQbMsSfPc0R41JYTefjB7klZ.jpg",
                "first_air_date": "2001-09-26",
                "genre_ids": [
                    10765,
                    10759,
                    18
                ],
                "id": 314,
                "media_type": "tv",
                "name": "Star Trek: Enterprise",
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Star Trek: Enterprise",
                "overview": "During the mid-22nd century, a century before Captain Kirk's five-year mission, Jonathan Archer captains the United Earth ship Enterprise during the early years of Starfleet, leading up to the Earth-Romulan War and the formation of the Federation.",
                "popularity": 72.748,
                "poster_path": "/n1Jjc0gkxHpXYXppSCtJWx6mHA9.jpg",
                "vote_average": 7.6,
                "vote_count": 582
            },
            {
                "adult": false,
                "backdrop_path": "/q7M0JpPixbEYT8EhnI7wTEMONxz.jpg",
                "genre_ids": [
                    878,
                    28,
                    12
                ],
                "id": 13475,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Star Trek",
                "overview": "The fate of the galaxy rests in the hands of bitter rivals. One, James Kirk, is a delinquent, thrill-seeking Iowa farm boy. The other, Spock, a Vulcan, was raised in a logic-based society that rejects all emotion. As fiery instinct clashes with calm reason, their unlikely but powerful partnership is the only thing capable of leading their crew through unimaginable danger, boldly going where no one has gone before. The human adventure has begun again.",
                "popularity": 37.196,
                "poster_path": "/9vaRPXj44Q2meHgt3VVfQufiHOJ.jpg",
                "release_date": "2009-05-06",
                "title": "Star Trek",
                "video": false,
                "vote_average": 7.4,
                "vote_count": 8906
            },
            {
                "backdrop_path": "/kHwMIXsYNAg8eoJvj97F0LSlyDP.jpg",
                "first_air_date": "2017-09-24",
                "genre_ids": [
                    10765,
                    10759
                ],
                "id": 67198,
                "media_type": "tv",
                "name": "Star Trek: Discovery",
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Star Trek: Discovery",
                "overview": "Follow the voyages of Starfleet on their missions to discover new worlds and new life forms, and one Starfleet officer who must learn that to truly understand all things alien, you must first understand yourself.",
                "popularity": 61.134,
                "poster_path": "/zh7GLsorxecv0D8d7QAVkQUe1ju.jpg",
                "vote_average": 7.2,
                "vote_count": 1420
            },
            {
                "backdrop_path": "/nMASWgNCBlb3FW6bLYEOsm0UZL0.jpg",
                "first_air_date": "1987-09-28",
                "genre_ids": [
                    10765,
                    10759,
                    18,
                    9648
                ],
                "id": 655,
                "media_type": "tv",
                "name": "Star Trek: The Next Generation",
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Star Trek: The Next Generation",
                "overview": "Follow the intergalactic adventures of Capt. Jean-Luc Picard and his loyal crew aboard the all-new USS Enterprise NCC-1701D, as they explore new worlds.",
                "popularity": 115.352,
                "poster_path": "/m8Jp435AhUBmltmPyP5LOYjc80V.jpg",
                "vote_average": 8.3,
                "vote_count": 1126
            },
            {
                "backdrop_path": "/a9BUJ5duK7QonAN3aMib6Nie6Fc.jpg",
                "first_air_date": "2021-10-28",
                "genre_ids": [
                    16,
                    10765,
                    10762
                ],
                "id": 106393,
                "media_type": "tv",
                "name": "Star Trek: Prodigy",
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Star Trek: Prodigy",
                "overview": "A motley crew of young rebellious aliens commandeer an old Starfleet ship and must figure out how to work together while navigating a greater galaxy, in search for a better future. These six young outcasts know nothing about the ship they have commandeered, but over the course of their adventures together, they will each be introduced to Starfleet and the ideals it represents.",
                "popularity": 46.804,
                "poster_path": "/qiIHiqCwVu5SGa7Fkg0AVZkRGSR.jpg",
                "vote_average": 7.7,
                "vote_count": 78
            },
            {
                "backdrop_path": "/mK286PAkhgLJqk5cO0BCmFLkNE7.jpg",
                "first_air_date": "2020-01-23",
                "genre_ids": [
                    10765,
                    10759
                ],
                "id": 85949,
                "media_type": "tv",
                "name": "Star Trek: Picard",
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Star Trek: Picard",
                "overview": "Set twenty years after the events of Star Trek Nemesis, we follow the now-retired Admiral Picard into the next chapter of his life.",
                "popularity": 44.375,
                "poster_path": "/qGrHmHbMvodVTyxRDIxljyg4f4T.jpg",
                "vote_average": 7.3,
                "vote_count": 1341
            },
            {
                "backdrop_path": "/jB3Ksk1tvhksdTa0xvI7l4LFHsy.jpg",
                "first_air_date": "1993-01-03",
                "genre_ids": [
                    10765,
                    10759,
                    18
                ],
                "id": 580,
                "media_type": "tv",
                "name": "Star Trek: Deep Space Nine",
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Star Trek: Deep Space Nine",
                "overview": "At Deep Space Nine, a space station located next to a wormhole in the vicinity of the liberated planet of Bajor, Commander Sisko and crew welcome alien visitors, root out evildoers and solve all types of unexpected problems that come their way.",
                "popularity": 96.184,
                "poster_path": "/37gPCTyiQOLa9vJeKrpX4HqRq6P.jpg",
                "vote_average": 7.9,
                "vote_count": 586
            },
            {
                "adult": false,
                "backdrop_path": "/6z9w8eidKWDDXwZNSVNaRolAYEP.jpg",
                "genre_ids": [
                    878,
                    28,
                    12,
                    53
                ],
                "id": 201,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Star Trek: Nemesis",
                "overview": "En route to the honeymoon of William Riker to Deanna Troi on her home planet of Betazed, Captain Jean-Luc Picard and the crew of the U.S.S. Enterprise receives word from Starfleet that a coup has resulted in the installation of a new Romulan political leader, Shinzon, who claims to seek peace with the human-backed United Federation of Planets. Once in enemy territory, the captain and his crew make a startling discovery: Shinzon is human, a slave from the Romulan sister planet of Remus, and has a secret, shocking relationship to Picard himself.",
                "popularity": 18.817,
                "poster_path": "/tL1EdpfqX6vqPCnhyOh81Nf4ndV.jpg",
                "release_date": "2002-12-13",
                "title": "Star Trek: Nemesis",
                "video": false,
                "vote_average": 6.3,
                "vote_count": 1168
            },
            {
                "adult": false,
                "backdrop_path": "/m4F1KRK5jAoQHi2mKDFE2jFKEIb.jpg",
                "genre_ids": [
                    28,
                    12,
                    878
                ],
                "id": 188927,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Star Trek Beyond",
                "overview": "The USS Enterprise crew explores the furthest reaches of uncharted space, where they encounter a mysterious new enemy who puts them and everything the Federation stands for to the test.",
                "popularity": 31.509,
                "poster_path": "/cnQp8GmOWahIgQaH60Kwez3TNzw.jpg",
                "release_date": "2016-07-07",
                "title": "Star Trek Beyond",
                "video": false,
                "vote_average": 6.8,
                "vote_count": 5916
            },
            {
                "backdrop_path": "/rzAzvWJoZSwVSswvWsKx1lqT63m.jpg",
                "first_air_date": "2022-05-05",
                "genre_ids": [
                    10765
                ],
                "id": 103516,
                "media_type": "tv",
                "name": "Star Trek: Strange New Worlds",
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Star Trek: Strange New Worlds",
                "overview": "Follow Christopher Pike, Spock and Number One in the years before Captain Kirk boarded the U.S.S. Enterprise, as they explore new worlds around the galaxy. This show is a prequel to the original series and Star Trek: Discovery.",
                "popularity": 76.036,
                "poster_path": "/iwIdajr5Y4zq2ibvq75VnDAJBr.jpg",
                "vote_average": 8.2,
                "vote_count": 232
            },
            {
                "adult": false,
                "backdrop_path": "/goNk0VDnUjxKjB6o69kYS5vvZo2.jpg",
                "genre_ids": [
                    878,
                    28,
                    12,
                    53
                ],
                "id": 200,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Star Trek: Insurrection",
                "overview": "When an alien race and factions within Starfleet attempt to take over a planet that has \"regenerative\" properties, it falls upon Captain Picard and the crew of the Enterprise to defend the planet's people as well as the very ideals upon which the Federation itself was founded.",
                "popularity": 19.194,
                "poster_path": "/xQCMAHeg5M9HpDIqanYbWdr4brB.jpg",
                "release_date": "1998-12-11",
                "title": "Star Trek: Insurrection",
                "video": false,
                "vote_average": 6.4,
                "vote_count": 972
            },
            {
                "adult": false,
                "backdrop_path": "/npDrIM6ZbuD7nUxI7ZzNBxs4IRF.jpg",
                "genre_ids": [
                    28,
                    12,
                    878
                ],
                "id": 54138,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Star Trek Into Darkness",
                "overview": "When the crew of the Enterprise is called back home, they find an unstoppable force of terror from within their own organization has detonated the fleet and everything it stands for, leaving our world in a state of crisis.  With a personal score to settle, Captain Kirk leads a manhunt to a war-zone world to capture a one man weapon of mass destruction. As our heroes are propelled into an epic chess game of life and death, love will be challenged, friendships will be torn apart, and sacrifices must be made for the only family Kirk has left: his crew.",
                "popularity": 31.605,
                "poster_path": "/eXbCboT5mMv9RH1E7ogzIytN302.jpg",
                "release_date": "2013-05-05",
                "title": "Star Trek Into Darkness",
                "video": false,
                "vote_average": 7.3,
                "vote_count": 8222
            },
            {
                "backdrop_path": "/kG7GwGBHpCI6lA6SaEydKHHOxkU.jpg",
                "first_air_date": "2020-08-06",
                "genre_ids": [
                    10765,
                    16,
                    35
                ],
                "id": 85948,
                "media_type": "tv",
                "name": "Star Trek: Lower Decks",
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Star Trek: Lower Decks",
                "overview": "The lives of the support crew serving on one of Starfleet's least important ships, the U.S.S. Cerritos, in 2380. Ensigns Mariner, Boimler, Rutherford and Tendi have to keep up with their duties and their social lives, often while the ship is being rocked by a multitude of sci-fi anomalies.",
                "popularity": 39.332,
                "poster_path": "/2gVVCoxtNtU5fTTyGU1nGwrFl2f.jpg",
                "vote_average": 7.3,
                "vote_count": 165
            },
            {
                "adult": false,
                "backdrop_path": "/tdEsBRophyizObx5ABwJkOUQHOA.jpg",
                "genre_ids": [
                    878,
                    12,
                    9648
                ],
                "id": 152,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Star Trek: The Motion Picture",
                "overview": "When a destructive space entity is spotted approaching Earth, Admiral Kirk resumes command of the Starship Enterprise in order to intercept, examine, and hopefully stop it.",
                "popularity": 24.029,
                "poster_path": "/wfiAfNwH6CMKxz4vRaW8CPTabtk.jpg",
                "release_date": "1979-12-07",
                "title": "Star Trek: The Motion Picture",
                "video": false,
                "vote_average": 6.5,
                "vote_count": 1411
            },
            {
                "adult": false,
                "backdrop_path": "/wygUDDRNpeKUnkekRGeLCZM93tA.jpg",
                "genre_ids": [
                    878,
                    28,
                    12,
                    53
                ],
                "id": 199,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Star Trek: First Contact",
                "overview": "The Borg, a relentless race of cyborgs, are on a direct course for Earth. Violating orders to stay away from the battle, Captain Picard and the crew of the newly-commissioned USS Enterprise E pursue the Borg back in time to prevent the invaders from changing Federation history and assimilating the galaxy.",
                "popularity": 17.168,
                "poster_path": "/vrC1lkTktFQ4AqBfqf4PXoDDLcw.jpg",
                "release_date": "1996-11-22",
                "title": "Star Trek: First Contact",
                "video": false,
                "vote_average": 7.3,
                "vote_count": 1465
            },
            {
                "adult": false,
                "backdrop_path": "/mNdsbVuRdsyo8eitW2IBW2BWRkU.jpg",
                "genre_ids": [
                    878,
                    28,
                    12,
                    53
                ],
                "id": 193,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Star Trek: Generations",
                "overview": "Captain Jean-Luc Picard and the crew of the Enterprise-D find themselves at odds with the renegade scientist Soran who is destroying entire star systems. Only one man can help Picard stop Soran's scheme...and he's been dead for seventy-eight years.",
                "popularity": 10.724,
                "poster_path": "/rHsCYDGHFUarGh5k987b0EFU6kC.jpg",
                "release_date": "1994-11-18",
                "title": "Star Trek: Generations",
                "video": false,
                "vote_average": 6.5,
                "vote_count": 1074
            },
            {
                "adult": false,
                "backdrop_path": "/y0klN15XPVyYtd4P7HYecgJXSsZ.jpg",
                "genre_ids": [
                    878,
                    28,
                    12,
                    53
                ],
                "id": 172,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Star Trek V: The Final Frontier",
                "overview": "The crew of the Federation starship Enterprise is called to Nimbus III, the Planet of Intergalactic Peace. They are to negotiate in a case of kidnapping only to find out that the kidnapper is a relative of Spock. This man is possessed by his life long search for the planet Sha Ka Ree which is supposed to be the source of all life. Together they begin to search for this mysterious planet.",
                "popularity": 21.599,
                "poster_path": "/uiXr41VLYsuug3CZbFrKLSNahuZ.jpg",
                "release_date": "1989-06-09",
                "title": "Star Trek V: The Final Frontier",
                "video": false,
                "vote_average": 5.7,
                "vote_count": 960
            },
            {
                "adult": false,
                "backdrop_path": "/wN3dgwkiWSLrMVukPQIeccv5EJ6.jpg",
                "genre_ids": [
                    878,
                    12
                ],
                "id": 168,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Star Trek IV: The Voyage Home",
                "overview": "It's the 23rd century, and a mysterious alien power is threatening Earth by evaporating the oceans and destroying the atmosphere. In a frantic attempt to save mankind, Kirk and his crew must time travel back to 1986 San Francisco where they find a world of punk, pizza and exact-change buses that are as alien as anything they've ever encountered in the far reaches of the galaxy. A thrilling, action-packed Star Trek adventure!",
                "popularity": 19.341,
                "poster_path": "/xY5TzGXJOB3L9rhZ1MbbPyVlW5J.jpg",
                "release_date": "1986-11-26",
                "title": "Star Trek IV: The Voyage Home",
                "video": false,
                "vote_average": 7.2,
                "vote_count": 1203
            }
        ],
        "total_pages": 7,
        "total_results": 133
    }

    
    switch (page) {
        case 1:
            data = initial;
            break;
        case 2:
            data = {
                "page": 2,
                "results": [
                    {
                        "backdrop_path": "/dYP7g2vYY5L1FyZzgEETF9eeU3r.jpg",
                        "first_air_date": "2018-10-03",
                        "genre_ids": [
                            10765,
                            10759
                        ],
                        "id": 82491,
                        "media_type": "tv",
                        "name": "Star Trek: Short Treks",
                        "origin_country": [
                            "US"
                        ],
                        "original_language": "en",
                        "original_name": "Star Trek: Short Treks",
                        "overview": "Each episode tells a stand-alone story that serves as an opportunity for deeper storytelling and exploration of key characters and themes that fit into Star Trek: Discovery and the expanding Star Trek universe.",
                        "popularity": 14.161,
                        "poster_path": "/pZxMTBheuGwNBQxF5JzLp2hHdDs.jpg",
                        "vote_average": 6.2,
                        "vote_count": 50
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/lcQRSqOCkWkJSwF6xSYXAoOhaAF.jpg",
                        "genre_ids": [
                            878,
                            28,
                            12,
                            53
                        ],
                        "id": 174,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek VI: The Undiscovered Country",
                        "overview": "After years of war, the Federation and the Klingon empire find themselves on the brink of a peace summit when a Klingon ship is nearly destroyed by an apparent attack from the Enterprise. Both worlds brace for what may be their dealiest encounter.",
                        "popularity": 16.024,
                        "poster_path": "/tvTOJD7Gz668GLy2nNdLRQvpPsv.jpg",
                        "release_date": "1991-12-06",
                        "title": "Star Trek VI: The Undiscovered Country",
                        "video": false,
                        "vote_average": 7,
                        "vote_count": 1032
                    },
                    {
                        "backdrop_path": "/n25Wk2skU5DqAqWdHkL6quI11mz.jpg",
                        "first_air_date": "1973-09-08",
                        "genre_ids": [
                            16,
                            18,
                            10765
                        ],
                        "id": 1992,
                        "media_type": "tv",
                        "name": "Star Trek: The Animated Series",
                        "origin_country": [
                            "US"
                        ],
                        "original_language": "en",
                        "original_name": "Star Trek: The Animated Series",
                        "overview": "The animated adventures of Captain Kirk, Mr. Spock and the crew of the Starship Enterprise.",
                        "popularity": 16.087,
                        "poster_path": "/kvWG0bsLVQt23gZO6DI1mPosLxZ.jpg",
                        "vote_average": 6.7,
                        "vote_count": 83
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/5lUpy6OrDhzdeAGBaM1mIsQvfOl.jpg",
                        "genre_ids": [
                            878,
                            28,
                            12,
                            53
                        ],
                        "id": 157,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek III: The Search for Spock",
                        "overview": "Admiral Kirk and his bridge crew risk their careers stealing the decommissioned Enterprise to return to the restricted Genesis planet to recover Spock's body.",
                        "popularity": 16.635,
                        "poster_path": "/yqEj0oPfKBMCz7YcCARHDgH7VFm.jpg",
                        "release_date": "1984-06-01",
                        "title": "Star Trek III: The Search for Spock",
                        "video": false,
                        "vote_average": 6.6,
                        "vote_count": 1107
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/oXs8kp1oX5N0Mte6U8UUAwmLwt6.jpg",
                        "genre_ids": [
                            28,
                            12,
                            878,
                            53
                        ],
                        "id": 154,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek II: The Wrath of Khan",
                        "overview": "It is the 23rd century. The Federation Starship U.S.S. Enterprise is on routine training maneuvers and Admiral James T. Kirk seems resigned to the fact that this inspection may well be the last space mission of his career. But Khan is back. Aided by his exiled band of genetic supermen, Khan - brilliant renegade of 20th century Earth - has raided Space Station Regula One, stolen a top secret device called Project Genesis, wrested control of another Federation Starship and sets out in pursuit of the Enterprise, determined to let nothing stand in the way of his mission: kill Admiral Kirk... even if it means universal Armageddon.",
                        "popularity": 15.197,
                        "poster_path": "/uPyLsKl8Z0LOoxeaFXsY5MxhR5s.jpg",
                        "release_date": "1982-06-04",
                        "title": "Star Trek II: The Wrath of Khan",
                        "video": false,
                        "vote_average": 7.5,
                        "vote_count": 1591
                    },
                    {
                        "backdrop_path": null,
                        "first_air_date": "2004-10-08",
                        "genre_ids": [
                            18,
                            10759,
                            10765
                        ],
                        "id": 4653,
                        "media_type": "tv",
                        "name": "Star Trek: Phase II",
                        "origin_country": [
                            "US"
                        ],
                        "original_language": "en",
                        "original_name": "Star Trek: Phase II",
                        "overview": "Star Trek: Phase II is a fan-created science fiction series set in the Star Trek universe. The series was created by James Cawley and Jack Marshall in April 2003. The series, released exclusively via the Internet, is designed as a continuation of the original Star Trek, beginning in the fifth and final year of the starship Enterprise's \"five-year mission.\" The first episode of the series was released in January 2004, with new episodes being released at a rate of about one per year, though producers have expressed their desire to accelerate production.\n\nCBS, which owns the legal rights to the Star Trek franchise, allows the distribution of fan-created material as long as no attempt is made to profit from it without official authorization, and Phase II enjoys the same tolerance.\n\nStar Trek: Phase II stars James Cawley as Captain Kirk, Brandon Stacy as Mr. Spock, and John Kelley as Dr. McCoy. Eugene Roddenberry Jr., the son of Star Trek creator Gene Roddenberry, serves as consulting producer. Some of the original actors have returned to reprise their roles, including George Takei as Sulu in \"World Enough and Time\", and Walter Koenig as Chekov in \"To Serve All My Days\". The episodes are filmed on new sets located in Port Henry, NY, at a long-shuttered car dealership.",
                        "popularity": 7.771,
                        "poster_path": "/5S46d3jrIikTMPifzO7a8zBBCLC.jpg",
                        "vote_average": 6.9,
                        "vote_count": 7
                    },
                    {
                        "backdrop_path": null,
                        "first_air_date": "2000-01-01",
                        "genre_ids": [],
                        "id": 1081,
                        "media_type": "tv",
                        "name": "Star Trek: Hidden Frontier",
                        "origin_country": [
                            "US"
                        ],
                        "original_language": "en",
                        "original_name": "Star Trek: Hidden Frontier",
                        "overview": "Star Trek: Hidden Frontier was a Star Trek fan film project. Produced on digital video, the show's sets are almost completely virtual, using a green-screen chroma keyed process to place performers into virtual settings.\n\nThe series is set during the era of the Star Trek: The Next Generation series. Episodes revolve around the starship USS Excelsior, and its home base, Deep Space 12, which is located in the Briar Patch, a region of space introduced in the film Star Trek: Insurrection.\n\nHidden Frontier has produced 50 episodes, and focuses on character relationships, including gay and lesbian characters and subplots.\n\nProduced by Rob Caves, Hidden Frontier ran for seven seasons and was produced by volunteers in Southern California. The final episode of the series aired in May 2007. Two new spin-offs, Star Trek: Odyssey and Star Trek: The Helena Chronicles, also produced by Rob Caves, take place shortly after the end of Hidden Frontier.",
                        "popularity": 6.546,
                        "poster_path": null,
                        "vote_average": 8.3,
                        "vote_count": 3
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99,
                            878
                        ],
                        "id": 282759,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Evolutions",
                        "overview": "Star Trek: Evolutions is an 80-minute Paramount Pictures Star Trek documentary compilation which was first released on 22 September 2009 as part of the Star Trek: The Next Generation Motion Picture Collection Blu-ray and DVD sets.",
                        "popularity": 2.832,
                        "poster_path": "/dgAZHnhcNll9w7iuNOs8tx5cAnB.jpg",
                        "release_date": "2009-09-22",
                        "title": "Star Trek: Evolutions",
                        "video": true,
                        "vote_average": 7.6,
                        "vote_count": 6
                    },
                    {
                        "backdrop_path": "/qz9aCIqYh2MRSjL6WmaQCzYsw4h.jpg",
                        "first_air_date": "2007-12-22",
                        "genre_ids": [
                            18
                        ],
                        "id": 43119,
                        "media_type": "tv",
                        "name": "Star Trek: Of Gods and Men",
                        "origin_country": [],
                        "original_language": "en",
                        "original_name": "Star Trek: Of Gods and Men",
                        "overview": "Star Trek: Of Gods and Men is a three-part unofficial Star Trek fan mini-series which contains many cast members from the Star Trek TV series and movies. It is described by its producers as a \"40th Anniversary gift\" from Star Trek actors to their fans. It was filmed in 2006, but its release was delayed until 2007–08. It is not officially endorsed by the rightsholders of Star Trek, but has been covered on the official Star Trek website.",
                        "popularity": 8.758,
                        "poster_path": "/9TS8QTiyGJ47i78JFt0d0x37ma9.jpg",
                        "vote_average": 6.4,
                        "vote_count": 7
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/hSX0QrnYqrzW03yJ3UNN1iWbVdb.jpg",
                        "genre_ids": [
                            99
                        ],
                        "id": 26965,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: The Captains' Summit",
                        "overview": "The Captains' Summit documents the first time in Star Trek history that four stars who at some point have played Captains in Star Trek (William Shatner, Patrick Stewart, Leonard Nimoy, Jonathan Frakes) have been brought together for a 70-minute rare and unprecedented round table event. Whoopi Goldberg, star of Star Trek: The Next Generation, hosts the event.",
                        "popularity": 4.921,
                        "poster_path": "/5B6B0FOUsLq1RKrskbpxH6Yxfig.jpg",
                        "release_date": "2009-04-12",
                        "title": "Star Trek: The Captains' Summit",
                        "video": false,
                        "vote_average": 7.4,
                        "vote_count": 13
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/71xyy6Ix9g9QV1kpQgCm1lrgtb6.jpg",
                        "genre_ids": [
                            99,
                            878
                        ],
                        "id": 414260,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Building Star Trek",
                        "overview": "When \"Star Trek\" first aired in 1966, it expanded the viewers' imaginations about what was possible in their lifetimes. Today, many of the space-age technologies displayed on the show, like space shuttles, cell phones, and desktop computers, have already gone from science fiction to science fact. Other innovations, like warp drive, teleportation, and medical tricorders are actively in development. Join us as we celebrate the 50th Anniversary of \"Star Trek\" - a show that continues to inform, enrich, and inspire.",
                        "popularity": 3.486,
                        "poster_path": "/h9PS5CLIYQv6xo7F3r3Vh4PGhzD.jpg",
                        "release_date": "2016-09-04",
                        "title": "Building Star Trek",
                        "video": false,
                        "vote_average": 6.9,
                        "vote_count": 6
                    },
                    {
                        "backdrop_path": null,
                        "first_air_date": "2007-09-01",
                        "genre_ids": [
                            10765
                        ],
                        "id": 4080,
                        "media_type": "tv",
                        "name": "Star Trek: Odyssey",
                        "origin_country": [
                            "US"
                        ],
                        "original_language": "en",
                        "original_name": "Star Trek: Odyssey",
                        "overview": "Star Trek: Odyssey is a Star Trek fan production from Areakt Productions, the creators of Star Trek: Hidden Frontier. Set after the end of Hidden Frontier, Odyssey follows the USS Odyssey as it struggles to get home from a dangerous mission that has taken it and her crew 2.5 million light years from home... to the unknowns of the Andromeda Galaxy. This is the first Star Trek series, fan produced or otherwise, to take place outside of our own Earth's galaxy.\n\nThe pilot for Odyssey, entitled Iliad, was put to wide release on Saturday, September 22, 2007 and is now freely available on the official website.\n\nAccording to the creator of Hidden Frontier and Odyssey, Rob Caves, Odyssey will be primarily centered around Lt. Cmdr. Ro Nevin in a loose retelling of Homer's classic story of The Odyssey, set in the 24th century universe of Star Trek.\n\nRo was involved in numerous episodes of the Star Trek: Hidden Frontier series, and was in the first gay plotlines during the second season of Hidden Frontier. Caves has said that although Ro is an openly gay/bisexual character, the new series \"will focus instead on new aspects of his evolving persona that have not been explored yet in Hidden Frontier\".",
                        "popularity": 3.521,
                        "poster_path": null,
                        "vote_average": 8,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/ysM4ju2BKrI4R5BuAv2mtVJdC3n.jpg",
                        "genre_ids": [
                            99
                        ],
                        "id": 416184,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Beyond the Final Frontier",
                        "overview": "This History Channel special examines Christie's 40th Anniversary auction of the franchise's most recognizable film and television memorabilia, and features interviews with cast, crew and fans.",
                        "popularity": 4.099,
                        "poster_path": "/7F9L9EozjXtn30Hw2TsK42UedX5.jpg",
                        "release_date": "2007-02-19",
                        "title": "Star Trek: Beyond the Final Frontier",
                        "video": false,
                        "vote_average": 6.3,
                        "vote_count": 5
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/jA09e9RryWU4zKOTxTDKVbnFHlE.jpg",
                        "genre_ids": [
                            99
                        ],
                        "id": 244214,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Secrets of the Universe",
                        "overview": "Is building our own starship Enterprise possible? Will we ever travel between the stars as easily as they do in Star Trek? JJ Abrams' new feature, Star Trek Into Darkness, hits the screen in a golden age of scientific discoveries. HISTORY is there, giving viewers a deep look behind the scenes, on the set, and into the science–amazing new exoplanets, the physics of Warp drive, and the ideas behind how we might one day live in a Star Trek Universe.",
                        "popularity": 3.63,
                        "poster_path": "/yn5uWoBdjKvJA8m04z4H2sjUeRC.jpg",
                        "release_date": "2013-05-16",
                        "title": "Star Trek: Secrets of the Universe",
                        "video": false,
                        "vote_average": 6,
                        "vote_count": 3
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878
                        ],
                        "id": 332626,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Aurora",
                        "overview": "Kara Carpenter and her new (and only) Vulcan first mate T'Ling on their tiny merchanter cargo ship Aurora embark on an unintentional adventure that sends one of them across the multiverse.  This fully CG-animated movie is set just after the original Star Trek series in a lawless sector of space, where Kara and T'Ling engage in their marginal venture while trying to both turn a profit and stay out of trouble, but even in the vastness of space, trouble is never far away...and sometimes the past is never far enough behind.",
                        "popularity": 1.316,
                        "poster_path": "/2hXXqDGSQhIzLxuF40hEMOaNyeE.jpg",
                        "release_date": "2011-11-10",
                        "title": "Star Trek: Aurora",
                        "video": false,
                        "vote_average": 9.4,
                        "vote_count": 4
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878,
                            12
                        ],
                        "id": 573374,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Voyager - Dark Frontier",
                        "overview": "Dark Frontier\" is a feature length TV Movie of Star Trek: Voyager, the 15th and 16th episodes of the fifth season. This episode originally aired as a feature-length episode that was later broken up into two parts for reruns in syndication.",
                        "popularity": 2.738,
                        "poster_path": "/7fNDaZFryiez6nsnzLu0DLLomSv.jpg",
                        "release_date": "1999-02-17",
                        "title": "Star Trek: Voyager - Dark Frontier",
                        "video": true,
                        "vote_average": 6.5,
                        "vote_count": 2
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 741869,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: First Frontier",
                        "overview": "The story of the initial launch of the Starship USS Enterprise in 2245 under the command of Captain Robert April with his wife, Commander Sarah April.",
                        "popularity": 2.106,
                        "poster_path": "/gTKfLLcqwBtWW4VSy48DEex3XAr.jpg",
                        "release_date": "2020-09-08",
                        "title": "Star Trek: First Frontier",
                        "video": false,
                        "vote_average": 7,
                        "vote_count": 2
                    },
                    {
                        "backdrop_path": "/9aH9Jf2jHgTIExOLpJppPFKdc9R.jpg",
                        "first_air_date": "2021-11-05",
                        "genre_ids": [
                            99
                        ],
                        "id": 137895,
                        "media_type": "tv",
                        "name": "The Center Seat: 55 Years of Star Trek",
                        "origin_country": [
                            "US"
                        ],
                        "original_language": "en",
                        "original_name": "The Center Seat: 55 Years of Star Trek",
                        "overview": "In honor of the sci-fi franchise’s 55th anniversary this year and produced by The Nacelle Company, the project will feature interviews with cast, crew and experts as it explores pivotal moments in the franchise’s history, from its inception at Lucille Ball’s production company Desilu to recent film and television adaptations.",
                        "popularity": 6.605,
                        "poster_path": "/sYlsE2W1g244E3O1RLJuSiFOMDL.jpg",
                        "vote_average": 6.8,
                        "vote_count": 5
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            28,
                            12,
                            878
                        ],
                        "id": 467903,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Untitled Star Trek Sequel",
                        "overview": "The fourth film in J.J. Abrams’ Star Trek franchise.",
                        "popularity": 2.597,
                        "poster_path": null,
                        "title": "Untitled Star Trek Sequel",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            10770,
                            99
                        ],
                        "id": 269768,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: 25th Anniversary Special",
                        "overview": "This documentary is hosted by William Shatner and Leonard Nimoy and they take us through the history of Trek. We also get to see bloopers from the original series and the current space program and how progression has been in reality, hosted by LeVar Burton.",
                        "popularity": 2.487,
                        "poster_path": "/qifn2LhQThccAg6wR6alv8CoJ3h.jpg",
                        "release_date": "1991-09-28",
                        "title": "Star Trek: 25th Anniversary Special",
                        "video": false,
                        "vote_average": 4.3,
                        "vote_count": 3
                    }
                ],
                "total_pages": 7,
                "total_results": 133
            }
            break;
        case 3:
            data = {
                "page": 3,
                "results": [
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 793989,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Borg",
                        "overview": "A Starfleet cadet whose father was killed during the Battle of Wolf 359 fought against the Borg 10 years ago. Impish Q shows up and offers him to go back in time to his father's ship during the battle and try to save him.",
                        "popularity": 1.4,
                        "poster_path": "/ouzsvoYFImvANMqKXhBVgJ0NKWp.jpg",
                        "release_date": "",
                        "title": "Star Trek: Borg",
                        "video": true,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/3mqFG4eICnwxTp6wpVCnv8iHiOv.jpg",
                        "genre_ids": [
                            99
                        ],
                        "id": 411500,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "50 Years of Star Trek",
                        "overview": "Over the last fifty years, America has been fascinated by Star Trek since it first aired in September of 1966. This 2-hour documentary celebrates the 50th anniversary through interviews with cast and crew members from every television series and the original films.",
                        "popularity": 2.664,
                        "poster_path": "/bdq1ZB3GLkC5ISVNnboledHeX1A.jpg",
                        "release_date": "2016-08-14",
                        "title": "50 Years of Star Trek",
                        "video": false,
                        "vote_average": 7.5,
                        "vote_count": 15
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878
                        ],
                        "id": 972398,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Renegades",
                        "overview": "Ten years after the starship Voyager's return from the Delta Quadrant, the Federation is in a crisis. The Federation's main suppliers of dilithium crystals (the primary catalyst for the fuel used in faster-than-light travel) are disappearing. Space and time have folded around several planets, isolating them from outside contact. The phenomenon is unnatural – someone or something is causing it to happen. The need to stop this necessitates drastic measures, some of which are outside the Federation’s normal jurisdiction.",
                        "popularity": 1.312,
                        "poster_path": "/3F7KRvoKiqjJXmPRxxoaaFtC4Yh.jpg",
                        "release_date": "2015-08-01",
                        "title": "Star Trek: Renegades",
                        "video": true,
                        "vote_average": 5,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/msjBltfMbtQ8seHXr3yWO1UyzLI.jpg",
                        "genre_ids": [
                            28,
                            12,
                            878
                        ],
                        "id": 828023,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Horizon",
                        "overview": "In a time prior to the United Federation of Planets, a young coalition of worlds led by Earth battle the Romulan Star Empire for their very survival.",
                        "popularity": 1.209,
                        "poster_path": "/qmf2qbUMCHHWQTGvkwbbMJ1b7vO.jpg",
                        "release_date": "2016-02-26",
                        "title": "Star Trek: Horizon",
                        "video": false,
                        "vote_average": 4.7,
                        "vote_count": 3
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878,
                            16
                        ],
                        "id": 505867,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek II: Retribution",
                        "overview": "With an imminent Romulan invasion, Captain Bradley Prentice finds himself caught between a mysterious warlord who will stop at nothing to see the Federation destroyed, and a superior officer who may be hiding something—a dark secret which could save the Federation or seal its doom.",
                        "popularity": 1.544,
                        "poster_path": "/i1tuoG5e9ViEBRM3xtYgdxtMO2u.jpg",
                        "release_date": "2012-01-01",
                        "title": "Star Trek II: Retribution",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            10402,
                            99
                        ],
                        "id": 53313,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: 30 Years and Beyond",
                        "overview": "A star-studded tribute to Star Trek on its 30th anniversary, hosted by many of the stars and guest stars from all of the Trek series and movies. Also features a huge number of clips from all of the series and movies. At the end, real-life astronauts Aldrin and Jemison present NASA award plaques to the cast members.",
                        "popularity": 2.391,
                        "poster_path": "/gQ3Bal5BpUcT95Gpu39o4GqnOER.jpg",
                        "release_date": "1996-10-06",
                        "title": "Star Trek: 30 Years and Beyond",
                        "video": false,
                        "vote_average": 6,
                        "vote_count": 4
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878
                        ],
                        "id": 500474,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Jr. Star Trek",
                        "overview": "The ten-year-old filmmaker (and star) pays homage to the Star Trek series.",
                        "popularity": 1.378,
                        "poster_path": "/geXMR6KJNeqY1fDPZtb8kGKYi9X.jpg",
                        "release_date": "1969-01-01",
                        "title": "Jr. Star Trek",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878,
                            99
                        ],
                        "id": 451572,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Inside the Roddenberry Vault",
                        "overview": "Fifty years after the original Star Trek first arrived on television, is there anything about Gene Roddenberry's space opera that hasn't been uncovered? Plenty! On December 13, 2016 fans can experience Star Trek: The Original Series - The Roddenberry Vault, a newly produced multi-part documentary featuring footage from the cutting room floor, long preserved in film canisters by the Roddenberry Estate. The origins of the classic series are explored with new interviews featuring cast and production personnel combined with newly-found deleted scenes, alternate angles, outtakes, behind the scenes moments, and original visual effects elements to tell the definitive story on the making and enduring legacy of Gene Roddenberry's creation.",
                        "popularity": 2.378,
                        "poster_path": "/7ljtwcMht9hzNguP3NLdGZqke3c.jpg",
                        "release_date": "2016-12-05",
                        "title": "Star Trek: Inside the Roddenberry Vault",
                        "video": false,
                        "vote_average": 10,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878,
                            16
                        ],
                        "id": 505868,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek III: Redemption",
                        "overview": "When a massive temporal disaster strikes, the year 2399 is left a devastated ruin with much of the Federation destroyed and Earth a volcanic wasteland. In a desperate bid to restore the present, Captain Kendra Ronston reunites with her fractured crew and travels into the past to undo the damage. But waiting for her is the most sinister nemesis the Federation has ever known, and to stop him, she will have to enlist the help from an unexpected source.",
                        "popularity": 1.4,
                        "poster_path": "/8EVXXJfZArgq2aU2Onww13xzDce.jpg",
                        "release_date": "2013-01-01",
                        "title": "Star Trek III: Redemption",
                        "video": false,
                        "vote_average": 10,
                        "vote_count": 1
                    },
                    {
                        "backdrop_path": null,
                        "first_air_date": "2008-01-01",
                        "genre_ids": [],
                        "id": 15950,
                        "media_type": "tv",
                        "name": "Star Trek: The Helena Chronicles",
                        "origin_country": [
                            "US"
                        ],
                        "original_language": "en",
                        "original_name": "Star Trek: The Helena Chronicles",
                        "overview": "Star Trek: The Helena Chronicles is a fan film series, a spin-off from Star Trek: Hidden Frontier and companion series to Star Trek: Odyssey. The first season of three episodes was completed in December, 2008, with season two scheduled to follow in 2009, though only one subsequent episode was produced. The Odyssey series finale, which was released in September 2011, also served as the finale to The Helena Chronicles.",
                        "popularity": 2.51,
                        "poster_path": null,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 365094,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "William Shatner's Star Trek Memories",
                        "overview": "",
                        "popularity": 2.106,
                        "poster_path": "/a6A4nr9wU9J3W98XAPXkLvlKTTW.jpg",
                        "release_date": "1995-01-01",
                        "title": "William Shatner's Star Trek Memories",
                        "video": false,
                        "vote_average": 6,
                        "vote_count": 2
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 218259,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Inside Star Trek: The Real Story",
                        "overview": "Who directed the pilot for the original Star Trek series? Where was it filmed? Who really built the Enterprise? You may own The Star Trek Encyclopaedia, and you may have seen every episode, but you still don't have all the answers! For the first time, the men and women who worked behind the scenes on the most popular science fiction television series ever created invite you to go boldly where no fan has gone before. In-depth interviews will introduce you to the writers, directors, producers, technicians and artists who breathed life into the original Star Trek series. You'll discover their greatest joys, their deepest sorrows and everything else you ever wanted to know about the greatest show in the galaxy. There are no actors and no special effects. Just the truth.",
                        "popularity": 2.046,
                        "poster_path": null,
                        "release_date": "1998-01-01",
                        "title": "Inside Star Trek: The Real Story",
                        "video": false,
                        "vote_average": 5,
                        "vote_count": 2
                    },
                    {
                        "backdrop_path": null,
                        "first_air_date": "2012-02-08",
                        "genre_ids": [
                            10765
                        ],
                        "id": 119888,
                        "media_type": "tv",
                        "name": "Star Trek: The Romulan Wars",
                        "origin_country": [],
                        "original_language": "en",
                        "original_name": "Star Trek: The Romulan Wars",
                        "overview": "A fan series that starts where Star Trek: Enterprise left off and tells the story of the Earth-Romulan War. The show has shown adventures of the USS Yorktown (NCC-208) and the Discovery.",
                        "popularity": 2.275,
                        "poster_path": null,
                        "vote_average": 3,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 926294,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Deep Space Nine - Emissary",
                        "overview": "Three years after his wife died at the hands of the Borg and following the Cardassian withdrawal from the planet Bajor, Commander Benjamin Sisko and a new crew of Starfleet and Bajoran officers take command of an abandoned Cardassian space station and make an incredible discovery that will change the galaxy and Sisko's future.",
                        "popularity": 1.999,
                        "poster_path": "/6rvoTSYvVCaiWjnszrg6khWurXS.jpg",
                        "release_date": "1993-01-04",
                        "title": "Star Trek: Deep Space Nine - Emissary",
                        "video": false,
                        "vote_average": 8.5,
                        "vote_count": 2
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 1031466,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Launch of Star Trek: Voyager",
                        "overview": "Launch of Star Trek: Voyager is a documentary which was broadcast on the Sci-Fi Channel in the US on 12 January 1995. It was hosted and narrated by Majel Barrett Roddenberry. The documentary also features some clips from Star Trek: Deep Space Nine.",
                        "popularity": 1.548,
                        "poster_path": "/nx0qOYaTHGJor5FqwagIUOKnKBT.jpg",
                        "release_date": "1995-01-12",
                        "title": "Launch of Star Trek: Voyager",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 416182,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: A Captain's Log",
                        "overview": "Star Trek: A Captain's Log was a CBS television documentary which aired on 30 November 1994 across the network. It consisted of film and video clips mixed with interviews from the Star Trek: The Original Series actors William Shatner, Leonard Nimoy, DeForest Kelley, James Doohan, George Takei, Walter Koenig, and Nichelle Nichols.  Star Trek: A Captain's Log is a retrospective of the episodes of TOS and also features archival footage of astronautical engineer Scott Crossfield, President John F. Kennedy, astronaut Alan Shepard, and Trek actors Marj Dusay and John Glenn.  Michael Mahler worked as director and writer and also held the same position on the William Shatner's Star Trek Memories documentary.",
                        "popularity": 1.506,
                        "poster_path": "/A7jDGFoFdxdM0T7b0qlSU73YqQZ.jpg",
                        "release_date": "1994-11-30",
                        "title": "Star Trek: A Captain's Log",
                        "video": false,
                        "vote_average": 6,
                        "vote_count": 2
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878
                        ],
                        "id": 771592,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: The Next Generation - Gambit",
                        "overview": "After hearing a rumor that Captain Picard has been murdered while on an archeological dig, the Enterprise crew sets out to find the smugglers who may have been responsible.",
                        "popularity": 1.89,
                        "poster_path": "/uktF27dvc47eqTHyX0Fn7gZXWD2.jpg",
                        "release_date": "1995-05-08",
                        "title": "Star Trek: The Next Generation - Gambit",
                        "video": true,
                        "vote_average": 6.6,
                        "vote_count": 5
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 568608,
                        "media_type": "movie",
                        "original_language": "pl",
                        "original_title": "Star Trek: A New Vision",
                        "overview": "",
                        "popularity": 1.431,
                        "poster_path": null,
                        "release_date": "2009-11-17",
                        "title": "Star Trek: A New Vision",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99,
                            10751,
                            878
                        ],
                        "id": 833322,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "The Importance of Star Trek",
                        "overview": "A son starts to understand the importance that his father's obsession with \"Star Trek\" had on his childhood.",
                        "popularity": 1.4,
                        "poster_path": null,
                        "release_date": "2021-04-29",
                        "title": "The Importance of Star Trek",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878,
                            16
                        ],
                        "id": 505863,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek I: Specter of the Past",
                        "overview": "A leading Starfleet scientist suddenly goes off the deep end, faking his own death to go into hiding. Then, five years later, he returns, meaner and more dangerous than ever.",
                        "popularity": 2.076,
                        "poster_path": "/jFOdVGkkPrFxz7u4InIxeqww77b.jpg",
                        "release_date": "2010-10-02",
                        "title": "Star Trek I: Specter of the Past",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    }
                ],
                "total_pages": 7,
                "total_results": 133
            }
            break;
        case 4:
            data = {
                "page": 4,
                "results": [
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            16,
                            10402
                        ],
                        "id": 810119,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Disco Generation",
                        "overview": "The crew of the Enterprise defeat the Borg invasion with the irresistible power of disco! A fast-paced spoof of space opera music videos, featuring stop action animation and a great retro soundtrack.",
                        "popularity": 1.091,
                        "poster_path": "/vpUDEvKdHEidP3upsp76r6baueO.jpg",
                        "release_date": "1997-08-08",
                        "title": "Star Trek: Disco Generation",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/q7GPKu6v8u6VGX3vrwmaBrI36Ia.jpg",
                        "genre_ids": [
                            10770,
                            99
                        ],
                        "id": 365095,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Leonard Nimoy: Star Trek Memories",
                        "overview": "A TV special hosted by Leonard Nimoy and featuring the actor discussing the making of \"The Original Series\" and the first two Star Trek movies, \"Star Trek: The Motion Picture\" and \"Star Trek II: The Wrath of Khan\". Also included is a short preview of \"Star Trek III: The Search for Spock\".",
                        "popularity": 1.4,
                        "poster_path": "/bsEzixQXFjjyLVgwXo6OSVuPFfb.jpg",
                        "release_date": "1983-01-01",
                        "title": "Leonard Nimoy: Star Trek Memories",
                        "video": false,
                        "vote_average": 7,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 1031468,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "E! Inside Star Trek: Voyager",
                        "overview": "E! Inside Star Trek: Voyager is a documentary produced by the E! Entertainment Television channel which is now owned by NBCUniversal. It was hosted by Robert Duncan McNeill and aired on 19 March 1995 on E!.  This 45 minutes documentary gives a behind the scenes look at the production on the first season of Star Trek: Voyager and interviews from the special effects department, the makeup department, the props department, and the costume department. It also includes several clips from Star Trek: The Next Generation and Star Trek: Deep Space Nine, a look at script pronounciation guides, Trekker trivia, and headlines in Klingonese.",
                        "popularity": 1.389,
                        "poster_path": "/vTiJAQ2lAtc9Kl1q9dYDQMrttWK.jpg",
                        "release_date": "1995-03-19",
                        "title": "E! Inside Star Trek: Voyager",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 373362,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Enterprise - Uncharted Territory",
                        "overview": "This 90 minute documentary features all-new interviews with the show's cast and crew as well as behind the scenes archival content providing fans an inside look at the challenges faced during the second season of ENTERPRISE as the writing staff and creators struggled to find the right tone and creative course for the series, ultimately developing the controversial XINDI story-arc which kicks off with the season finale: THE EXPANSE.",
                        "popularity": 1.4,
                        "poster_path": null,
                        "release_date": "2013-08-20",
                        "title": "Star Trek: Enterprise - Uncharted Territory",
                        "video": false,
                        "vote_average": 8,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 448638,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Your Guide to Star Trek: Generations",
                        "overview": "The making of Star Trek: Generations which was given away free with The Sun newspaper in 1993.",
                        "popularity": 2.11,
                        "poster_path": "/uTYQAfcndlGjxquzUO39BN3ioH0.jpg",
                        "release_date": "1993-01-01",
                        "title": "Your Guide to Star Trek: Generations",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "backdrop_path": null,
                        "first_air_date": "2013-05-26",
                        "genre_ids": [
                            10765
                        ],
                        "id": 214378,
                        "media_type": "tv",
                        "name": "Star Trek Continues",
                        "origin_country": [
                            "US"
                        ],
                        "original_language": "en",
                        "original_name": "Star Trek Continues",
                        "overview": "The USS Enterprise's historic five-year mission continues with all new episodes of the original series. \"Star Trek: Continues\", a new Trek series, beams down with exciting adventures of the Federation's most heroic crew led by Captain James T. Kirk. The lighting and color of the highly accurate sets accentuate the equally detailed props and costumes, matching the original series that ran from 1966-69! With acting and stories that also replicate the original series, the adventures are sure to dazzle even the most die hard Trek fans. Witness now the untold morality plays that explore the final frontier and more importantly... the human condition. Fans of the original series will especially enjoy the pilot episode as a familiar guest star from the original series reprises his role in a sequel entitled \"Pilgrim of Eternity\".",
                        "popularity": 1.687,
                        "poster_path": "/6CdotNV9qR9xDTl7HmD5jXiLH7f.jpg",
                        "vote_average": 6,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 568606,
                        "media_type": "movie",
                        "original_language": "pl",
                        "original_title": "Star Trek: Aliens",
                        "overview": "",
                        "popularity": 0.861,
                        "poster_path": null,
                        "release_date": "2009-11-17",
                        "title": "Star Trek: Aliens",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 568605,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Casting",
                        "overview": "",
                        "popularity": 0.843,
                        "poster_path": null,
                        "release_date": "2009-11-17",
                        "title": "Star Trek: Casting",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878
                        ],
                        "id": 767590,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: The Next Generation - Unification",
                        "overview": "When the Federation calls for help in locating an ambassador suspected of defecting, Picard is troubled to learn that Spock is the one who has vanished. Seeking information from Spock's ailing father, Sarek, and unlikely help from the Klingons, Picard and his crew find the ambassador pursuing a personal mission on Romulus: a Vulcan/Romulan reunification. But though the Romulans claim to support the same goal, their motives are not what they seem.",
                        "popularity": 1.603,
                        "poster_path": "/4fHKIsNcRrSZpynwYWL1VPbJlfA.jpg",
                        "release_date": "1995-02-27",
                        "title": "Star Trek: The Next Generation - Unification",
                        "video": true,
                        "vote_average": 7,
                        "vote_count": 5
                    },
                    {
                        "backdrop_path": "/m7yfGIyd7APqlxsgo9Fw5n88yDx.jpg",
                        "first_air_date": "2016-12-05",
                        "genre_ids": [
                            99,
                            10765
                        ],
                        "id": 91332,
                        "media_type": "tv",
                        "name": "Star Trek: Inside the Roddenberry Vault",
                        "origin_country": [],
                        "original_language": "en",
                        "original_name": "Star Trek: Inside the Roddenberry Vault",
                        "overview": "Fifty years after the original Star Trek first arrived on television, is there anything about Gene Roddenberry's space opera that hasn't been uncovered? Plenty! On December 13, 2016 fans can experience Star Trek: The Original Series - The Roddenberry Vault, a newly produced multi-part documentary featuring footage from the cutting room floor, long preserved in film canisters by the Roddenberry Estate. The origins of the classic series are explored with new interviews featuring cast and production personnel combined with newly-found deleted scenes, alternate angles, outtakes, behind the scenes moments, and original visual effects elements to tell the definitive story on the making and enduring legacy of Gene Roddenberry's creation.",
                        "popularity": 2.293,
                        "poster_path": null,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 986079,
                        "media_type": "movie",
                        "original_language": "pl",
                        "original_title": "Star Trek Przerobiony",
                        "overview": "Star Trek but actually good",
                        "popularity": 1.128,
                        "poster_path": null,
                        "release_date": "",
                        "title": "Star Trek Przerobiony",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/pAcitPlUKu2uFyMQE91eKpL0imI.jpg",
                        "genre_ids": [
                            99
                        ],
                        "id": 706253,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek Story",
                        "overview": "Gene Roddenberry's Utopian vision of humanity in the 24th century had a profound effect on American viewers. During the height of the Cold War, the tension of the civil rights movement and the jingoism of the Vietnam War, they saw a multicultural crew working together on the bridge of the Enterprise.  Leonard Nimoy, Patrick Stewart, Nichelle Nicols, Brent Spiner and others reflect on Star Trek's cultural impact over its 30-year history, and contemplate its future on the small screen.",
                        "popularity": 1.091,
                        "poster_path": "/lPG51ga38t8GvbpIp7MBSLe9fjs.jpg",
                        "release_date": "1996-08-26",
                        "title": "Star Trek Story",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/ptPwo47G8i5KTE68vAmBzgqWhlG.jpg",
                        "genre_ids": [
                            99
                        ],
                        "id": 522055,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "What We Left Behind: Looking Back at Star Trek: Deep Space Nine",
                        "overview": "A documentary exploring the legacy of Star Trek: Deep Space Nine, the reasons it went from the black sheep of Star Trek to a beloved mainstay of the franchise, and a brainstorm with the original writers on what a theoretical eighth season of the show could look like.",
                        "popularity": 4.426,
                        "poster_path": "/90kkGkEA3Svwt5SeCaR28pDm5dQ.jpg",
                        "release_date": "2018-10-12",
                        "title": "What We Left Behind: Looking Back at Star Trek: Deep Space Nine",
                        "video": false,
                        "vote_average": 7.4,
                        "vote_count": 28
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 407994,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: The Experience -  Klingon Encounter",
                        "overview": "An attempt by some evil Klingons to kidnap visitors at The Las Vegas Hilton is foiled when the 24th century starship U.S.S. Enterprise transports them safely aboard. Taken to the bridge, the guests are told by Commander Riker that the Klingons plan is to disrupt the future time-line. Riker orders Lt. Commander LaForge to take them through the Klingon battle-zone and back to the 20th century aboard a shuttle-craft so that the time-line can be restored.",
                        "popularity": 1.493,
                        "poster_path": "/xBPJNXrpOv5o8rTUQNBWk1lsXur.jpg",
                        "release_date": "2009-09-22",
                        "title": "Star Trek: The Experience -  Klingon Encounter",
                        "video": false,
                        "vote_average": 8,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 595261,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "40 Years of Star Trek",
                        "overview": "The Space Channel celebrates the 40th anniversary of the original STAR TREK. Produced by Mark Askwith, hosted by Jonathan Llyr and featuring interviews with George Takei, Nichelle Nichols, William Shatner, Peter David, Michael Okuda, Denise Okuda, F. Murray Abraham, Lawrence Montaigne, Leonard Nimoy, Garrett Wang, France Nuyen, Michael Reeve, George Clayton Johnson, Denise Crosby, Marc Scott Zicree, Garfield Reeves-Stevens, D.C. Fontana, Scott Bakula, Jolene Blalock, DeForest Kelley, LeVar Burton, Dr. Mae Jemison, Rob Salem, Walter Koenig, J.G. Hertzler, Dean Devlin, Harlan Ellison, Richard Arnold, Jeffrey Combs, Rick Berman, Bjo Trimble, Jim Lee, Alice Cooper, and Robert Picardo.",
                        "popularity": 1.758,
                        "poster_path": "/fbfyGtqasILtwZMZTkDKaesor8F.jpg",
                        "release_date": "2006-01-01",
                        "title": "40 Years of Star Trek",
                        "video": false,
                        "vote_average": 10,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/WCxiaMTTnMgsaulORTDE6MnsXM.jpg",
                        "genre_ids": [
                            99,
                            878
                        ],
                        "id": 662148,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: The Journey to the Silver Screen",
                        "overview": "In celebration of Star Trek's 50th anniversary, this two-hour documentary explores this enduring franchise by offering viewers an unprecedented, candid exploration into the original series cancellation and subsequent resurrection as one of the most successful series of motion pictures in Hollywood history. Features new interviews with key creative and production people as well as never before seen images from the production of all six classic Star Trek films along with details on all the un-produced Trek theatrical projects including The God Thing, Star Trek: Planet of the Titans, Star Trek: The Academy Years, and many other aborted big screen voyages for the crew of the Enterprise.\r Chapter 1 - The New Frontier: Resurrecting Star Trek\r Chapter 2 - Maiden Voyage: Making Star Trek The Motion Picture\r Chapter 3 - The Genesis Effect: Engineering The Wrath of Khan\r Chapter 4 - The Dream Is Alive: The Continuing Mission\r Chapter 5 - End of an Era: Charting The Undiscovered Country",
                        "popularity": 2.135,
                        "poster_path": "/jEAkHuuaLt2YiRj8nEIf5oyGl6p.jpg",
                        "release_date": "2016-06-07",
                        "title": "Star Trek: The Journey to the Silver Screen",
                        "video": false,
                        "vote_average": 7,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            16,
                            878
                        ],
                        "id": 812376,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Generation Spice",
                        "overview": "The crew of the Enterprise find themselves on a planet where they are confronted by Girl Power!",
                        "popularity": 0.841,
                        "poster_path": "/2zgiEx2aBtPnLSSAfGwrtFPGOtL.jpg",
                        "release_date": "1998-08-08",
                        "title": "Star Trek: Generation Spice",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/eyfZfqXbkwM9gAx57drDSxxeeAX.jpg",
                        "genre_ids": [
                            18,
                            12,
                            878,
                            10770
                        ],
                        "id": 988109,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: The Next Generation - Redemption",
                        "overview": "Loyalties are divided when civil war splits the Klingon Empire. When Worf sees a chance to regain his wrongfully lost family honor, he must choose between his duty as a Starfleet officer and his heritage as a Klingon warrior. Meanwhile, Picard struggles to keep the Federation from being dragged into the fray. But a shocking new adversary from the past threatens to destroy both the Federation and the Klingon Empire.",
                        "popularity": 1.435,
                        "poster_path": "/wOsgX8l5JnIvqZaY8w04taXjOAT.jpg",
                        "release_date": "1995-02-06",
                        "title": "Star Trek: The Next Generation - Redemption",
                        "video": true,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 928451,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: The Next Generation - Time's Arrow",
                        "overview": "An engineering team finds evidence of an alien presence on Earth in 19th century San Francisco: Data's severed head, buried five hundred years ago. An investigation inadvertently sends Data back to 19th century San Francisco, where he meets Jack London, Mark Twain, and a younger version of the long lived Guinan. Following Data back in time the crew of the Enterprise must locate Data and prevent his death while stopping the enigmatic Devidians from destroying Earth's history.",
                        "popularity": 1.714,
                        "poster_path": "/tN7fUECek82skj8iGLoa7KqRQBI.jpg",
                        "release_date": "1995-03-13",
                        "title": "Star Trek: The Next Generation - Time's Arrow",
                        "video": true,
                        "vote_average": 10,
                        "vote_count": 1
                    },
                    {
                        "backdrop_path": null,
                        "first_air_date": "2007-12-25",
                        "genre_ids": [],
                        "id": 7108,
                        "media_type": "tv",
                        "name": "Star Trek: The Continuing Mission",
                        "origin_country": [],
                        "original_language": "en",
                        "original_name": "Star Trek: The Continuing Mission",
                        "overview": "Star Trek: The Continuing Mission is an independently produced, non-profit, science fiction series set in the Star Trek universe. The show, created by Sebastian Prooth and Andy Tyrer in July 2007, is released exclusively via the Internet in the form of downloadable audio dramas. Sebastian Prooth and Andy Tyrer serve as the show’s co-executive producers. On November 10, 2007 it was announced that cast member Patrick McCray would be joining the production team as a producer.\n\nThe pilot episode, \"Ghost Ship,\" was released on December 25, 2007, and since then six more episodes have been released, most recently \"Earth\" on August 27, 2011. The producers' stated goal is for future releases to be on a quarterly basis.",
                        "popularity": 1.631,
                        "poster_path": null,
                        "vote_average": 0,
                        "vote_count": 0
                    }
                ],
                "total_pages": 7,
                "total_results": 133
            }
            break;
        case 5:
            data = {
                "page": 5,
                "results": [
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 744412,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Enterprise - Der Zeitspiegel",
                        "overview": "When captain Archer and the crew of the Enterprise tests a new drive, they were transferred into a parallel universe. There they make acquaintance with the Red Empire, which consists of cybernetic lifeforms who plan to eliminate all biological life, even in the normal universe.",
                        "popularity": 1.092,
                        "poster_path": "/st36zInrZtR3iPnSnuk29qMsk3H.jpg",
                        "release_date": "2008-06-20",
                        "title": "Star Trek: Enterprise - Der Zeitspiegel",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878
                        ],
                        "id": 913383,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: The Next Generation - Chain of Command",
                        "overview": "Tensions rise as a possible Cardassian attack looms, and Picard, Dr. Crusher and Worf are sent on a secret mission to find and destroy suspected biological weapons. The headstrong replacement captain, Edward Jellico, is cold and demanding - to the dismay of the remaining crew. But when Picard is captured by the Cardassians and tortured for information, dismay turns to anger and resistance as Jellico's plans exclude a rescue mission. With his options running out, Picard must fight to save his sanity and ultimately, his life.",
                        "popularity": 1.815,
                        "poster_path": "/mLW1P9dUBCyvqgQzvreTnTOqbiO.jpg",
                        "release_date": "1995-03-27",
                        "title": "Star Trek: The Next Generation - Chain of Command",
                        "video": true,
                        "vote_average": 7.7,
                        "vote_count": 3
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/fNbCEjCrTqgVbp1o4lo9ld4G4hL.jpg",
                        "genre_ids": [
                            99
                        ],
                        "id": 448932,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "The Star Trek Saga: From One Generation to the Next",
                        "overview": "This special is hosted by Patrick Stewart and traced the history of Star Trek from its inception with \"The Cage\" through to Star Trek IV: The Voyage Home and the first season of Star Trek: The Next Generation. It also showed brief previews of Star Trek V: The Final Frontier and TNG's second season. Also it was principally a container for the premiere of a full color print of \"The Cage\" which had, according to the special, recently been recovered from Paramount's studio archives.",
                        "popularity": 2.65,
                        "poster_path": "/6zcc6jrasHyC4JeFgMMxSqLegEd.jpg",
                        "release_date": "1988-10-03",
                        "title": "The Star Trek Saga: From One Generation to the Next",
                        "video": false,
                        "vote_average": 4,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 568611,
                        "media_type": "movie",
                        "original_language": "pl",
                        "original_title": "Star Trek: Starships",
                        "overview": "",
                        "popularity": 0.6,
                        "poster_path": null,
                        "release_date": "2009-11-17",
                        "title": "Star Trek: Starships",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878
                        ],
                        "id": 731926,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: The Next Generation - The Best of Both Worlds",
                        "overview": "The Enterprise has a deadly encounter with the Borg, resulting in Picard's kidnap, while Commander Riker encounters a beautiful rival with an eye on his job.",
                        "popularity": 2.495,
                        "poster_path": "/uS6HdlcG2x52HcWOLIgBTORzuse.jpg",
                        "release_date": "1990-06-18",
                        "title": "Star Trek: The Next Generation - The Best of Both Worlds",
                        "video": true,
                        "vote_average": 7,
                        "vote_count": 5
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 407989,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Farewell to Star Trek: The Experience",
                        "overview": "Closing ceremonies for Star Trek: The Experience at the Las Vegas Hilton.",
                        "popularity": 1.177,
                        "poster_path": "/arBxoVYBoJGRfXeuXl2ikvlcTSu.jpg",
                        "release_date": "2009-09-01",
                        "title": "Farewell to Star Trek: The Experience",
                        "video": false,
                        "vote_average": 7,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 470605,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Our Star Trek: The Fifty Year Mission",
                        "overview": "An exploration of Gene Roddenberry's Star Trek vision of humanity. After 50 years of Star Trek, how far has humanity come? How much further can we go?",
                        "popularity": 1.4,
                        "poster_path": "/dDymeOjp7OQpkQlPhiJZZAr0XSi.jpg",
                        "release_date": "2015-05-25",
                        "title": "Our Star Trek: The Fifty Year Mission",
                        "video": false,
                        "vote_average": 6.5,
                        "vote_count": 2
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 529408,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Voyager - Inside the New Adventure",
                        "overview": "Star Trek: Voyager – Inside the New Adventure was a special documentary, running for 50 minutes, produced by BECK-OLA Productions for broadcasting by UPN on 9 January 1995, the week prior to the premiere of Star Trek: Voyager. Hosted by Robert Picardo, the program went behind the scenes at the making of the pilot episode, \"Caretaker\", as well as the creation of the series itself. Segments included interviews with the cast and crew, as well as a \"day-in-the-life\" feature following Ethan Phillips during the filming of the Ocampa desert scenes.",
                        "popularity": 1.4,
                        "poster_path": "/yFyas4dhCVrdjTpLW25MiWm0JW7.jpg",
                        "release_date": "1995-01-10",
                        "title": "Star Trek: Voyager - Inside the New Adventure",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 863458,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Three Picture Saga",
                        "overview": "The making of the \"unintentional trilogy\": Star Trek II: The Wrath of Khan (1982), Star Trek III: The Search for Spock (1984), and Star Trek IV: The Voyage Home (1986).",
                        "popularity": 0.842,
                        "poster_path": null,
                        "release_date": "2009-05-12",
                        "title": "Star Trek: Three Picture Saga",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878
                        ],
                        "id": 994802,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Temporal Anomaly",
                        "overview": "Star Trek: Temporal Anomaly is the story of an average day aboard the Enterprise 1701-E which takes place just after the incident with the Ba'ku featured in Star Trek: Insurrection. An anomaly suddenly forms and within the blink of an eye somehow leaves only 1 Ensign aboard the Federation flagship. He soon discovers other ships from other times have also been brought to that region of space and each with only 1 crew member left aboard.",
                        "popularity": 0.602,
                        "poster_path": "/rIqO4gJ7TiU7YEwuQhFvfSViRVq.jpg",
                        "release_date": "2019-01-31",
                        "title": "Star Trek: Temporal Anomaly",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878
                        ],
                        "id": 963714,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Doomsday: A Star Trek Fan Production",
                        "overview": "The tragic story of the U.S.S. Constellation, her crew and her captain, Commodore Matt Decker.",
                        "popularity": 1.09,
                        "poster_path": "/kffLUr5UC2eF8sAUvegFMCXvKAY.jpg",
                        "release_date": "",
                        "title": "Doomsday: A Star Trek Fan Production",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            16,
                            35,
                            12,
                            878
                        ],
                        "id": 934552,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Kre-O Star Trek",
                        "overview": "A Star Trek short made of Kre-O",
                        "popularity": 0.6,
                        "poster_path": null,
                        "release_date": "2013-06-10",
                        "title": "Kre-O Star Trek",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 371224,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "The New Explorers: The Science of Star Trek",
                        "overview": "How real is the 'science' in Star Trek?",
                        "popularity": 2.033,
                        "poster_path": null,
                        "release_date": "1995-01-18",
                        "title": "The New Explorers: The Science of Star Trek",
                        "video": false,
                        "vote_average": 7.5,
                        "vote_count": 1
                    },
                    {
                        "backdrop_path": null,
                        "first_air_date": "",
                        "genre_ids": [],
                        "id": 207006,
                        "media_type": "tv",
                        "name": "Star Trek: The Journey to the Silver Screen",
                        "origin_country": [
                            "NL"
                        ],
                        "original_language": "nl",
                        "original_name": "Star Trek: The Journey to the Silver Screen",
                        "overview": "",
                        "popularity": 2.416,
                        "poster_path": null,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 708695,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Beyond the Five Year Mission - The Evolution of Star Trek: The Next Generation",
                        "overview": "Newly-produced documentary offering a behind the scenes exploration of Star Trek: The Next Generation's sixth season. Featuring all-new interviews with the cast and crew of the iconic science fiction drama.",
                        "popularity": 4.336,
                        "poster_path": null,
                        "release_date": "2014-06-14",
                        "title": "Beyond the Five Year Mission - The Evolution of Star Trek: The Next Generation",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "backdrop_path": "/pmiizczh10hf7wcHqGbP4dOY1Ql.jpg",
                        "first_air_date": "2020-11-13",
                        "genre_ids": [
                            10765,
                            18
                        ],
                        "id": 208977,
                        "media_type": "tv",
                        "name": "Pacific 201: A Star Trek Fan Film",
                        "origin_country": [
                            "US"
                        ],
                        "original_language": "es",
                        "original_name": "Pacific 201: A Star Trek Fan Film",
                        "overview": "",
                        "popularity": 1.824,
                        "poster_path": "/opzp6a5EBDkYfM9eDdJKw2tbvAI.jpg",
                        "vote_average": 7,
                        "vote_count": 1
                    },
                    {
                        "backdrop_path": "/lWQw0ri4rrYFjb5VWsV0JstHtqw.jpg",
                        "first_air_date": "2018-10-30",
                        "genre_ids": [],
                        "id": 87287,
                        "media_type": "tv",
                        "name": "Avalon Universe: A Star Trek Fan Production",
                        "origin_country": [],
                        "original_language": "en",
                        "original_name": "Avalon Universe: A Star Trek Fan Production",
                        "overview": "A Star Trek alternate universe based on the original series but with subtle differences to give the makers, Victoria Fox & Josh Irwin, creative freedom",
                        "popularity": 1.781,
                        "poster_path": "/1eqaY3shsHpjnN7h69v6WyWLQ9N.jpg",
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 708698,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "The Sky's the Limit - The Eclipse of Star Trek: The Next Generation",
                        "overview": "Newly-produced feature-length documentary exploring the making of TNG's historic final season and focusing on the season's most important moments with recollections from the show's entire cast and key creative personnel spanning the series' 7 seasons. Includes an in-depth analysis of the challenges faced by the show's writers and producers as they attempted to wrap up all the continuing story lines and the difficulties in developing the two-hour series finale while at the same time prepping the first TNG theatrical film - STAR TREK: GENERATIONS with closing thoughts from all the key artists and actors responsible for the show's enduring success and featuring archival behind the scenes footage and photographs.",
                        "popularity": 2.597,
                        "poster_path": null,
                        "release_date": "2014-12-02",
                        "title": "The Sky's the Limit - The Eclipse of Star Trek: The Next Generation",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 708689,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Resistance Is Futile - Assimilating Star Trek: The Next Generation",
                        "overview": "This newly-produced documentary reveals the challenges in producing TNG's groundbreaking third season. All-new cast and crew interviews reveal the drastic changes to the creative and writing staff which led to the series' major turning point with the arrival of new show-runner Michael Piller. Also features an in-depth look at the making of the season's most popular episodes including THE BEST OF BOTH WORLDS.",
                        "popularity": 2.187,
                        "poster_path": null,
                        "release_date": "2013-04-30",
                        "title": "Resistance Is Futile - Assimilating Star Trek: The Next Generation",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99,
                            878
                        ],
                        "id": 713695,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Wars vs. Star Trek: The Rivalry Continues",
                        "overview": "For years, STAR WARS fan have squared off against STAR TREK fans over which space fantasy is the better choice. As a result, both franchises have been embroiled in a continuing battle for merchandise sales, publicity and box-office receipts. The science-fiction genre has never seen anything like it and, as these fictional universes continue to expand, the competition seems to be never ending. Star Wars vs. Star Trek: The Rivalry Continues compares the space opera worlds of George Lucas and Gene Roddenberry for a one-of-a-kind intergalactic documentary.",
                        "popularity": 1.401,
                        "poster_path": "/3QjqzSGuH10u2vfvzuvX7e2xQ8L.jpg",
                        "release_date": "2002-01-01",
                        "title": "Star Wars vs. Star Trek: The Rivalry Continues",
                        "video": false,
                        "vote_average": 2,
                        "vote_count": 1
                    }
                ],
                "total_pages": 7,
                "total_results": 133
            }
            break;
        case 6:
            data = {
                "page": 6,
                "results": [
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 1031476,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Deep Space Nine - Behind the Scenes",
                        "overview": "Star Trek: Deep Space Nine – Behind the Scenes was a fifty minute documentary hosted by Terry Farrell that looked at the creation of Star Trek: Deep Space Nine, specifically its pilot episode \"Emissary\". Written by Stephen R. Wolcott and directed by Donald R. Beck, the documentary first aired on 4 January 1993 as a syndicated special of the by Paramount Television produced current media affairs show Entertainment Tonight, at the time the franchise's primary publicity outlet for anything live-action Star Trek related.  In the documentary, Farrell (Jadzia Dax) takes the viewer on a tour around the Deep Space 9 sets. The feature also has interviews with the cast, producers, writers and other production staff members and takes a look at the making of \"Emissary\".",
                        "popularity": 1.378,
                        "poster_path": "/u0YxXLnWzM95fN5gZup3mmmBH5A.jpg",
                        "release_date": "1993-01-04",
                        "title": "Star Trek: Deep Space Nine - Behind the Scenes",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878,
                            28,
                            12,
                            35
                        ],
                        "id": 873328,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek Versus Batman",
                        "overview": "Accidently sent back to the 60's, the USS Enterprise is discovered by Chief O'Hara and Gotham City Space Control.  Beaming down to Gotham for absolutely no reason, Kirk and Spock are kidnapped and brainwashed by the Joker and Catwoman.  The fun and melee begins as ridiculous fights, childish dialogue, and colorful costumes",
                        "popularity": 0.847,
                        "poster_path": "/qSp0vt8rhQMgBniQeTuKcAYme2M.jpg",
                        "release_date": "2006-11-11",
                        "title": "Star Trek Versus Batman",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 568610,
                        "media_type": "movie",
                        "original_language": "pl",
                        "original_title": "Star Trek: Ben Burtt & the Sounds of Star Trek",
                        "overview": "",
                        "popularity": 0.601,
                        "poster_path": null,
                        "release_date": "2009-11-17",
                        "title": "Star Trek: Ben Burtt & the Sounds of Star Trek",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 568612,
                        "media_type": "movie",
                        "original_language": "pl",
                        "original_title": "Star Trek: To Boldly Go",
                        "overview": "",
                        "popularity": 0.623,
                        "poster_path": null,
                        "release_date": "2009-11-17",
                        "title": "Star Trek: To Boldly Go",
                        "video": false,
                        "vote_average": 7,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 936899,
                        "media_type": "movie",
                        "original_language": "es",
                        "original_title": "Bring Back... Star Trek",
                        "overview": "",
                        "popularity": 0.6,
                        "poster_path": null,
                        "release_date": "",
                        "title": "Bring Back... Star Trek",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 633560,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: The True Story",
                        "overview": "Documentary covering the current state of both the theoretical and practical development of the various scientific basic principles that served, as per Gene Roddenberry's dictum, as a believable basis at the time for The Original Series. Several real-world scientists are interviewed, not a few of them unabashedly admitting they went into their chosen field of profession because of Star Trek: The Original Series.",
                        "popularity": 0.6,
                        "poster_path": "/rkEDtlyK0lGESspXhQFts4KYKEF.jpg",
                        "release_date": "2013-01-05",
                        "title": "Star Trek: The True Story",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 568607,
                        "media_type": "movie",
                        "original_language": "pl",
                        "original_title": "Star Trek: Gene Rodenberry's Vision",
                        "overview": "",
                        "popularity": 0.608,
                        "poster_path": null,
                        "release_date": "2009-11-17",
                        "title": "Star Trek: Gene Rodenberry's Vision",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878,
                            14,
                            12
                        ],
                        "id": 802924,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Untitled Kalinda Vazquez 'Star Trek' Film",
                        "overview": "Kalinda Vazquez has been set by Paramount Pictures to write a Star Trek movie. JJ Abrams’ Bad Robot is producing.",
                        "popularity": 1.1,
                        "poster_path": null,
                        "release_date": "",
                        "title": "Untitled Kalinda Vazquez 'Star Trek' Film",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 927124,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Deep Space Nine - The Way of the Warrior",
                        "overview": "When a Klingon fleet under General Martok arrives at the station ostensibly to protect the Alpha Quadrant from the Dominion, Sisko recruits Lieutenant Commander Worf to discover the Klingons' true intentions.",
                        "popularity": 1.794,
                        "poster_path": "/ruKMnHKZpWNIjY9TIODqKJCeUaI.jpg",
                        "release_date": "1995-10-02",
                        "title": "Star Trek: Deep Space Nine - The Way of the Warrior",
                        "video": false,
                        "vote_average": 9,
                        "vote_count": 2
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 708612,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Making It So - Continuing Star Trek: The Next Generation",
                        "overview": "Feature-length documentary offering an in-depth exploration of the show's sophomore season including the effects of the 1988 writer's strike on the show, cast changes, and the challenges to create groundbreaking visual effects on a television budget. Includes never-before-seen revealing behind-the-scenes footage, newly-found outtakes, and fascinating all-new interviews with the key creative personnel from the show, as well as the entire regular cast including Diana Muldaur who joined the cast during the series' second year.",
                        "popularity": 1.468,
                        "poster_path": null,
                        "release_date": "2012-11-29",
                        "title": "Making It So - Continuing Star Trek: The Next Generation",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 958752,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "To the Journey - Looking Back at Star Trek: Voyager",
                        "overview": "The documentary explores the legacy of Star Trek: Voyager (1995).",
                        "popularity": 1.4,
                        "poster_path": null,
                        "release_date": "",
                        "title": "To the Journey - Looking Back at Star Trek: Voyager",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 407996,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Villains of Star Trek",
                        "overview": "Overview of the villains that have been featured in the Original and Next Generation Star Trek movies.",
                        "popularity": 0.667,
                        "poster_path": "/j7EYjs7qS7yZGfLHgznOkuKeIpO.jpg",
                        "release_date": "2009-09-22",
                        "title": "Villains of Star Trek",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 294822,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Hollywood Rivals: Star Wars vs. Star Trek",
                        "overview": "Star Wars vs. Star Trek. George Lucas, Liam Neeson, Samuel L. Jackson, Natalie Portman, Mark Hamill, Carrie Fisher and Harrison Ford share insights and the special effects creator compares the worlds of Star Trek and Star Wars.",
                        "popularity": 0.886,
                        "poster_path": "/tEacV6cPxe9nznaMkoZp3A6rAUQ.jpg",
                        "release_date": "2001-10-19",
                        "title": "Hollywood Rivals: Star Wars vs. Star Trek",
                        "video": false,
                        "vote_average": 7.5,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 708608,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Stardate Revisited - The Origin of Star Trek: The Next Generation",
                        "overview": "Feature-length documentary offering the definitive look at the making of the iconic science fiction classic; STAR TREK: THE NEXT GENERATION! Includes never-before-seen revealing behind-the-scenes footage, newly found screen tests, and fascinating all-new interviews with the key creative personnel from the show, as well as the entire regular cast.",
                        "popularity": 1.4,
                        "poster_path": null,
                        "release_date": "2012-07-23",
                        "title": "Stardate Revisited - The Origin of Star Trek: The Next Generation",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99,
                            878,
                            35,
                            10770
                        ],
                        "id": 87812,
                        "media_type": "movie",
                        "original_language": "de",
                        "original_title": "Beam me Up! – Die große Star Trek Show",
                        "overview": "German comedy-documention that reviews 40 years of Star Trek history",
                        "popularity": 1.146,
                        "poster_path": "/bGsR3jaaz9zPGtpqYNLSEwSoUMY.jpg",
                        "release_date": "2009-05-01",
                        "title": "Beam me Up! – Die große Star Trek Show",
                        "video": false,
                        "vote_average": 6,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 786790,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Reunification - 25 Years After Star Trek: The Next Generation",
                        "overview": "Reunification: 25 Years After Star Trek – The Next Generation is a 61-minute documentary celebrating the 25th anniversary of Star Trek: The Next Generation.",
                        "popularity": 1.4,
                        "poster_path": "/pVNeEDgwGpb0Q01Y97IIfeCIMK3.jpg",
                        "release_date": "2012-11-04",
                        "title": "Reunification - 25 Years After Star Trek: The Next Generation",
                        "video": false,
                        "vote_average": 10,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 791678,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "I Love The Star Trek Movies",
                        "overview": "Trekkies talking abou their all time favouite parts of Star Trek",
                        "popularity": 0.84,
                        "poster_path": null,
                        "release_date": "",
                        "title": "I Love The Star Trek Movies",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [],
                        "id": 933474,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Journey's End - The Saga of Star Trek: The Next Generation",
                        "overview": "Your destination: the 24th century. Your mission: to voyage where few have gone before--behind the scenes of Star Trek: The Next Generation! Join Jonathan Frakes, Next Generation's Commander William Riker, for this fascinating chronicle of Gene Roddenberry's beloved, Emmy Award-winning series. You'll explore the Enterprise, meet the show's stars (and some villainous guest stars), learn special-effects secrets and makeup magic, and finally get the answer to that nagging question, \"Where is the bathroom on the Enterprise?\" Other highlights include a visit to a Star Trek convention, and a stop at the scoring stage to watch Marina Sirtis (Lt. Commander Deanna Troi) lead the orchestra in a recording session. This program concludes with a special look at the series' thrilling final episode (\"All Good Things . . .\") and a sneak peak at the crew's movie debut, Star Trek: Generations. So set a course for an adventure like no other.",
                        "popularity": 1.171,
                        "poster_path": "/qEooIkZgC7qe3rM78v5DuUd66cG.jpg",
                        "release_date": "1994-05-15",
                        "title": "Journey's End - The Saga of Star Trek: The Next Generation",
                        "video": false,
                        "vote_average": 6,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 416548,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Ultimate Trek: Star Trek's Greatest Moments",
                        "overview": "A retrospective celebrates the popularity of the various Star Trek\" series; host Jason Alexander.  Clips from the various series, interspersed with comedy skits with Jason Alexander as Captain Kirk.",
                        "popularity": 1.4,
                        "poster_path": "/hjNtL7ZEc2qJGVIYHS989qHcK4u.jpg",
                        "release_date": "1999-12-01",
                        "title": "Ultimate Trek: Star Trek's Greatest Moments",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878
                        ],
                        "id": 352545,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: Secret Voyage - Whose Birth These Triumphs Are",
                        "overview": "Secret Voyage takes place after the completion of the U.S.S. Enterprise's 5 year mission under legendary Captain James T. Kirk and before the events portrayed in \"Star Trek: The Motion Picture\". The story begins with Captain Calvin Mercer being called into the office of Admiral Hernadez office and asked to take on a secret mission before he finds out what it is. Bored with his ground assignments Mercer accepts. The mission that he chose to accept involves taking the refurbished Enterprise to the edge of known space and brokering a treaty with an alien race that has developed a new fuel that promises to revolutionize space travel. What seems like a straight forward mission involving first contact with a strange new world and new civilization quickly turns into something much more complicated with sinister overtones and hints of betrayal from within Star Fleet, or...someone else. Written by omniimage@iname.com",
                        "popularity": 0.886,
                        "poster_path": null,
                        "release_date": "2012-08-08",
                        "title": "Star Trek: Secret Voyage - Whose Birth These Triumphs Are",
                        "video": false,
                        "vote_average": 5,
                        "vote_count": 1
                    }
                ],
                "total_pages": 7,
                "total_results": 133
            }
            break;
        case 7:
            data = {
                "page": 7,
                "results": [
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            878
                        ],
                        "id": 994880,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "One Small Step: A Star Trek Fan Production",
                        "overview": "The year is 2282, and on Christmas Eve, one member of the USS Grissom crew makes a momentous decision while on a diplomatic mission to the planet Elas.",
                        "popularity": 0.656,
                        "poster_path": "/9DdTFOc1BLm1DffTyWa01aGKt64.jpg",
                        "release_date": "2022-02-28",
                        "title": "One Small Step: A Star Trek Fan Production",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 705005,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek's Favorite Moments",
                        "overview": "Fans, cast and crew of the Star Trek shows reflect on their favorite moments from The Original Series.",
                        "popularity": 1.702,
                        "poster_path": "/rSBUEZzRoDFnci6pzjCN3ToI6yi.jpg",
                        "release_date": "2004-01-01",
                        "title": "Star Trek's Favorite Moments",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 708691,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Relativity - The Family Saga of Star Trek: The Next Generation",
                        "overview": "The challenges in producing Star Trek The Next Generation's fourth season are revealed by cast and crew while also exploring the show's evolution after the critically acclaimed 3rd season turned the show into a crossover hit. This documentary also explores the Family theme for the show's fourth season with behind the scenes details on such key episodes as REUNION and BROTHERS giving fans a look into the personal relationships and family bonds of the crew of the Enterprise.",
                        "popularity": 0.6,
                        "poster_path": null,
                        "release_date": "2013-07-30",
                        "title": "Relativity - The Family Saga of Star Trek: The Next Generation",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 352547,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Star Trek: The Next Generation - Survive and Succeed: An Empire at War",
                        "overview": "An in-depth exploration on the Klingons and the making of Star Trek: The Next Generation's groundbreaking Klingon Civil War story arc from it's beginnings in the fan favorite episode \"Sins of the father\" to it's epic culmination in the show's landmark 100th episode \"Redemption\".",
                        "popularity": 0.881,
                        "poster_path": null,
                        "release_date": "2013-07-30",
                        "title": "Star Trek: The Next Generation - Survive and Succeed: An Empire at War",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 708693,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Requiem - A Remembrance of Star Trek: The Next Generation",
                        "overview": "This blu-ray exclusive multi-part documentary explores the making of Star Trek: The Next Generation's fifth season and focuses on the drastic changes to the show and the production family after the passing of creator Gene Roddenberry halfway though the year. Features all key cast and crew members sharing their stories of working with Roddenberry and bidding farewell to the Great Bird of the Galaxy.",
                        "popularity": 0.631,
                        "poster_path": null,
                        "release_date": "2013-11-19",
                        "title": "Requiem - A Remembrance of Star Trek: The Next Generation",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/dsNYJCKPnAAkP0doRyBovNmMQa0.jpg",
                        "genre_ids": [
                            35,
                            878
                        ],
                        "id": 161334,
                        "media_type": "movie",
                        "original_language": "tr",
                        "original_title": "Turist Ömer Uzay Yolunda",
                        "overview": "The Enterprise picks up a Turkish hobo.",
                        "popularity": 4.722,
                        "poster_path": "/yIX46UKMOJfoTQRcA70FsvVzgfl.jpg",
                        "release_date": "1973-01-01",
                        "title": "Ömer the Tourist in Star Trek",
                        "video": false,
                        "vote_average": 6.4,
                        "vote_count": 34
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/mmF33joz1221A7w9F7Cqfn684dZ.jpg",
                        "genre_ids": [
                            99,
                            878
                        ],
                        "id": 70703,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "The Captains",
                        "overview": "The Captains is a feature length documentary film written and directed by William Shatner. The film follows Shatner as he interviews the other actors whom have portrayed Starship captains within the illustrious science-fiction franchise.",
                        "popularity": 8.593,
                        "poster_path": "/ex8S1Xypc8NHb2jvI3hZskPyVhh.jpg",
                        "release_date": "2011-07-22",
                        "title": "The Captains",
                        "video": false,
                        "vote_average": 6.5,
                        "vote_count": 91
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 81899,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Trek Nation",
                        "overview": "Trek Nation is a documentary film directed by Scott Colthorp examining the positive impact that Star Trek and creator Gene Roddenberry may have had on people's lives as seen through the eyes of his son, Eugene Roddenberry, Jr. (\"Rod\"). It includes interviews with castmembers and crew from all five Star Trek shows, as well as various fans and celebrities who were markedly influenced by the show while growing up. Rod Roddenberry also visits Skywalker Ranch to interview George Lucas on the influence that Star Trek had on him. Lucas shares how he had gone to Star Trek conventions prior to creating Star Wars.",
                        "popularity": 4.011,
                        "poster_path": "/pYz6yErYh1awBqnSEypWOpg6zYJ.jpg",
                        "release_date": "2011-11-30",
                        "title": "Trek Nation",
                        "video": false,
                        "vote_average": 6.9,
                        "vote_count": 19
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 708594,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "In a Time of War",
                        "overview": "Newly produced multi-part documentary featuring all-new interviews with the show's cast and crew as well as behind the scenes archival content. This retrospective documentary gives fans an inside look at the making of the show's groundbreaking third season - the first season of a Star Trek series to feature a year-long story arc. Writing staff and production personnel discuss the complexities of plotting the Xindi story-arc and the development of all the major story threads that connected every single episode of the show's third season.",
                        "popularity": 2.871,
                        "poster_path": null,
                        "release_date": "2014-01-07",
                        "title": "In a Time of War",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/oFWt2X89rHNyPmfNbaWr0q2U3G2.jpg",
                        "genre_ids": [
                            878,
                            10752
                        ],
                        "id": 284606,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Prelude to Axanar",
                        "overview": "Prelude to Axanar is a short film that will give viewers a historical look at the events leading up to the Battle of Axanar, the central event of the film Axanar. The short is a historical look at the battle of Axanar, filmed like a History Channel special. Each character will give a different view of the war with the Klingons leading up to the final confrontation that will be chronicled in Axanar, which will be released later this year. Prelude will tell viewers about the war and what it meant to each side. Figures from both sides will talk about how the war started, how the Klingons were better prepared for war, how Starfleet built their fleet, and how the war was fought from both the Federation and Klingon perspectives. You will hear from Robert April talk about building the Enterprise, Starfleet Admiral Ramirez talk about building the Starfleet, Garth of Izar telling the story of his rise to fame and Kharn, the Klingon Supreme Commander give the Klingon view of the war.",
                        "popularity": 2.684,
                        "poster_path": "/axEfYzGMBEIXQy8ldX737kW6TcD.jpg",
                        "release_date": "2014-07-26",
                        "title": "Prelude to Axanar",
                        "video": false,
                        "vote_average": 7,
                        "vote_count": 22
                    },
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            99
                        ],
                        "id": 708592,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "To Boldly Go: Launching Enterprise",
                        "overview": "A candid, first hand account on the development and the making of the controversial Star Trek prequel series, Enterprise. Featuring all-new interviews with cast and crew members including series lead Scott Bakula and co-creators / executive producers Rick Berman and Brannon Braga along with revealing never before seen behind the scenes footage and photos.",
                        "popularity": 2.535,
                        "poster_path": null,
                        "release_date": "2013-03-26",
                        "title": "To Boldly Go: Launching Enterprise",
                        "video": false,
                        "vote_average": 10,
                        "vote_count": 1
                    },
                    {
                        "adult": false,
                        "backdrop_path": "/2y9ZroZAp4WTQsEHf5KcLfMawJq.jpg",
                        "genre_ids": [
                            99
                        ],
                        "id": 549358,
                        "media_type": "movie",
                        "original_language": "en",
                        "original_title": "Woman in Motion",
                        "overview": "Nichelle Nichols' daunting task to launch a national blitz for NASA, recruiting 8,000 of the nation's best and brightest, including the trailblazing astronauts who became the first African American, Asian and Latino men and women to fly in space.",
                        "popularity": 2.439,
                        "poster_path": "/yoGc3BiIJiZSDpJQSOTDJGVeYTx.jpg",
                        "release_date": "2021-02-02",
                        "title": "Woman in Motion",
                        "video": false,
                        "vote_average": 9.5,
                        "vote_count": 2
                    },
                    {
                        "backdrop_path": null,
                        "first_air_date": "2006-03-12",
                        "genre_ids": [
                            99
                        ],
                        "id": 34681,
                        "media_type": "tv",
                        "name": "How William Shatner Changed the World",
                        "origin_country": [
                            "CA"
                        ],
                        "original_language": "en",
                        "original_name": "How William Shatner Changed the World",
                        "overview": "How William Shatner Changed the World is a 2005 two-hour television documentary, commissioned by Discovery Channel Canada and co-produced for History Channel in the United States and Channel Five in the United Kingdom. Hosted and narrated by William Shatner, known for his portrayal of Captain James T. Kirk, and based on his book, I'm Working on That, the show focuses on technological advancements and people in the real world that were inspired by the Star Trek phenomenon.",
                        "popularity": 2.241,
                        "poster_path": "/5dv0eWe6l605OnATzc1mLFUD5X6.jpg",
                        "vote_average": 4,
                        "vote_count": 1
                    }
                ],
                "total_pages": 7,
                "total_results": 133
            }
            break;
        default:
            data = null
            break;
    }

    return {
        data: data,
        isLoading: !error && !data.results?.length,
        isError: error,
        currentPage: page,
        totalPages: data.total_pages
    }

 
}

export const useBlackAdam = (keyword: string) => {

    const fakeResult = { 
        "page": 1,
        "results": [
            {
                "adult": false,
                "backdrop_path": "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
                "genre_ids": [
                    28,
                    14,
                    878
                ],
                "id": 436270,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Black Adam",
                "overview": "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
                "popularity": 9649.909,
                "poster_path": "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
                "release_date": "2022-10-19",
                "title": "Black Adam",
                "video": false,
                "vote_average": 7.3,
                "vote_count": 2353
            },
            {
                "adult": false,
                "backdrop_path": "/jVsbzy5gj3McD8V6dDr7EMrLSqT.jpg",
                "genre_ids": [
                    99
                ],
                "id": 1040330,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Black Adam: Saviour or Destroyer?",
                "overview": "Ahead of the release of upcoming fantasy film ‘Black Adam’, sit down with Dwayne Johnson as he discusses his starring role as the eponymous superhero.",
                "popularity": 184.817,
                "poster_path": "/sTuXDWacwdcMS7NNLaynkfVBZkr.jpg",
                "release_date": "2022-10-15",
                "title": "Black Adam: Saviour or Destroyer?",
                "video": false,
                "vote_average": 7.1,
                "vote_count": 257
            },
            {
                "adult": false,
                "backdrop_path": "/1GzlEn3AOlBFrx6vsqq1JAkH4G3.jpg",
                "genre_ids": [
                    16,
                    28,
                    878,
                    14
                ],
                "id": 43641,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Superman/Shazam!: The Return of Black Adam",
                "overview": "Chosen the world’s protector against the Seven Deadly Enemies of Man – pride, envy, greed, hatred, selfishness, laziness and injustice – young Billy Batson accepts his destiny as Captain Marvel. Battling alongside Superman against nefarious Black Adam, Billy soon discovers the challenge super heroes ultimately face: is it revenge or justice?",
                "popularity": 77.19,
                "poster_path": "/3MgwChvi42N1RnhQE9A4pQVHyUY.jpg",
                "release_date": "2010-11-16",
                "title": "Superman/Shazam!: The Return of Black Adam",
                "video": false,
                "vote_average": 7,
                "vote_count": 1206
            },
            {
                "adult": false,
                "gender": 0,
                "id": 2875851,
                "known_for": [
                    {
                        "adult": false,
                        "genre_ids": [
                            35
                        ],
                        "id": 769964,
                        "media_type": "movie",
                        "original_language": "es",
                        "original_title": "El sekuestro",
                        "overview": "",
                        "poster_path": "/hpF4gKv4SgtnVvxARfYlMzGWtQ8.jpg",
                        "release_date": "1997-04-24",
                        "title": "El sekuestro",
                        "video": false,
                        "vote_average": 0,
                        "vote_count": 0
                    }
                ],
                "known_for_department": "Acting",
                "media_type": "person",
                "name": "Adam Black",
                "popularity": 0.6,
                "profile_path": null
            },
            {
                "adult": false,
                "backdrop_path": "/vg3TwaY1rj0ETlFCTha8tm9tJVL.jpg",
                "genre_ids": [
                    16,
                    28,
                    12,
                    14,
                    878
                ],
                "id": 640810,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "DC Showcase Original Shorts Collection",
                "overview": "An anthology of DC Showcase stories consisting of a new Superman/Shazam feature and extended versions of older shorts.",
                "popularity": 20.189,
                "poster_path": "/cEowD2KjdAzGqQcn3kIZpdEsvfr.jpg",
                "release_date": "2010-11-09",
                "title": "DC Showcase Original Shorts Collection",
                "video": true,
                "vote_average": 7.2,
                "vote_count": 18
            },
            {
                "adult": false,
                "backdrop_path": "/mwJqenycCK0jCLgIz8dHTidd7Xw.jpg",
                "genre_ids": [
                    10751,
                    12,
                    16,
                    35
                ],
                "id": 690369,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "LEGO DC: Shazam! Magic and Monsters",
                "overview": "It’s high time the Justice League took notice of Shazam, but joining the world’s greatest team of superheroes is a lot harder when they’ve all been turned into kids.",
                "popularity": 30.032,
                "poster_path": "/ziIyuNNNwYqv0qbOpV9VvvdnRBb.jpg",
                "release_date": "2020-04-28",
                "title": "LEGO DC: Shazam! Magic and Monsters",
                "video": false,
                "vote_average": 7.4,
                "vote_count": 117
            }
        ],
        "total_pages": 1,
        "total_results": 6
    }

    return {
        data: fakeResult,
        isLoading: !fakeResult,
        isError: !fakeResult,
        currentPage: fakeResult.page,
        totalPages: fakeResult.total_pages
    }

}

export const useLimitless = (keyword: string) => {
    const fakeResult = {
        "page": 1,
        "results": [
            {
                "adult": false,
                "backdrop_path": "/vQGo5VjJcHxpzIa8lMBFzpAth1w.jpg",
                "genre_ids": [
                    53,
                    9648,
                    878
                ],
                "id": 51876,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Limitless",
                "overview": "A paranoia-fueled action thriller about an unsuccessful writer whose life is transformed by a top-secret \"smart drug\" that allows him to use 100% of his brain and become a perfect version of himself. His enhanced abilities soon attract shadowy forces that threaten his new life in this darkly comic and provocative film.",
                "popularity": 71.572,
                "poster_path": "/hv5JMCrMVLvV6HKPf9FcBuyk2MG.jpg",
                "release_date": "2011-03-08",
                "title": "Limitless",
                "video": false,
                "vote_average": 7.2,
                "vote_count": 9366
            },
            {
                "backdrop_path": "/5jrncO35yqeYjcv7GiCh27qxRR1.jpg",
                "first_air_date": "2015-09-22",
                "genre_ids": [
                    10765,
                    80,
                    18,
                    10759
                ],
                "id": 62687,
                "media_type": "tv",
                "name": "Limitless",
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Limitless",
                "overview": "Limitless, based on the feature film, picks up where the movie left off and follows Brian Sinclair as he discovers the power of the mysterious drug NZT, and is coerced into using his newfound drug-enhanced abilities to solve weekly cases for the FBI.",
                "popularity": 31.469,
                "poster_path": "/l5BERaKn3ozRTLhoylIiNwMDvax.jpg",
                "vote_average": 7.3,
                "vote_count": 668
            },
            {
                "backdrop_path": "/r9zLn5wkb7vY15AQw47NNVXnPiW.jpg",
                "first_air_date": "2022-11-16",
                "genre_ids": [
                    99,
                    10759
                ],
                "id": 115996,
                "media_type": "tv",
                "name": "Limitless with Chris Hemsworth",
                "origin_country": [
                    "US",
                    "GB"
                ],
                "original_language": "en",
                "original_name": "Limitless with Chris Hemsworth",
                "overview": "Global movie star Chris Hemsworth, despite being in peak superhero-condition, is on a personal mission to learn how to stay young, healthy, strong, and resilient. Undergoing a series of epic trials and extraordinary challenges, he’ll learn firsthand how we can live better for longer by discovering ways to regenerate damage, maximize strength, build resilience, supercharge memory and confront mortality.",
                "popularity": 26.436,
                "poster_path": "/mGrgY9FoZiJcwklEiEzyWD2DST1.jpg",
                "vote_average": 9.4,
                "vote_count": 9
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [],
                "id": 732189,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Limitless",
                "overview": "Poetic portrait with beautiful camerawork of an Indian teenager balancing between two genders who discovers that their options are indeed limitless.",
                "popularity": 1.355,
                "poster_path": "/hne9F4NxQ0mx9UqBilBEkesRvUL.jpg",
                "release_date": "2019-08-18",
                "title": "Limitless",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [
                    99
                ],
                "id": 667445,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Limitless",
                "overview": "This documentary follows eight women in India who struggle with self-confidence and society's expectations but rediscover themselves through running",
                "popularity": 1.178,
                "poster_path": "/e66L2HA81x0nzHr0bM8kt9fXoG3.jpg",
                "release_date": "2017-01-01",
                "title": "Limitless",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [],
                "id": 298934,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Justin Bieber: Limitless",
                "overview": "Justin Bieber is the teen idol of his generation - a young musician with the world at his feet. The transformation form small town Canadian boy to international superstar happened almost overnight for recording artist Justin Bieber.",
                "popularity": 0.84,
                "poster_path": null,
                "release_date": "2014-09-01",
                "title": "Justin Bieber: Limitless",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [
                    10402
                ],
                "id": 637670,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Limitless Night",
                "overview": "The story of a young girl searching the bones of her lost relationship, hoping to reignite the anchor that once bound her to the world. Based on the poem \"Should the Wide World Roll Away\" by Stephen Crane.",
                "popularity": 0.661,
                "poster_path": null,
                "release_date": "2018-07-10",
                "title": "Limitless Night",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
            },
            {
                "backdrop_path": "/wfi4S3hv0JtCqAtUkEGcoAymluN.jpg",
                "first_air_date": "2022-01-08",
                "genre_ids": [
                    10764
                ],
                "id": 154214,
                "media_type": "tv",
                "name": "Ant & Dec's Limitless Win",
                "origin_country": [
                    "GB"
                ],
                "original_language": "en",
                "original_name": "Ant & Dec's Limitless Win",
                "overview": "Every question is an opportunity to climb the endless money ladder and reach the big money, but only a correct answer banks the cash. Push their luck too far and they’ll crash out of the game and lose it all.",
                "popularity": 1.142,
                "poster_path": "/hwTJS7v6Dz0KavdtV4W7xj7v2HQ.jpg",
                "vote_average": 8.8,
                "vote_count": 4
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [],
                "id": 425394,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Exclaim Her Limitless Wisdom",
                "overview": "Rock Ross' goddess film. Whimsy. Remarkable whimsy of hyperactive proportions.",
                "popularity": 0.804,
                "poster_path": null,
                "release_date": "1984-01-01",
                "title": "Exclaim Her Limitless Wisdom",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
            },
            {
                "backdrop_path": "/5h51ZIscPxLD0c9hl8Y5ChCttiG.jpg",
                "first_air_date": "2022-11-24",
                "genre_ids": [],
                "id": 215021,
                "media_type": "tv",
                "name": "Limitless",
                "origin_country": [
                    "KR"
                ],
                "original_language": "ko",
                "original_name": "한도초과",
                "overview": "Everything is full of laughter with Kim Min-kyung, Hong Yun-hwa, Shin Gi-ru, and Pung-ja! Their POSITIVE, FUN and HAPPY energy make traveling, mukbang and beauty overwhelming joyful!",
                "popularity": 1.803,
                "poster_path": "/nvYFvB18M08Aqji6GxqjHcrGsTR.jpg",
                "vote_average": 0,
                "vote_count": 0
            },
            {
                "adult": false,
                "backdrop_path": "/pf0uC7McRXj6kSdNOauGqBwqWIl.jpg",
                "genre_ids": [
                    18
                ],
                "id": 63659,
                "media_type": "movie",
                "original_language": "fr",
                "original_title": "Agatha et les lectures illimitées",
                "overview": "A man and his sister meet at a seaside village to discuss their relationship.",
                "popularity": 2.87,
                "poster_path": "/bQDtZDREQBF1CGAHuJZwDA1i05H.jpg",
                "release_date": "1981-10-07",
                "title": "Agatha and the Limitless Readings",
                "video": false,
                "vote_average": 6.4,
                "vote_count": 17
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [],
                "id": 492131,
                "media_type": "movie",
                "original_language": "ja",
                "original_title": "限りなき楽園",
                "overview": "An 8mm animation that was produced by Harada during his high school years.",
                "popularity": 0.881,
                "poster_path": "/jN03BWQHHKOvlXaDa4kCdLArDRT.jpg",
                "release_date": "1982-01-01",
                "title": "Limitless Paradise",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [
                    99
                ],
                "id": 672645,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Sin Límite de Tiempo",
                "overview": "Through three characters that live wrestling in its different phases, \"Limitless Time\" takes us into the sport-show of the masks and capes from a more human point of view, where each fighter gives everything for a sport whose main driving force is the passion.",
                "popularity": 0.6,
                "poster_path": "/tWxytrDDEDqJ2nCbe7zlZHHNpQg.jpg",
                "release_date": "2019-02-14",
                "title": "Limitless Time",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
            }
        ],
        "total_pages": 1,
        "total_results": 13
    }

    return {
        data: fakeResult,
        isLoading: !fakeResult,
        isError: !fakeResult,
        currentPage: fakeResult.page,
        totalPages: fakeResult.total_pages
    }
}


export const useLOTR = (keyword: string, page: number = 1) => {

    let result: any;

    const initial = {
        "page": page,
        "results": [
            {
                "backdrop_path": "/1rO4xoCo4Z5WubK0OwdVll3DPYo.jpg",
                "first_air_date": "2022-09-01",
                "genre_ids": [
                    10765,
                    10759,
                    18
                ],
                "id": 84773,
                "media_type": "tv",
                "name": "The Lord of the Rings: The Rings of Power",
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "The Lord of the Rings: The Rings of Power",
                "overview": "Beginning in a time of relative peace, we follow an ensemble cast of characters as they confront the re-emergence of evil to Middle-earth. From the darkest depths of the Misty Mountains, to the majestic forests of Lindon, to the breathtaking island kingdom of Númenor, to the furthest reaches of the map, these kingdoms and characters will carve out legacies that live on long after they are gone.",
                "popularity": 540.059,
                "poster_path": "/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg",
                "vote_average": 7.6,
                "vote_count": 1602
            },
            {
                "adult": false,
                "backdrop_path": "/kWYfW2Re0rUDE6IHhy4CRuKWeFr.jpg",
                "genre_ids": [
                    12,
                    14,
                    28
                ],
                "id": 121,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "The Lord of the Rings: The Two Towers",
                "overview": "Frodo and Sam are trekking to Mordor to destroy the One Ring of Power while Gimli, Legolas and Aragorn search for the orc-captured Merry and Pippin. All along, nefarious wizard Saruman awaits the Fellowship members at the Orthanc Tower in Isengard.",
                "popularity": 67.595,
                "poster_path": "/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg",
                "release_date": "2002-12-18",
                "title": "The Lord of the Rings: The Two Towers",
                "video": false,
                "vote_average": 8.4,
                "vote_count": 19000
            },
            {
                "adult": false,
                "backdrop_path": "/gU84vBGG2x8K3x1zrz4SggiN5hr.jpg",
                "genre_ids": [
                    12,
                    14,
                    28
                ],
                "id": 120,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "The Lord of the Rings: The Fellowship of the Ring",
                "overview": "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator. Along the way, a fellowship is formed to protect the ringbearer and make sure that the ring arrives at its final destination: Mt. Doom, the only place where it can be destroyed.",
                "popularity": 84.888,
                "poster_path": "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
                "release_date": "2001-12-18",
                "title": "The Lord of the Rings: The Fellowship of the Ring",
                "video": false,
                "vote_average": 8.4,
                "vote_count": 21871
            },
            {
                "adult": false,
                "backdrop_path": "/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg",
                "genre_ids": [
                    12,
                    14,
                    28
                ],
                "id": 122,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "The Lord of the Rings: The Return of the King",
                "overview": "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces. Meanwhile, Frodo and Sam take the ring closer to the heart of Mordor, the dark lord's realm.",
                "popularity": 80.24,
                "poster_path": "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
                "release_date": "2003-12-01",
                "title": "The Lord of the Rings: The Return of the King",
                "video": false,
                "vote_average": 8.5,
                "vote_count": 20631
            },
            {
                "adult": false,
                "backdrop_path": "/x9McE1WFKnAHludiY7xfd7modDC.jpg",
                "genre_ids": [
                    12,
                    16,
                    14
                ],
                "id": 123,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "The Lord of the Rings",
                "overview": "The Fellowship of the Ring embark on a journey to destroy the One Ring and end Sauron's reign over Middle-earth.",
                "popularity": 22.123,
                "poster_path": "/liW0mjvTyLs7UCumaHhx3PpU4VT.jpg",
                "release_date": "1978-11-15",
                "title": "The Lord of the Rings",
                "video": false,
                "vote_average": 6.6,
                "vote_count": 688
            },
            {
                "adult": false,
                "backdrop_path": "/1mtjTIcwlo6YmGrJEr7fnGeITx3.jpg",
                "genre_ids": [
                    14,
                    12,
                    18
                ],
                "id": 1016184,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "The Lord of the Rings: The Rings of Power Global Fan Screening",
                "overview": "An edited version of the first two episodes of The Lord of the Rings: The Rings of Power, shown exclusively to fans in cinemas around the world in August 2022. In a time of relative peace, an ensemble cast of characters confronts the re-emergence of evil to Middle-earth.",
                "popularity": 7.845,
                "poster_path": "/toEUQXyDut4QecjC3RAdBoDVlUe.jpg",
                "release_date": "2022-08-31",
                "title": "The Lord of the Rings: The Rings of Power Global Fan Screening",
                "video": true,
                "vote_average": 7.3,
                "vote_count": 17
            },
            {
                "adult": false,
                "backdrop_path": "/gVDRFOeIsbxt6Axuoc1EHSMJTIe.jpg",
                "genre_ids": [
                    16,
                    14,
                    28
                ],
                "id": 839033,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "The Lord of the Rings: The War of the Rohirrim",
                "overview": "Focused on the mighty King of Rohan, Helm Hammerhand, and a legendary battle which helped shaped Middle Earth leading into the events of The Lord of The Rings.",
                "popularity": 4.529,
                "poster_path": "/lq7wL3Vcg4c6KkYzoPdOC46s4lT.jpg",
                "release_date": "2024-04-10",
                "title": "The Lord of the Rings: The War of the Rohirrim",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [
                    99,
                    10770
                ],
                "id": 453779,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "A Passage to Middle-earth: Making of 'Lord of the Rings'",
                "overview": "",
                "popularity": 2.499,
                "poster_path": "/sDsmtdmsS1KqJTKwKb1hJ9VFL6w.jpg",
                "release_date": "2001-12-09",
                "title": "A Passage to Middle-earth: Making of 'Lord of the Rings'",
                "video": false,
                "vote_average": 6.4,
                "vote_count": 5
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [],
                "id": 945739,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Darla's Book Club: Discussing the Lord of the Rings",
                "overview": "",
                "popularity": 0.6,
                "poster_path": "/cBdXohO3uOFnhI0NGs6TOpqabBt.jpg",
                "release_date": "2021-11-26",
                "title": "Darla's Book Club: Discussing the Lord of the Rings",
                "video": false,
                "vote_average": 10,
                "vote_count": 1
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [
                    10402
                ],
                "id": 155586,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Creating the Lord of the Rings Symphony",
                "overview": "Creating The Lord of the Rings Symphony includes excerpts of live concert footage from The Lord of the Rings Symphony: Six Movements for Orchestra, Chorus and Soloists, documentary commentary by Howard Shore, and the illustrations of Alan Lee and John Howe.",
                "popularity": 0.6,
                "poster_path": "/bOb6CMJLnDzTwZHsoPQ0nkSnpnx.jpg",
                "release_date": "2004-12-14",
                "title": "Creating the Lord of the Rings Symphony",
                "video": false,
                "vote_average": 5.9,
                "vote_count": 4
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [
                    99
                ],
                "id": 296260,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Master of the Rings: The Unauthorized Story Behind J.R.R. Tolkien's 'Lord of the Rings'",
                "overview": "This documentary examines the social and cultural underpinnings of the trilogy of The Lord of the Rings by J.R.R. Tolkien, in an attempt to understand the work's phenomenal success and influence. The program looks for answers in the author's sources of inspiration, from the folk legends of Norway to the field of linguistics of which Tolkien was a lifelong student. It finds that the deep chord the story strikes owes its resonance to the author's use of archetypal imagery and language. Many examples of these recurrent themes and images are given, with readings from the work and other literature. Interviews with the book's illustrators, the brothers Hildebrandt, speak to the power of the imagery in the classic story. Scholars, Tolkien's children, and the author himself provide insight into the mythic themes and the spell they have cast over the vast readership of The Lord of the Rings.",
                "popularity": 1.542,
                "poster_path": "/7fzIaIcpj4f0O3IHE65qGqlNcuL.jpg",
                "release_date": "2001-12-04",
                "title": "Master of the Rings: The Unauthorized Story Behind J.R.R. Tolkien's 'Lord of the Rings'",
                "video": false,
                "vote_average": 8,
                "vote_count": 1
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [],
                "id": 651342,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "J.R.R. Tolkien and the Birth Of \"The Lord of the Rings\" And \"The Hobbit\"",
                "overview": "In a house in Oxford lived a remarkable man called J.R.R. Tolkien who told stories that thrilled the world. To this very day readers and film audiences are enjoying his magnificent epics “THE LORD OF THE RINGS” and “The Hobbit” – adapted to the big screen by producer, Peter Jackson. Although everybody has heard of Tolkien’s writing, very few people could tell you much about the man responsible for creating the best loved magical creatures that have become household names. This program will give you a real insight into the man behind the legends of “THE LORD OF THE RINGS,” and the people and places that shaped his unique literary genius. From the rolling English countryside to the sooty streets of Industrial Birmingham, the dreaming spires of Oxford to the World War I trenches of the blood soaked Somme; this is the story of the quintessential English College Professor who made epic mythology and legend accessible to one and all.",
                "popularity": 0.871,
                "poster_path": "/jp0NQtIQTwen5vHBNcCK2iLKoY7.jpg",
                "release_date": "2004-12-31",
                "title": "J.R.R. Tolkien and the Birth Of \"The Lord of the Rings\" And \"The Hobbit\"",
                "video": false,
                "vote_average": 2,
                "vote_count": 1
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [
                    99
                ],
                "id": 1035526,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Forging Through the Darkness: The Ralph Bakshi Vision for 'The Lord of the Rings'",
                "overview": "A deep look at how Ralph Bakshi made his version of Lord of the Rings (1978). With Ralph Bakshi, Victoria Bakshi-Yudis, Chris Conkling, Timothy Galfas, Scott Kleinman, & Tom Tataranowicz.",
                "popularity": 0.6,
                "poster_path": null,
                "release_date": "2010-04-10",
                "title": "Forging Through the Darkness: The Ralph Bakshi Vision for 'The Lord of the Rings'",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
            },
            {
                "adult": false,
                "backdrop_path": "/qNVf39jp9fZSLd1bWMYjOrrEkI2.jpg",
                "genre_ids": [
                    10751,
                    14,
                    16,
                    12,
                    10770
                ],
                "id": 1362,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "The Hobbit",
                "overview": "Bilbo Baggins the Hobbit was just minding his own business, when his occasional visitor Gandalf the Wizard drops in one night. One by one, a whole group of dwarves drop in, and before he knows it, Bilbo has joined their quest to reclaim their kingdom, taken from them by the evil dragon Smaug. The only problem is that Gandalf has told the dwarves that Bilbo is an expert burglar, but he isn't...",
                "popularity": 13.4,
                "poster_path": "/2ohvyMPhvjftLrM6S6Ljr6QrL0u.jpg",
                "release_date": "1977-11-27",
                "title": "The Hobbit",
                "video": false,
                "vote_average": 6.3,
                "vote_count": 219
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [
                    99,
                    10770
                ],
                "id": 573089,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "The Quest Fulfilled: A Director's Vision",
                "overview": "",
                "popularity": 1.591,
                "poster_path": "/mGtbuCLQZ3xI02juytVRXHOQJoD.jpg",
                "release_date": "2003-12-26",
                "title": "The Quest Fulfilled: A Director's Vision",
                "video": false,
                "vote_average": 5.4,
                "vote_count": 4
            },
            {
                "adult": false,
                "backdrop_path": "/fBzwSM5zl4xp9L3rFu1PihmY0vh.jpg",
                "genre_ids": [
                    16,
                    14,
                    12
                ],
                "id": 1361,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "The Return of the King",
                "overview": "Two Hobbits struggle to destroy the Ring in Mount Doom while their friends desperately fight evil Lord Sauron's forces in a final battle.",
                "popularity": 12.407,
                "poster_path": "/4Jt6i7iWSs5I81RPB17Ks5K0N49.jpg",
                "release_date": "1980-05-11",
                "title": "The Return of the King",
                "video": false,
                "vote_average": 6.4,
                "vote_count": 156
            },
            {
                "adult": false,
                "backdrop_path": "/12rwHElCwSXRpLBtDS2Ef5zpol8.jpg",
                "genre_ids": [
                    99
                ],
                "id": 622231,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "The Making of The Fellowship of the Ring",
                "overview": "A behind the scenes documentary from the making of the \"Fellowship of the Ring\"",
                "popularity": 1.839,
                "poster_path": "/8MMx4xLKbiaexJ5anH66s7jVCD7.jpg",
                "release_date": "2006-08-29",
                "title": "The Making of The Fellowship of the Ring",
                "video": false,
                "vote_average": 9.3,
                "vote_count": 3
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [
                    99
                ],
                "id": 622236,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "The Making of The Two Towers",
                "overview": "A behind the scenes documentary from the making of the \"Two Towers\"",
                "popularity": 0.6,
                "poster_path": "/zrcL156wXTcfS3wzziCmr8uessx.jpg",
                "release_date": "2006-08-29",
                "title": "The Making of The Two Towers",
                "video": false,
                "vote_average": 9.3,
                "vote_count": 3
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [
                    99
                ],
                "id": 517834,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "The Making of The Return of the King",
                "overview": "Created by filmmaker Costa Botes (personally selected by Peter Jackson), this documentary uses raw footage to reveal the inside story on how the greatest adventure film franchise was born. Included as a bonus feature with \"The Lord of the Rings: The Return of the King - Limited Edition\".",
                "popularity": 0.853,
                "poster_path": "/QO5OYEHAcB3DUZju3j9mFm1BfF.jpg",
                "release_date": "2006-08-29",
                "title": "The Making of The Return of the King",
                "video": false,
                "vote_average": 8,
                "vote_count": 4
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [
                    99
                ],
                "id": 192349,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Beyond the Movie: The Fellowship of the Ring",
                "overview": "A documentary about the influences on Tolkien, covering in brief his childhood and how he detested the onslaught of industry through the idyllic countryside, moving on to describe his fighting experience from WWI, and closing with a look at the Finnish inspiration for the scholar's self-invented languages of Elfish. In between are interviews with the cast of the films and some clips, by far the most from \"The Fellowship of the Ring\", but a few glimpses of Rohan riders (from \"The Two Towers\") are provided. Also, there are interviews with a range of the filmmakers.",
                "popularity": 2.159,
                "poster_path": "/knCJvfbr4LWNZBkTDlwRdM28PuR.jpg",
                "release_date": "2001-12-23",
                "title": "Beyond the Movie: The Fellowship of the Ring",
                "video": false,
                "vote_average": 5.7,
                "vote_count": 12
            }
        ],
        "total_pages": 2,
        "total_results": 22
    }
    const page2 = {
        "page": page,
        "results": [
            {
                "adult": false,
                "backdrop_path": "/6So1F3UlHkvXwziKabnTLyeUrnA.jpg",
                "genre_ids": [
                    99
                ],
                "id": 218166,
                "media_type": "movie",
                "original_language": "en",
                "original_title": "Beyond the Movie: The Return of the King",
                "overview": "Documentary exploring the parallels between The Return of the King and real events and people in history.",
                "popularity": 0.959,
                "poster_path": "/mVIJapNx0MehdVWgIRlaY0in0XY.jpg",
                "release_date": "2003-12-21",
                "title": "Beyond the Movie: The Return of the King",
                "video": false,
                "vote_average": 7.7,
                "vote_count": 3
            },
            {
                "backdrop_path": "/dVJT32Wou3Cx1XfhijaAloJa2UR.jpg",
                "first_air_date": "1991-04-13",
                "genre_ids": [
                    10762,
                    10765
                ],
                "id": 123034,
                "media_type": "tv",
                "name": "The Keepers",
                "origin_country": [
                    "SU"
                ],
                "original_language": "ru",
                "original_name": "Хранители",
                "overview": "Soviet live-action film adaptation of J. R. R. Tolkien’s The Fellowship of the Ring, aired once in 1991 by Leningrad Television and then thought lost. It was rediscovered in 2021. It includes scenes of Tom Bombadil and the Barrow-wight omitted from Peter Jackson’s Lord of the Rings film trilogy.",
                "popularity": 0.963,
                "poster_path": "/jOTLe14XueFZpy6vKVO28cmtcJB.jpg",
                "vote_average": 9,
                "vote_count": 2
            }
        ],
        "total_pages": 2,
        "total_results": 22
    }

    switch(page) {
        case 1:
            result = initial;
            break;
        case 2:
            result = page2
            break;
        default:
            result = initial;
            break;
    }
    

    

    return {
        data: result,
        isLoading: !result,
        isError: !result,
        currentPage: page,
        totalPages: result.total_pages
    }

}

export const useZeroResult = (keyword: string, page: number = 1) => {
    const result = {
        "page": 1,
        "results": [],
        "total_pages": 0,
        "total_results": 0
    }
    return {
        data: result,
        isLoading: !result,
        isError: !result,
        currentPage: page,
        totalPages: result.total_pages
    }
}