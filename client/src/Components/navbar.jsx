import React from "react";
import { useState } from "react";
import drop from "../icons/drop.png";
import me from "../icons/me.png";
import user from "../icons/user_icon.png";
import chat from "../icons/group_icon.png";
import logout from "../icons/logout.png";

export default function Navbar() {
  const [act, setAct] = useState(false);
  const [tog, setTog] = useState(true);
  return (
    <nav className="navbar_container">
      <li className="icon">ICON</li>
      <div>
        <div
          className="nav_img_div"
          onClick={() => {
            setAct(!act);
            setTog(!tog)
          }}
        >
          <img src={me} alt="me" />
          <h1>
            <b>Leonardo Echenique</b>
          </h1>
          <div className="nav_drop">
            <img
              src={drop}
              alt="menu"
              className={`${act ? "active" : null} ${tog ? "tog" : null} nav_drop_icon `}
            />
          </div>
        </div>

        <ul className={`${act ? "active" : null} ${tog ? "tog" : null} `}>
          {["My Profile", "Group Chat", "Logout"].map((e, i) => {
            let arr = [user, chat, logout];
            return (
              <li key={e} className={e}>
                {" "}
                <img src={arr[i]} alt="user" /> {e}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
