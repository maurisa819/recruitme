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

  const goToCompanyHome = () => router.push("/admin/home");
  const goToLogin = () => router.push("/company/login");

  const logout = () => {
    localStorage.removeItem("companyID");
    goToLogin();
  };

  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const url = `https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/Admin/reportCompanies?page=${page}&pageSize=10`;

    axios
      .get(url)
      .then((res) => {
        const data = res.data.body ? JSON.parse(res.data.body) : res.data;
        setCompanies(data);
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
          onClick={goToCompanyHome}
        />

        <div className="ribbon-icons">
          <img
            className="icon-button"
            src="/home.png"
            alt="Home"
            onClick={goToCompanyHome}
          />
        </div>
      </div>

      <div className="content">
        <h1 className="pageHeading" style={{ textAlign: "center" }}>
          Company Report
        </h1>

        <div className="jobs-box">
          <h2 style={{ textAlign: "center" }}>All Companies Summary</h2>

          <table className="jobs-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Job Report</th>
                <th># of Jobs</th>
                <th># of Applications</th>
                <th># Hired</th>
              </tr>
            </thead>

            <tbody>
              {companies.map((c: any, i: number) => (
                <tr key={i}>
                  <td>{c.CompanyName}</td>
                  <td>
                    <button
                      onClick={() => {
                        localStorage.setItem("companyReportID", c.CompanyID);
                        router.push("/admin/reportJobsForCompany");
                      }}
                    >
                      Jobs
                    </button>
                  </td>
                  <td>{c.NumJobs}</td>
                  <td>{c.NumApplications}</td>
                  <td>{c.NumHired}</td>
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
