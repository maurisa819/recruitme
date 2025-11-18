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
    const goToHome = () => router.push('/');
    
    const [applicantName, setApplicantName] = React.useState("");
    const [applicantSkills, setApplicantSkills] = React.useState("");
    const [applicantUserName, setApplicantUserName] = React.useState("");

    // For the jobs that the applicant has applied to
    const [jobsApplied, setJobsApplied] = React.useState<
  Array<{ JobTitle: string; CompanyName: string; ApplicationStatus: string }>
>([]);



    function logout() {
      localStorage.removeItem('userId');
      goToHome();
    }

    useEffect(() => {
    const applicantID = localStorage.getItem("userId");
    //console.log("Applicant ID is ", applicantID);
      if (!applicantID) {
        router.push("/applicant/login");
      }

    fetch(
      `https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/reviewApplicant?applicantID=${applicantID}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const applicant = data[0];
          setApplicantName(applicant.ApplicantName);
          setApplicantSkills(applicant.ApplicantSkills);
          setApplicantUserName(applicant.ApplicantUsername);
        }
      })
      .catch((err) => console.error("Error fetching applicant info:", err));

    // finding the jobs that have been applied to
    fetch(
      `https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/applicant/getJobApplied?applicantID=${applicantID}`
    )
      .then((res) => res.json())
      .then((data) => {
        setJobsApplied(data);
        console.log("Jobs applied to data:", data);
      })
      .catch((err) => console.error("Error fetching applied jobs:", err));
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

          <button className="ribbonButton" onClick={(e) => logout()}>Logout</button>

        </div>
        <div className="applicant-title">
        <h1>Applicant Homepage</h1>
        </div>
        {/* Applicant name + skills */}
      <div className="applicant-info">
      <h1>Welcome {applicantName}!</h1>
      <br></br>
      <p>Username: {applicantUserName}</p>
      <p>List of Skills: {applicantSkills}</p>
      </div>

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
          {jobsApplied.length > 0 ? (
            jobsApplied.map((job, index) => (
              <li key={index} className="acceptedOfferCard">
                <h3>{job.JobTitle}</h3>
                <p>
                  <strong>Company:</strong> {job.CompanyName}
                </p>
          </li>
            ))
          ) : (
            <li> Have not applied to any jobs </li>
          )}
    
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
