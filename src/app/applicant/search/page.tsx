"use client";
import Image from "next/image";
import "./styles.css";
import { useRouter } from "next/navigation";
import * as React from "react";
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

// fake job data for frontend purposes only
const fakeJobs = [
  { id: 1, title: "Frontend Developer", company: "Meta", location: "New York, NY" },
  { id: 2, title: "Backend Engineer", company: "Apple", location: "San Francisco, CA" },
  { id: 3, title: "UI/UX Designer", company: "Amazon", location: "Remote" },
  { id: 4, title: "Database Adminstrator", company: "Tesla", location: "Austin, TX" },
  { id: 5, title: "Full Stack Developer", company: "Siemens", location: "Seattle, WA" },
  { id: 6, title: "AI Researcher", company: "Mathworks", location: "Boston, MA" },
];



export default function ApplicantHome() {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const jobsPerPage = 5;

  const goTo = (path: string) => router.push(path);
  const goToApplicantHome = () => goTo("/applicant/homepage");
  const goToEditApplicant = () => goTo("/applicant/edit");
  const goToSearchJobs = () => goTo("/applicant/search");
  const goToReviewJobs = () => goTo("/applicant/review");

  const logout = () => {
    localStorage.removeItem("userId");
    goTo("/");
  };

  // Pagination Logic (need to get this working with actual data though)
  const startIndex = page * jobsPerPage;
  const paginatedJobs = fakeJobs.slice(startIndex, startIndex + jobsPerPage);
  const hasNext = startIndex + jobsPerPage < fakeJobs.length;
  const hasPrev = page > 0;

  const handleNext = () => {
    if (hasNext) setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (hasPrev) setPage((prev) => prev - 1);
  };


  return (
    <div>
      {/* Ribbon */}
          <div className="ribbon">
  
            <img className="ribbonImages" src="../recruitme.png" alt="RecruitMe Logo"></img>
  
            <button onClick={goToApplicantHome} className="ribbonButton">Home page</button>
  
            <button onClick={goToSearchJobs} className="ribbonButton">Apply to Jobs</button>
  
            <button onClick={goToEditApplicant} className="ribbonButton">Edit Profile</button>
  
            <button onClick={goToReviewJobs} className="ribbonButton">Review Jobs</button>
  
            <button className="ribbonButton" onClick={(e) => logout()}>Logout</button>
  
          </div>

      {/* Search bar */}
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <AppBar position="static">
          <Toolbar>
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
                placeholder="Search…"
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

        {paginatedJobs.map((job) => (
          <Box
            key={job.id}
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "12px",
              backgroundColor: "#fafafa",
            }}
          >
            <Typography variant="h6">{job.title}</Typography>
            <Typography variant="body1">{job.company}</Typography>
            <Typography variant="body2" color="text.secondary">
              {job.location}
            </Typography>
          </Box>
        ))}

        {/* Pagination UI */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
          <IconButton onClick={handlePrev} disabled={!hasPrev}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="body2" sx={{ mx: 2 }}>
            Page {page + 1} of {Math.ceil(fakeJobs.length / jobsPerPage)}
          </Typography>
          <IconButton onClick={handleNext} disabled={!hasNext}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
}
