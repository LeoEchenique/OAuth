import React from "react";
import me from "../icons/me.png";
import ic_photo from "../icons/icon_photo.png";
import back from "../icons/back.png";

const Profile_Edit = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    window.location.replace("http://127.0.0.1:5173/Profile");
  }
  return (
    <div className="profile_container">
      <div className="profile_edit_goback" onClick={(e)=> handleSubmit(e)}>
       
        <div className="profile_edit_back">
        <img src={back} alt="me" className="" />
        </div>
        <h3>Back</h3>
      </div>

      <div className="profile_edit_user">
        <div className="div_rows">
          <div className="profile_row1">
            <h5 className="profile_profile">Change info</h5>
            <span>Changes will be reflected to every services</span>
            <div>
              <br></br>
            </div>
          </div>
        </div>
        <div className="div_inputs">
          <div className="profile_edit_img_div">
            <img src={me} alt="me" className="profile_edit_img" />
            <img src={ic_photo} alt="editphoto" className="icon_edit_photo" />
            <span className="profile_edit_img_span">CHANGE PHOTO</span>
          </div>
        </div>

        <div className="div_inputs">
          <span>NAME</span>
          <input
            className="profile_edit_input"
            type="text"
            name="name"
            value="Leonardo Echenique"
          />
        </div>
        <div className="div_inputs edit_bio">
          <span>BIO</span>
          <textarea
            className="profile_edit_input"
            type="text"
            value="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas dolorem ad ab, cum rerum rem vel obcaecati mollitia nisi harum nihil doloribus porro eligendi quibusdam ducimus facere esse earum hic.
           "
          />
        </div>
        <div className="div_inputs">
          <span>PHONE</span>
          <input
            className="profile_edit_input"
            type="text"
            value="+5493584313048"
          />
        </div>
        <div className="div_inputs">
          <span>EMAIL</span>
          <input
            className="profile_edit_input"
            type="email"
            value="leo.echeni@gmail.com"
          />
        </div>
        <div className="div_inputs">
          <span>PASSWORD</span>
          <input
            className="profile_edit_input"
            type="password"
            value="+5493584313048"
          />
        </div>
        <div className="profile_div_btn">
        <button className="profile_edit_btn"> Save</button>
    </div>
    
      </div>
    </div>
  );
};
export default Profile_Edit;
