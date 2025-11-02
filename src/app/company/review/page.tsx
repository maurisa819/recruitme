"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../styles.css";

export default function EditCompanyProfile() {
  const router = useRouter();
  const [companyID, setCompanyID] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [originalName, setOriginalName] = useState("");

  const apiUrl =
    "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/editCompany";

  const goToCompanyHome = () => router.push("/company/home");
  const goToReviewProfile = () => router.push("/company/review");
  const goToReviewApplicant = () => router.push("/company/applicants");

  useEffect(() => {
    const storedID = localStorage.getItem("companyID") || "1";
    setCompanyID(storedID);

    axios
      .post(apiUrl, { companyID: Number(storedID) })
      .then((res) => {
        const data = res.data?.body ? JSON.parse(res.data.body) : res.data;
        if (data?.CompanyName) {
          setCompanyName(data.CompanyName);
          setOriginalName(data.CompanyName);
        } else {
          alert("Company not found.");
        }
      })
      .catch(() => alert("Error loading company info."));
  }, []);

  const handleSave = () => {
    if (companyName.trim() === "") {
      alert("Company name cannot be empty.");
      return;
    }
    if (companyName === originalName) {
      alert("No changes made.");
      return;
    }

    axios
      .post(apiUrl, { companyID: Number(companyID), newName: companyName })
      .then((res) => {
        const message = res.data?.body ? JSON.parse(res.data.body) : res.data;
        if (message === "Company name updated successfully") {
          alert("Company name updated successfully!");
          setOriginalName(companyName);
          router.push("/company/review");
        } else {
          alert(message);
        }
      })
      .catch(() => alert("Error updating company name."));
  };

  const handleCancel = () => {
    setCompanyName(originalName);
    router.push("/company/review");
  };

  return (
    <div>
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
        <h1 className="pageHeading">Edit Company Profile</h1>

        <div className="editForm">
          <div>
            <label>Company Name:</label>
            <input
              className="inputBox"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <button className="bigButton" onClick={handleSave}>
            Save
          </button>
          <button className="bigButton" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
