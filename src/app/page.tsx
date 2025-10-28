'use client'
import React from "react";
import Model from "./model";
import "./styles.css";
const axios = require('axios').default;

export default function Home() {

  const [model, setModel] = React.useState(new Model([], [], [], []));
  const [redraw, forceRedraw] = React.useState(0);

  React.useEffect(() => {
  }, [model, redraw])

  function updateDisplay() {
    forceRedraw(redraw + 1);
  }

  function testLambda() {
    axios.post("https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/connectiontest", {
        
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

  return (
    <div>
        <div className="ribbon">

          <img className="ribbonImages" src="../recruitme.png" alt="RecruitMe Logo"></img>

          <button className="ribbonButton">Company? Click here!</button>

        </div>

        <div className="content">
        
        
          <img className="mainImage" src="../recruitme.png" alt="RecruitMe Logo"></img>
        
          <input className="inputBox" placeholder="Username" id="username"></input>
          <input className="inputBox" placeholder="Password" id="password"></input>
          <button className="bigButton">Login</button>
          <button className="bigButton">Register Account</button>

          <button id="lambdaTestButton" className="bigButton" onClick={(e) => testLambda()}>Test Lambda Function</button>
          <div id="changeText">This should change!</div>

        </div>
    </div>
  );
}
