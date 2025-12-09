"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../styles.css";
import axios from "axios";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ReportCompanies() {
  const router = useRouter();

  const goToAdminHome = () => router.push("/admin/home");
  const goToLogin = () => router.push("/company/login");

  const logout = () => {
    localStorage.removeItem("adminUser");
    goToLogin();
  };

  const [applicants, setApplicants] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    console.log("Fetching applicants for page:", page);
    const url = `https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/Admin/reportApplicants?page=${page}&pageSize=10`;
    axios
      .get(url)
      .then((res) => {
        const data = res.data.body ? JSON.parse(res.data.body) : res.data;
        console.log(data);
        setApplicants(data);
      })
      .catch(() => {
        alert("Unable to load company report");
        setPage(lastPage);
      });
  }, [page]);

  const handleNext = () => {
    setLastPage(page);
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setLastPage(page);
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="company-home">
      {/* Ribbon */}
      <div className="ribbon">
        <img
          className="ribbonImages"
          src="/recruitme.png"
          alt="RecruitMe Logo"
          onClick={goToAdminHome}
        />

      <button className="ribbonButton" onClick={(e) => logout()}>Logout</button>

        <div className="ribbon-icons">
          <img
            className="icon-button"
            src="/home.png"
            alt="Home"
            onClick={goToAdminHome}
          />
        </div>
      </div>

      <div className="content">
        <h1 className="pageHeading" style={{ textAlign: "center" }}>
          Applicant Report
        </h1>

        <div className="jobs-box">
          <h2 style={{ textAlign: "center" }}>All Applicants Summary</h2>

          <table className="jobs-table">
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th># Jobs Applied</th>
                <th># Jobs Accepted</th>
                <th># Jobs withdrawn</th>
              </tr>
            </thead>

            <tbody>
              {applicants.map((c: any, i: number) => (
                <tr key={i}>
                  <td>{c.ApplicantName}</td>
                  <td>{c.NumApplied}</td>
                  <td>{c.NumAccepted}</td>
                  <td>{c.NumWithdrawn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pb: 10,
        }}
      >
        <IconButton onClick={handlePrev}>
          <ArrowBackIosNewIcon sx={{ color: "rgb(82, 140, 121)" }} />
        </IconButton>
        <Typography variant="body2" sx={{ mx: 2 }}>
          Page {page}
        </Typography>
        <IconButton onClick={handleNext}>
          <ArrowForwardIosIcon sx={{ color: "rgb(82, 140, 121)" }} />
        </IconButton>
      </Box>

      {/* Logout */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button className="bigButton" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
