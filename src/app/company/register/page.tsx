"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../styles.css";
import Model from "@/app/model";
const axios = require('axios').default;



export default function CompanyRegister() {
    const apiURL = "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial"
    const [model, setModel] = useState(new Model([],[],[],[]));

    const [username, setUsername] = useState("");
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [companyID, setCompanyID] = useState(-1)

    const router = useRouter();
    
    const goToCompanyRegister = () => router.push("/company/register");
    const goToCompanyLogin = () => router.push("/company/login");
    
    function logout() {
      localStorage.removeItem('companyID');
      goToCompanyLogin();
    }


    function registerCompany(username: string, name: string, password: string){
      axios.post(apiURL + '/company/register', {
        "name": name,
        "username": username,
        "password": password
      }).then(function (response: any){
        console.log(response);
        console.log(response.data.body);

        const parsedBody = JSON.parse(response.data.body); 

        localStorage.setItem('companyID', parsedBody.id);

        goToCompanyLogin()

      }).catch(function (error: any){
        console.log(error);
      })
    }
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
          let companyID = localStorage.getItem('companyID');
        }
        setCompanyID(companyID);
      }, 
    []); 

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
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="inputBox"
            type="text"
            placeholder="Company Name"
            id="companyName"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="inputBox"
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* For now I have the register company button going straight to the login page, but it should route them there after checking for valid registration once implemented */}
          <button className="bigButton" onClick={(e) => registerCompany(username, name, password)}>Register Account</button>
          <button className="bigButton" onClick={goToCompanyLogin}> Login to Existing Company </button>
        </div>
      </div>

  );
}
