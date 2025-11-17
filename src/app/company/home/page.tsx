"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../styles.css";

export default function CompanyHome() {
  const router = useRouter();

  const goToCompanyHome = () => router.push("/company/home");
  const goToReviewProfile = () => router.push("/company/review");
  const goToReviewApplicantsForJob = () => router.push("/company/applicants");
  const goToLogin = () => router.push("/company/login");
  const goToCreateJobs = () => router.push("/company/createJob");
  const goToEditJob = () => router.push("/company/editJob");

  const logout = () => {
    localStorage.removeItem("companyID");
    goToLogin();
  };

  const [companyName, setCompanyName] = useState("Company");
  const [openJobs, setOpenJobs] = useState(Array<any>);
  const [closedJobs, setClosedJobs] = useState(Array<any>);

  let companyID = "0";
  useEffect(() => {
    companyID = localStorage.getItem("companyID") || "1";
    const url = `https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/reviewCompany?companyID=${companyID}`;

    axios
      .get(url)
      .then(function (response: any) {
        console.log("Backend response:", response);
        console.log("Response body:", response.data.body);

        const data = response.data.body
          ? JSON.parse(response.data.body)
          : response.data;

        console.log(data);
        setCompanyName(data.companyName);
        if (data.jobs) {
          setOpenJobs(data.jobs.openJobs);
          setClosedJobs(data.jobs.closedJobs);
        }
      })
      .catch(function (error: any) {
        console.log("Axios fetch error:", error);
        alert("Unable to fetch company data. Please try again.");
      });
  }, []);

  console.log(openJobs);

  function activateOrCloseJob(jID: string) {
    for (let i = 0; i < openJobs.length; i++) {
      if (openJobs[i].id === jID) {
        if (openJobs[i].status === "Active") {
          // Close the job
          axios
            .post(
              "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/closeJob",
              {
                jobID: jID,
              }
            )
            .then(function (response) {
              console.log("Job closed:", response);
              let updatedJobs = openJobs;
              for (let i = 0; i < openJobs.length; i++) {
                if (updatedJobs[i].id === jID) {
                  if (updatedJobs[i].status === "Active") {
                    updatedJobs[i].status = "Inactive";
                  }
                  break;
                }
              }
              setOpenJobs([...updatedJobs]);
            })
            .catch(function (error) {
              console.log("Error closing job:", error);
              alert("Unable to close job. Please try again.");
            });
        } else if (openJobs[i].status === "Inactive") {
          // Activate the job
          axios
            .post(
              "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/activateJob",
              {
                jobID: jID,
              }
            )
            .then(function (response) {
              console.log("Job activated:", response);
              let updatedJobs = openJobs;
              for (let i = 0; i < openJobs.length; i++) {
                if (updatedJobs[i].id === jID) {
                  if (updatedJobs[i].status === "Inactive") {
                    updatedJobs[i].status = "Active";
                  }
                  break;
                }
              }
              setOpenJobs([...updatedJobs]);
            })
            .catch(function (error) {
              console.log("Error activating job:", error);
              alert("Unable to activate job. Please try again.");
            });
        }
        break;
      }
    }
  }

  return (
    <div className="company-home">
      <div className="ribbon">
        <button className="ribbonButton" onClick={(e) => logout()}>
          Logout
        </button>
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
            alt="Review Profile"
            onClick={goToReviewProfile}
          />
        </div>
      </div>

      <h1 className="pageHeading" style={{ textAlign: "center" }}>
        {companyName} Home Page
      </h1>

      <div className="jobs-container">
        <div className="jobs-box">
          <h2>Open Jobs</h2>
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Job</th>
                <th>Close Job</th>
                <th>Status</th>
                <th># Applicants</th>
                <th>Review Applicants</th>
              </tr>
            </thead>
            <tbody>
              {openJobs.map((job, i) => (
                <tr key={i}>
                  <td>{job.title}</td>
                  <td onClick={(e) => activateOrCloseJob(job.id)}>
                    <button>Close</button>
                  </td>
                  <td>{job.status}</td>
                  <td>{job.applicants || 0}</td>
                  <td>
                    <button
                      onClick={() => {
                        localStorage.setItem("jobID", job.id);
                        localStorage.setItem("jobTitle", job.title);
                        localStorage.setItem("companyName", companyName);
                        goToReviewApplicantsForJob();
                      }}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="jobs-box">
          <h2>Inactive Jobs</h2>
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Job</th>
                <th># Hired</th>
                <th>Edit</th>
                <th>Reopen Job</th>
              </tr>
            </thead>
            <tbody>
              {closedJobs.map((job, i) => (
                <tr key={i}>
                  <td>{job.title}</td>
                  <td>{job.hired || 0}</td>
                  <td>
                    <button
                      onClick={() => {
                        localStorage.setItem("jobID", job.id); // assuming job.id exists
                        goToEditJob();
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td onClick={(e) => activateOrCloseJob(job.id)}>
                    <button>Reopen</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button className="bigButton" onClick={goToCreateJobs}>
          Create Job
        </button>
        <button className="bigButton" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
