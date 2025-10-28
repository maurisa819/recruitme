"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import "../styles.css";

export default function ReviewCompanyProfile() {
  const [edit, setChange] = useState(false);
  const [companyName, setCompanyName] = useState("Google");
  const [email, setEmail] = useState("google@gmail.com");
  const [description, setDescription] = useState("Example description");

  const router = useRouter();
  const goToCompanyHome = () => router.push("/company/home");
  const goToReviewProfile = () => router.push("/company/review");
  const goToReviewApplicant = () => router.push("/company/applicants");

  function handleEditProfile() {
    setChange(true);
  }

  function handleSave() {
    console.log("Saved");
    setChange(false);
  }

  function handleCancel() {
    setChange(false);
  }

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
        <h1 className="pageHeading">Review Company Profile</h1>

        {edit ? (
          <div className="editForm">
            <div>
              <label>Company Name: </label>
              <input
                className="inputBox"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <label>Email: </label>
              <input
                className="inputBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Description: </label>
              <textarea
                className="inputBox"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button className="bigButton" onClick={handleSave}>
              Save
            </button>
            <button className="bigButton" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <p className="spacing">
              <strong>Company Name:</strong> {companyName}
            </p>
            <p className="spacing">
              <strong>Email:</strong> {email}
            </p>
            <p className="spacing">
              <strong>Description:</strong> {description}
            </p>

            <button className="bigButton" onClick={handleEditProfile}>
              Change Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
