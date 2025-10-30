import Applicant from './applicant';
import Company from './company';
import Application from './application';
import Offer from './offer';

class Model {

    applicants: Array<Applicant>; // List of applicants
    companies: Array<Company>; // List of companies
    applications: Array<Application>; // List of applications
    offers: Array<Offer>; // List of offers
    adminPassword: string = "admin123"; // Admin password



    constructor(applicants: Array<Applicant>, companies: Array<Company>, applications: Array<Application>, offers: Array<Offer>) {
        this.applicants = applicants;
        this.companies = companies;
        this.applications = applications;
        this.offers = offers;
    }

}


export default Model;