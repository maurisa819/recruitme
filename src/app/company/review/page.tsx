"use client";
import React, { useState } from "react";

export default function ReviewCompanyProfile() {
  const [edit, setChange] = useState(false);
  const [companyName, setCompanyName] = useState("Google");
  const [email, setEmail] = useState("google@gmail.com");
  const [description, setDescription] = useState("Example description");

  function handleEditprofile() {
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
      <h1>Review Company Profile</h1>
      {edit ? (
        <div>
          <div>
            <label>Company Name: </label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div>
            <label>Email: </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label>Description: </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Company Name:</strong> {companyName}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Description:</strong> {description}
          </p>

          <button onClick={handleEditprofile}>Change Profile</button>
        </div>
      )}
    </div>
  );
}
