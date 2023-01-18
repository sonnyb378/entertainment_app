export const fadeScreen = (videoWillPlay:boolean, callback:()=>void) => {
   if (videoWillPlay) {
      if (typeof window !== 'undefined') {
        const mainComponent = document.getElementById("main_component");
        mainComponent!.style.scale = "105%";
        mainComponent!.style.opacity = "0";
        mainComponent!.style.transition = "all 1s";
        mainComponent!.style.overflow = "hidden";
      }
      setTimeout(() => {
        callback()
      }, 1000)
    }
}