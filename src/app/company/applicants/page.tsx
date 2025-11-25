"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "../styles.css";

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

    setCompanyName(storedCompanyName ?? "");
    setJobTitle(storedjobTitle ?? "");
    setJobID(storedjobId ?? "");

    
    const url = `https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/reviewApplicantsForJob?jobId=${storedjobId}&page=${page}&pageSize=10`;

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
        setPage(lastPage);
      });
  }, [page]);

  const handleNext = () => {
    setLastPage(page);
    setPage((prev) => prev + 1);
  }
  const handlePrev = () =>{
    setLastPage(page);
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  }

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
          <img
            className="icon-button"
            src="/search.png"
            alt="Review Applicants"
            onClick={goToReviewApplicant}
          />
        </div>
      </div>

      <div className="content">
        <h1 className="pageHeading">Review Applicants</h1>
      </div>
    </div>
  );
}
