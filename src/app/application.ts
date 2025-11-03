import Company from "./company";
import Applicant from "./applicant";

class Application {

    company: Company; // Company applying to
    job_id: string; // Job ID applied for
    applicant_id: string; // Applicant ID
    status: string; // Hirable, Wait, Unacceptable

    constructor(company: Company, job_id: string, applicant_id: string, status: string) {
        this.company = company;
        this.job_id = job_id;
        this.applicant_id = applicant_id;
        this.status = status;
    }

}

export default Application;