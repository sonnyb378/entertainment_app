export const isMobile = () => {
    // let details = navigator.userAgent;
    // let regexp = /android|iphone|kindle|ipad/i;
    // return regexp.test(details)

    if ("maxTouchPoints" in navigator) {
       return navigator.maxTouchPoints > 0;
    } 
    return false;
}