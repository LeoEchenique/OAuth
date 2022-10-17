import { React, useState, useEffect } from "react";

import axios from "axios";
import icon_pass from "../icons/icon_password.png";
import icon_mail from "../icons/icon_mail.png";
import icon_google from "../icons/icon_google.png";
import icon_face from "../icons/icon_face.png";
import icon_link from "../icons/icon_link.png";
import icon_github from "../icons/icon_github.png";
import Login from "./Login";


export default function Card() {
  const [log, setLog] = useState(false);


 const LINKEDIN_CLIENT_ID = "77mayphg27gwm9"
 const LINKEDIN_REDIRECT_URL = "http://localhost:3001/login/linkedin"
 const GITHUB_CLIENT_ID = "906a1f46489153126b04"
 const GITHUB_REDIRECT_URL = "http://localhost:3001/login/github"
 const GITHUB_PATH = "http://127.0.0.1:5173/Profile"
 const GOOGLE_REDIRECT_URI= "http://localhost:3001/login/google"
 const GOOGLE_CLIENT_ID = "784011506985-97oq9uebbhej33vkps4vsm0fcusj2kcg.apps.googleusercontent.com"
 const FACEBOOK_CLIENT_ID = "5834344803265388"
 const FACEBOOK_REDIRECT_URI="http://localhost:3001/login/facebook"



  const consentLinkedin = (e) => {
    console.log("clicked")
    window.location.assign(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${LINKEDIN_REDIRECT_URL}&scope=r_liteprofile%20r_emailaddress`)
  }
  
  const consentGITHUB = async (e) => {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}?path=${GITHUB_PATH}&scope=user:email`);
    
  };
  
  const consentGoogle = async () => {
//                                                                                          //openid -> userinfo && mail
window.location.assign(`https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=openid%20email&include_granted_scopes=true&response_type=code&redirect_uri=${GOOGLE_REDIRECT_URI}&client_id=${GOOGLE_CLIENT_ID}`);

  }
  const consentFacebook = async () => {
  window.location.assign(`https://www.facebook.com/v15.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${FACEBOOK_REDIRECT_URI}`)
}
  return (
    <div>
      <div>
        {log === false ? (
          <div>
            <div className="card_container">
              <header>Log</header>
              <p className="card_text">
                Join thousands of learners from <br></br> around the world
              </p>
              <p className="card_text">
                Master web development by making real-life <br></br>projects.
                There are multiple paths for you to <br></br>choose
              </p>
        
              <form action="" className="card_form">
                <div className="form_input_div">
                  <img src={icon_mail} alt="Icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form_input"
                  />
                </div>
                <div>
                  <br></br>
                </div>
                <div className="form_input_div">
                  <img src={icon_pass} alt="Icon" />
                  <input
                    type="password"
                    name="email"
                    placeholder="Password"
                    className="form_input"
                  />
                </div>
                <div className="form_breaker">
                  <br></br>
                </div>
                <button
                  className="form_btn"
                  onClick={(e)=> e.preventDefault()}
                 >
                  Start coding now
                </button>
              </form>
              <span className="card_span">
                or continue with these social profiles
              </span>
              <div className="card_div_links">
                <ul className="card_ul">
                  <li className="card_li">
                    {" "}
                    <img src={icon_google} alt="Icon"  onClick={(e) => consentGoogle(e)}   />{" "}
                  </li>
                  <li className="card_li">
                    <img src={icon_face} alt="Icon" onClick={(e)=> consentFacebook()} />
                  </li>
                  <li className="card_li">
                    <img src={icon_link} alt="Icon" onClick={()=> consentLinkedin()} />
                  </li>
                  <li className="card_li">
                    <img src={icon_github} alt="Icon"  onClick={(e) => consentGITHUB(e)}  />
                  </li>
                </ul>
              </div>
              <span className="card_span">
                Already a member?
                <a onClick={() => setLog(!log)}> Login </a>
              </span>{" "}
            </div>

            <footer className="card_footer">
              <p>Created by</p>
              <p>thanks to</p>
            </footer>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}
