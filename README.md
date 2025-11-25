# Recruit.me

A project completed for CS509 - Design of Software Systems at WPI

## Contributors:
- Maddux Berry
- Kimberly Cummings
- Maurisa Dacosta
- Thomas O'Leary

Installing packages:
npm install

Running program:
npm run dev

Hosted on:
http://recruitme-northcarolina.s3-website-us-east-1.amazonaws.com

## Completed use cases for iteration 1:

### Once you register/login, you will NEED to click on "Logout" in order to register or login with a different account (will not change on refresh)

- Register Applicant
    - From homepage, click "Register Account"
    - Fill out Name, Username, Password, and a comma-separated list of skills
    - Click Register Account
- Review Profile
    - When you first register or log in to Applicant account, you will be met with the profile.
- Edit Profile
    - Click "Edit Profile" in the top ribbon
    - Make your changes to the Name, Username, or Skill list
    - Click "Save Changes"
    - To view changes, you can return to the home page
- Register Company
    - From homepage, click "Company? Click here!" in top ribbon
    - Click "Register Here"
    - Fill out Username, Company Name, and Password
    - Click Register Account
- Review Company Profile
    - When you first register or log in to a Company account, you will be met with the profile.
- Edit Company Profile
    - Click on the icon in the top right that looks like a person
    - Fill out your Company name change
    - Click "Save"
    - Click on the icon in the top right that looks like a house to be redirected to the homepage and view your changes.
- Create Job
    - From the Company homepage, click "Create Job"
    - Fill out the Job's title, description, and requirements. Requirements should be a comma-separated list.
    - Click "Create Job"
- Edit Job
    - From the Company homepage, click on the "Edit" button on one of the jobs you've created.
    - Enter the new job title, description, and requirements.
    - Click "Apply Changes"

## Completed use cases for iteration 2:

### Once you register/login, you will NEED to click on "Logout" in order to register or login with a different account (will not change on refresh)

- Activate Job
    - From the Company homepage, go to the Inactive Jobs list
    - If no job is there create a new job with a new name 
    - Click the "Reopen" button on the job you want to activate
    
- Search Job (with pagination)
    - From the Applicant homepage, click Apply to Jobs in the top ribbon
    - Type a keyword, company name, or job title into the search bar
    - Scroll through the job list or use the search results to find a job (search works with company name, job title, and skills)
    - Use the arrow buttons at the bottom to move through pages of jobs (5 per page)
    
- Apply to Job
    - From the Applicant homepage, click "Apply to Jobs" in the top ribbon
    - Browse the list of active jobs or search using the bar at the top
    - Click "Apply" on the job you want
    
- Withdraw from Job
    - From the Applicant homepage, scroll to the Jobs Applied To section
    - Click "Withdraw Application" next to the job you want to withdraw from

- Close Job
    - From the Company homepage, go to the Open Jobs list
    - Click the "Close" button on the job you want to close
    
- Review Applicants (with pagination)
    - From the Company homepage, go to the Open Jobs list
    - Click "Review" on the job you want to see applicants for
    - Use the arrow buttons at the bottom to move through pages of applicants (10 per page)
    
- Offer Job
    - From the Company homepage, under Open Jobs list click "Review" next to the job you want to see applicants for
    - In the Rating dropdown for an applicant, select "Hirable"
    - In the Decision column, click "Offer Job"

- Rescind Job Offer
    - From the Company homepage, under Open Jobs list click "Review" next to the job you want to see applicants for
    - Find the applicant who was already offered the job
    - Click Rescind in the Decision column



