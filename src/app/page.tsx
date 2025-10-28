import Image from "next/image";
import "./styles.css";
import Link from "next/link";

export default function Home() {

  



  return (
    <div>
        <div className="ribbon">

          <img className="ribbonImages" src="../recruitme.png" alt="RecruitMe Logo"></img>
          <Link href="company/register">
            <button className="ribbonButton"> Company? Click here! </button>
          </Link>
        </div>

        <div className="content">
        
        
          <img className="mainImage" src="../recruitme.png" alt="RecruitMe Logo"></img>
        
          <input className="inputBox" placeholder="Username" id="username"></input>
          <input className="inputBox" placeholder="Password" id="password"></input>
          <button className="bigButton">Login</button>
          <button className="bigButton">Register Account</button>



        </div>
    </div>
  );
}
