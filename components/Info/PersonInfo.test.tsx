import { render, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import PersonInfo, { calculateAge } from './PersonInfo'

describe("<PersonInfo />", () => {

    it("must render PersonInfo (Known For)", () => {
        const data = {
            known_for_department: "Acting",
        }
        const { container } = render(<PersonInfo title="Known For" separator=":" value={data.known_for_department} />)
        const person_info = within(container).getByTestId("personinfo_container")
        expect(person_info).toBeInTheDocument();

        const title = within(person_info).getByText("Known For:")
        expect(title).toBeInTheDocument();
    })

    it("must render PersonInfo (Gender)", () => {
        const data = {
            gender: 1,
        }
        const { container } = render(<PersonInfo title="Gender" separator=":" value={data.gender} />)
        const person_info = within(container).getByTestId("personinfo_container")
        expect(person_info).toBeInTheDocument();

        const gender = within(person_info).getByText("Female")
        expect(gender).toBeInTheDocument();
    })

    it("must render PersonInfo (Birthday)", () => {
        const data = {
            birthday: "1975-06-04",
        }
        const { container } = render(<PersonInfo title="Birthday" separator=":" value={data.birthday} />)
        const person_info = within(container).getByTestId("personinfo_container")
        expect(person_info).toBeInTheDocument();

        const displayValue = `${data.birthday} (${calculateAge(data.birthday)} years old)`

        const bday = within(person_info).getByText(displayValue)
        expect(bday).toBeInTheDocument();
    })

    it("must render PersonInfo (Place of Birth)", () => {
        const data = {
            place_of_birth: "Los Angeles, California, USA ",
        }
        const { container } = render(<PersonInfo title="Place of Birth" separator=":" value={data.place_of_birth} />)
        const person_info = within(container).getByTestId("personinfo_container")
        expect(person_info).toBeInTheDocument();

        const pob = within(person_info).getByText("Los Angeles, California, USA")
        expect(pob).toBeInTheDocument();
    })

    it("must render PersonInfo (Also known as)", () => {
        const data = {
            also_known_as: [
                "Анджелина Джоли",
                "Angelina Jolie-Pitt",
                "安吉丽娜·朱莉",
                "アンジェリーナ・ジョリー",
                "แอนเจลีนา โจลี",
                "안젤리나 졸리",
                "أنجلينا جولي",
                "Анджеліна Джолі",
                "Angelina Jolie Voight",
                "ანჯელინა ჯოლი",
                "Αντζελίνα Τζολί",
                "Angelina Voight",
                "安祖蓮娜·祖莉",
                "എയ്‌ഞ്ചലിന ജോളി "
            ],
        }
        const { container } = render(<PersonInfo title="Place of Birth" separator=":" value={data.also_known_as} />)
        const person_info = within(container).getByTestId("personinfo_container")
        expect(person_info).toBeInTheDocument();

        const aka = within(person_info).getByText("Angelina Jolie-Pitt")
        expect(aka).toBeInTheDocument();
    })

})