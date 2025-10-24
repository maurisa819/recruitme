CREATE TABLE Applicant (
    ApplicantID SERIAL PRIMARY KEY,
    ApplicantName VARCHAR(255) NOT NULL,
    ApplicantPassword VARCHAR(255) NOT NULL,
    ApplicantSkills VARCHAR(500)
   );

CREATE TABLE Company (
    CompanyID SERIAL PRIMARY KEY,
    CompanyName VARCHAR(100) NOT NULL UNIQUE,
    CompanyPassword VARCHAR(255) NOT NULL
);

CREATE TABLE Job (
    JobID SERIAL PRIMARY KEY,
    CompanyID INT REFERENCES Company(CompanyID) ON DELETE CASCADE,
    JobTitle VARCHAR(100) NOT NULL,
    JobDescription TEXT,
    RequiredSkills VARCHAR(500),
    CONSTRAINT company_job_unique UNIQUE (CompanyID, JobTitle)
);

CREATE TABLE JobApplication (
    ApplicationID SERIAL PRIMARY KEY,
    ApplicantID INT REFERENCES Applicant(ApplicantID) ON DELETE CASCADE,
    JobID INT REFERENCES Job(JobID) ON DELETE CASCADE,
    ApplicationStatus VARCHAR(50) DEFAULT 'Pending',
    CONSTRAINT unique_applicant_job UNIQUE (ApplicantID, JobID)
);

CREATE TABLE JobOffer (
    OfferID SERIAL PRIMARY KEY,
    ApplicationID INT REFERENCES JobApplication(ApplicationID) ON DELETE CASCADE,
    JobID INT REFERENCES Job(JobID) ON DELETE CASCADE,
    Status VARCHAR(50) DEFAULT 'Offered',
    CONSTRAINT unique_application_job UNIQUE (ApplicationID, JobID)
);

CREATE TABLE Admin (
    AdminID SERIAL PRIMARY KEY,
    Username VARCHAR(36) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
);