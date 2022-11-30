import React from "react"
import Head from "next/head";
import { render } from "@testing-library/react";

export interface IHead {
    meta?: {
        title: string,
        description: string
    }
}
const Seo: React.FC<IHead> = ({ meta }) => {

    const defaults = {
        title: "Streaming to you today - Wibix",
        description: "Wibix, streaming entertainment company"
    }
    return (
        <Head>
            <title key="title">{meta ? meta.title : defaults.title }</title>
            <meta key="description" name="description" content={`${meta ? meta.description : defaults.description }`} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default Seo;