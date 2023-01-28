import React, { useEffect, useState } from "react";
import SigninBtn from "../components/Button/SignIn/SigninBtn";
import InputField from "../components/Form/InputField/InputField";
import Main from "../components/Layout/Main/Main";
import Image from "next/image";

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { NextPageWithLayout } from "./page";
import { useRouter } from "next/router";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GetServerSideProps } from "next";

import googleLogo from "../assets/google_logo.svg";
import { useAuthState } from "react-firebase-hooks/auth";

import nookies, {parseCookies, setCookie} from "nookies"

interface SignInErrors {
  error: string;
}

const Signin: NextPageWithLayout = (props) => {

    const COOKIES_MAX_AGE = 60 * 60 * 24 * 30; // 30days
    const [user, loading] = useAuthState(auth);
    
    const router = useRouter();
    
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState("demo@demo.com");
    const [password, setPassword] = useState("demodemo");
    const [signInErrors, setSignInErrors] = useState<SignInErrors[]>([]);

    const cookies = parseCookies()
    
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const mainComponent = document.getElementById("main_component") as HTMLElement;
        if (mainComponent) {
          mainComponent.style.scale = "100%";
          mainComponent.style.opacity = "100";
          mainComponent.style.transition = "all 1s";
          mainComponent.style.overflow = "hidden";
        }       
      }
      if (isRedirecting) {
        return;
      }
      if (!loading && user && cookies.token) {
        router.replace("/movies")
        setIsRedirecting(true)
      }
    }, [user])


    const signinHandler = () => {
      let signInOk = true; 
      setIsSubmitted(true);
      setSignInErrors([]);
 
      if (email === "") {
        setSignInErrors((old) => {
          return [...old, {
           error: "Email is required"
          }]
        });
        signInOk = false;
      }
      if (password === "") {
        setSignInErrors((old) => {
          return [...old, {
            error: "Password is required"
          }]
        });
        signInOk = false;
      }
           

      if (signInOk) {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          user.getIdTokenResult()
          .then((result) => {
              setIsSubmitted(false);
              setCookie(undefined, 'token', result.token, { maxAge:COOKIES_MAX_AGE, path: '/' });
          })       
        })
        .catch((error) => {
            setIsSubmitted(false);
            if (error.code === "auth/user-not-found") {
              setSignInErrors([{error: "User does not exist! Please try again" }]);
              return;
            }      
            // auth/invalid-email
            setSignInErrors([{error: "Please check your email and password" }]);
        });

      } else {        
        setIsSubmitted(false);
      }       
    }
    const emailHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const passwordHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const createAccountHandler = () => {
        router.push("./register");
    }
    const signInWithGoogleHandler = async () => {
      // console.log("sign in with google handler");
      // setSignInErrors([]);

      googleProvider.setCustomParameters({
        prompt: "select_account"
      });

      const result = await signInWithPopup(auth, googleProvider)
        .then((userData) => {          
          return userData.user.getIdTokenResult();        
        }).then((user:any) => {          
          return user;
        }).catch((e) => {
        })

      if (!result) return;

      if (result.token) {
        setCookie(undefined, 'token', result.token, { maxAge:COOKIES_MAX_AGE, path: '/' });
      }

      
    }


    return (
      <div className={`flex flex-col items-center justify-start w-full h-screen
      sm:w-[80%]
      md:w-[70%]
      lg:w-[60%]
      xl:w-[50%]
      2xl:w-[40%]
      `}
      data-testid="signin_container">
        <div className="flex flex-col items-center justify-start w-full">
          <section className="flex flex-col items-center justify-center w-full">
            
            <div className="flex flex-col items-start justify-between p-8 bg-black bg-opacity-60 w-[99%] rounded-lg">
                <h1 className="text-[2rem]
                lg:text-[3rem]
                 ">Sign In</h1>
                <div className="flex flex-1 flex-col items-start justify-start w-full">
                    {
                        signInErrors && signInErrors.length > 0 && 
                            <div className="flex flex-col p-3 items-start justify-center w-full rounded-md bg-red-400 mt-4" data-testid="error_message">
                                {
                                     signInErrors.map((error) => {
                                        return (
                                            <div key={error.error} className="text-stone-100">{error.error}</div>
                                        )
                                    })
                                }
                            </div>
                    }
                    <InputField type="text" label="Email Address" id="email_address" placeholder=" " onChange={emailHandler} value={email} />
                    <InputField type="password" label="Password" id="password" placeholder=" " onChange={passwordHandler} value={password} /> 

                    {
                      !isSubmitted && email && password ?

                      <SigninBtn title="Sign In" className={`flex items-center justify-center py-5 px-5 text-2xl rounded-md bg-btnprimary text-white w-full
                      hover:text-yellow-200 hover:bg-btnhighlight mt-[2rem]`} onClick={signinHandler}  />
                      :
                      <div title="Sign In" className={`flex items-center justify-center py-5 px-5 text-2xl rounded-md bg-gray-500 text-btnprimary w-full
                        mt-[2rem]`} >
                          {
                            isSubmitted ?
                              <div className="flex items-center justify-center text-white" data-testid="spinning_component">
                                <ArrowPathIcon className="w-[25px] h-[25px] animate-spin" />
                                <span className="ml-2">Logging In</span>
                              </div> 
                            :
                              <div className="flex items-center justify-center text-white">
                                Sign In
                              </div>
                          }
                        </div>
                    }
                    
                    <div className="flex flex-col items-center justify-center w-full mt-8">
                      <span className="text-gray-500">-or-</span>
                      <button data-testid="google_signin" onClick={signInWithGoogleHandler} className="flex items-center justify-center rounded-lg bg-red-900 p-5 w-full mt-2">
                        <Image src={googleLogo} alt="Google" className="object-contain"/>
                        <span className="ml-2" >Sign In with Google</span>
                      </button>
                    </div>
                </div>
               
                <div className="flex  flex-col items-start justify-center w-full my-6
                md:flex-row md:justify-between md:items-center">
                    <div className="flex flex-col items-start justify-between text-xl md:flex-row">
                        <span className="tracking-wider">New to Wibix?</span>
                        <span className="text-btnhighlight ml-0 md:ml-2 hover:text-yellow-200 cursor-pointer" onClick={createAccountHandler} >Create an Account</span>
                    </div>                   
                    
                </div>


            </div>
            
          </section>            
        </div>
      </div>  
    
      
    );
  };
  
  export default Signin;
  
  
  Signin.getLayout = (page) => {
    const meta = {
      title: "SignIn",
      description: "Sign In - Wibix"
    }
    return (
        <Main seo={meta} showHero={true}>
          {page}   
        </Main>
    );
  };


  export const getServerSideProps: GetServerSideProps = async (context:any) => {

    const cookies = nookies.get(context)

    if (cookies.token) {
      return {
        redirect: {
          destination: '/movies',
          permanent: false,
        },
      }
    } else {
      return {
        props: {
          token: cookies.token || null 
        }
      }
    }


  }
