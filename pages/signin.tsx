import SigninBtn from "../components/button/signin/SigninBtn";
import InputField from "../components/layout/Form/InputField/InputField";
import Main from "../components/layout/main/Main";

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { NextPageWithLayout } from "./page";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import googleLogo from "../assets/google_logo.svg";
import Image from "next/image";

import { auth, googleProvider } from "../firebase";

import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithRedirect} from "firebase/auth";


import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAuth, setAuthData } from "../app/store/slices/auth";
import { IAuthState } from "../ts/states/auth_state";

interface SignInErrors {
  error: string;
}

const Signin: NextPageWithLayout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [rememberme, setRememberMe] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [signInErrors, setSignInErrors] = useState<SignInErrors[]>([]);

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
              dispatch(setAuthData({
                id: result.claims.user_id,
                accessToken: result.token,
                expiresAt: result.expirationTime
              }))
          }).finally(() => {
              router.replace("./movies")
          })          
        })
        .catch((error) => {
            setIsSubmitted(false);
            // console.log(error.code);
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
    // const rememberHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    //     setRememberMe(e.target.checked);
    // }

    const createAccountHandler = () => {
        router.push("./register");
    }

    const forgotPasswordHandler = () => {
        router.push("./forgot_password");
    }

    const signInWithGoogleHandler = () => {
      // console.log("sign in with google handler");
      // setSignInErrors([]);
      googleProvider.setCustomParameters({
        prompt: "select_account"
      });

      signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        user.getIdTokenResult()
          .then((result) => {
              dispatch(setAuthData({
                id: result.claims.user_id,
                accessToken: result.token,
                expiresAt: result.expirationTime
              }))
          }).finally(() => {
              router.replace("./movies")
          })
      }).catch((error) => {
        // console.log("google signin error: ", error.code);
        // "auth/popup-closed-by-user"
        // if (error.code === "auth/popup-closed-by-user") {
        //   setSignInErrors([{error: "User closed Google signin window" }]);
        //   return;
        // }     
      });
      
    }

    return (
      <div className="flex flex-col items-center justify-start w-full h-screen
      sm:w-[80%]
      md:w-[70%]
      lg:w-[60%]
      xl:w-[50%]
      2xl:w-[40%]
      ">
        <div className="flex flex-col items-center justify-start w-full">
          <section className="flex flex-col items-center justify-center w-full">
            
            <div className="flex flex-col items-start justify-between p-8 bg-black bg-opacity-60 w-[99%] rounded-lg">
                <h1 className="text-[2rem]
                lg:text-[3rem]
                 ">Sign In</h1>
                <div className="flex flex-1 flex-col items-start justify-start w-full">
                    {
                        signInErrors && signInErrors.length>0 && 
                            <div className="flex flex-col p-3 items-start justify-center w-full rounded-md bg-red-400 mt-4">
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
                            <div className="flex items-center justify-center text-white">
                              <ArrowPathIcon className="w-[25px] h-[25px] animate-spin" />
                              <span className="ml-2">Logging In</span>
                            </div> :
                            <div className="flex items-center justify-center text-white">
                              Sign In
                            </div>
                          }
                        </div>
                    }
                    
                    <div className="flex flex-col items-center justify-center w-full mt-8">
                      <span className="text-gray-500">-or-</span>
                      <button onClick={signInWithGoogleHandler} className="flex items-center justify-center rounded-lg bg-red-900 p-5 w-full mt-2">
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
                    <span className="hover:text-yellow-200 cursor-pointer mt-4 md:mt-0" onClick={forgotPasswordHandler} >Forgot Password</span>
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
      pageTitle: "SignIn",
      pageDescription: "Sign In - Wibix"
    }

    const [pageIsLoading, setPageIsLoading] = useState(true);
    const user = useAppSelector<IAuthState>(selectAuth);
    const router = useRouter();

    useEffect(() => {
      if (user && user.accessToken) {
        router.replace("./movies");
      } else {
        setPageIsLoading(false);
      }
    });

    if (pageIsLoading) return null;

    return (
        <Main meta={meta} showHero={true}>
          {page}   
        </Main>
    );
  };