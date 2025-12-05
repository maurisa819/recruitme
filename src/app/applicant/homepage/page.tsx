"use client";
import Image from "next/image";
import "./styles.css";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from 'axios';

// had an error with a type error on job 
type JobOffer = {
  ApplicationID: number;
  JobID: number;
  JobTitle: string;
  CompanyName: string;
  ApplicationStatus: string; 
};

export default function ApplicantHome() {
  const router = useRouter();

  const goToApplicantHome = () => router.push("/applicant/homepage");
  const goToEditApplicant = () => router.push("/applicant/edit");
  const goToSearchJobs = () => router.push("/applicant/search");
  // const goToReviewJobs = () => router.push("/applicant/review");
  const goToHome = () => router.push('/');

  const [applicantName, setApplicantName] = React.useState("");
  const [applicantSkills, setApplicantSkills] = React.useState("");
  const [applicantUserName, setApplicantUserName] = React.useState("");
  const [applicantID, setApplicantID] = React.useState<string | null>(null);  

  // For the jobs that the applicant has applied to
  const [jobsApplied, setJobsApplied] = useState<
    Array<{ JobID: number; JobTitle: string; CompanyName: string; ApplicationStatus: string }>
  >([]);

  const [jobsOffers, setJobsOffers] = useState<
  Array<{ApplicationID: number; JobID: number; JobTitle: string; CompanyName: string; ApplicationStatus: string;}>
>([]);

const [acceptedJobsOffers, setAcceptedJobsOffers] = useState<JobOffer[]>([]);
const [deniedJobsOffers, setDeniedJobsOffers] = useState<JobOffer[]>([]);

  const WITHDRAW_API_URL = "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/applicant/withdrawlApplication";
  const ACCEPT_OFFER_API_URL = "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/applicant/acceptJob";
  const REJECT_OFFER_API_URL = "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/applicant/rejectJob";




   useEffect(() => {
    const id = localStorage.getItem("userId");
    setApplicantID(id);
  }, []);

  function logout() {
    localStorage.removeItem('userId');
    goToHome();
  }

  useEffect(() => {
    const applicantID = localStorage.getItem("userId");
    //console.log("Applicant ID is ", applicantID);
    
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

    // finding the job offers for the applicant
    fetch ( `https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/applicant/applicantJobOffers?applicantID=${applicantID}`)  
    .then((res) => res.json())
    .then((data) => {
      setJobsOffers(data);
      setAcceptedJobsOffers(data.filter((job : JobOffer) => job.ApplicationStatus === "Accepted"));
      setDeniedJobsOffers(data.filter((job : JobOffer)  => job.ApplicationStatus === "Rejected"));
      console.log("Job offers data:", data);
    })
    .catch((err) => console.error("Error fetching job offers:", err));
  }, []);

  // runs the post request to withdraw application
  const withdrawApplication = async (jobID: number) => {

    try {
      const response = await axios.post(
        WITHDRAW_API_URL,
        {
          applicantID: applicantID,
          jobID: jobID
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // copied the previous fetch to referesh after deletion
      fetch(
      `https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/applicant/getJobApplied?applicationId=${applicantID}`
    )
      .then((res) => res.json())
      .then((data) => {
        setJobsApplied(data);
        console.log("Jobs applied to data:", data);
      })
      .catch((err) => console.error("Error fetching applied jobs:", err));
    } catch (error: any) {
      console.error("Error withdrawing application:", error);
    }

  };

  const refreshAccepted = async (applicantID: number) => {
  try {
    fetch ( `https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/applicant/applicantJobOffers?applicantID=${applicantID}`)  
    .then((res) => res.json())
    .then((data) => {
      setJobsOffers(data);
      setAcceptedJobsOffers(data.filter((job : JobOffer) => job.ApplicationStatus === "Accepted"));
      setDeniedJobsOffers(data.filter((job : JobOffer)  => job.ApplicationStatus === "Rejected"));
      console.log("Job offers data:", data);
    })
  } catch (err) {
    console.error("Error fetching jobs:", err);
  }
};

// const refreshRejected = async (applicantID: number) => {
//   try {
//     const res = await fetch(
//       `${REJECTED_JOBS_API_URL}?applicantID=${applicantID}`
//     );
    
//     const data = await res.json();
//     setDeniedJobsOffers(Array.isArray(data) ? data : []);
//     console.log("Rejected jobs:", data);
//   } catch (err) {
//     console.error("Error fetching rejected jobs:", err);
//     setDeniedJobsOffers([]);
//   }
// };




  // runs the post request to accept an offer 
  const acceptOffer = async (applicationId: number, jobId: number, applicantID:number) => {

    try {
      const response = await axios.post(
        ACCEPT_OFFER_API_URL,
        {
          applicationId: applicationId,
          jobId: jobId
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await refreshAccepted(applicantID);
      // await refreshRejected(applicantID);

    } catch (error: any) {
      console.error("Error accepting offer:", error);
    }
  };

  // runs the post request to reject an offer 
  const rejectOffer = async (applicationId: number, jobId: number, applicantID : number) => {

    try {
      const response = await axios.post(
        REJECT_OFFER_API_URL,
        {
        applicationId: applicationId, 
        jobId: jobId
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // need to make a new get request for the offers
      // copied the previous fetch to referesh after deletion
      await refreshAccepted(applicantID);
      // await refreshRejected(applicantID);

    } catch (error: any) {
      console.error("Error accepting offer:", error);
    }
  };



      
      return (
        <div>
          {/* Ribbon */}
          <div className="ribbon">

            <img className="ribbonImages" src="../recruitme.png" alt="RecruitMe Logo"></img>

            <button onClick={goToApplicantHome} className="ribbonButton">Home page</button>

            <button onClick={goToSearchJobs} className="ribbonButton">Apply to Jobs</button>

            <button onClick={goToEditApplicant} className="ribbonButton">Edit Profile</button>

            {/* <button onClick={goToReviewJobs} className="ribbonButton">Review Jobs</button> */}

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
              {jobsOffers.length > 0 ? (
                jobsOffers.map((job, index) => (
                  <li key={index} className="jobOfferCard">
                    <h3>{job.JobTitle}</h3>
                    <p>
                      <strong>Company:</strong> {job.CompanyName}
                    </p>
                    <button
                      style={{
                        backgroundColor: "#1976d2",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      // need to actually implement accept offer function
                      onClick={() => acceptOffer(job.ApplicationID, job.JobID, Number(applicantID))}
                    >
                      Accept
                    </button>
                    <button
                      style={{
                        backgroundColor: "#1976d2",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      // need to actually implement reject offer function
                      onClick={() => rejectOffer(job.ApplicationID, job.JobID, Number(applicantID))}
                    >
                      Reject
                    </button>
                  </li>
                ))
              ) : (
                <li> No job offers found </li>
              )}
            </ul>
          </section>

          {/* Accepted Jobs*/}
          <section className="acceptedOffers">
            <h2>Accepted Offers</h2>
            <ul>
              {acceptedJobsOffers.length > 0 ? (
                acceptedJobsOffers.map((job, index) => (
                  <li key={index} className="acceptedOfferCard">
                    <h3>{job.JobTitle}</h3>
                    <p><strong>Company:</strong> {job.CompanyName}</p>
                  </li>
                ))
              ) : (
                <li>No accepted jobs.</li>
              )}
            </ul>
          </section>

          {/* Rejected Jobs*/}
          <section className="acceptedOffers">
            <h2>Rejected Offers</h2>
            <ul>
              {deniedJobsOffers.length > 0 ? (
                deniedJobsOffers.map((job, index) => (
                  <li key={index} className="acceptedOfferCard">
                    <h3>{job.JobTitle}</h3>
                    <p><strong>Company:</strong> {job.CompanyName}</p>
                  </li>
                ))
              ) : (
                <li>No rejected jobs.</li>
              )}
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
                    <button
                      style={{
                        backgroundColor: "#1976d2",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => withdrawApplication(job.JobID)}
                    >
                      Withdraw Application
                    </button>
                  </li>
                ))
              ) : (
                <li> No job applications found </li>
              )}

            </ul>
          </section>

          <footer>
          </footer>
        </div>
      );
    }
