import Application from "./application";
import Offer from "./offer";

class Company {

    id: string; // login id
    password: string; // login password
    name: string; // company name
    jobs: Array<string>; // List of job IDs
    applications: Array<Application>; // Applications received
    offers: Array<Offer>; // Offers made

    constructor(id: string, password: string, name: string, jobs: Array<string>, applications: Array<Application>, offers: Array<Offer>) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.jobs = jobs;
        this.applications = applications;
        this.offers = offers;
    }

}

export default Company;