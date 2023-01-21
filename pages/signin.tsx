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
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAuth, setAuthData } from "../app/store/slices/auth";
import { IAuthState } from "../ts/states/auth_state";

import googleLogo from "../assets/google_logo.svg";

interface SignInErrors {
  error: string;
}

const Signin: NextPageWithLayout = () => {
    const user = useAppSelector<IAuthState>(selectAuth);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState("demo@demo.com");
    const [password, setPassword] = useState("demodemo");
    const [signInErrors, setSignInErrors] = useState<SignInErrors[]>([]);

    // const [rememberme, setRememberMe] = useState(false);

    useEffect(() => {
      if (user && user.accessToken) {
            router.replace("/movies");
          }
    },[router, user])

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
              }));
          }).finally(() => {
              router.replace("./movies")
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
        }).catch(() => {

        })

      if (result.token) {
          dispatch(setAuthData({
            id: result.claims.user_id,
            accessToken: result.token,
            expiresAt: result.expirationTime
          }));
          router.replace("./movies")
      }

      
    }

    return (
      <div className="flex flex-col items-center justify-start w-full h-screen
      sm:w-[80%]
      md:w-[70%]
      lg:w-[60%]
      xl:w-[50%]
      2xl:w-[40%]
      "
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
                            </div> :
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