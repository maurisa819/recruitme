'use client'
import React from "react";
import Model from "./model";
import "./styles.css";
const axios = require('axios').default;
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const apiUrl = "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/";
  const [model, setModel] = React.useState(new Model([], [], [], []));
  const [redraw, forceRedraw] = React.useState(0);
  const [username, setUsername] = React.useState(""); // holds changes to the username
  const [password, setPassword] = React.useState(""); // holds changes to the password

  const router = useRouter();
  const goToRegisterApplicant = () => router.push('/applicant/register');
  const goToHome = () => router.push('/');

  React.useEffect(() => {
  }, [model, redraw])

  function updateDisplay() {
    forceRedraw(redraw + 1);
  }

  function testLambda() { // just a test function to see if i could connect to the lambda
    axios.post(apiUrl + "connectiontest", {
        
        "key1": "Hey! It worked!",
        "key2": "value2",
        "key3": "value3"

      }).then(function (response : any) {
      const textToChange = document.getElementById("changeText") as HTMLElement;
      textToChange.innerText = JSON.stringify(response.data);
      console.log(response);
    }).catch(function (error : any) {
      console.log(error);
    });
  }

  function logout() {
    localStorage.removeItem('userId');
    goToHome();
  }

  function registerApplicant(username: string, password: string) {
    axios.post(apiUrl + "registerApplicant", {
        
        "username": username,
        "password": password

      }).then(function (response : any) {
      console.log(response);
    }).catch(function (error : any) {
      console.log(error);
    });
  }

  return (
    <div>
        <div className="ribbon">

          <img className="ribbonImages" src="../recruitme.png" alt="RecruitMe Logo" onClick={(e) => goToHome()}></img>

          <button className="ribbonButton">Company? Click here!</button>

          <button className="ribbonButton" onClick={(e) => logout()}>Logout</button>

        </div>

        <div className="content">
        
        
          <img className="mainImage" src="../recruitme.png" alt="RecruitMe Logo" onClick={(e) => goToHome()}></img>
        
          <input className="inputBox" placeholder="Username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
          <input className="inputBox" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <button className="bigButton">Login</button>
          <button className="bigButton" onClick={(e) => goToRegisterApplicant()}>Register Account</button>

          <button id="lambdaTestButton" className="bigButton" onClick={(e) => testLambda()}>Test Lambda Function</button>
          <div id="changeText">This should change!</div>

        </div>
    </div>
  );
}
