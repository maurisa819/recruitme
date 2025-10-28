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

        <button className="bigButton"> Register Company </button>
      </div>
    </div>

  );
}
