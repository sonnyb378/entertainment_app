import SigninBtn from "../components/button/signin/SigninBtn";
import InputField from "../components/layout/Form/InputField/InputField";
import Main from "../components/layout/main/Main";
import { NextPageWithLayout } from "./page";

import { useRouter } from "next/router";
import React, { useState } from "react";

const Signin: NextPageWithLayout = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberme, setRememberMe] = useState(false);

    const signinHandler = () => {
        console.log("sign in handler: ", email, password, rememberme);
    }

    const emailHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const passwordHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const rememberHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked);
    }

    const createAccountHandler = () => {
        router.push("./register");
    }

    const forgotPasswordHandler = () => {
        router.push("./forgot_password");
    }

    return (
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center w-full h-[900px] pb-[10%]">
          <section className="flex flex-col items-center justify-center w-full">
            
            <div className="flex flex-col items-start justify-between p-8 bg-black bg-opacity-60 w-[30%] h-[700px] rounded-lg">
                <h1 className="text-[3rem] my-[2rem]">Sign In</h1>
                <div className="flex flex-1 flex-col items-start justify-start w-full">
                    <InputField type="text" label="Email Address" id="email_address" placeholder=" " onChange={emailHandler} value={email} />
                    <InputField type="password" label="Password" id="password" placeholder=" " onChange={passwordHandler} value={password} />
                    <SigninBtn title="Sign In" className="flex items-center justify-center py-5 px-5 text-2xl rounded-md bg-btnprimary text-white w-full
      hover:text-yellow-200 hover:bg-btnhighlight mt-[2rem]" onClick={signinHandler}  />
                    <div className="flex items-center justify-start w-full mt-4">
                        <InputField type="checkbox" label="remember_me" id="remember_me" placeholder=" " onChange={rememberHandler} />
                        <span className="flex-1 ml-2">Remember Me</span>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <div className="flex items-center justify-center text-2xl mt-4">
                        <span className="tracking-wider">New to Wibix?</span>
                        <span className="text-btnhighlight hover:text-yellow-200 ml-2 cursor-pointer" onClick={createAccountHandler} >Create an Account</span>
                    </div>                   
                    <span className="hover:text-yellow-200 cursor-pointer" onClick={forgotPasswordHandler} >Forgot Password</span>
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
    return (
        <Main meta={meta} showHero={true}>
          {page}   
        </Main>
    );
  };