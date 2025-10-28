"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "../styles.css";

export default function CompanyLogin() {
    const router = useRouter();
        
    const goToCompanyLogin = () => router.push("/company/login");
    const goToCompanyRegister = () => router.push("/company/register")
    const goToCompanyHome = () => router.push("/company/home")
    return(
        <div>
            <div className="ribbon"> 
                <img
                    className="ribbonImages"
                    src="/recruitme.png"
                    alt="RecruitMe Logo"
                    onClick={goToCompanyRegister}
                />
            </div>

            <div className="content">
                <h1 className="pageHeading"> Company Login </h1>
                <input 
                    className="inputBox"
                    type="text"
                    placeholder="Username"
                    id="username"
                />
                <input 
                    className="inputBox"
                    type="text"
                    placeholder="Password"
                    id="password"
                />

                {/* Company login will eventually check for valid login info before sending to home page*/}
                <button className="bigButton"
                onClick={goToCompanyHome}> Login! </button>
                <button className="bigButton"
                onClick={goToCompanyRegister}> Register Here </button>
            </div>
        </div>
    )
}