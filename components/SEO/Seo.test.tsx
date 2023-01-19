import React from "react";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
// import {within} from '@testing-library/dom';

import Seo from "./Seo"

jest.mock("next/head", () => ({
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
        return <>{children}</>;
    }
}))

describe("<Seo />", () => { 

    afterAll(() => {
        jest.clearAllMocks();
    })

    it("must display default metadata", () => {        
        const { debug } = render(<Seo />, {
            container: document.head,
        });     
        // debug()  
        expect(document.title).toBe("Streaming to you today - Wibix");

    })
    it("must display page metadata", () => {
        const meta = {
            title: "SignIn",
            description: "Sign In - Wibix"
        }
        render(<Seo meta={meta}/>, {
            container: document.head,
        });
        expect(document.title).toBe("SignIn");
    })
})