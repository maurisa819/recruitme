"use client";
import Image from "next/image";
import "./styles.css";
import { useRouter } from "next/navigation";
import React from "react";


export default function ApplicantHome() {
    const router = useRouter();
  
    const goToApplicantHome = () => router.push("/applicant/homepage");
    const goToEditApplicant = () => router.push("/applicant/edit");
    const goToSearchJobs = () => router.push("/applicant/search");
    const goToReviewJobs = () => router.push("/applicant/review");
  
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
      <input type="text" placeholder="Edit Name Here" className="editInput"/>
      <br></br>

      <h1>Top 5 Job Skills</h1>
      <input type="text" placeholder="Place comma seperate list of skills" className="editInput"/>
      <br></br>

      <h1>Applicant Description</h1>
      <input type="text" placeholder="Edit Description Here" className="editInputLarge"/>
      <br></br>
      <button className="acceptButton">Save Changes</button>
    </div>
  );
}
