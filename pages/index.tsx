import React, { useEffect } from "react";
import Main from '../components/Layout/Main/Main';
import InputField from '../components/Form/InputField/InputField';
import SigninBtn from '../components/Button/SignIn/SigninBtn';
import Image from "next/image";
import FaqList from '../components/Faq/FaqList/FaqList';

import { NextPageWithLayout } from './page';
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { faq_list } from '../model/faq';
import { useRouter } from "next/router"
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../app/store/slices/auth";
import { IAuthState } from "../ts/states/auth_state";

import tvframe from "../assets/tvframe.png";
import download from "../assets/download.png";
import iphone from "../assets/iphone.png";
import tablet from "../assets/tablet.png";
import imac from "../assets/IMac_vector.png"; 
import imac_gloss from "../assets/imac_gloss.png"; 

// const tvframe = require("../assets/tvframe.png");
// const download = require("../assets/download.png");
// const iphone = require("../assets/iphone.png");
// const tablet = require("../assets/tablet.png");
// const imac  = require("../assets/IMac_vector.png"); 
// const imac_gloss = require("../assets/imac_gloss.png"); 


const Home: NextPageWithLayout = () => {

  // const [pageIsLoading, setPageIsLoading] = useState(true);
  const user = useAppSelector<IAuthState>(selectAuth);
  const router = useRouter();

  useEffect(() => {   
    if (user && user.accessToken) {
      router.replace("/movies");
    } 
  },[router, user]);
  
  const getStartedHandler = () => {
    router.replace("/register");
  }

  // if (pageIsLoading) return null

  return (
      <div className="flex flex-col items-center justify-start w-full" data-testid="homepage_container">      

          <section className="flex flex-col items-start justify-start w-full h-screen py-20" data-testid="getting_started">
            <div className="flex flex-col items-center justify-center w-full ">
              <div className="text-[3rem] text-center leading-none">All the TV Shows, All the Movies.</div>
              <div className="text-[1.8rem] text-center leading-none">Streamed to You!</div>
              <div className="text-[1.6rem] text-center mt-4">Watch Anywhere, Cancel Anytime</div>
              <div className="flex flex-col w-full mt-10 lg:w-[60%] 2xl:w-[50%]">
                <InputField type="text" label="Email Address" id="email_address" placeholder=" " />
                <SigninBtn title="Get Started" className="flex items-center justify-between py-5 px-5 text-md rounded-md bg-btnprimary text-white
          hover:text-yellow-200 hover:bg-btnhighlight mt-2" onClick={ getStartedHandler } Icon={ChevronDoubleRightIcon} />
              </div>
            </div>            
          </section>
        
          <section className="flex flex-col items-center justify-center w-full p-2 mt-12
            lg:w-[90%]  2xl:w-[70%]"  data-testid="enjoy_your_tv">  
            <div className="flex flex-1 flex-col items-center justify-center w-full
            lg:flex-row">
              <div className="flex-1">
                <h1 className="text-4xl text-center lg:text-left">Enjoy on your TV</h1>
                <p className="mt-4 w-full text-center lg:text-left">Watch from the comfort of your own home. Enjoy thousands of free hit movies, popular TV shows and many many more. </p>
              </div>   
              {/* 664 x452 */}
              <div className="flex items-start justify-center relative mt-12 overflow-hidden lg:w-[50%]"> 
                <Image src={tvframe} loading="lazy" alt="Enjoy on your TV"  className="object-cover w-full absolute"/>
                <video autoPlay muted loop src="/ninja.mp4" className="opacity-80 w-[81%] mt-[5px] absolute h-auto" />            
              </div>

            </div>                 
          </section>
          

          <section className="flex flex-col items-center justify-center w-full p-2 mt-12  lg:flex-row 
          lg:w-[90%]  2xl:w-[70%]"  data-testid="download_and_watch">
            <div className="flex-1">
              <h1 className="text-4xl text-center lg:text-left">Download & Watch</h1>
              <p className="mt-2 w-full text-center lg:text-left">Save your favorite shows to watch offline. </p>
            </div>
            <div className="flex items-center justify-center relative lg:w-[50%]">
              <div className="image-container w-full">
                <Image src={download}  loading="lazy" alt="Download & Watch" className="object-contain !absolute !w-full !h-[unset]" />
              </div>
            </div>
          </section> 

          <section className="flex flex-col items-center justify-center w-full p-2 mt-12 
          lg:w-[90%] 2xl:w-[70%]"  data-testid="stream_anywhere">

            <div className="flex flex-1 flex-col items-center justify-center mb-4">
              <h1 className="text-4xl text-center">Stream Anywhere, Anytime</h1>
              <p className="mt-2 w-full text-center">Unlimited number of devices. Stream your favorite shows on your phone, tablet, laptop and TV!</p>
            </div>

            <div className="flex flex-1 relative items-center justify-center w-full border-0 border-blue-500
            lg:w-[50%]">

                <div className="absolute z-[101] border-0 border-red-500 scale-[.45] hidden 
                lg:block lg:scale-[.6] lg:-bottom-[5rem] lg:-left-[9rem]">
                  <Image src={iphone}  loading="lazy" alt="Stream on your phone" className="object-cover" />
                </div>

                <div className="flex relative flex-col items-start justify-start border-0 border-orange-500 xl:flex-row">                 
                  <div className="image-container absolute w-full">
                    <Image src={imac_gloss}  loading="lazy" alt="Stream on your desktop" className="object-contain z-[101] !absolute !w-full !h-[unset]"/>
                  </div>   
                  <video autoPlay muted loop src="/train.mp4" className="absolute z-[100] w-full h-auto rounded-lg" /> 
                  <div className="image-container">
                    <Image src={imac}  loading="lazy" alt="Stream on your desktop" className="object-contain z-[99] !absolute !w-full !h-[unset]"/>
                  </div>
                </div>

                <div className="absolute z-[102] border-0 border-yellow-500 scale-[.40] hidden
                lg:block lg:scale-[.6]  lg:-bottom-[6rem] lg:-right-[13rem] ">
                  <Image src={tablet}  loading="lazy" alt="Stream on your tablet"  className='object-contain'/>
                </div>

            </div>
          </section>

          <section className="flex flex-col items-center justify-center w-full p-5 mt-12
          lg:w-[90%]"  data-testid="frequently_asked_questions">
            <h1 className="text-4xl text-center">Frequently Asked Questions</h1>
            <FaqList list={faq_list} />
            
          </section>

          

      </div> 
  );
};

export default Home;


Home.getLayout = (page) => {
  const meta = {
    title: "Streaming to you today - Wibix",
    description: "Wibix, streaming entertainment company"
  }
  return (
      <Main seo={meta} showHero={true}>
        {page}   
      </Main>
  );
};