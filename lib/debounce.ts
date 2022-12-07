import React from "react";


export function debounce(callback: (keyword: string, ...args: [any]) => void, delay: number) {
    let timer: NodeJS.Timeout;

    return function (keyword: string, ...args: [any]) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            callback(keyword, ...args)
        }, delay)
    }

}