"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../styles.css";
import axios from "axios";

export default function ReviewApplicants() {
  const router = useRouter();

  const goToCompanyHome = () => router.push("/company/home");
  const goToReviewProfile = () => router.push("/company/review");
  const goToLogin = () => router.push("/company/login");
  const logout = () => {
    localStorage.removeItem("companyID");
    goToLogin();
  };

  const [companyName, setCompanyName] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [jobID, setJobID] = React.useState("");
  const [applicants, setApplicants] = React.useState<Array<any>>([]);
  const [requiredSkills, setRequiredSkills] = React.useState("");

  useEffect(() => {
    const storedCompanyName = localStorage.getItem("companyName");
    const storedjobId = localStorage.getItem("jobID");
    const storedjobTitle = localStorage.getItem("jobTitle");

    setCompanyName(storedCompanyName);
    setJobTitle(storedjobTitle);
    setJobID(storedjobId);

    const url = `https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/reviewApplicantsForJob?jobId=${storedjobId}`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data.body
          ? JSON.parse(response.data.body)
          : response.data;

        setApplicants(data.applicants);
        setRequiredSkills(data.requiredSkills);
      })
      .catch(() => {
        alert("Unable to retrieve applicants or required skills.");
      });
  }, []);

  // Offer job
  function offerJob(applicant: any) {
    for (let i = 0; i < applicants.length; i++) {
      if (applicants[i].ApplicationID === applicant.ApplicationID) {
        axios
          .post(
            "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/offerJob",
            {
              applicationId: applicant.ApplicationID,
              jobId: Number(jobID),
            }
          )
          .then(function (response) {
            let updated = applicants;
            for (let j = 0; j < updated.length; j++) {
              if (updated[j].ApplicationID === applicant.ApplicationID) {
                updated[j].ApplicationStatus = "Offered";
                break;
              }
            }
            setApplicants([...updated]);
          })
          .catch(function (error) {
            console.log("Error offering job:", error);
            alert("Unable to offer job. Try again.");
          });

        break;
      }
    }
  }

  //Update Applicant rating for Job
  function updateRating(applicant: any, newRating: any) {
    axios
      .post(
        "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/updateApplicantJobRating",
        {
          applicationId: applicant.ApplicationID,
          rating: newRating,
        }
      )
      .then((response) => {
        let updated = applicants;
        for (let i = 0; i < updated.length; i++) {
          if (updated[i].ApplicationID === applicant.ApplicationID) {
            updated[i].Rating = newRating;
            break;
          }
        }
        setApplicants([...updated]);
      })
      .catch((error) => {
        console.log("Error updating rating:", error);
        alert("Unable to update rating. Try again.");
      });
  }

  //Rescind job offer
  function rescindOffer(applicant: any) {
    axios
      .post(
        "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/rescindJobOffer",
        {
          applicationId: applicant.ApplicationID,
        }
      )
      .then(() => {
        let updated = applicants;

        for (let i = 0; i < updated.length; i++) {
          if (updated[i].ApplicationID === applicant.ApplicationID) {
            updated[i].ApplicationStatus = "Pending";
            updated[i].Rating = "";
            break;
          }
        }

        setApplicants([...updated]);
      })
      .catch((err) => {
        console.log("Error rescinding offer:", err);
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
        </div>
      </div>

      <div className="content">
        <h1 className="pageHeading" style={{ textAlign: "center" }}>
          {companyName} {jobTitle} Position
        </h1>

        <div className="jobs-box">
          <h2 style={{ textAlign: "center" }}>Applicants</h2>
          <h3>Required Job Skills: {requiredSkills}</h3>
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Applicant Skills</th>
                <th>Rating</th>
                <th>Decision</th>
              </tr>
            </thead>

            <tbody>
              {applicants.map((applicant: any, i) => (
                <tr key={i}>
                  <td>{applicant.ApplicantName}</td>
                  <td>{applicant.ApplicantSkills}</td>

                  {/* Rating dropdown */}
                  <td>
                    <select
                      value={applicant.Rating || ""}
                      onChange={(e) => updateRating(applicant, e.target.value)}
                    >
                      <option value=""></option>
                      <option value="Hirable">Hirable</option>
                      <option value="Wait">Wait</option>
                      <option value="Unacceptable">Unacceptable</option>
                    </select>
                  </td>

                  {/* Decision Column */}
                  <td>
                    {applicant.ApplicationStatus === "Pending" &&
                      !applicant.Rating && <>Please rate applicant</>}

                    {applicant.Rating === "Unacceptable" && <>Denied</>}

                    {applicant.Rating === "Wait" && (
                      <>Please update rating to Hirable to offer job</>
                    )}

                    {applicant.Rating === "Hirable" &&
                      applicant.ApplicationStatus === "Pending" && (
                        <>
                          <button
                            style={{ backgroundColor: "green" }}
                            onClick={() => offerJob(applicant)}
                          >
                            Offer Job
                          </button>
                        </>
                      )}

                    {applicant.ApplicationStatus === "Offered" && (
                      <>
                        <span>Job Offered</span>
                        <button
                          style={{ backgroundColor: "red" }}
                          onClick={() => rescindOffer(applicant)}
                        >
                          Rescind
                        </button>
                      </>
                    )}

                    {applicant.ApplicationStatus === "Hired" && (
                      <>
                        <span>Hired</span>
                        <button
                          style={{ backgroundColor: "red" }}
                          onClick={() => rescindOffer(applicant)}
                        >
                          Rescind
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button className="bigButton" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
