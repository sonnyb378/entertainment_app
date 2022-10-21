import { NextPageWithLayout } from './page';
import Main from '../components/layout/main/Main';
import InputField from '../components/layout/Form/InputField/InputField';
import SigninBtn from '../components/button/signin/SigninBtn';
import { ChevronDoubleRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

import tv from "../assets/tv.png";
import tvframe from "../assets/tvframe.png";
import download from "../assets/download.png";
import iphone from "../assets/iphone.png";
import tablet from "../assets/tablet.png";
import imac from "../assets/IMac_vector.png"; 
import imac_gloss from "../assets/imac_gloss.png"; 

import { faq_list } from '../model/faq';
import FaqList from '../components/faq/list/FaqList';


const Home: NextPageWithLayout = () => {

  const getStartedHandler = () => {
    console.log("get started");
  }

  return (
    <div className="flex flex-col items-center justify-start w-full">
      
      
      <div className="flex flex-col items-center justify-center w-full h-screen pb-[10%]">
        <section className="flex flex-col items-center justify-center w-full">
          <div className="text-[5rem] text-center leading-none">All the TV Shows, All the Movies.</div>
          <div className="text-[4rem] text-center leading-none">Streamed to You!</div>
          <div className="text-[1.8rem] text-center mt-4">Watch Anywhere, Cancel Anytime</div>
          <div className="flex flex-col w-[45%] mt-10">
            <InputField type="text" label="Email Address" id="email_address" placeholder=" " />
            <SigninBtn title="Get Started" className="flex items-center justify-between py-5 px-5 text-md rounded-md bg-btnprimary text-white
      hover:text-yellow-200 hover:bg-btnhighlight mt-2" onClick={getStartedHandler} Icon={ChevronDoubleRightIcon} />
          </div>
        </section>            
      </div>
    

      <section className="flex items-center justify-center w-[100%] p-5">  

        <div className="flex items-center justify-center w-[70%]">
          <div className="flex-1">
            <h1 className="text-5xl">Enjoy on your TV</h1>
            <p className="mt-4 w-[80%]">Watch from the comfort of your own home. Enjoy thousands of free hit movies, popular TV shows and many many more. </p>
          </div>   
          <div className="flex flex-1 items-center justify-center ">
            <Image src={tvframe} alt="Enjoy on your TV"  className="absolute"/>
            <video autoPlay muted loop src="/ninja.mp4" className="opacity-80 w-[490px] ml-3 -mt-[110px] absolute" />            
          </div>
        </div>  
               
      </section>
       

      <section className="flex items-center justify-center w-[70%] p-5 mt-20">
        <div className="flex-1">
          <h1 className="text-5xl">Download & Watch</h1>
          <p className="mt-4 w-[80%]">Save your favorite shows to watch offline. </p>
        </div>
        <div className="flex flex-1 items-center justify-center relative">
          <div className="image-container relative w-[600px] h-[500px]">
            <Image src={download} alt="Download & Watch" layout="fill" className="!relative !w-full !h-[unset]" />
          </div>
        </div>
      </section> 

      <section className="flex flex-col items-center justify-center w-[70%] p-5 mt-12">
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="text-5xl">Stream Anywhere, Anytime</h1>
          <p className="mt-4 w-[80%] text-center">Unlimited number of devices. Stream your favorite shows on your phone, tablet, laptop and TV!</p>
        </div>
        <div className="flex items-end justify-center w-full mt-[3rem]">
            <div className="relative z-[101] left-[120px]">
              <Image src={iphone} alt="Stream on your phone" className="object-contain absolute" />
            </div>

            <div className="flex flex-1 flex-col items-center justify-center relative h-[600px]">    
              
              <div className="image-container">
                <Image src={imac_gloss} alt="Stream on your desktop" className="z-[101] !absolute !w-full !h-[unset]"/>
              </div>   
              <video autoPlay muted loop src="/train.mp4" className="absolute z-[100] -mt-[180px] w-full h-[600px] rounded-lg" /> 
              <div className="image-container">
                <Image src={imac} alt="Stream on your desktop" className="z-[99] !absolute !w-full !h-[unset]"/>
              </div>
            </div>
            <div className="relative z-[102] w-[300px] h-[400px] mb-4 right-[100px]">
              <Image src={tablet} alt="Stream on your tablet" layout="fill" className='object-contain absolute'/>
            </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-[50%] p-5 mt-[200px]">
        <h1 className="text-5xl">Frequently Asked Questions</h1>
        <FaqList list={faq_list} />
        
      </section>

       

    </div>  
  
    
  );
};

export default Home;


Home.getLayout = (page) => {
  const meta = {
    pageTitle: "Streaming to you today - Wibix",
    pageDescription: "Wibix, streaming entertainment company"
  }
  return (
      <Main meta={meta} showHero={true}>
        {page}   
      </Main>
  );
};