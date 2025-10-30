"use client";
import Image from "next/image";
import "./styles.css";
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import Applicant from "@/app/applicant";
import App from "next/app";


export default function ApplicantHome() {
    const router = useRouter();
  
    const goToApplicantHome = () => router.push("/applicant/homepage");
    const goToEditApplicant = () => router.push("/applicant/edit");
    const goToSearchJobs = () => router.push("/applicant/search");
    const goToReviewJobs = () => router.push("/applicant/review");
    const applicantID = localStorage.getItem("userId");
    //console.log("Applicant ID in edit page is ", applicantID);
    
    const [applicantName, setApplicantName] = React.useState("");
    const [applicantSkills, setApplicantSkills] = React.useState("");
    const [applicantUserName, setApplicantUserName] = React.useState("");
    useEffect(() => {
    //const applicantID = localStorage.getItem("userId");
    //console.log("Applicant ID is ", applicantID);

    if (applicantID) {
      fetch(`https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/reviewApplicant?applicantID=${applicantID}`)
        .then(res => res.json())
        .then(data => {
          //console.log("Applicant data:", data);
          if (data.length > 0) {
            setApplicantName(data[0].ApplicantName);
            setApplicantSkills(data[0].ApplicantSkills);
            setApplicantUserName(data[0].ApplicantUsername);
          }
        })
        .catch(err => console.error(err));
    }
  }, []);

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post(
  'https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/reviewApplicant',
  {
    ApplicantID: applicantID,
    ApplicantName: applicantName,
    ApplicantSkills: applicantSkills,
    ApplicantUsername: applicantUserName
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
.then(response => {
  console.log("Update data:", response.data);
})
.catch(error => {
  console.error("Error updating applicant:", error);
});
    }
    catch (errror) {
      console.error("Error in handleSaveChanges:", errror);
    }
  }
   
  return (
    <div>
      {/* Ribbon */}
       <div className="ribbon">

          <img className="ribbonImages" src="../recruitme.png" alt="RecruitMe Logo"></img>

          <button onClick={goToApplicantHome} className="ribbonButton">Home page</button>

          <button onClick={goToSearchJobs} className="ribbonButton">Apply to Jobs</button>

          <button onClick={goToEditApplicant} className="ribbonButton">Edit Profile</button>

          <button onClick={goToReviewJobs} className="ribbonButton">Review Jobs</button>

        </div>
        {/* Want these to populate with the current values if possible */}
      <h1>Applicant Name</h1>
      <input type="text" value={applicantName} className="editInput" onChange={(e) => setApplicantName(e.target.value)}/>
      <br></br>

      <h1>Applicant Username</h1>
      <input type="text" value={applicantUserName} className="editInput" onChange={(e) => setApplicantUserName(e.target.value)}/>
      <br></br>

      <h1>Top 5 Job Skills: Enter skills with a comma seperated list</h1>
      <input type="text" value={applicantSkills} className="editInput" onChange={(e) => setApplicantSkills(e.target.value)}/>
      <br></br>

      
      <button onClick={handleSaveChanges} className="acceptButton">Save Changes</button>
    </div>
  );
}
