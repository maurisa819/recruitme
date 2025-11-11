'use client'
import React from "react";
import Model from "../../model";
import { useEffect } from "react";

import "../../styles.css";
const axios = require('axios').default;

import { useRouter } from "next/navigation";

export default function Home() {
  const apiUrl = "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/";
  const [model, setModel] = React.useState(new Model([], [], [], []));
  const [redraw, forceRedraw] = React.useState(0);
  const [username, setUsername] = React.useState(""); // holds changes to the username
  const [password, setPassword] = React.useState(""); // holds changes to the password
  const [name, setName] = React.useState(""); // holds changes to the name
  const [skills, setSkills] = React.useState(""); // holds changes to the skills
  const [userID, setUserID] = React.useState(-1); // holds the userID once registered

  const router = useRouter();
  const goToHome = () => router.push('/');

  React.useEffect(() => {
  }, [model, redraw])

  function updateDisplay() {
    forceRedraw(redraw + 1);
  }

  function logout() {
    localStorage.removeItem('userId');
    goToHome();
  }

  function registerApplicant(username: string, password: string, name: string, skills: string) {
    axios.post(apiUrl + "applicant/register", {
        
        "username": username,
        "password": password,
        "name": name,
        "skills": skills

      }).then(function (response : any) {
      console.log(response);
      console.log(response.data.body);
      // store userID in local storage
      if (response.data.body === undefined) {
        alert("Registration failed. Username may be taken.");
        return;
      } else {
        localStorage.setItem('userId', response.data.body);
        // redirect to applicant homepage
        router.push('/applicant/homepage');
      }
    }).catch(function (error : any) {
      console.log(error);
    });
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      let userID = localStorage.getItem('userId');
    }
    setUserID(userID);
  }, 
  []);



  return (
    <div>
        <div className="ribbon">

          <img className="ribbonImages" src="../recruitme.png" alt="RecruitMe Logo" onClick={(e) => goToHome()}></img>

          <button className="ribbonButton">Company? Click here!</button>

          <button className="ribbonButton" onClick={(e) => logout()}>Logout</button>

        </div>

        <div className="content">
        
        
          <img className="mainImage" src="../recruitme.png" alt="RecruitMe Logo" onClick={(e) => goToHome()}></img>
        
          <input className="inputBox" placeholder="Name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
          <input className="inputBox" placeholder="Username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
          <input className="inputBox" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <input className="inputBox" placeholder="Skills (comma separated)" id="skills" value={skills} onChange={(e) => setSkills(e.target.value)}></input>
          <button className="bigButton" onClick={(e) => registerApplicant(username, password, name, skills)}>Register Account</button>

        </div>
    </div>
  );
}
