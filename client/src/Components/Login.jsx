import { React, useState } from "react";
import Card from "./Card";
import icon_pass from "../icons/icon_password.png";
import icon_mail from "../icons/icon_mail.png";
import icon_google from "../icons/icon_google.png";
import icon_face from "../icons/icon_face.png";
import icon_link from "../icons/icon_link.png";
import icon_github from "../icons/icon_github.png";

const Login = () => {
  const [log, setLog] = useState(true);
  return (
    <div>
      {log === true ? (
        <div>
          <div className="card_container" id="card_login">
            <p className="card_text">icon</p>
            <p className="card_text">Login section</p>
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
                className="form_btn" /* onClick={(e)=> handleSubmit(e)} */
              >
                Log in
              </button>
            </form>
            <span className="card_span">
              or continue with these social profiles
            </span>
            <div className="card_div_links">
              <ul className="card_ul">
                <li className="card_li">
                  {" "}
                  <img src={icon_google} alt="Icon" />{" "}
                </li>
                <li className="card_li">
                  <img src={icon_face} alt="Icon" />
                </li>
                <li className="card_li">
                  <img src={icon_link} alt="Icon" />
                </li>
                <li className="card_li">
                  <img src={icon_github} alt="Icon" />
                </li>
              </ul>
            </div>
            <span className="card_span">
              Don't have an account yet?
              <a onClick={() => setLog(!log)} className="card_log"> Register </a>
            </span>{" "}
            {/* Link to login */}
          </div>
          <footer className="card_footer">
            <p>Created by</p>
            <p>thanks to</p>
          </footer>
        </div>
      ) : (
        <Card />
      )}
    </div>
  );
};

export default Login;
