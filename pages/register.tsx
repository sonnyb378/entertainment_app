import React, { useEffect, useState } from "react";
import SigninBtn from "../components/Button/SignIn/SigninBtn";
import InputField from "../components/Form/InputField/InputField";
import Main from "../components/Layout/Main/Main";

import { NextPageWithLayout } from "./page";
import { useRouter } from "next/router";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { GetServerSideProps } from "next";

import nookies, { parseCookies } from "nookies"
// import { setCookie } from "nookies";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { selectAuth } from "../app/store/slices/auth";
// import { IAuthState } from "../ts/states/auth_state";

interface IError {
    error: string;
}
const Register: NextPageWithLayout = () => {

    const COOKIES_MAX_AGE = 60 * 60 * 24 * 30;
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    
    const [isRedirecting, setIsRedirecting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [registerErrors, setRegisterErrors] = useState<IError[]>([]);


    const cookies = parseCookies()

    useEffect(() => {
        if (isRedirecting) {
          return;
        }
        if (!loading && user && cookies.token) {
          router.replace("/movies")
          setIsRedirecting(true)
        }
      }, [user])


    const signupHandler = async () => {
        let registerOk = true;
        setIsSubmitted(true);
        setRegisterErrors([]);
        if (email === "") {
            setRegisterErrors((prevState) => [...prevState, {
                error: "Please enter an email address"
            }])
            registerOk = false;
        } else if (email !== confirmEmail) {
            setRegisterErrors((prevState) => [...prevState, {
                error: "Please confirm email address"
            }])
            registerOk = false;
        }

        if (password === "") {
            setRegisterErrors((prevState) => [...prevState, {
                error: "Please enter password"
            }])
            registerOk = false;
        } else if (password !== confirmPassword) {
            setRegisterErrors((prevState) => [...prevState, {
                error: "Please confirm password"
            }])
            registerOk = false;
        }

        if (registerOk) {

            setRegisterErrors((prevState) => [...prevState, {
                error: "Registration disabled"
            }])

            // delay registration
            setTimeout(() => {
                setIsSubmitted(false);
                setRegisterErrors([]);
            }, 2000)

            /*
                Uncomment code below to run registration 
                *** START ***
            */

            // const result = await createUserWithEmailAndPassword(auth, email, password)
            // .then((userCredential) => {
            //     return userCredential.user.getIdTokenResult();
            // })
            // .then((user: any) => {
            //     return user
            // })
            // .catch((error) => {
            //     console.log("error code: ", error.code);
            //     console.log("error code: ", error.message);
            //     setIsSubmitted(false);
            //     if (error.code === "auth/email-already-in-use") {
            //         setRegisterErrors([{ error: "Email address already in use!" }]);
            //         return;
            //     } else if (error.code === "auth/weak-password") {
            //         setRegisterErrors([{ error: "Password should be at least 6 characters" }]);
            //         return;
            //     } else if (error.code) {
            //         setRegisterErrors([{ error: "An error occured while registering account" }]);
            //         return;
            //     }
            //     setRegisterErrors([{ error: "All fields are required" }]);
            // })

            // if (result.token) {
            //     setIsSubmitted(false);
            //     setCookie(undefined, 'token', result.token, { maxAge:COOKIES_MAX_AGE, path: '/' });
            // }

            /*
                *** END ***
            */
           
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

    const confirmEmailHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setConfirmEmail(e.target.value);
    }
    const confirmPasswordHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }


    const signInAccountHandler = () => {
        router.push("./signin");
    }

    
    return (
      <div className="flex flex-col items-center justify-start w-full 
      sm:w-[80%]
      md:w-[70%]
      lg:w-[60%]
      xl:w-[50%]
      2xl:w-[40%]"
      data-testid="register_container">
        <div className="flex flex-col items-center justify-start w-full p-0 border-0">
          <section className="flex flex-col items-center justify-center w-full">
            {
                <section className="hidden flex-col items-start justify-center p-4 border border-red-500 bg-black bg-opacity-70 mt-4 mb-6 text-btnhighlight w-[99%]">
                    <div>Registration disabled.</div> 
                    <div className="">
                        <span className="text-slate-400 font-bold mr-1">
                            <a target="_blank" href="https://github.com/sonnyb378/entertainment_app/blob/main/pages/register.tsx" rel="noopener noreferrer">
                                Check this github
                            </a>
                        </span>
                        for complete registration code
                    </div>
                </section>
            }
            
            <div className="flex flex-col items-start justify-between p-8 bg-black bg-opacity-60 w-[99%] rounded-lg mt-[20px]">
                <h1 className="text-[1.3rem] 
                lg:text-[3rem]">Sign Up</h1>
                <div className="flex flex-col items-start justify-start w-full">
                    {
                        registerErrors && registerErrors.length>0 && 
                            <div className="flex flex-col p-3 items-start justify-center w-full rounded-md bg-red-400 mt-4" data-testid="error_message">
                                {
                                     registerErrors.map((error) => {
                                        return (
                                            <div key={error.error} className="text-stone-100">{error.error}</div>
                                        )
                                    })
                                }
                            </div>
                       
                    }
                    <InputField type="text" label="Email Address" id="email_address" placeholder=" " onChange={emailHandler} value={email} />
                    <InputField type="text" label="Confirm Email Address" id="confirm_email_address" placeholder=" " onChange={confirmEmailHandler} value={confirmEmail} />
                    <InputField type="password" label="Password" id="password" placeholder=" " onChange={passwordHandler} value={password} />
                    <InputField type="password" label="Confirm Password" id="confirm_password" placeholder=" " onChange={confirmPasswordHandler} value={confirmPassword} />
                    {
                        !isSubmitted && email && confirmEmail && password && confirmPassword ?

                        <SigninBtn title="Sign Up" className="flex items-center justify-center py-[15px] px-5 text-xl rounded-md bg-btnprimary text-white w-full
                        sm:py-5 sm:text-2xl
                        hover:text-yellow-200 hover:bg-btnhighlight mt-[2rem]" onClick={signupHandler}  />
                        :
                        <div title="Sign Up" className={`flex items-center justify-center py-[15px] px-5 text-xl rounded-md bg-gray-500 text-btnprimary w-full
                        mt-[2rem]
                        sm:text-2xl
                        `}>
                            {
                            isSubmitted ?
                                <div className="flex items-center justify-center text-white"  data-testid="spinning_component">
                                    <ArrowPathIcon className="w-[25px] h-[25px] animate-spin" />
                                    <span className="ml-2">Creating your account...</span>
                                </div> :
                                <div className="flex items-center justify-center text-white" >
                                    Sign Up
                                </div>
                             }
                        </div>
                    }
                   
                    
                </div>
                <div className="flex flex-1 flex-col items-start justify-center my-6
                md:flex-row md:justify-between md:items-start">
                    <div className="flex flex-col items-start justify-center text-xl w-full md:flex-row">
                        <span className="tracking-wider">Already have an account?</span>
                        <button 
                            className="text-btnhighlight hover:text-yellow-200 ml-0 cursor-pointer md:ml-2 md:mt-0" 
                            onClick={signInAccountHandler} 
                            data-testid="signinhere_button"
                            >
                                Sign In here
                        </button>
                    </div>  
                </div>
            </div>
            
          </section>            
        </div>
        
  
      </div>  
    
      
    );
  };
  
  export default Register;
  
  
  Register.getLayout = (page) => {
    const meta = {
      title: "SignUp",
      description: "Sign Up - Wibix"
    }

    return (
        <Main seo={meta} showHero={false}>
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
            props: {}
          }
    }

    

  }
