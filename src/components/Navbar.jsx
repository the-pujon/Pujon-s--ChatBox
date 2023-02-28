import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../Firebase";
import pujon from "../images/logo.png";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="nav">
      <div className="logo">
        <img src={pujon} alt="" />
      </div>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
      </div>{" "}
      <button onClick={() => signOut(auth)}>log out</button>
    </div>
  );
};

export default Navbar;
