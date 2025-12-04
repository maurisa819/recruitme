"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../styles.css";

export default function AdminHome() {
    const router = useRouter();
    const goToAdminHome = () => router.push("/admin/home");
    const goToLogin = () => router.push("/company/login");
    const goToReportCompanies = () => router.push("/admin/reportCompanies");
    const goToReportApplicants = () => router.push("/admin/reportApplicants");

    function logout() {
        localStorage.removeItem("adminUser");
        goToLogin();
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            let adminUser = localStorage.getItem('adminUser');
            if (!adminUser) {
                goToLogin();
            }
        }

    }, []);

    function reportCompanies() {
        goToReportCompanies();
    }

    function reportApplicants() {
        goToReportApplicants();
    }

  return (
    <div className="admin-home-container">
        <div className="ribbon">
            <img
                className="ribbonImages"
                src="/recruitme.png"
                alt="RecruitMe Logo"
                onClick={goToAdminHome}>
            </img>
            <button className="ribbonButton" onClick={(e) => logout()}>Logout</button>
        </div>

        <h1 className="pageHeading" style={{ textAlign: "center" }}>
            Admin Home Page
        </h1>

        <div className="admin-content" style={{ textAlign: "center" }}>
            <button 
            className="bigButton"
            onClick={reportCompanies}> Report Companies </button>
            <button 
            className="bigButton"
            onClick={reportApplicants}> Report Applicants </button>
        </div>

    </div>
  );
}
