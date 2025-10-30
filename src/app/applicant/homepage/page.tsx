"use client";
import Image from "next/image";
import "./styles.css";
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";


export default function ApplicantHome() {
    const router = useRouter();

    const goToApplicantHome = () => router.push("/applicant/homepage");
    const goToEditApplicant = () => router.push("/applicant/edit");
    const goToSearchJobs = () => router.push("/applicant/search");
    const goToReviewJobs = () => router.push("/applicant/review");
    
    const [applicantName, setApplicantName] = React.useState("");
    const [applicantSkills, setApplicantSkills] = React.useState("");
    const [applicantUserName, setApplicantUserName] = React.useState("");
    useEffect(() => {
    const applicantID = localStorage.getItem("userId");
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
        {/* Applicant name + skills */}
      <h1>{applicantName}</h1>
      <br></br>
      <p>Username: {applicantUserName}</p>
      <p>List of Skills: {applicantSkills}</p>
      

        {/* Job Offers */}
      <section className="jobOffers">
        <h2>Job Offers</h2>
        <ul>
          <li className="jobOfferCard">
            <h3>Software Engineer</h3>
            <p><strong>Company:</strong> Amazon</p>
            <div className="offerButtons">
              <button className="acceptButton">Accept</button>
              <button className="rejectButton">Reject</button>
            </div>
          </li>
        </ul>
      </section>

      {/* Accepted Jobs*/}
      <section className="acceptedOffers">
        <h2>Accepted Offers</h2>
        <ul>
          <li className="acceptedOfferCard">
            <h3>UI Designer</h3>
            <p><strong>Company:</strong> Canonical</p>
          </li>
    
        </ul>
      </section>

      {/* Rejected Jobs*/}
      <section className="acceptedOffers">
        <h2>Rejected Offers</h2>
        <ul>
          <li className="acceptedOfferCard">
            <h3>ELDP Program</h3>
            <p><strong>Company:</strong> BAE Systems</p>
          </li>
    
        </ul>
      </section>

      {/* List of Applied Jobs*/}
      <section className="acceptedOffers">
        <h2>Jobs Applied To </h2>
        <ul>
          <li className="acceptedOfferCard">
            <h3>Software Engineer</h3>
            <p><strong>Company:</strong> Meta </p>
          </li>
    
        </ul>
      </section>
      
      <footer>

        <ol>Notifications:
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
        </ol>
      </footer>
    </div>
  );
}
