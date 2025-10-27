'use client'
import React from "react";
import Model from "./model";
import "./styles.css";

export default function Home() {

  const [model, setModel] = React.useState(new Model([], [], [], []));
  const [redraw, forceRedraw] = React.useState(0);

  React.useEffect(() => {
  }, [model, redraw])

  function updateDisplay() {
    forceRedraw(redraw + 1);
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



        </div>
    </div>
  );
}
