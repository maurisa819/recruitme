"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "../styles.css";

export default function CompanyHome() {
  const router = useRouter();

  const goToCompanyHome = () => router.push("/company/home");
  const goToReviewProfile = () => router.push("/company/review");
  const goToReviewApplicant = () => router.push("/company/applicants");

  const openJobs = [
    { title: "Software Engineer", applicants: 10 },
    { title: "QA Tester", applicants: 5 },
  ];

  const closedJobs = [
    { title: "Project Manager", hired: 1 },
    { title: "Designer", hired: 2 },
  ];

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

      <div>
        <h1 className="pageHeading" style={{ textAlign: "center" }}>
          Company Home Page
        </h1>
      </div>

      <div className="jobs-container">
        <div className="jobs-box">
          <h2>Open Jobs</h2>
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Job</th>
                <th>Activate/Close</th>
                <th># Applicants</th>
                <th>Edit</th>
                <th>Review Applicants</th>
              </tr>
            </thead>
            <tbody>
              {openJobs.map((job, index) => (
                <tr key={index}>
                  <td>{job.title}</td>
                  <td>
                    <button>Activate/Close</button>
                  </td>
                  <td>{job.applicants}</td>
                  <td>
                    <button>Edit</button>
                  </td>
                  <td>
                    <button>Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="jobs-box">
          <h2>Closed Jobs</h2>
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Job</th>
                <th># Hired</th>
                <th>Reopen</th>
              </tr>
            </thead>
            <tbody>
              {closedJobs.map((job, index) => (
                <tr key={index}>
                  <td>{job.title}</td>
                  <td>{job.hired}</td>
                  <td>
                    <button>Reopen</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <button className="bigButton">Create Job</button>
      </div>
    </div>
  );
}
