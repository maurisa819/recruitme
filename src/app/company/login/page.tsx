"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../styles.css";

const axios = require('axios').default

const apiURL = "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/login"

export default function CompanyLogin() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [companyID, setCompanyID] = useState(-1);
    const goToCompanyLogin = () => router.push("/company/login");
    const goToCompanyRegister = () => router.push("/company/register")
    const goToCompanyHome = () => router.push("/company/home")
    const goToApplicantLogin = () => router.push("/")
    
    function loginCompany(username: string, password: string) {
        axios.post(apiURL, {
            "username": username,
            "password": password
        }).then(function(response : any) {
            console.log(response);
            console.log(response);
            
            const parsedBody = JSON.parse(response.data.body); 
            console.log(parsedBody)
            localStorage.setItem('companyID', parsedBody);

            goToCompanyHome();
        }).catch(function (error: any){
            console.log(error)
        })
    }

    useEffect(() => {
            if (typeof window !== 'undefined' && window.localStorage) {
              let companyID = localStorage.getItem('companyID');
            }
            setCompanyID(companyID);
          }, 
        []); 


    return(
        <div>
            <div className="ribbon"> 
                <img
                    className="ribbonImages"
                    src="/recruitme.png"
                    alt="RecruitMe Logo"
                    onClick={goToApplicantLogin}
                />
            </div>

            <div className="content">
                <h1 className="pageHeading"> Company Login </h1>
                <input 
                    className="inputBox"
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    className="inputBox"
                    type="text"
                    placeholder="Password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Company login will eventually check for valid login info before sending to home page*/}
                <button className="bigButton"
                onClick={(e) => loginCompany(username, password)}> Login! </button>
                <button className="bigButton"
                onClick={goToCompanyRegister}> Register Here </button>
            </div>
        </div>
    )
}