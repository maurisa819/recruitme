class Applicant {

    id: string; // login id
    password: string; // login password
    name: string; // applicant name
    skills: Array<string>; // List of skills

    constructor(id: string, password: string, name: string, skills: Array<string>) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.skills = skills;
    }

}

export default Applicant;