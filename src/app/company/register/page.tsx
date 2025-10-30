"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "../styles.css";

export default function CompanyRegister() {
    const router = useRouter();
    
    const goToCompanyRegister = () => router.push("/company/register");
    const goToCompanyLogin = () => router.push("/company/login")
      
    return (
      <div>
        <div className="ribbon">
          <img
            className="ribbonImages"
            src="/recruitme.png"
            alt="RecruitMe Logo"
            onClick={goToCompanyLogin}
          />
        </div>
        <div className="content">
          <h1 className="pageHeading">Company Registration</h1>
          <input 
            className="inputBox"
            type="text"
            placeholder="Username"
            id="username"
          />

          <input
            className="inputBox"
            type="text"
            placeholder="Company Name"
            id="companyName"
          />

          <input
            className="inputBox"
            type="password"
            placeholder="Password"
            id="password"
          />

          {/* For now I have the register company button going straight to the login page, but it should route them there after checking for valid registration once implemented */}
          <button className="bigButton" onClick={goToCompanyLogin}> Register Company </button>
          <button className="bigButton" onClick={goToCompanyLogin}> Login to Existing Company </button>
        </div>
      </div>

  );
}
