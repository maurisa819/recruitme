"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "../styles.css";

export default function ReviewApplicants() {
  const router = useRouter();

  const axios = require("axios").default;
  const apiUrl = "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/";

  const [jobName, setJobName] = React.useState("");
  const [jobDesc, setJobDesc] = React.useState("");
  const [reqs, setReqs] = React.useState("");

  const goToCompanyHome = () => router.push("/company/home");
  const goToReviewProfile = () => router.push("/company/review");
  const goToReviewApplicant = () => router.push("/company/applicants");

  function createJob() {
    axios.post(apiUrl + "company/createJob", {
        
        "companyID": localStorage.getItem('companyID'),
        "jobName": jobName,
        "jobDescription": jobDesc,
        "requirements": reqs

      }).then(function (response : any) {
      console.log(response);
      console.log(response.data.body);
      if (response.data.body != "Erorr creating job"){
        alert("Job Created Successfully!");
        router.push('/company/home');
      } else {
        alert("Error creating job. Please try again.");
      }
    }).catch(function (error : any) {
      console.log(error);
    });

  }

  return (
    <div className="company-home">
      <div className="ribbon">
        <img
          className="ribbonImages"
          src="/recruitme.png"
          alt="RecruitMe Logo"
          onClick={goToCompanyHome}
        />
        <div className="ribbon-icons">
          <img
            className="icon-button"
            src="/home.png"
            alt="Home"
            onClick={goToCompanyHome}
          />
          <img
            className="icon-button"
            src="/person.png"
            alt="Review Company Profile"
            onClick={goToReviewProfile}
          />
          <img
            className="icon-button"
            src="/search.png"
            alt="Review Applicants"
            onClick={goToReviewApplicant}
          />
        </div>
      </div>

      <div className="content">
        <h1 className="pageHeading">Create Job</h1>

        <input id="jobName" className="inputBox" type="text" placeholder="Job Title"
        value={jobName} onChange={(e) => setJobName(e.target.value)}></input>
        <input id="jobDescription" className="inputBox" type="text" placeholder="Job Description"
        value={jobDesc} onChange={(e) => setJobDesc(e.target.value)}></input>
        <input id="jobRequirements" className="inputBox" type="text" placeholder="Job Requirements"
        value={reqs} onChange={(e) => setReqs(e.target.value)}></input>
        <button className="bigButton" onClick={(e) => createJob()}>Create Job</button>

      </div>
    </div>
  );
}
