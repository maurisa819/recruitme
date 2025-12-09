"use client";
import Image from "next/image";
import "./styles.css";
import { useRouter } from "next/navigation";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from 'axios';
import React, {useEffect, useState} from "react";
import { request } from "http";

const API_URL = "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/applicant/searchJobs";
const APPLY_API_URL = "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/applicant/apply";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// // fake job data for frontend purposes only
// const fakeJobs = [
//   { id: 1, title: "Frontend Developer", company: "Meta", location: "New York, NY" },
//   { id: 2, title: "Backend Engineer", company: "Apple", location: "San Francisco, CA" },
//   { id: 3, title: "UI/UX Designer", company: "Amazon", location: "Remote" },
//   { id: 4, title: "Database Adminstrator", company: "Tesla", location: "Austin, TX" },
//   { id: 5, title: "Full Stack Developer", company: "Siemens", location: "Seattle, WA" },
//   { id: 6, title: "AI Researcher", company: "Mathworks", location: "Boston, MA" },
// ];

interface Job {
  JobID: number;
  JobTitle: string;
  CompanyName: string;
}


export default function ApplicantHome() {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");


  const goTo = (path: string) => router.push(path);
  const goToApplicantHome = () => goTo("/applicant/homepage");
  const goToEditApplicant = () => goTo("/applicant/edit");
  const goToSearchJobs = () => goTo("/applicant/search");
  // const goToReviewJobs = () => goTo("/applicant/review");
  const goToHome = () => router.push('/');
  const [ApplicantID, setApplicantID] = useState<string | null>(null);

  const jobsPerPage = 5
  // logout should work
  function logout() {
        localStorage.removeItem('userId');
        goToHome();
      }
      

  useEffect(() => {
    const storeId = localStorage.getItem("userId");
    if (!storeId) {
      router.push("/applicant/login");
    }
    else {
      setApplicantID(storeId);
    }
  }, [router]);

  // function to fetch the jobs from the backend
  const fetchJobs = async (term?: string, currPage?: number) => {

    const pageToUse = currPage;

    console.log("Calling API with:", {
      term,
      pageToUse,
      pageSize: jobsPerPage,
    });

    const requestBody = {
      term: term && term.trim() !== "" ? term : undefined,
      page: pageToUse,
      pageSize: jobsPerPage
    };
    console.log(JSON.stringify(requestBody))
    setLoading(true);
    setError("");
    try {
  
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(requestBody)
      });
      
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      console.log("Fetched raw data:", data);

      // Handle multiple possible API response formats
      let jobsArray: any[] = [];
      if (Array.isArray(data)) {
        jobsArray = data;
      } else if (data.body) {
        try {
          jobsArray = JSON.parse(data.body);
        } catch (err) {
          console.error("Failed to parse body:", err);
        }
      } else if (data.jobs) {
        jobsArray = data.jobs;
      }

      console.log("Jobs array:", jobsArray);
      setJobs(jobsArray);
    } catch (err: any) {
      setError(err.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

   React.useEffect(() => {
    fetchJobs(undefined, 1);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const firstPage = 1;
    setPage(firstPage);
    fetchJobs(searchTerm, firstPage);
  };

 
const applyJob = async (jobId: number) => {

  try {
    const response = await axios.post(
      APPLY_API_URL,
      {
        applicantID: ApplicantID,
        jobID: jobId
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Application response:", response.data);
    alert(response.data.body);
  } catch (error: any) {
    console.error("Error applying for job:", error);
  }
};






  const handleNext = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchJobs(searchTerm, nextPage);
  };
  const handlePrev = () => {
    if (page === 1) return;
    const prevPage = page - 1;
    setPage(prevPage);
    fetchJobs(searchTerm, prevPage);
  };


  return (
    <div>
      {/* Ribbon */}
          <div className="ribbon">
  
            <img className="ribbonImages" src="../recruitme.png" alt="RecruitMe Logo"></img>
  
            <button onClick={goToApplicantHome} className="ribbonButton">Home page</button>
  
            <button onClick={goToSearchJobs} className="ribbonButton">Apply to Jobs</button>
  
            <button onClick={goToEditApplicant} className="ribbonButton">Edit Profile</button>
  
            {/* <button onClick={goToReviewJobs} className="ribbonButton">Review Jobs</button> */}
  
            <button className="ribbonButton" onClick={(e) => logout()}>Logout</button>
  
          </div>

      {/* Search bar */}
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <AppBar position="static">
          <Toolbar component="form" onSubmit={handleSearchSubmit}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Search Jobs
            </Typography>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value = {searchTerm}
                onChange={handleSearch}
                placeholder="Search by skill or company..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Job Listings */}
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Available Jobs
        </Typography>

        {jobs.map((job: any) => (
          <Box
            key={job.JobID}
            sx={{
              color: "#333",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "12px",
              backgroundColor: "#c4cbe6ff",
            }}
          >
            <Box>
            <Typography variant="h6">Job: {job.JobTitle}</Typography>
            <Typography variant="body1">Company: {job.CompanyName}</Typography>
            <Typography variant="body1">Skills: {job.RequiredSkills}</Typography>
          </Box>
          <Box>
      <button
        style={{
          backgroundColor: "blue",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => applyJob(job.JobID)}
      >
        Apply
      </button>
    </Box>
  </Box>
          
        ))}

        {/* Pagination UI */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", pb: 10}}>
          <IconButton onClick={handlePrev}>
            <ArrowBackIosNewIcon sx={{color: 'white' }}/>
          </IconButton>
          <Typography variant="body2" sx={{ mx: 2 }}>
            Page {page}
          </Typography>
          <IconButton onClick={handleNext}>
            <ArrowForwardIosIcon sx={{color: 'white' }}/>
          </IconButton>
        </Box>
      </Box>
    </div>
  );
}
