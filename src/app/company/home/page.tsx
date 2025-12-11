"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import "../styles.css";
import { Search } from "@mui/icons-material";


  const SearchContainer = styled("div")(({ theme }) => ({
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


export default function CompanyHome() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("")


  const goToCompanyHome = () => router.push("/company/home");
  const goToReviewProfile = () => router.push("/company/review");
  const goToReviewApplicantsForJob = () => router.push("/company/applicants");
  const goToLogin = () => router.push("/company/login");
  const goToCreateJobs = () => router.push("/company/createJob");
  const goToEditJob = () => router.push("/company/editJob");

  const logout = () => {
    localStorage.removeItem("companyID");
    goToLogin();
  };

  const [companyName, setCompanyName] = useState("Company");
  const [openJobs, setOpenJobs] = useState(Array<any>);
  const [closedJobs, setClosedJobs] = useState(Array<any>);
  const [redraw, setRedraw] = useState(0);
  const [matchCount, setMatchCount] = useState<number | null>(null);


  function forceRedraw() {
    setRedraw(redraw + 1);
  }

  let companyID = "0";
  const updateJobs = useEffect(() => {
    companyID = localStorage.getItem("companyID") || "1";
    const url = `https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/reviewCompany?companyID=${companyID}`;

    axios
      .get(url)
      .then(function (response: any) {
        console.log("Backend response:", response);
        //console.log("Response body:", response.data.body);

        const data = response.data.body
          ? JSON.parse(response.data.body)
          : response.data;

        console.log("Response Data: ", data);
        setCompanyName(data.companyName);
        if (data.jobs) {
          setOpenJobs(data.jobs.openJobs);
          setClosedJobs(data.jobs.closedJobs);
          console.log("Received Open:", data.jobs.openJobs);
          console.log("Received Closed:", data.jobs.closedJobs);
        }
      })
      .catch(function (error: any) {
        console.log("Axios fetch error:", error);
        alert("Unable to fetch company data. Please try again.");
      });
  }, [redraw]);

  console.log("Open Jobs:", openJobs);
  console.log("Closed Jobs:", closedJobs);

  function activateJob(jID: string) {
    for (let i = 0; i < closedJobs.length; i++) {
      if (closedJobs[i].id === jID) {
        // Activate the job
        console.log("Activating job with ID:", jID);
        axios
          .post(
            "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/activateJob",
            {
              jobID: jID,
            }
          )
          .then(function (response) {
            console.log("Job activated:", response);
            forceRedraw();
          })
          .catch(function (error) {
            console.log("Error activating job:", error);
            alert("Unable to activate job. Please try again.");
          });
        break;
      }
    }
  }

  function closeJob(jID: string) {
    for (let i = 0; i < openJobs.length; i++) {
      if (openJobs[i].id === jID) {
        if (openJobs[i].status === "Active") {
          // Close the job
          axios
            .post(
              "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/closeJob",
              {
                jobID: jID,
              }
            )
            .then(function (response) {
              console.log("Job closed:", response);
              forceRedraw();
            })
            .catch(function (error) {
              console.log("Error closing job:", error);
              alert("Unable to close job. Please try again.");
            });
        }
      }
    }
  }

  function activateOrCloseJob(jID: string) {
    for (let i = 0; i < openJobs.length; i++) {
      if (openJobs[i].id === jID) {
        if (openJobs[i].status === "Active") {
          // Close the job
          axios
            .post(
              "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/closeJob",
              {
                jobID: jID,
              }
            )
            .then(function (response) {
              console.log("Job closed:", response);
              // // hold onto job info
              // let heldJob = null;
              // for (let i = 0; i < openJobs.length; i++) {
              //   if (openJobs[i].id === jID) {
              //     heldJob = openJobs[i];
              //     break;
              //   }
              // }
              // // remove job from open jobs
              // let updatedJobs = openJobs.filter((job) => job.id !== jID);
              // setOpenJobs([updatedJobs]);
              // // add job to closed jobs
              // if (heldJob) {
              //   heldJob.status = "Inactive";
              //   setClosedJobs((prevClosedJobs) => [
              //     ...prevClosedJobs,
              //     heldJob,
              //   ]);
              // }
              forceRedraw();
            })
            .catch(function (error) {
              console.log("Error closing job:", error);
              alert("Unable to close job. Please try again.");
            });
        } else if (openJobs[i].status === "Inactive") {
          // Activate the job
          axios
            .post(
              "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/activateJob",
              {
                jobID: jID,
              }
            )
            .then(function (response) {
              console.log("Job activated:", response);
              let updatedJobs = openJobs;
              for (let i = 0; i < openJobs.length; i++) {
                if (updatedJobs[i].id === jID) {
                  if (updatedJobs[i].status === "Inactive") {
                    updatedJobs[i].status = "Active";
                  }
                  break;
                }
              }
              setOpenJobs([...updatedJobs]);
            })
            .catch(function (error) {
              console.log("Error activating job:", error);
              alert("Unable to activate job. Please try again.");
            });
        }
        break;
      }
    }
  }



  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };
  
    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      fetchNumOfApplicants(searchTerm);
    };
    async function fetchNumOfApplicants(skills: string) {
      // Convert comma-separated list → array of trimmed strings

      try{
        const response = await axios.post(
          "https://yzcqeylhae.execute-api.us-east-1.amazonaws.com/Initial/company/ReportNumberOfApplicants",
          {
            "skills": skills,
          }
        );
        const data = response.data.body
          ? JSON.parse(response.data.body)
          : response.data;
        const number = Array.isArray(data) ? data[0]?.matchCount ?? 0 : 0;
        console.log(`Matches found: ${number}`);
        setMatchCount(number)

      }catch(error){
        console.error("POST error: ", error);
        console.log("Error fetching applicant count")
      }



    }


  return (
    <div className="company-home">
      <div className="ribbon">
        <button className="ribbonButton" onClick={(e) => logout()}>
          Logout
        </button>
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
            alt="Review Profile"
            onClick={goToReviewProfile}
          />
        </div>
      </div>

      <h1 className="pageHeading" style={{ textAlign: "center" }}>
        {companyName} Home Page
      </h1>

      <div className="jobs-container">
        <div className="jobs-box">
          <h2>Open Jobs</h2>
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Job</th>
                <th>Close Job</th>
                <th>Status</th>
                <th># Applicants</th>
                <th>Review Applicants</th>
              </tr>
            </thead>
            <tbody>
              {openJobs.map((job, i) => (
                <tr key={i}>
                  <td>{job.title}</td>
                  <td onClick={(e) => closeJob(job.id)}>
                    <button
                      className="companyButton"
                      style={{ backgroundColor: "rgb(82, 140, 121)" }}
                    >
                      Close
                    </button>
                  </td>
                  <td>{job.status}</td>
                  <td>{job.applicants || 0}</td>
                  <td>
                    <button
                      className="companyButton"
                      style={{ backgroundColor: "rgb(82, 140, 121)" }}
                      onClick={() => {
                        localStorage.setItem("jobID", job.id);
                        localStorage.setItem("jobTitle", job.title);
                        localStorage.setItem("companyName", companyName);
                        goToReviewApplicantsForJob();
                      }}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="jobs-box">
          <h2>Inactive Jobs</h2>
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Job</th>
                <th># Hired</th>
                <th>Edit</th>
                <th>Reopen Job</th>
              </tr>
            </thead>
            <tbody>
              {closedJobs.map((job, i) => (
                <tr key={i}>
                  <td>{job.title}</td>
                  <td>{job.hired || 0}</td>
                  <td>
                    <button
                      className="companyButton"
                      style={{ backgroundColor: "rgb(82, 140, 121)" }}
                      onClick={() => {
                        localStorage.setItem("jobID", job.id); // assuming job.id exists
                        goToEditJob();
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td onClick={(e) => activateJob(job.id)}>
                    <button
                      className="companyButton"
                      style={{ backgroundColor: "rgb(82, 140, 121)" }}
                    >
                      Reopen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
      <Box sx={{ flexGrow: 1, mb: 2 , alignItems: 'center', justifyContent:'center'}}>
        <AppBar position="static">
          <Toolbar component="form" onSubmit={handleSearchSubmit}  sx={{
              flexDirection: "row",     
              alignItems: "center",       
              justifyContent: "center",
              textAlign: "center",
              gap: 1, 
          }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Number of Matching Applicants
            </Typography>

            <SearchContainer>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value = {searchTerm}
                onChange={handleSearch}
                placeholder="Enter Skills"
                inputProps={{ "aria-label": "search" }}
              />
            </SearchContainer>
          </Toolbar>
        </AppBar>
        {matchCount !== null && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            Found {matchCount} matching applicants.
          </div>
        )}
      </Box>
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button className="bigButton" onClick={goToCreateJobs}>
          Create Job
        </button>
        <button className="bigButton" onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}
