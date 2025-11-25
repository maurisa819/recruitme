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

    const goToHome = () => router.push('/');
    function logout() {
      localStorage.removeItem('userId');
      goToHome();
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

          <button className="ribbonButton" onClick={(e) => logout()}>Logout</button>

        </div>
        {/* Applicant name + skills */}
      <h1>Applicant Name</h1>
      <br></br>
      <ol>Top 5 Skills:
          <li>1. Skill</li>
          <li>2. Skill</li>
          <li>3. Skill</li>
          <li>4. Skill</li>
          <li>5. Skill</li>
        </ol>

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
