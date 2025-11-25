"use client";
import Image from "next/image";
import "./styles.css";
import { useRouter } from "next/navigation";
import React from "react";


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

    const goToApplicantHome = () => router.push("/applicant/homepage");
    const goToEditApplicant = () => router.push("/applicant/edit");
    const goToSearchJobs = () => router.push("/applicant/search");
    const goToReviewJobs = () => router.push("/applicant/review");

    const goToHome = () => router.push('/');
    function logout() {
      localStorage.removeItem('userId');
      goToHome();
    }
    
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
            <Typography variant="h6">{job.JobTitle}</Typography>
            <Typography variant="body1">{job.CompanyName}</Typography>
          </Box>
          <Box>
      <button
        style={{
          backgroundColor: "#1976d2",
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
