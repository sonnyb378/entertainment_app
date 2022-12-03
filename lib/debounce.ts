import React from "react";


export function debounce(callback: (...args: [any]) => void, delay: number) {
    let timer: NodeJS.Timeout;

    return function (...args: [any]) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            callback(...args)
        }, delay)
    }

}