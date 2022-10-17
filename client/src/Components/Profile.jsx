import React from "react";
import { useEffect } from "react";
import me from "../icons/me.png";
import { useParams } from "react-router-dom";
  
const Profile = () => {
  let { id } = useParams();
  /* alert(id) */ //nice! only remains fetch the data with the id.

  useEffect(() => {
    console.log("coming")
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    window.location.replace("http://127.0.0.1:5173/Profile/Edit");
  }

  return (
    <div className="profile_container">
      <h1>Personal Info</h1>
      <h5>Basic info, like your name and photo</h5>
      <div className="profile_user">
        <div className="div_rows">
          <div className="profile_row1">
            <h5 className="profile_profile">Profile</h5>
            <span>Some info may be visible to other people </span>
            <div>
              <br></br>
            </div>
          </div>

          <button className="profile_btn" onClick={(e)=> handleSubmit(e)}>Edit</button>
        </div>
        <div className="div_rows">
          <span>PHOTO</span>
          <div className="profile_img_div">
            <img src={me} alt="me" />
          </div>
        </div>

        <div className="div_rows">
          <span>NAME</span>
          <input
            className="profile_inputs"
            type="text"
            value="Leonardo Echenique"
          />
        </div>
        <div className="div_rows">
          <span>BIO</span>
          <input
            className="profile_inputs"
            type="text"
            value="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas dolorem ad ab, cum rerum rem vel obcaecati mollitia nisi harum nihil doloribus porro eligendi quibusdam ducimus facere esse earum hic.
           "
          />
        </div>
        <div className="div_rows">
          <span>PHONE</span>
          <input
            type="text"
            value="+5493584313048"
            className="profile_inputs"
          />
        </div>
        <div className="div_rows">
          <span>EMAIL</span>
          <input
            type="email"
            className="profile_inputs"
            value="leo.echeni@gmail.com"
          />
        </div>
        <div className="div_rows">
          <span>PASSWORD</span>
          <input
            type="password"
            className="profile_inputs"
            value="+5493584313048"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
