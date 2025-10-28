import Company from "./company";


class Offer {

    company: Company; // Company making the offer
    job_id: string; // Job ID for the offer
    applicant_id: string; // Applicant ID receiving the offer
    status: string; // Offered, Accepted, Rejected, Rescinded

    constructor(company: Company, job_id: string, applicant_id: string, status: string) {
        this.company = company;
        this.job_id = job_id;
        this.applicant_id = applicant_id;
        this.status = status;
    }
    

}

export default Offer;