import Image from "next/image";
import "./styles.css";


export default function ApplicantHome() {
  return (
    <div>
      {/* Ribbon */}
       <div className="ribbon">

          <img className="ribbonImages" src="../recruitme.png" alt="RecruitMe Logo"></img>

          <button className="ribbonButton">Home page</button>

          <button className="ribbonButton">Apply to Jobs</button>

          <button className="ribbonButton">Review Profile</button>

          <button className="ribbonButton">Review Jobs</button>

        </div>
        {/* Applicant name + skills */}
      <h1>Applicant Name</h1>
      <br></br>
      <ol>Top 5 Skills:
          <li>1. Skill</li>
          <li>2. Skill</li>
          <li>3. Skill</li>
          <li>4. Skill</li>
          <li>5. Skill</li>
        </ol>

        {/* Job Offers */}
      <section className="jobOffers">
        <h2>Job Offers</h2>
        <ul>
          <li className="jobOfferCard">
            <h3>Software Engineer</h3>
            <p><strong>Company:</strong> Amazon</p>
            <div className="offerButtons">
              <button className="acceptButton">Accept</button>
              <button className="rejectButton">Reject</button>
            </div>
          </li>
        </ul>
      </section>

      {/* Accepted Jobs*/}
      <section className="acceptedOffers">
        <h2>Accepted Offers</h2>
        <ul>
          <li className="acceptedOfferCard">
            <h3>UI Designer</h3>
            <p><strong>Company:</strong> Canonical</p>
          </li>
    
        </ul>
      </section>

      {/* Rejected Jobs*/}
      <section className="acceptedOffers">
        <h2>Rejected Offers</h2>
        <ul>
          <li className="acceptedOfferCard">
            <h3>ELDP Program</h3>
            <p><strong>Company:</strong> BAE Systems</p>
          </li>
    
        </ul>
      </section>

      {/* List of Applied Jobs*/}
      <section className="acceptedOffers">
        <h2>Jobs Applied To </h2>
        <ul>
          <li className="acceptedOfferCard">
            <h3>Software Engineer</h3>
            <p><strong>Company:</strong> Meta </p>
          </li>
    
        </ul>
      </section>
      
      <footer>

        <ol>Notifications:
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
        </ol>
      </footer>
    </div>
  );
}
